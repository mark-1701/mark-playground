'use client';

import PostSummary from '@/features/post/components/PostSummary';
import { useLoadDraftPost } from '@/features/post/hooks/useLoadDraftPost';
import { useEditor } from '@tiptap/react';
import { useSearchParams } from 'next/navigation';
import { TextEditor } from '@/components/text-editor/TextEditor';
import { getExtensions } from '@/components/text-editor/config';
import { useSyncEditorToDraft } from '../hooks/useSyncEditorToDraft';

const EditPostPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  const editor = useEditor({
    extensions: getExtensions(),
    content: '',
    immediatelyRender: false
  });

  // ? cargar post solicutado como borrador
  useLoadDraftPost(editor, postId);

  // ? sincronizar content editor con el content del borrador cargado
  useSyncEditorToDraft(editor, postId);

  if (!editor || !postId) return <p>loading...</p>;

  return (
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
  );
};

export default EditPostPage;
