import type { ToolbarState } from '@/types';
import type { Editor } from '@tiptap/core';
import type { Level } from '@tiptap/extension-heading';
import { IoChevronDownOutline } from 'react-icons/io5';
import { PiTextHOne } from 'react-icons/pi';
import ToolBarButton from '../ui/ToolbarButton';

type ToolbarStateKeys = keyof ToolbarState;

const headingLevels: Level[] = [1, 2, 3, 4, 5, 6];

const Headings = ({
  editor,
  toolbarState
}: {
  editor: Editor;
  toolbarState: ToolbarState;
}) => {
  return (
    <div className="group relative">
      <div className="flex items-center rounded p-1 hover:bg-gray-200">
        <PiTextHOne size={24} className="text-gray-700" />
        <IoChevronDownOutline size={10} className="self-end text-gray-700" />
      </div>

      <div
        className="invisible absolute top-full z-10 w-[80px] bg-white
          text-center shadow-lg group-hover:visible"
      >
        {headingLevels.map(level => (
          <ToolBarButton
            key={level}
            selected={toolbarState[`isHeading${level}` as ToolbarStateKeys]}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: level }).run()
            }
          >
            Título {level}
          </ToolBarButton>
        ))}
      </div>
    </div>
  );
};

export default Headings;
