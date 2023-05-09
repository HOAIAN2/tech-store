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
import ProductPage from './Page/Products/ProductPage'
import Search from './Page/search/search'
import Order from './Page/order/order.js'

function App() {
  const [user, dispatchUser] = useUserData()
  // console.log(user)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  useEffect(() => {
    fetchUserData()
      .then(data => {
        dispatchUser({ type: USER_ACTION.SET, payload: data })
        setIsFirstLoad(false)
      })
      .catch(error => {
        if (error.message !== 'no token') console.error(error.message)
        setIsFirstLoad(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const items = document.querySelectorAll('.loading, .pre-load')
    if (isFirstLoad) return
    items.forEach(node => { node.remove() })
  }, [isFirstLoad])
  if (isFirstLoad) return null
  else
    return (
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
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/search?' element={<Search />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </div>
    );
}



export default App;
