import { purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./Pages/NotFound";
import Play from "./Pages/Play/Play";
import SettingsPage from "./Pages/Settings/SettingsPage";
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
      {/* <GameComponent /> */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Play />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
