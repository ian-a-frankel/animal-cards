import './App.css';
import Login from  './pages/Login.js'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {useState, useEffect, useRef} from "react"
import Home from './Home.js';
import Gameplay from './pages/gameplay.js'
import HighScores from './pages/highscores.js';

function App() {

 const playerName = useRef('')

 const routes = [
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: '/',
          element: <Login playerName={playerName}/>
        }
      ]
    },
    {
      path: "/play",
      element: <Gameplay playerName={playerName} />
    },
    {
      path: "/high-scores",
      element: <HighScores />
    }
  ]

  const router = createBrowserRouter(routes)

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );

}

export default App;