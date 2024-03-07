import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import GameComponent from "./Components/GameComponent";
import store from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});
const App = ({}) => {
  return (
    <Provider store={store}>
      <GameComponent />
      {/* <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/play" element={<Play />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/multiplayer" element={<MultiPlayer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter> */}
    </Provider>
  );
};

export default App;
