import { serializeTiptapContent } from '@/utils';
import type { Editor } from '@tiptap/core';

// todo estudiar que pasó aquí
export const getContent = (editor: Editor) => {
  return serializeTiptapContent(editor.getJSON());
};
