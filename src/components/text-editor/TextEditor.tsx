'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { createExtensionsConfig } from './config';
import { useInsertImage } from './hooks/useInsertImage';
import { ToolBar } from './toolbar/Toolbar';

export const TiptapTextEditor = () => {
  const { insertImage } = useInsertImage();

  const editor = useEditor({
    extensions: createExtensionsConfig({ insertImage }),
    content: '<p>puedes empezar a escribir...</p>',
    immediatelyRender: false
  });

  if (!editor) return null;

  return (
    <>
      <div
        className="m-2 mx-auto mt-15 w-[1200px] rounded-md border
          border-gray-300 shadow"
      >
        <ToolBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
