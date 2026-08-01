import type { Post } from '@/app/generated/prisma/client';
import type { PostStatus } from '@/app/generated/prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PostState = {
  id: string;
  title: string | null;
  content: any;
  status: PostStatus;
  setId: (id: string) => void;
  setTitle: (title: string | null) => void;
  setContent: (content: any) => void;
  setPost: (post: Post) => void;
};

export const usePostStore = create<PostState>()(
  persist(
    set => ({
      id: '',
      title: '',
      content: null,
      status: 'DRAFT',
      setId: id => set({ id }),
      setTitle: title => set({ title }),
      setContent: content => set({ content }),
      setPost: post =>
        set({
          id: post.id,
          title: post.title,
          content: post.content,
          status: post.status
        })
    }),
    {
      name: 'post-store'
    }
  )
);
