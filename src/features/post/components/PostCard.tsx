'use client';

import { deletePost } from '@/actions';
import { usePostStore } from '@/stores/post-store';
import { useRouter } from 'next/navigation';
import { GoTrash } from 'react-icons/go';
import { toast } from 'react-toastify';

type PostCardProps = {
  id: string;
  title: string | null;
};

const PostCard = ({ id, title }: PostCardProps) => {
  const router = useRouter();
  const draftId = usePostStore(state => state.draftId);
  const setDraftId = usePostStore(state => state.setDraftId);

  const handleRedirection = (draftId: string) => {
    setDraftId(draftId);
    router.push('/dashboard/posts/new');
  };

  const handleDelete = async (id: string) => {
    const resp = await deletePost(id);

    if (!resp.ok) {
      toast.error('Ocurrió un error tratando de eliminar el post');
      return;
    }

    if (draftId === id) setDraftId('');

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
