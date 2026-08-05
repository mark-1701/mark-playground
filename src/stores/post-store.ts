import type { Post } from '@/app/generated/prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PostSnapshot = Pick<Post, 'id' | 'title' | 'content' | 'status'>;

type DraftPost = {
  draft: PostSnapshot;
  original: PostSnapshot;
};

type PostState = {
  draftPosts: DraftPost[];
  addDraftPost: (post: Post) => DraftPost;
  updateDraftPost: (postId: string, data: Partial<PostSnapshot>) => void;
  deleteDraftPost: (postId: string) => void;
  undoDraftPostChanges: (postId: string) => void;
};

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      draftPosts: [],

      addDraftPost: post => {
        const { draftPosts } = get();

        const draftPost = draftPosts.find(item => item.draft.id === post.id);

        // si existe, se retorna
        if (draftPost) return draftPost;

        // si no existe, sea crea un nuevo, se agrega y se retorna
        const newDraftPost = {
          draft: { ...post },
          original: { ...post }
        };

        set({
          draftPosts: [...draftPosts, newDraftPost]
        });

        return newDraftPost;
      },

      updateDraftPost: (postId, data) => {
        set(state => ({
          draftPosts: state.draftPosts.map(item =>
            item.draft.id === postId
              ? { ...item, draft: { ...item.draft, ...data } }
              : item
          )
        }));
      },

      deleteDraftPost: postId => {
        set(state => ({
          draftPosts: state.draftPosts.filter(item => item.draft.id !== postId)
        }));
      },

      undoDraftPostChanges: postId => {
        set(state => ({
          draftPosts: state.draftPosts.map(item =>
            item.draft.id === postId
              ? { ...item, draft: { ...item.original } }
              : item
          )
        }));
      }
    }),
    {
      name: 'post-store'
    }
  )
);
