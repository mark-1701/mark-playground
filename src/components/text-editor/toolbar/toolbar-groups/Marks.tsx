import type { ToolbarState } from '@/types';
import type { Editor } from '@tiptap/core';
import { IconType } from 'react-icons/lib';
import {
  PiHighlighter,
  PiTextB,
  PiTextItalic,
  PiTextStrikethrough,
  PiTextUnderline
} from 'react-icons/pi';
import ToolBarButton from '../ToolbarButton';

type MarkConfig = {
  key: keyof ToolbarState;
  icon: IconType;
  toggle: (editor: Editor) => void;
};

const marks: MarkConfig[] = [
  {
    key: 'isBold',
    icon: PiTextB,
    toggle: e => e.chain().focus().toggleBold().run()
  },
  {
    key: 'isItalic',
    icon: PiTextItalic,
    toggle: e => e.chain().focus().toggleItalic().run()
  },
  {
    key: 'isStrike',
    icon: PiTextStrikethrough,
    toggle: e => e.chain().focus().toggleStrike().run()
  },
  {
    key: 'isUnderline',
    icon: PiTextUnderline,
    toggle: e => e.chain().focus().toggleUnderline().run()
  },
  {
    key: 'isHighlight',
    icon: PiHighlighter,
    toggle: e => e.chain().focus().toggleHighlight().run()
  }
];

const Marks = ({
  editor,
  toolbarState
}: {
  editor: Editor;
  toolbarState: ToolbarState;
}) => {
  return (
    <>
      {marks.map(({ key, icon: Icon, toggle }) => (
        <ToolBarButton
          key={key}
          selected={toolbarState[key] as boolean}
          onClick={() => toggle(editor)}
        >
          <Icon size={24} className="text-gray-700" />
        </ToolBarButton>
      ))}
    </>
  );
};

export default Marks;
