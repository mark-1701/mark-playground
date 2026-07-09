import type { Editor } from '@tiptap/core';
import { useState } from 'react';
import { publishPost } from '@/actions/post/publish-post';

export const usePublishPost = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const publish = async (editor: Editor, postId: string, title?: string) => {
    const content = JSON.stringify(editor.getJSON());
    const mediaKeys = new Set<string>();
    const finalTitle = title ?? `título + ${new Date().toISOString()}`;

    editor.state.doc.descendants(node => {
      if (node.type.name === 'image' && node.attrs['data-r2-key']) {
        mediaKeys.add(node.attrs['data-r2-key']);
      }
    });

    setIsPublishing(true);

    const resp = await publishPost(postId, finalTitle, content, [...mediaKeys]);

    if (!resp.ok) setPublishError(resp.message);

    setIsPublishing(false);
  };

  return { publish, isPublishing, publishError };
};
