import type { MenuBarEditorState } from '@/types';
import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import ToolBarGroup from './ToolbarGroup';
import { toolBarStateSelector } from './toolBarStateSelector';
import Headings from './toolbar-groups/Hedings';
import InsertImage from './toolbar-groups/InsertImage';
import Links from './toolbar-groups/Links';
import Lists from './toolbar-groups/Lists';
import Marks from './toolbar-groups/Marks';
import TextAligns from './toolbar-groups/TextAligns';
import UndoRedo from './toolbar-groups/UndoRed';

type MenuBarProps = {
  editor: Editor;
};

export const ToolBar = ({ editor }: MenuBarProps) => {
  const editorState = useEditorState<MenuBarEditorState>({
    editor,
    selector: toolBarStateSelector
  });

  const MENU_GROUPS = [
    UndoRedo,
    Marks,
    TextAligns,
    Headings,
    Lists,
    Links
  ] as const;

  return (
    <>
      <div
        className="flex flex-wrap items-center justify-center divide-x
          divide-gray-200 border-b-2 border-b-gray-200 p-3"
      >
        {MENU_GROUPS.map(Group => (
          <ToolBarGroup key={Group.name}>
            <Group editor={editor} editorState={editorState} />
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
