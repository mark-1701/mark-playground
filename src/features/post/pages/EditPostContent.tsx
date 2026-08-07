'use client';

import { TextEditor } from '@/components/text-editor/TextEditor';
import PostSummary from '../components/PostSummary';
import { PostEditorContext } from '../context/PostEditorContext';
import { useCreatePostEditor } from '../hooks/useCreatePostEditor';

type EditPostContentProps = {
  postId: string;
};

const EditPostContent = ({ postId }: EditPostContentProps) => {
  const { editor, insertImage } = useCreatePostEditor(postId);

  if (!editor) return <p>Cargando editor...</p>;

  return (
    <PostEditorContext.Provider value={{ insertImage }}>
      <div className="flex h-full flex-col gap-8">
        <h1 className="text-3xl font-bold">Crear nuevo post</h1>
        <div className="flex min-h-0 flex-1 gap-4">
          <div className="flex-1">
            <TextEditor editor={editor} />
          </div>
          <div>
            <PostSummary editor={editor} postId={postId} />
          </div>
        </div>
      </div>
    </PostEditorContext.Provider>
  );
};

export default EditPostContent;
