import { Routes, Route } from 'react-router-dom'
import NotFound from './Page/Errors/NotFound'
import Home from './Page/Home/Home'
import Login from './Page/Auth/Login'
import ChangePassWord from './Page/Auth/ChangePassword'
import Register from './Page/Auth/Register'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/change-password' element={<ChangePassWord />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
