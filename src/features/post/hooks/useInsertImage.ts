'use client';

import { registerMedia, updateMediaUrl } from '@/actions';
import { ActionResult } from '@/types';
import { generateImageKey } from '@/utils';
import type { Editor } from '@tiptap/core';
import { getCookie } from 'cookies-next/client';
import { useState } from 'react';
import { uploadImageToStorage } from '@/services/storage/r2';

// todo: implementar mécanismos de seguridad para evitar las múltiples socitudes
// todo: insertar una imagen temporal (spinner de carga)

export const useInsertImage = () => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const insertImage = async (
    editor: Editor,
    file: File,
    position?: number
  ): Promise<ActionResult<null>> => {
    const key = generateImageKey(file.name);
    const insertPos = position ?? editor.state.selection.anchor;
    const postId = getCookie('post:draftId');

    // validar datos
    if (!postId) {
      return {
        ok: false,
        message: 'Cookie no encontrada'
      };
    }

    setIsUploadingImage(true);
    try {
      // 1. registrar media
      const media = await registerMedia(postId, key);
      if (!media.ok) throw new Error('No se pudo registrar la imagen');

      // 2. guardar imagen el en storage
      const publicUrl = await uploadImageToStorage(file, key);

      // 3. actualizar la url en la db
      await updateMediaUrl(media.data?.id, publicUrl);

      // 4. insertar imagen en el editor
      editor
        .chain()
        .insertContentAt(insertPos, {
          type: 'image',
          attrs: {
            src: publicUrl,
            ['data-r2-key']: key
          }
        })
        .focus()
        .run();

      return {
        ok: true,
        data: null
      };
    } catch (error) {
      setUploadError('Error insertando imagen');

      return {
        ok: false,
        message: 'Ocurrió algún error'
      };
    } finally {
      setIsUploadingImage(false);
    }
  };

  return {
    insertImage,
    isUploadingImage,
    uploadError
  };
};
