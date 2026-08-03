import type { Post } from '@/app/generated/prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DraftPost = Pick<Post, 'id' | 'title' | 'content' | 'status'>;

type PostState = {
  post: DraftPost;
  setPost: (post: Post) => void;
  updatePost: (data: Partial<DraftPost>) => void;
};

const initialPost: DraftPost = {
  id: '',
  title: '',
  content: null,
  status: 'DRAFT'
};

export const usePostStore = create<PostState>()(
  persist(
    set => ({
      post: initialPost,
      setPost: post => set({ post }),
      updatePost: data =>
        set(state => ({
          post: {
            ...state.post,
            ...data
          }
        }))
    }),
    {
      name: 'post-store'
    }
  )
);
