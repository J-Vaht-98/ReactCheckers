import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound';
import Game from './Game/Game';
const gameState = [
  [2,0,2,0,2,0,2,0],
  [0,2,0,2,0,2,0,2],
  [2,0,2,0,2,0,2,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
]
const gameState2 = [ //this just a dummy gamestate for debugging
  // [0,0,0,0,0,0,0,0],
  [2,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0],
  [0,0,0,1,0,0,0,0],
  [0,0,1,0,0,0,0,0],
  [0,0,0,1,0,1,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]


const game = new Game(gameState,{
  aiPlayerEnabled:true
}) 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/play" element={<App game={game} />} />
      <Route path='*' element={<NotFound />}/>
      </Routes>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
