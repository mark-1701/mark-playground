import { MenuBarEditorState } from '@/types';
import type { Editor } from '@tiptap/core';
import { IoChevronDownOutline } from 'react-icons/io5';
import { PiTextHOne } from 'react-icons/pi';
import ToolBarButton from '../ToolbarButton';

const Headings = ({
  editor,
  editorState
}: {
  editor: Editor;
  editorState: MenuBarEditorState;
}) => {
  return (
    <div className="group relative">
      <div className="flex items-center rounded p-1 hover:bg-gray-200">
        <PiTextHOne size={24} className="text-gray-700" />
        <IoChevronDownOutline size={10} className="self-end text-gray-700" />
      </div>

      <div
        className="invisible absolute top-full z-10 w-[80px] bg-white p-2
          shadow-lg group-hover:visible"
      >
        <ToolBarButton
          selected={editorState.isHeading1}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          Título 1
        </ToolBarButton>
        <ToolBarButton
          selected={editorState.isHeading2}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          Título 2
        </ToolBarButton>
        <ToolBarButton
          selected={editorState.isHeading3}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          Título 3
        </ToolBarButton>
        <ToolBarButton
          selected={editorState.isHeading4}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          Título 4
        </ToolBarButton>
        <ToolBarButton
          selected={editorState.isHeading5}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          Título 5
        </ToolBarButton>
        <ToolBarButton
          selected={editorState.isHeading6}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          Título 6
        </ToolBarButton>
      </div>
    </div>
  );
};

export default Headings;
