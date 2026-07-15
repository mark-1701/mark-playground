'use client';

import PostSummary from '@/features/post/components/PostSummary';
import { useInsertImage } from '@/features/post/hooks/useInsertImage';
import { useEditor } from '@tiptap/react';
import { TextEditor } from '@/components/text-editor/TextEditor';
import { createExtensionsConfig } from '@/components/text-editor/config';

const NewPostPage = () => {
  const { insertImage, isUploadingImage } = useInsertImage();

  const editor = useEditor({
    extensions: createExtensionsConfig(insertImage),
    content:
      '<h1>Mi nuevo artículo</h1>' + 
      '<p>puedes empezar a escribir..</p>',
    immediatelyRender: false
  });

  if (!editor) return null;

  return (
    <div className="px-30 pt-10">
      <div>
        <h1 className="mb-8 text-3xl font-bold">Crear nuevo post</h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <TextEditor
            editor={editor}
            onInsertImage={insertImage}
            isUploadingImage={isUploadingImage}
          />
        </div>
        <div>
          <PostSummary editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
