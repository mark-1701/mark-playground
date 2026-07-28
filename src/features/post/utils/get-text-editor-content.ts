import { serializeTextEditorContent } from '@/utils';
import type { Editor } from '@tiptap/core';

// todo estudiar que pasó aquí
export const getTextEditorContent = (editor: Editor) => {
  return serializeTextEditorContent(editor.getJSON());
};
