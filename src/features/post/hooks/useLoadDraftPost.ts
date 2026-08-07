'use client';

import { getPostById } from '@/actions';
import { usePostStore } from '@/stores/post-store';
import type { Content, Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useLoadDraftPost = (editor: Editor | null, postId: string) => {
  const router = useRouter();
  const addDraftPost = usePostStore(state => state.addDraftPost);

  useEffect(() => {
    if (!editor) return;

    const loadPost = async () => {
      const resp = await getPostById(postId);

      if (!resp.ok) {
        toast.error('No se encontró el post seleccionado', {
          toastId: 'missing-post-id'
        });
        router.push('/dashboard/posts');
        return;
      }

      const draftPost = addDraftPost(resp.data);

      editor.commands.setContent(draftPost.draft.content as Content);
    };

    loadPost();
  }, [editor, router, postId, addDraftPost]);
};
