'use client';

import { createPost } from '@/actions';
import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useCreatePost = () => {
  const router = useRouter();

  const create = async () => {
    const resp = await createPost();

    if (!resp.ok) {
      toast.error('Error creando el nuevo artículo');
      return;
    }

    // TODO: validar cookie
    setCookie('post:draftId', resp.data);

    router.push('/dashboard/posts/new');
  };

  return { create };
};
