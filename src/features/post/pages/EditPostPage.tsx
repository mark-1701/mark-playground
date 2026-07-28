'use client';

import PostSummary from '@/features/post/components/PostSummary';
import { useLoadDraftPost } from '@/features/post/hooks/useDraftPost';
import { getContent } from '@/features/post/utils';
import { getTitle } from '@/features/post/utils/get-title';
import { usePostStore } from '@/stores/post-store';
import { useEditor } from '@tiptap/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { TextEditor } from '@/components/text-editor/TextEditor';
import { getExtensions } from '@/components/text-editor/config';

const EditPostPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') ?? '';
  
  const setContent = usePostStore(state => state.setContent);
  const setTitle = usePostStore(state => state.setTitle);

  const editor = useEditor({
    extensions: getExtensions(),
    content: '',
    immediatelyRender: false
  });

  // cargar post borrador
  useLoadDraftPost(editor, postId);

  // guardar title y content en zustand
  useEffect(() => {
    if (!editor) return;

    const onUpdate = () => {
      setContent(getContent(editor));
      setTitle(getTitle(editor.state.doc));
    };

    editor.on('update', onUpdate);

    return () => {
      editor?.off('update', onUpdate);
    };
  }, [editor, setContent, setTitle]);

  if (!editor) return <p>loading...</p>;

  return (
    <div className="flex h-full flex-col gap-8">
      <h1 className="text-3xl font-bold">Crear nuevo post</h1>
      <div className="flex min-h-0 flex-1 gap-4">
        <div className="flex-1">
          <TextEditor editor={editor} />
        </div>
        <div>
          <PostSummary editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
