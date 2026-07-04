import type { Extensions } from '@tiptap/core';
import FileHandler from '@tiptap/extension-file-handler';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

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

export const extensionsConfig: Extensions = [
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
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(pos, {
              type: 'image',
              attrs: {
                src: fileReader.result
              }
            })
            .focus()
            .run();
        };
      });
    },
    onPaste: (currentEditor, files) => {
      files.forEach(file => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(currentEditor.state.selection.anchor, {
              type: 'image',
              attrs: {
                src: fileReader.result
              }
            })
            .focus()
            .run();
        };
      });
    }
  })
];
