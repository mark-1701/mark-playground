'use client';

import { Post } from '@/app/generated/prisma/client';
import type { Editor } from '@tiptap/react';
import { deleteCookie, getCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { publishPost } from '@/actions/post/publish-post';
import { getMediaKeys, getTextEditorContent } from '../utils';

type PostSummaryProps = {
  editor: Editor;
  post: Post | null;
};

const PostSummary = ({ editor, post }: PostSummaryProps) => {
  const router = useRouter();
  const isNewPost = post?.status === 'DRAFT';
  const [title, setTitle] = useState('');

  // todo: bloquear el botón cuando se esta haciendo la consulta
  // const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const resp = await publishPost(
      post?.id ?? '',
      title,
      getTextEditorContent(editor),
      getMediaKeys(editor)
    );

    if (!resp.ok) {
      toast.error('Ocurrió un error guardando el post');
      return;
    }

    deleteCookie('post:draftId');
    toast.success('Artículo guardado con éxito');
    router.push('/dashboard/posts');
  };

  const handleTitleChange = () => {
    let found = false;

    editor.state.doc.descendants(node => {
      if (found) return false; // no seguir bajando en el nodo
      if (node.type.name === 'heading' && node.attrs.level === 1) {
        if (node.textContent.trim().length > 0)
          setTitle(node.textContent.trim());
        found = true;
        return false;
      }
    });
  };

  useEffect(() => {
    handleTitleChange();
    editor.on('update', () => handleTitleChange());
    return () => {
      editor.off('update', () => handleTitleChange());
    };
  }, [editor]);

  return (
    <div
      className="flex flex-col justify-between gap-16 rounded-md border
        border-gray-300 bg-white p-3"
    >
      <div>
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block font-medium">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            className="w-full rounded border border-gray-300 p-1"
            onChange={e => setTitle(e.target.value)}
            onBlur={handleTitleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block font-medium">
            Slug
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full rounded border border-gray-300 p-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block font-medium">
            Miniatura
          </label>
          <input
            type="file"
            name="title"
            id="title"
            className="file:cursor-pointer file:bg-gray-200 file:p-0.5"
          />
        </div>
      </div>

      <div className="self-end">
        <button
          className={`${
            isNewPost ? 'bg-blue-500 text-white' : 'bg-yellow-300 text-black'
          }
            cursor-pointer p-1 px-3 text-right disabled:bg-blue-400`}
          // disabled={isSaving}
          onClick={handleSave}
        >
          {isNewPost ? 'Guardar' : 'Actualizar'}
        </button>
      </div>
    </div>
  );
};

export default PostSummary;
