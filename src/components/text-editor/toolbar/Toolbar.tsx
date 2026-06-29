import type { ToolbarState } from '@/types';
import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import ToolBarGroup from './ToolbarGroup';
import { toolBarStateSelector } from './toolBarStateSelector';
import Headings from './toolbar-groups/Headings';
import InsertImage from './toolbar-groups/InsertImage';
import Links from './toolbar-groups/Links';
import Lists from './toolbar-groups/Lists';
import Marks from './toolbar-groups/Marks';
import TextAligns from './toolbar-groups/TextAligns';
import UndoRedo from './toolbar-groups/UndoRedo';

type MenuBarProps = {
  editor: Editor;
};

const groups = [UndoRedo, Marks, TextAligns, Headings, Lists, Links];

export const ToolBar = ({ editor }: MenuBarProps) => {
  const editorState = useEditorState<ToolbarState>({
    editor,
    selector: toolBarStateSelector
  });

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
    >
      Mostrar
    </button>
  );
};
