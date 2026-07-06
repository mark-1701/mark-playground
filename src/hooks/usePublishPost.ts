import type { Editor } from '@tiptap/core';
import { publishPost } from '@/actions/post/publish-post';

export const usePublishPost = (editor: Editor, postId: string) => {
  const publish = (title?: string) => {
    const content = JSON.stringify(editor.getJSON());
    const mediaKeys = new Set<string>();
    const finalTitle = title ?? `título + ${new Date().toISOString()}`;

    editor.state.doc.descendants(node => {
      if (node.type.name === 'image' && node.attrs['data-r2-key']) {
        mediaKeys.add(node.attrs['data-r2-key']);
      }
    });

    return publishPost(postId, finalTitle, content, [...mediaKeys]);
  };

  return { publish };
};
