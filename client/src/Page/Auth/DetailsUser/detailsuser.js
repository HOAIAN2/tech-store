import "./detailsuser.scss"
import { Routes, Route } from 'react-router-dom'
import DetailsUser_profile from './detailsuser-profile';
import DetailsUser_Purchase from './detailsuser-purchase';

function DetailsUser() {
  return (
    <>
        <Route path='/details-user/profile' element={<DetailsUser_profile/>} />
        <Route path='/details-user/purchase' element={<DetailsUser_Purchase/>} />
    </>
        
  );
}



export default DetailsUser;
