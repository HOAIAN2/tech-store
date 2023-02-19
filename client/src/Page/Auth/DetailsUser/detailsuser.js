import "./DetailsUser.scss"
import { Navigate, Outlet } from 'react-router-dom'
import Header from "../../../components/header/Header";
import { useUserData } from "../../../Context";

function DetailsUser() {
  const [user] = useUserData()
  if (!user) return <Navigate to='/login' />
  return (
    <>
      <Header />
      <Outlet />
      {/* Dùng Outlet để Render component con trên route, dùng giống như Wrap Layout hồi đầu */}
    </>
  );
}



export default DetailsUser;
