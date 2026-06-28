import { MenuBarEditorState } from '@/types';
import type { Editor } from '@tiptap/core';
import {
  PiHighlighter,
  PiTextB,
  PiTextItalic,
  PiTextStrikethrough,
  PiTextUnderline
} from 'react-icons/pi';
import ToolBarButton from '../ToolbarButton';

const Marks = ({
  editor,
  editorState
}: {
  editor: Editor;
  editorState: MenuBarEditorState;
}) => {
  return (
    <>
      <ToolBarButton
        selected={editorState.isBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <PiTextB size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={editorState.isItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <PiTextItalic size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={editorState.isStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <PiTextStrikethrough size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={editorState.isUnderline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <PiTextUnderline size={24} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={editorState.isHighlight}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <PiHighlighter size={24} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default Marks;
