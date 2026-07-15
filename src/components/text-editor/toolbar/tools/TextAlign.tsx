import {
  PiTextAlignCenter,
  PiTextAlignLeft,
  PiTextAlignRight
} from 'react-icons/pi';
import ToolBarButton from '../components/ToolbarButton';
import type { ToolProps } from '../../types';

const TextAlign = ({ editor, toolbarState, iconSize }: ToolProps) => {
  return (
    <>
      <ToolBarButton
        selected={toolbarState.isLeft}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <PiTextAlignLeft size={iconSize} className="text-gray-700" />
      </ToolBarButton>

      <ToolBarButton
        selected={toolbarState.isCenter}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <PiTextAlignCenter size={iconSize} className="text-gray-700" />
      </ToolBarButton>
      <ToolBarButton
        selected={toolbarState.isRight}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <PiTextAlignRight size={iconSize} className="text-gray-700" />
      </ToolBarButton>
    </>
  );
};

export default TextAlign;
