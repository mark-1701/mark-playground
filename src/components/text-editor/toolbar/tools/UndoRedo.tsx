import type { ToolbarState } from '@/types';
import type { Editor } from '@tiptap/core';
import { PiArrowArcLeft, PiArrowArcRight } from 'react-icons/pi';
import ToolBarButton from '../components/ToolbarButton';

const UndoRedo = ({
  editor,
  toolbarState
}: {
  editor: Editor;
  toolbarState: ToolbarState;
}) => {
  return (
    <>
      <ToolBarButton
        disabled={!toolbarState.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <PiArrowArcLeft
          size={24}
          className={toolbarState.canUndo ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
      <ToolBarButton
        disabled={!toolbarState.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <PiArrowArcRight
          size={24}
          className={toolbarState.canRedo ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
    </>
  );
};

export default UndoRedo;
