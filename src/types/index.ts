export type ToolbarState = {
  isBold: boolean;
  isItalic: boolean;
  isStrike: boolean;
  isUnderline: boolean;
  isHighlight: boolean;

  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isHeading4: boolean;
  isHeading5: boolean;
  isHeading6: boolean;

  isLeft: boolean;
  isCenter: boolean;
  isRight: boolean;

  isBulletList: boolean;
  isOrderedList: boolean;

  canUndo: boolean;
  canRedo: boolean;

  isLink: boolean;
};
