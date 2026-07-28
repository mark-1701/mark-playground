import type { Editor } from '@tiptap/core';

export const getTextEditorMediaKeys = (editor: Editor) => {
  const mediaKeys = new Set<string>();

  editor.state.doc.descendants(node => {
    if (node.type.name === 'image' && node.attrs['data-r2-key']) {
      mediaKeys.add(node.attrs['data-r2-key']);
    }
  });

  return [...mediaKeys];
};
