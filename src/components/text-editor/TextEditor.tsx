'use client';
import { Editor, EditorContent } from '@tiptap/react';
import { ToolBar } from './toolbar/Toolbar';
import type { HandleInsertImage } from './types';

type TextEditorProps = {
  editor: Editor;
  onInsertImage: HandleInsertImage;
  isUploadingImage: boolean;
};

export const TextEditor = ({
  editor,
  onInsertImage,
  isUploadingImage
}: TextEditorProps) => {
  return (
    <div className="rounded-md border border-gray-300">
      <ToolBar
        editor={editor}
        onInsertImage={onInsertImage}
        isUploadingImage={isUploadingImage}
      />
      <EditorContent editor={editor} />
    </div>
  );
};
