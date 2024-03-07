import { GameSettings } from "./types/game.types";
export const defaultSettings: GameSettings = {
  game: {
    playComputer: true,
    forcedTakes: true,
  },
  style: {
    blackSquare: "rgba(0,0,0,0.7)",
    whiteSquare: "rgba(0,0,0,0)",
    buttons: {
      colors: [
        "rgba(0,0,0,1)",
        "rgba(255,0,0,1)",
        "rgba(0,255,0,1)",
        "rgba(0,0,255,1)",
      ],
    },
  },
};
export const defaultBoard = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
];
