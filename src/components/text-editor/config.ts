import type { Editor, Extensions } from '@tiptap/core';
import FileHandler from '@tiptap/extension-file-handler';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

type CreateExtensionsConfigProps = {
  insertImage: (
    editor: Editor,
    postId: string,
    file: File,
    position?: number
  ) => Promise<void>;
};

const postId = '0f2f61af-915d-422d-98f5-74583eab6941';

export const createExtensionsConfig = ({
  insertImage
}: CreateExtensionsConfigProps): Extensions => [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    defaultAlignment: 'left'
  }),
  Highlight,
  CustomImage,
  // TODO: ESTA POR VERSE QUE PASA CUANDO SE CAMBIE EL POST ID DINÁMICAMENTE
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(file => insertImage(currentEditor, postId, file, pos));
    },
    onPaste: (currentEditor, files) => {
      files.forEach(file => insertImage(currentEditor, postId, file));
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
