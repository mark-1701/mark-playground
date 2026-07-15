import { generateHTML } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';

export const createHTML = (content: any) => {
  return generateHTML(content, [StarterKit, Image]);
};
