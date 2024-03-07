import Box from "@mui/material/Box";
import { FC, ReactNode } from "react";

interface GameContainerProps {
  children: ReactNode;
}

const GameContainer: FC<GameContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        boxSizing: "content-box", //prevent the board divs from overflowing borders
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="main"
      maxWidth="s"
    >
      {children}
    </Box>
  );
};

export default GameContainer;
