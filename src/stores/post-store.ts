import { create } from 'zustand';

type PostState = {
  postDraftId: string | null;
  setPostDraftId: (id: string | null) => void;
};

export const usePostStore = create<PostState>(set => ({
  postDraftId: null,
  setPostDraftId: postDraftId => set({ postDraftId })
}));
