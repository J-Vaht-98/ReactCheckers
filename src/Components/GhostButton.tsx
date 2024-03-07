import { FC } from "react";

interface GhostButtonProps {
  row: Number;
  col: Number;
}

const GhostButton: FC<GhostButtonProps> = ({ row, col }) => {
  return <div className="button highlight"></div>;
};

export default GhostButton;
