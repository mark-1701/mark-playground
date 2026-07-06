import { registerMedia, updateMediaUrl } from '@/actions';
import type { Editor } from '@tiptap/core';
import { useState } from 'react';
import { uploadImageToStorage } from '@/services/storage/r2';
import { generateImageKey } from '@/utils/generateImageKey';

export const useInsertImage = (editor: Editor, postId: string) => {
  const [status, setStatus] = useState('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const insertImage = async (file: File) => {
    if (!file || !editor) return;

    const key = generateImageKey(file.name);

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
        .insertContentAt(editor.state.selection.anchor, {
          type: 'image',
          attrs: {
            src: publicUrl,
            ['data-r2-key']: key
          }
        })
        .focus()
        .run();
    } catch (error) {
      setStatus('Error');
      setUploadError('Error insertando imagen');
    }
  };

  return { insertImage, status, uploadError };
};
