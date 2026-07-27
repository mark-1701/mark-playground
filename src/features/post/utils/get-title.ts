import { Node } from 'prosemirror-model';

export const getTitle = (doc: Node) => {
  let result: string | null = null;
  try {
    doc.descendants(node => {
      if (node.type.name === 'heading' && node.attrs.level === 1) {
        result = node.textContent.trim() || null;
        throw new Error('done');
      }
    });
  } catch {}
  return result;
};
