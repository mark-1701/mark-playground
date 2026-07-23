'use client';

import { savePost } from '@/actions';
import { Post } from '@/app/generated/prisma/client';
import type { Editor } from '@tiptap/react';
import { deleteCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getMediaKeys, getTextEditorContent } from '../utils';

type PostSummaryProps = {
  editor: Editor;
  post: Post | null;
};

type Inputs = {
  title: string;
};

const PostSummary = ({ editor, post }: PostSummaryProps) => {
  const router = useRouter();
  const isNewPost = post?.status === 'DRAFT';

  // todo: bloquear el botón cuando se esta haciendo la consulta
  // const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const resp = await savePost(
      post?.id ?? '',
      data.title,
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

  const syncTitleFromEditor = () => {
    let found = false;
    editor.state.doc.descendants(node => {
      if (found) return false; // no seguir bajando en el nodo
      if (node.type.name === 'heading' && node.attrs.level === 1) {
        if (node.textContent.trim().length > 0)
          setValue('title', node.textContent.trim());
        found = true;
        return false;
      }
    });
  };

  useEffect(() => {
    const onUpdate = syncTitleFromEditor;
    onUpdate();
    editor.on('update', onUpdate);
    return () => {
      editor.off('update', onUpdate);
    };
  }, [editor]);

  const { onBlur: onTitleBlur, ...titleField } = register('title', {
    required: true
  });

  return (
    <div
      className="w-90 gap-24 rounded-md border border-gray-300 bg-white p-4
        px-4"
    >
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-medium">
              Título
            </label>
            <input
              {...titleField}
              onBlur={e => {
                onTitleBlur(e); // onBlur react-hook-form
                syncTitleFromEditor(); // tu lógica extra
              }}
              className="mb-1 w-full rounded border border-gray-300 p-1"
            />
            {errors.title && (
              <span className="ml-1 text-sm text-red-500">
                El título es obligatorio
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="miniatura" className="mb-2 block font-medium">
              Miniatura
            </label>
            <input
              type="file"
              name="miniatura"
              id="miniatura"
              className="file:cursor-pointer file:bg-gray-200 file:p-0.5"
            />
          </div>
        </div>

        <input
          type="submit"
          className={`${
            isNewPost ? 'bg-blue-500 text-white' : 'bg-yellow-300 text-black'
          }
            cursor-pointer self-end p-1 px-3 text-right disabled:bg-yellow-200`}
          value={isNewPost ? 'Guardar' : 'Actualizar'}
        />
      </form>
    </div>
  );
};

export default PostSummary;
