import type { Extensions } from '@tiptap/core';
import FileHandler from '@tiptap/extension-file-handler';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

export const extensionsConfig: Extensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    defaultAlignment: 'left'
  }),
  Highlight,
  Image,
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
