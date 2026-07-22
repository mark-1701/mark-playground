'use client';

import PostSummary from '@/features/post/components/PostSummary';
import { useDraftPost } from '@/features/post/hooks/useDraftPost';
import { useInsertImage } from '@/features/post/hooks/useInsertImage';
import { useEditor } from '@tiptap/react';
import { TextEditor } from '@/components/text-editor/TextEditor';
import { createExtensionsConfig } from '@/components/text-editor/config';

const NewPostPage = () => {
  const { insertImage, isUploadingImage } = useInsertImage();
  const editor = getTiptapTextEditorInstance(insertImage);
  const { post } = useDraftPost(editor);

  if (!editor) return <p>loading...</p>;

  return (
    <div className="flex h-full flex-col gap-8">
      <h1 className="text-3xl font-bold">Crear nuevo post</h1>

      <div className="flex min-h-0 flex-1 gap-4">
        <div className="flex-1">
          <TextEditor
            editor={editor}
            onInsertImage={insertImage}
            isUploadingImage={isUploadingImage}
          />
        </div>
        <div>
          <PostSummary editor={editor} post={post} />
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;

const getTiptapTextEditorInstance = (insertImage: any) => {
  return useEditor({
    extensions: createExtensionsConfig(insertImage),
    content: '',
    immediatelyRender: false
  });
};
