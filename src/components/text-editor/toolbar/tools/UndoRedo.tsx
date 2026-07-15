import { PiArrowArcLeft, PiArrowArcRight } from 'react-icons/pi';
import ToolBarButton from '../components/ToolbarButton';
import { ToolProps } from '../../types';

const UndoRedo = ({ editor, toolbarState, iconSize }: ToolProps ) => {
  return (
    <>
      <ToolBarButton
        disabled={!toolbarState.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <PiArrowArcLeft
          size={iconSize}
          className={toolbarState.canUndo ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
      <ToolBarButton
        disabled={!toolbarState.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <PiArrowArcRight
          size={iconSize}
          className={toolbarState.canRedo ? 'text-gray-700' : 'text-gray-300'}
        />
      </ToolBarButton>
    </>
  );
};

export default UndoRedo;
