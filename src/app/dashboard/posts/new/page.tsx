'use client';

import PostSummary from '@/features/post/components/PostSummary';
import { useLoadDraftPost } from '@/features/post/hooks/useDraftPost';
import { getContent } from '@/features/post/utils';
import { getTitle } from '@/features/post/utils/get-title';
import { usePostStore } from '@/stores/post-store';
import { useEditor } from '@tiptap/react';
import { useEffect } from 'react';
import { TextEditor } from '@/components/text-editor/TextEditor';
import { getExtensions } from '@/components/text-editor/config';

const NewPostPage = () => {
  const editor = useEditor({
    extensions: getExtensions(),
    content: '',
    immediatelyRender: false
  });

  // métodos de zustand
  const setContent = usePostStore(state => state.setContent);
  const setTitle = usePostStore(state => state.setTitle);
  const title = usePostStore(state => state.title);

  // cargar borrador
  const draftPost = useLoadDraftPost(editor);

  // guardar content en localstorage
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

  // guardar title en localstorage
  useEffect(() => {
    if (!editor) return;
    setTitle(getTitle(editor.state.doc));
  }, [title, editor]);

  // estar la carga del editor y el borrador
  if (!editor || !draftPost) return <p>loading...</p>;

  return (
    <div className="flex h-full flex-col gap-8">
      <h1 className="text-3xl font-bold">Crear nuevo post</h1>
      <div className="flex min-h-0 flex-1 gap-4">
        <div className="flex-1">
          <TextEditor editor={editor} />
        </div>
        <div>
          <PostSummary editor={editor} post={draftPost} />
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
