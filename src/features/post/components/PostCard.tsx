'use client';

import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';

type PostCardProps = {
  id: string;
  title: string | null;
};

const PostCard = ({ id, title }: PostCardProps) => {
  const router = useRouter();

  const handleClick = (draftId: string) => {
    setCookie('post:draftId', draftId);
    router.push('/dashboard/posts/new');
  };

  return (
    <li key={id} className="p-1">
      <p
        className="text-blue-500 hover:cursor-pointer"
        onClick={() => handleClick(id)}
      >
        {title ?? 'Sin título'}
      </p>
    </li>
  );
};

export default PostCard;
