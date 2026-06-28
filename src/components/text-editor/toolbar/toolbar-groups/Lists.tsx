import { MenuBarEditorState } from '@/types';
import type { Editor } from '@tiptap/core';
import { PiListBullets, PiListNumbers } from 'react-icons/pi';
import ToolBarButton from '../ToolbarButton';

const Lists = ({
  editor,
  editorState
}: {
  editor: Editor;
  editorState: MenuBarEditorState;
}) => {
  return (
    <>
      <ToolBarButton
        selected={editorState.isBulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <PiListBullets size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={editorState.isOrderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <PiListNumbers size={24} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default Lists;
