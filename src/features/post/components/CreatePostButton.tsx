'use client';

import { createPost } from '@/actions';
import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { checkDraftPost } from '@/actions/post/check-draft-post';
import { initialPostData } from '../data/initialPostData';

const CreatePostButton = () => {
  const router = useRouter();

  // todo: bloquear botón cuando se esta haciendo una consulta
  // const [isCreating, setIsCreating] = useState(false);

  const handleCreatePost = async () => {
    // abrir último post borrador
    const checkResp = await checkDraftPost();

    if (!checkResp.ok) {
      toast.error('Ocurrió un error buscando el último post borrador');
      return;
    }

    if (
      checkResp.data &&
      confirm('¿Deseas continuar con el post borrador anterior?')
    ) {
      openPost(checkResp.data);
      return;
    }

    // crear un nuevo post
    const createResp = await createPost(
      initialPostData.title,
      initialPostData.content
    );

    if (!createResp.ok) {
      toast.error('Ocurrió un error creando un nuevo artículo');
      return;
    }

    openPost(createResp.data);
  };

  const openPost = (postId: string) => {
    setCookie('post:draftId', postId);
    router.push('/dashboard/posts/new');
  };

  return (
    <button
      // disabled={isCreating}
      className="cursor-pointer rounded bg-blue-500 p-1 px-2 text-white
        disabled:bg-blue-400"
      onClick={handleCreatePost}
    >
      Crear nuevo post
    </button>
  );
};

export default CreatePostButton;
