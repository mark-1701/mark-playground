import { serializeTiptapContent } from '@/utils';
import type { Editor } from '@tiptap/core';

// todo estudiar que pasó aquí
export const getTextEditorContent = (editor: Editor) => {
  return serializeTiptapContent(editor.getJSON());
};
