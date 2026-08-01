'use client';

import PostSummary from '@/features/post/components/PostSummary';
import { useLoadDraftPost } from '@/features/post/hooks/useLoadPost';
import {
  getTextEditorContent,
  getTextEditorTitle
} from '@/features/post/utils';
import { usePostStore } from '@/stores/post-store';
import { useEditor } from '@tiptap/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { TextEditor } from '@/components/text-editor/TextEditor';
import { getExtensions } from '@/components/text-editor/config';

const EditPostPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') ?? '';
  const setDraftContent = usePostStore(state => state.setContent);
  const setDraftTitle = usePostStore(state => state.setTitle);

  const editor = useEditor({
    extensions: getExtensions(),
    content: '',
    immediatelyRender: false
  });

  // cargar post como borrador
  useLoadDraftPost(editor, postId);

  // guardar cambios de content y title en zustand
  useEffect(() => {
    if (!editor) return;

    const onUpdate = () => {
      setDraftContent(getTextEditorContent(editor));
      setDraftTitle(getTextEditorTitle(editor.state.doc));
    };

    editor.on('update', onUpdate);

    return () => {
      editor?.off('update', onUpdate);
    };
  }, [editor, setDraftContent, setDraftTitle]);

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
