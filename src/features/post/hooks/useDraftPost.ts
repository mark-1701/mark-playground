'use client';

import { getPostById } from '@/actions';
import { Post } from '@/app/generated/prisma/client';
import { usePostStore } from '@/stores/post-store';
import type { Content, Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { initialPostData } from '../data/initialPostData';

export const useLoadDraftPost = (editor: Editor | null) => {
  const router = useRouter();

  const draftId = usePostStore(state => state.draftId);

  const setDraftPost = usePostStore(state => state.setPost);

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!editor) return;

    const loadPost = async () => {
      const resp = await getPostById(draftId);

      if (!resp.ok) {
        toast.error('No se encontró el post', {
          toastId: 'missing-post-id'
        });
        router.push('/dashboard/posts');
        return;
      }

      setPost(resp.data);

      setDraftPost(resp.data);

      // todo esto puede cambiar en el tiempo, suponte que si pueden haber posts que estan vacíos
      editor?.commands.setContent(
        (resp.data.content as Content) ?? initialPostData.content
      );
    };

    loadPost();
  }, [editor, router]);

  return post;
};
