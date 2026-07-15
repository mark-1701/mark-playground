'use client';

import { registerMedia, updateMediaUrl } from '@/actions';
import { generateImageKey } from '@/utils';
import type { Editor } from '@tiptap/core';
import { getCookie } from 'cookies-next/client';
import { useState } from 'react';
import { uploadImageToStorage } from '@/services/storage/r2';
import { UploadImageStatus } from '../types';

// TODO: implementar mécanismos de seguridad para evitar las múltiples socitudes
// TODO: insertar una imagen temporal (spinner de carga)

export const useInsertImage = () => {
  const [status, setStatus] = useState<UploadImageStatus>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const isUploadingImage = status === 'uploading';

  const insertImage = async (
    editor: Editor,
    file: File,
    position?: number
  ) => {
    if (!file || !editor) return;

    const key = generateImageKey(file.name);
    const insertPos = position ?? editor.state.selection.anchor;

    // TODO: validar cookie
    const postId = getCookie('post:postId');
    if (!postId) return; // ! error

    setStatus('uploading');

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

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setUploadError('Error insertando imagen');
    }
  };

  return {
    insertImage,
    status,
    isUploadingImage,
    uploadError
  };
};
