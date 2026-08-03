'use client';

import { getPostById } from '@/actions';
import { usePostStore } from '@/stores/post-store';
import type { Content, Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useLoadDraftPost = (editor: Editor | null, postId: string) => {
  const router = useRouter();
  const draftPost = usePostStore(state => state.post);
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

      // si el postId coincide con el borrador, se carga el borrador
      // const editorContent =
      //   postId !== draftPost.id
      //     ? (resp.data.content as Content)
      //     : (draftPost.content as Content);

      // // si el postId no pertenece al anterior borrador, el borrador pasa a ser
      // // el nuevo postId
      // if (postId !== draftPost.id) {
      //   setDraftPost(resp.data);
      // }

      // editor.commands.setContent(editorContent);
    };

    loadPost();
  }, [editor, router, postId, setDraftPost]);
};
