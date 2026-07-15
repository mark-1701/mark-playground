import type { Level } from '@tiptap/extension-heading';
import { IoChevronDownOutline } from 'react-icons/io5';
import { PiTextH, PiTextHOne } from 'react-icons/pi';
import type { ToolbarState } from '../../types';
import type { ToolProps } from '../../types';
import ToolBarButton from '../components/ToolbarButton';

type ToolbarStateKeys = keyof ToolbarState;

const headingLevels: Level[] = [1, 2, 3, 4, 5, 6];

const Headings = ({ editor, toolbarState, iconSize }: ToolProps) => {
  return (
    <div className="group relative flex items-center">
      <div className="flex items-end rounded p-1 hover:bg-gray-200">
        <PiTextH size={iconSize} className="text-gray-700" />
        <IoChevronDownOutline size={10} className="text-gray-700" />
      </div>

      <div
        className="invisible absolute top-full z-20 w-19 bg-white py-2
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
