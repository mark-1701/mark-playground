import { cn } from "@/utils/cn";

export const ToolBarButton = ({
  selected,
  className,
  disabled,
  onClick,
  children
}: {
  selected?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded p-1 hover:bg-gray-100',
        {
          'bg-gray-200': selected
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default ToolBarButton;
