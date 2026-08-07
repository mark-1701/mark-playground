'use client';

import { useEditor } from '@tiptap/react';
import { getExtensions } from '@/components/text-editor/config';
import { useInsertImage } from './useInsertImage';
import { useLoadDraftPost } from './useLoadDraftPost';
import { useSyncEditorToDraft } from './useSyncEditorToDraft';

export const useCreatePostEditor = (postId: string) => {
  /*
   * La operación de imágenes pertenece al post actual,
   * por eso este hook es quien conoce la relación
   * entre editor y postId.
   */
  const { insertImage } = useInsertImage(postId);

  // ? Creamos Tiptap ya configurado para este post
  const editor = useEditor({
    extensions: getExtensions(insertImage),
    content: '',
    immediatelyRender: false
  });

  // ? Carga inicial del contenido
  useLoadDraftPost(editor, postId);

  // ? Sincronización de cambios con Zustand
  useSyncEditorToDraft(editor, postId);

  return {
    editor,
    insertImage,
  };
};
