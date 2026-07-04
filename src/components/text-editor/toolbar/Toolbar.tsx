import type { Editor } from '@tiptap/core';
import { PiPrinter } from 'react-icons/pi';
import { updateMediaStatuses } from '@/actions/media/update-media-statuses';
import Headings from './groups/Headings';
import InsertImage from './groups/InsertImage';
import Links from './groups/Links';
import Lists from './groups/Lists';
import Marks from './groups/Marks';
import TextAlign from './groups/TextAlign';
import UndoRedo from './groups/UndoRedo';
import ToolBarButton from './ui/ToolbarButton';
import ToolBarGroup from './ui/ToolbarGroup';
import { useToolbarState } from './useToolbarState';

type MenuBarProps = {
  editor: Editor;
};

const groups = [UndoRedo, Marks, Headings, Lists, TextAlign, Links];

export const ToolBar = ({ editor }: MenuBarProps) => {
  const editorState = useToolbarState(editor);

  return (
    <>
      <div
        className="flex flex-wrap items-center justify-center divide-x
          divide-gray-200 border-b-2 border-b-gray-200 p-3"
      >
        {groups.map(Group => (
          <ToolBarGroup key={Group.name}>
            <Group editor={editor} toolbarState={editorState} />
          </ToolBarGroup>
        ))}

        <ToolBarGroup>
          <InsertImage editor={editor} />
          <ShowDocument editor={editor} />
        </ToolBarGroup>
      </div>
    </>
  );
};

const ShowDocument = ({ editor }: { editor: Editor }) => {
  return (
    <ToolBarButton
      onClick={async () => {
        const keys = new Set<string>();

        editor.state.doc.descendants(node => {
          if (node.type.name === 'image' && node.attrs['data-r2-key']) {
            keys.add(node.attrs['data-r2-key']);
          }
        });

        await updateMediaStatuses([...keys]);
      }}
      className="flex gap-2"
    >
      <PiPrinter size={24} className="text-gray-700" />
      Print
    </ToolBarButton>
  );
};
