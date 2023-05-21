import { baseIMG } from "../../utils/api-config"
import './PopupSuccess.scss'

function PopupSuccess({ message, setShowPopup }) {
    return (
        <div className='popup-succcess'>
            <div className="popup">
                <div className="popup-content">
                    <div className="imgbox">
                        <img src={`${baseIMG}orther/checked.png`} className="img" alt=""></img>
                    </div>
                    <div className="title">
                        <h3>Success!</h3>
                    </div>
                    <p className="para">{message}</p>
                    <div action="">
                        <button onClick={() => { setShowPopup(false) }}>OKAY</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupSuccess