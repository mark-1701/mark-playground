import { Node } from 'prosemirror-model';

export const getTextEditorTitle = (doc: Node, manualTitle?: string) => {
  let result: string | null = null;
  try {
    doc.descendants(node => {
      if (node.type.name === 'heading' && node.attrs.level === 1) {
        result = node.textContent.trim() || null;
        throw new Error('done');
      }
    });
  } catch {}
  return result || manualTitle || '';
};
