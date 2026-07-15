import type { Editor, Extensions } from '@tiptap/core';
import FileHandler from '@tiptap/extension-file-handler';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

type HandleInsertImage = (
  editor: Editor,
  file: File,
  position?: number
) => void;

export const createExtensionsConfig = (
  handleInsertImage: HandleInsertImage
): Extensions => [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    defaultAlignment: 'left'
  }),
  Highlight,
  CustomImage,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(file => {
        handleInsertImage(currentEditor, file, pos);
      });
    },
    onPaste: (currentEditor, files) => {
      files.forEach(file => {
        handleInsertImage(currentEditor, file);
      });
    }
  })
];

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      ['data-r2-key']: {
        default: null,
        parseHTML: element => element.getAttribute('data-r2-key'),
        renderHTML: attributes => {
          return { 'data-r2-key': attributes['data-r2-key'] };
        }
      }
    };
  }
});
