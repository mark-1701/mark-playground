'use client';

import type { InsertImage } from '@/types';
import { createContext, useContext } from 'react';

type PostEditorContextValue = {
  insertImage: InsertImage;
};

export const PostEditorContext = createContext<PostEditorContextValue | null>(
  null
);

export const usePostEditor = () => {
  const context = useContext(PostEditorContext);

  if (!context) {
    throw new Error('usePostEditor debe usarse dentro de <PostEditorContent>');
  }

  return context;
};
