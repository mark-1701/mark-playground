import type { Editor } from '@tiptap/core';
import { LiaSave } from 'react-icons/lia';
import { usePublishPost } from '@/hooks/usePublishPost';
import ToolBarButton from '../components/ToolbarButton';

const PublishDocument = ({ editor }: { editor: Editor }) => {
  const postId = '0f2f61af-915d-422d-98f5-74583eab6941';
  const { publish, isPublishing } = usePublishPost();

  return (
    <>
      {/* {true && (
        <div
          className="fixed top-1/2 left-1/2 flex -translate-1/2 flex-col
            items-center justify-center gap-2 rounded-md border border-gray-200
            bg-white p-2 shadow-lg"
        >
          <p className="text-gray-800">cargando...</p>
        </div>
      )} */}

      <ToolBarButton
        onClick={() => publish(editor, postId)}
        disabled={isPublishing}
        className="flex gap-1 bg-blue-500 hover:bg-blue-400 disabled:opacity-70"
      >
        <LiaSave size={24} className="text-white" />
        <p className="text-white">Guardar</p>
      </ToolBarButton>
    </>
  );
};

export default PublishDocument;
