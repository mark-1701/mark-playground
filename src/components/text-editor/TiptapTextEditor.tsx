'use client';

import FileHandler from '@tiptap/extension-file-handler';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToolBar } from './toolbar/Toolbar';

export const TiptapTextEditor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'p-2 m-2 focus:outline-none'
      }
    },
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left'
      }),
      Highlight,
      Image,
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp'
        ],
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
    ],
    content: '<p>puedes empezar a escribir...</p>',
    immediatelyRender: false
  });

  if (!editor) return null;

  return (
    <div
      className="m-2 mx-auto mt-15 w-[1400px] rounded-md border border-gray-200
        shadow"
    >
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
