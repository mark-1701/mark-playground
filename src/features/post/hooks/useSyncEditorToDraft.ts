'use client';

import { usePostStore } from '@/stores/post-store';
import type { Editor } from '@tiptap/react';
import { useEffect } from 'react';
import { getTextEditorContent, getTextEditorTitle } from '../utils';

export const useSyncEditorToDraft = (editor: Editor | null) => {
  const setDraftContent = usePostStore(state => state.setContent);
  const setDraftTitle = usePostStore(state => state.setTitle);

  // cualquier cambio en el editor
  // se guarda el content y title de zustand
  useEffect(() => {
    if (!editor) return;

    const onUpdate = () => {
      setDraftContent(getTextEditorContent(editor));
      setDraftTitle(getTextEditorTitle(editor.state.doc));
    };

    editor.on('update', onUpdate);

    return () => {
      editor.off('update', onUpdate);
    };
  }, [editor, setDraftContent, setDraftTitle]);
};
