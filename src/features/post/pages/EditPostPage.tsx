'use client';

import { useSearchParams } from 'next/navigation';
import EditPostContent from './EditPostContent';

const EditPostPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  if (!postId) return <p>No se especificó un post.</p>;

  return <EditPostContent postId={postId} />;
};

export default EditPostPage;
