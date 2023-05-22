import { baseIMG } from "../../utils/api-config"
import './PopupSuccess.scss'

function PopupSuccess({ type, message, setShowPopup }) {
    let url = ''
    if (type === 'error') url = `${baseIMG}other/cancel.png`
    else url = `${baseIMG}other/checked.png`
    return (
        <div className='popup-succcess'>
            <div className="popup">
                <div className="popup-content">
                    <div className="imgbox">
                        <img src={url} alt=""></img>
                    </div>
                    <div className={type === 'error' ? 'title error' : 'title'}>
                        <h3>{type === 'error' ? 'Error!' : 'Success!'}</h3>
                    </div>
                    <p className="para">{message}</p>
                    <div>
                        <button
                            className={type === 'error' ? 'error' : 'success'}
                            onClick={() => { setShowPopup(false) }}>OKAY</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupSuccess