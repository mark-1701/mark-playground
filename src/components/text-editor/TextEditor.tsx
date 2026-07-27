'use client';
import { Editor, EditorContent } from '@tiptap/react';
import { ToolBar } from './toolbar/Toolbar';
import type { HandleInsertImage } from './types';

type TextEditorProps = {
  editor: Editor;
};

export const TextEditor = ({ editor }: TextEditorProps) => {
  return (
    <div className="flex h-full flex-col rounded-md border border-gray-300">
      <ToolBar editor={editor} />
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
