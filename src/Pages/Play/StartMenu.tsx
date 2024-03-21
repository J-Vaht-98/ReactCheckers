import { Computer, Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FC } from "react";
import { gameActions } from "../../slices/gameSlice";
import { useAppDispatch } from "../../store";

interface StartMenuProps {}

const StartMenu: FC<StartMenuProps> = ({}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <div className="flex flex-col max-w-xs gap-1 ">
        <Button
          variant="contained"
          onClick={() => dispatch(gameActions.startGame("local-mp"))}
        >
          <div className=" min-w-64 p-2">
            <Person className="mr-4" />
            <span className="text-xs align-bottom">vs</span>
            <Person className="ml-4" />
          </div>
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(gameActions.startGame("computer"))}
        >
          <div className=" min-w-48 p-2">
            <Person className="mr-4" />
            <span className="text-xs align-bottom">vs</span>
            <Computer className="ml-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default StartMenu;
