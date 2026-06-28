import { MenuBarEditorState } from '@/types';
import type { Editor } from '@tiptap/core';
import { PiArrowArcLeft, PiArrowArcRight } from 'react-icons/pi';
import ToolBarButton from '../ToolbarButton';

const UndoRedo = ({
  editor,
  editorState
}: {
  editor: Editor;
  editorState: MenuBarEditorState;
}) => {
  return (
    <>
      <ToolBarButton
        disabled={!editorState.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <PiArrowArcLeft
          size={24}
          className={editorState.canUndo ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
      <ToolBarButton
        disabled={!editorState.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <PiArrowArcRight
          size={24}
          className={editorState.canRedo ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
    </>
  );
};

export default UndoRedo;
