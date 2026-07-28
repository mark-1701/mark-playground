'use client';

import { createPost } from '@/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { checkDraftPost } from '@/actions/post/check-draft-post';
import { replaceDraftPost } from '@/actions/post/replace-draft-post';
import Dialog from '@/components/Dialog';
import { initialPostData } from '../data/initialPostData';

const CreatePostButton = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  // * handler del botón

  const handleCheckDraftPost = async () => {
    const resp = await checkDraftPost();

    if (!resp.ok) {
      toast.error('Ocurrió un error buscando el último post borrador');
      return;
    }

    if (resp.data) {
      setCurrentPostId(resp.data);
      setVisible(true);
      return;
    }

    createNewPost();
  };

  // * hanlders de los botones footer del dialog

  const continueDraft = () => {
    if (!currentPostId) return;
    setVisible(false);
    openPost(currentPostId);
  };

  const discardDraft = async () => {
    if (!currentPostId) return;
    setVisible(false);

    const resp = await replaceDraftPost(
      currentPostId,
      initialPostData.title,
      initialPostData.content
    );

    if (!resp.ok) {
      toast.error('Ocurrió un error descartando el último borrador');
      return;
    }

    toast.success('Se creó el artículo con éxito');

    openPost(resp.data);
  };

  // * otras funcionas

  const createNewPost = async () => {
    const resp = await createPost(
      initialPostData.title,
      initialPostData.content
    );

    if (!resp.ok) {
      toast.error('Ocurrió un error creando un nuevo artículo');
      return;
    }

    toast.success('Se creó el artículo con éxito');

    openPost(resp.data);
  };

  const openPost = (postId: string) => {
    const params = new URLSearchParams({ postId });
    router.push(`/dashboard/posts/new?${params.toString()}`);
  };

  const footerContent = (
    <div className="flex justify-end gap-3">
      <button
        className="rounded border border-gray-300 p-2 text-gray-500
          hover:cursor-pointer"
        onClick={discardDraft}
      >
        Descartar
      </button>
      <button
        className="rounded bg-blue-500 p-2 text-white hover:cursor-pointer"
        onClick={continueDraft}
      >
        Aceptar
      </button>
    </div>
  );

  return (
    <div>
      <button
        className="cursor-pointer rounded bg-blue-500 p-1 px-2 text-white"
        onClick={handleCheckDraftPost}
      >
        Crear nuevo post
      </button>

      <Dialog
        header="Continuar con el borrador"
        visible={visible}
        footer={footerContent}
        onHide={() => setVisible(false)}
      >
        Se encontró un artículo anterior no terminado, <br />
        ¿Deseas continuar editandolo?
      </Dialog>
    </div>
  );
};

export default CreatePostButton;

// todo: bloquear botón cuando se esta haciendo una consulta
// const [isCreating, setIsCreating] = useState(false);
