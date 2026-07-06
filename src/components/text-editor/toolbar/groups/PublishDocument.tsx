import type { Editor } from '@tiptap/core';
import { LiaSave } from 'react-icons/lia';
import { MdPublish } from "react-icons/md";
import { usePublishPost } from '@/hooks/usePublishPost';
import ToolBarButton from '../ui/ToolbarButton';

const PublishDocument = ({ editor }: { editor: Editor }) => {
  const postId = '0f2f61af-915d-422d-98f5-74583eab6941';
  const { publish } = usePublishPost(editor, postId);

  return (
    <ToolBarButton
      onClick={async () => {
        const resp = await publish();

        if (!resp.ok) {
          // TODO: FALTA RETROALIMENTACIÓN VISUAL AL USUARIO
          console.log('Ocurrió un error');
        }
      }}
      className="flex gap-1 bg-blue-500 hover:bg-blue-400"
    >
      {/* <MdPublish size={24} className="text-white" /> */}
      <LiaSave size={24} className="text-white" />
      <p className="text-white">Guardar</p>
    </ToolBarButton>
  );
};

export default PublishDocument;
