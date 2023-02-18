import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from './Page/errors/NotFound'
import Home from './Page/Home/Home'
import Login from './Page/Auth/Login'
import ChangePassWord from './Page/Auth/ChangePassword'
import Register from './Page/Auth/Register'
import DetailsUser from './Page/Auth/DetailsUser/DetailsUser'
import { fetchUserData } from './utils/Auth'
import { useUserData, USER_ACTION } from './Context'
import './App.scss';
import DetailsUserProfile from './Page/Auth/DetailsUser/DetailsUserProfile'
import DetailsUserPurchase from './Page/Auth/DetailsUser/DetailsUserPurchase'

function App() {
  const [, dispatchUser] = useUserData()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    fetchUserData()
      .then(data => {
        dispatchUser({ type: USER_ACTION.SET, payload: data })
        setIsFirstLoad(false)
      })
      .catch(error => {
        console.error(error.message)
        setIsFirstLoad(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isFirstLoad) return null
  else return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/change-password' element={<ChangePassWord />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<DetailsUser />}>
          {/* Nest Route default by React Router DOM */}
          <Route index element={<DetailsUserProfile />} />
          <Route path='purchase' element={<DetailsUserPurchase />} />
        </Route>
        {/* {DetailsUser()} */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}



export default App;
