import type { Editor } from '@tiptap/core';
import Headings from './groups/Headings';
import InsertImage from './groups/InsertImage';
import Links from './groups/Links';
import Lists from './groups/Lists';
import Marks from './groups/Marks';
import PublishDocument from './groups/PublishDocument';
import TextAlign from './groups/TextAlign';
import UndoRedo from './groups/UndoRedo';
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
        className="sticky top-0 z-10 flex h-11 items-center justify-between
          border-b-2 border-b-gray-200 bg-white p-3"
      >
        <div className="flex divide-x divide-gray-200">
          {groups.map(Group => (
            <ToolBarGroup key={Group.name}>
              <Group editor={editor} toolbarState={editorState} />
            </ToolBarGroup>
          ))}
          <ToolBarGroup>
            <InsertImage editor={editor} />
          </ToolBarGroup>
        </div>

        <PublishDocument editor={editor} />
      </div>
    </>
  );
};
