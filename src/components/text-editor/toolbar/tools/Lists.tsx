import { PiListBullets, PiListNumbers } from 'react-icons/pi';
import ToolBarButton from '../components/ToolbarButton';
import type { ToolProps } from '../../types';

const Lists = ({ editor, toolbarState, iconSize }: ToolProps) => {
  return (
    <>
      <ToolBarButton
        selected={toolbarState.isBulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <PiListBullets size={iconSize} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={toolbarState.isOrderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <PiListNumbers size={iconSize} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default Lists;
