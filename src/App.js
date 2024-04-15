
import { Link } from 'react-router-dom';
import { Game } from './components/game';
import { Routes, Route } from 'react-router-dom'
import { GameServer } from './components/gameServer';

export function App() {
  return (
    <>
    <Routes>
      <Route path="/"
        element={
            <Game />
        } />
      <Route path="/server"
        element={
            <GameServer />
        } />

        {/* <Link to={"/server"}>Server</Link> */}
        {/* <Game /> */}
    </Routes>
    </>
  );
}

