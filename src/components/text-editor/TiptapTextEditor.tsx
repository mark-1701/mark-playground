'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { extensionsConfig } from './extensions';
import { ToolBar } from './toolbar/Toolbar';

export const TiptapTextEditor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'p-2 m-2 focus:outline-none'
      }
    },
    extensions: extensionsConfig,
    content: '<p>puedes empezar a escribir...</p>',
    immediatelyRender: false
  });

  if (!editor) return null;

  return (
    <div
      className="m-2 mx-auto mt-15 w-[1200px] rounded-md border border-gray-200
        shadow"
    >
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};


