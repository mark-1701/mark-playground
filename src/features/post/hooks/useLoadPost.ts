'use client';

import { getPostById } from '@/actions';
import { usePostStore } from '@/stores/post-store';
import type { Content, Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useLoadDraftPost = (editor: Editor | null, postId: string) => {
  const router = useRouter();
  const setDraftPost = usePostStore(state => state.setPost);

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

      // guardar post en zustand
      setDraftPost(resp.data);

      editor.commands.setContent(resp.data.content as Content);
    };

    loadPost();
  }, [editor, router, postId, setDraftPost]);
};

// ! posible eliminar
// const editorContent =
//   postId !== draftId
//     ? (resp.data.content as Content)
//     : (content as Content);

// if (postId !== draftId) {
//   setPost(resp.data);
// }
