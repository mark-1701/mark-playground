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

  const draftPost = usePostStore(state => state.post);
  const updatePost = usePostStore(state => state.updatePost);
  // const draftPostIsDirty = usePostStore(state => state.post.isDirty);
  const isNewPost = usePostStore(state => state.post.status) === 'DRAFT';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const resp = await savePost(
      draftPost.id,
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
    () => setValue('title', draftPost.title ?? ''),
    [draftPost, setValue]
  );

  return (
    <div className="w-90 rounded-md border border-gray-300 bg-white p-4 px-4">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-medium">
              Título
            </label>
            <input
              {...register('title', { required: true })}
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

        <div className="flex justify-end gap-2">
          <button
            className="w-full bg-blue-500 p-1 text-white hover:cursor-pointer
              disabled:invisible"
            disabled={true}
          >
            Descartar cambios
          </button>

          <input
            type="submit"
            className={`${
              isNewPost ? 'bg-blue-500 text-white' : 'bg-yellow-300 text-black'
              } w-full cursor-pointer p-1 disabled:bg-yellow-200`}
            value={isNewPost ? 'Guardar' : 'Actualizar'}
          />
        </div>
      </form>
    </div>
  );
};

export default PostSummary;

// todo: bloquear el botón cuando se esta haciendo la consulta
// const [isSaving, setIsSaving] = useState(false);
