import type { ToolbarState } from '@/types';
import type { Editor } from '@tiptap/core';
import {
  PiTextAlignCenter,
  PiTextAlignLeft,
  PiTextAlignRight
} from 'react-icons/pi';
import ToolBarButton from '../components/ToolbarButton';

const TextAlign = ({
  editor,
  toolbarState
}: {
  editor: Editor;
  toolbarState: ToolbarState;
}) => {
  return (
    <>
      <ToolBarButton
        selected={toolbarState.isLeft}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <PiTextAlignLeft size={24} className="text-gray-700" />
      </ToolBarButton>

      <ToolBarButton
        selected={toolbarState.isCenter}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <PiTextAlignCenter size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={toolbarState.isRight}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <PiTextAlignRight size={24} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default TextAlign;
