import { Routes, Route } from 'react-router-dom'
import NotFound from './Page/errors/NotFound'
import Home from './Page/Home/Home'
import './App.scss';
import Home_layout from './Layout/Home_layout/Home_layout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home_layout> <Home /> </Home_layout>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
