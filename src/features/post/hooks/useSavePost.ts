'use client';

import type { Editor } from '@tiptap/core';
import { getCookie } from 'cookies-next/client';
import { useState } from 'react';
import { publishPost } from '@/actions/post/publish-post';

export const useSavePost = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const save = async (editor: Editor, title?: string) => {
    const mediaKeys = new Set<string>();
    const finalTitle = title ?? `título + ${new Date().toISOString()}`;
    const content = JSON.stringify(editor.getJSON());
    
    // TODO: validar cookie
    const postId = getCookie('post:draftId');
    if (!postId) return;

    // obtener imágenes
    editor.state.doc.descendants(node => {
      if (node.type.name === 'image' && node.attrs['data-r2-key']) {
        mediaKeys.add(node.attrs['data-r2-key']);
      }
    });

    setIsSaving(true);

    // guardar en la base de datos
    const resp = await publishPost(postId, finalTitle, content, [...mediaKeys]);

    if (!resp.ok) setSaveError(resp.message);

    setIsSaving(false);
  };

  return { save, isSaving, saveError };
};
