export type TerminalHeaderProps = {
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
};

export type TerminalLogListProps = {
  logs: string[];
};
