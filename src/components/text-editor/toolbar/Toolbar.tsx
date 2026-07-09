import type { Editor } from '@tiptap/core';
import { useToolbarState } from '../hooks/useToolbarState';
import ToolBarGroup from './components/ToolbarGroup';
import Headings from './tools/Headings';
import InsertImage from './tools/InsertImage';
import Links from './tools/Links';
import Lists from './tools/Lists';
import Marks from './tools/Marks';
import PublishDocument from './tools/PublishDocument';
import TextAlign from './tools/TextAlign';
import UndoRedo from './tools/UndoRedo';

type MenuBarProps = {
  editor: Editor;
};

const tools = [UndoRedo, Marks, Headings, Lists, TextAlign, Links];

export const ToolBar = ({ editor }: MenuBarProps) => {
  const editorState = useToolbarState(editor);

  return (
    <>
      <div
        className="sticky top-0 z-10 flex h-11 items-center justify-between
          border-b-2 border-b-gray-300 bg-white p-3"
      >
        <div className="flex divide-x divide-gray-200">
          {tools.map(Tool => (
            <ToolBarGroup key={Tool.name}>
              <Tool editor={editor} toolbarState={editorState} />
            </ToolBarGroup>
          ))}
          <ToolBarGroup>
            <InsertImage editor={editor} />
            <PublishDocument editor={editor} />
          </ToolBarGroup>
        </div>
      </div>
    </>
  );
};
