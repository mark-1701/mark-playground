'use client';

import { savePost } from '@/actions';
import { usePostStore } from '@/stores/post-store';
import { type Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  getTextEditorContent,
  getTextEditorMediaKeys,
  getTextEditorTitle
} from '../utils';

type Inputs = {
  title: string;
};

const PostSummary = ({ editor }: { editor: Editor }) => {
  const router = useRouter();

  // acceder al state de zustand del post en borrador
  const draftPostId = usePostStore(state => state.id);
  const draftPostTitle = usePostStore(state => state.title);
  const setDraftPostTitle = usePostStore(state => state.setTitle);
  const isNewPost = usePostStore(state => state.status) === 'DRAFT';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const resp = await savePost(
      draftPostId,
      data.title,
      getTextEditorContent(editor),
      getTextEditorMediaKeys(editor)
    );

    if (!resp.ok) {
      toast.error('Ocurrió un error guardando el post');
      return;
    }

    toast.success('Artículo guardado con éxito');
    router.push('/dashboard/posts');
  };

  // cambiar el input title cuando ocurra un cambio en el state de title
  useEffect(
    () => setValue('title', draftPostTitle ?? ''),
    [draftPostTitle, setValue]
  );

  const { onBlur: onTitleBlur, ...titleField } = register('title', {
    required: true
  });

  return (
    <div className="w-90 rounded-md border border-gray-300 bg-white p-4 px-4">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-medium">
              Título
            </label>
            <input
              {...titleField}
              onBlur={e => {
                onTitleBlur(e);
                const resolvedTitle = getTextEditorTitle(
                  editor.state.doc,
                  e.target.value
                );
                setDraftPostTitle(resolvedTitle);
                setValue('title', resolvedTitle);
              }}
              className="mb-1 w-full rounded border border-gray-300 p-1"
            />
            {errors.title && (
              <span className="ml-1 text-sm text-red-500">
                El título es obligatorio
              </span>
            )}
          </div>

          {/* <div className="mb-4">
            <label htmlFor="miniatura" className="mb-2 block font-medium">
              Miniatura
            </label>
            <input
              type="file"
              name="miniatura"
              id="miniatura"
              className="file:cursor-pointer file:bg-gray-200 file:p-0.5"
            />
          </div> */}
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

// todo: bloquear el botón cuando se esta haciendo la consulta
// const [isSaving, setIsSaving] = useState(false);
