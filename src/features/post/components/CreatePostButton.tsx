'use client';

import { useCreatePost } from '../hooks/useCreatePost';

const CreatePostButton = () => {
  const { create } = useCreatePost();

  return (
    <button
      className="cursor-pointer rounded bg-gray-800 p-1 px-2 text-white"
      onClick={create}
    >
      Crear nuevo post
    </button>
  );
};

export default CreatePostButton;
