'use client';

import { deletePost } from '@/actions';
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { GoTrash } from 'react-icons/go';
import { toast } from 'react-toastify';

type PostCardProps = {
  id: string;
  title: string | null;
};

const PostCard = ({ id, title }: PostCardProps) => {
  const router = useRouter();

  const handleRedirection = (draftId: string) => {
    setCookie('post:draftId', draftId);
    router.push('/dashboard/posts/new');
  };

  const handleDelete = async (id: string) => {
    const resp = await deletePost(id);

    if (!resp.ok) {
      toast.error('Ocurrió un error tratando de eliminar el post');
      return;
    }

    const draftId = getCookie('post:draftId');
    if (draftId === id) deleteCookie('post:draftId');
    
    router.refresh();
  };

  return (
    <li key={id} className="group flex justify-between p-1">
      <p
        className="text-blue-500 hover:cursor-pointer"
        onClick={() => handleRedirection(id)}
      >
        {title ?? 'Sin título'}
      </p>
      <button
        className="invisible text-red-500 group-hover:visible
          hover:cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        <GoTrash size={18} className="" />
      </button>
    </li>
  );
};

export default PostCard;
