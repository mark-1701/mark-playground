'use client';

import { usePostStore } from '@/stores/post-store';
import type { Editor } from '@tiptap/react';
import { useEffect } from 'react';
import { getTextEditorContent, getTextEditorTitle } from '../utils';

export const useSyncEditorToDraft = (editor: Editor | null, postId: string) => {
  const updateDraftPost = usePostStore(state => state.updateDraftPost);

  // ? cualquier cambio que exista en el content,
  // ? se guarda el content y el title en zustand
  useEffect(() => {
    if (!editor) return;

    const onUpdate = () => {
      updateDraftPost(postId, {
        content: getTextEditorContent(editor),
        title: getTextEditorTitle(editor.state.doc)
      });
    };

    editor.on('update', onUpdate);

    return () => {
      editor.off('update', onUpdate);
    };
  }, [editor, postId, updateDraftPost]);
};
