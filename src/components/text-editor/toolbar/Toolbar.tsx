import type { Editor } from '@tiptap/core';
import Headings from './groups/Headings';
import InsertImage from './groups/InsertImage';
import Links from './groups/Links';
import Lists from './groups/Lists';
import Marks from './groups/Marks';
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
    <button
      onClick={() => {
        console.log(editor.getJSON());
        console.log(editor.getHTML());
      }}
      className="flex items-center cursor-pointer"
    >
      Mostrar
    </button>
  );
};
