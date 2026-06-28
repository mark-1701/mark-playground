import { MenuBarEditorState } from '@/types';
import type { Editor } from '@tiptap/core';
import { PiTextAlignCenter, PiTextAlignLeft, PiTextAlignRight } from 'react-icons/pi';
import ToolBarButton from '../ToolbarButton';

const TextAligns = ({
  editor,
  editorState
}: {
  editor: Editor;
  editorState: MenuBarEditorState;
}) => {
  return (
    <>
      <ToolBarButton
        selected={editorState.isLeft}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <PiTextAlignLeft size={24} className="text-gray-700" />
      </ToolBarButton>

      <ToolBarButton
        selected={editorState.isCenter}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <PiTextAlignCenter size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={editorState.isRight}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <PiTextAlignRight size={24} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default TextAligns;