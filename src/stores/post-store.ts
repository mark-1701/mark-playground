import { Post } from '@/app/generated/prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PostState = {
  draftId: string;
  title: string | null;
  content: any;
  setDraftId: (draftId: string) => void;
  setTitle: (title: string | null) => void;
  setContent: (content: any) => void;
  setPost: (post: Post) => void;
};

export const usePostStore = create<PostState>()(
  persist(
    set => ({
      draftId: '',
      title: '',
      content: null,
      setDraftId: draftId => set({ draftId }),
      setTitle: title => set(state => (title ? { title } : state)),
      setContent: content => set({ content }),
      setPost: post => set({ title: post.title, content: post.content })
    }),
    {
      name: 'post-store'
    }
  )
);
