import { Link } from 'react-router-dom'
import { logout } from '../../utils/Auth'
import { useUserData } from '../../Context'
import './Account.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons"
import languages from './Languages/Account.json'

function Account() {
    // Fetch user Data when app first load
    let language = languages.en
    if (navigator.language === 'vi') language = languages.vi
    const [user] = useUserData()
    function handleLogout() {
        logout()
            .then(data => {
                console.log(data)
                localStorage.clear()
                window.location.pathname = '/'
            })
            .catch(error => {
                alert(error.message)
            })
    }
    if (user) return (
        <div className='header-account logon'>
            <div className='drop-list-main'>
                <FontAwesomeIcon icon={faUser} />
                <span>{user.username}</span>
                <div className='drop-list-item'>
                    <span><Link to='/profile'>{language.accountInfo}</Link></span>
                    <span><Link to='/change-password'>{language.changePassword}</Link></span>
                    <span onClick={handleLogout}><Link to='#'>{language.logout}</Link></span>
                </div>
            </div>
        </div>
    )
    else return (
        <div className='header-account'>
            <Link className='login-btn' to='/login'>
                <span>{language.login}</span>
            </Link>
            {/* <p>/</p> */}
            <Link className='register-btn' to='/register'>
                <span>{language.register}</span>
            </Link>
        </div>
    )
}

export default Account