import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound";
import Play from "./Pages/Play/Play";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {purple} from '@mui/material/colors'

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
    palette:{
        primary:{
            main:purple[500]
        }
    },
    Square:{
        blackSquare:purple[500]
    }
})
root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/play" element={<Play />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ThemeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
