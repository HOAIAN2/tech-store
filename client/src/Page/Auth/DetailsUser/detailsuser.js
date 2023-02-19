import "./DetailsUser.scss"
import { Outlet } from 'react-router-dom'
import Header from "../../../components/header/Header";

function DetailsUser() {
  return (
    <>
      <Header />
      <Outlet />
      {/* Dùng Outlet để Render component con trên route, dùng giống như Wrap Layout hồi đầu */}
    </>
  );
}



export default DetailsUser;
