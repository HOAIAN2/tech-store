import { Routes, Route } from 'react-router-dom'
import NotFound from './components/errors/NotFound'
import Home from './components/Home'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
