'use client';

import { getPostById } from '@/actions';
import { Post } from '@/app/generated/prisma/client';
import type { Content, Editor } from '@tiptap/react';
import { getCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { initialPostData } from '../data/initialPostData';

export const useDraftPost = (editor: Editor | null) => {
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!editor) return;

    const loadPost = async () => {
      const postId = getCookie('post:draftId') ?? '';

      const postResp = await getPostById(postId);

      if (!postResp.ok) {
        toast.error('No se encontró el post', {
          toastId: 'missing-post-id'
        });
        router.push('/dashboard/posts');
        return;
      }

      setPost(postResp.data);

      editor?.commands.setContent(
        (postResp.data.content as Content) ?? initialPostData.content
      );
    };

    loadPost();
  }, [editor, router]);

  return {
    post
  };
};
