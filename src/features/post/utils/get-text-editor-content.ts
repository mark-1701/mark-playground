import type { Editor } from '@tiptap/core';

export const getTextEditorContent = (editor: Editor) => {
  return serializeTextEditorContent(editor.getJSON());
};

const serializeTextEditorContent = (content: any) => {
  return JSON.parse(JSON.stringify(content));
};
