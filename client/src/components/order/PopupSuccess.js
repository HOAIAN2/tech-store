import './PopupSuccess.scss'

function PopupSuccess({ type, message, setShowPopup }) {
    return (
        <div className='popup-succcess'>
            <div className="popup">
                <div className="popup-content">
                    <div className="imgbox">
                        {
                            type !== 'error' ?
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="232.000000pt" height="232.000000pt" viewBox="0 0 232.000000 232.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,232.000000) scale(0.100000,-0.100000)"
                                        fill="#32ba7c" stroke="none">
                                        <path d="M995 2310 c-101 -16 -236 -58 -333 -105 -403 -193 -662 -602 -662
                                -1045 0 -301 125 -603 338 -814 107 -106 179 -158 307 -221 453 -225 977 -139
                                1333 217 454 454 455 1181 1 1636 -146 146 -338 256 -539 307 -118 30 -335 42
                                -445 25z m1019 -668 c89 -52 105 -175 33 -250 -76 -80 -1001 -919 -1030 -934
                                -38 -22 -108 -23 -145 -4 -41 22 -559 547 -571 579 -48 126 66 255 192 218 35
                                -11 78 -49 249 -219 l208 -206 32 31 c18 17 221 202 451 412 273 248 429 384
                                450 390 39 12 93 5 131 -17z"/>
                                    </g>
                                </svg>
                                :
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="232.000000pt" height="232.000000pt" viewBox="0 0 232.000000 232.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,232.000000) scale(0.100000,-0.100000)"
                                        fill="red" stroke="none">
                                        <path d="M995 2310 c-101 -16 -236 -58 -333 -105 -403 -193 -662 -602 -662
                                    -1045 0 -301 125 -603 338 -814 107 -106 179 -158 307 -221 453 -225 977 -139
                                    1333 217 454 454 455 1181 1 1636 -146 146 -338 256 -539 307 -118 30 -335 42
                                    -445 25z m-302 -534 c20 -8 113 -99 236 -230 112 -119 205 -216 206 -216 1 0
                                    94 97 206 216 122 131 217 222 236 230 75 32 158 1 193 -71 44 -90 31 -112
                                    -212 -369 -114 -122 -208 -224 -208 -229 0 -4 86 -98 191 -209 106 -111 200
                                    -216 210 -233 24 -38 24 -100 1 -145 -37 -70 -142 -99 -206 -57 -13 9 -108
                                    105 -212 214 -104 109 -193 198 -199 198 -5 0 -94 -88 -196 -195 -217 -228
                                    -208 -220 -254 -230 -77 -17 -166 39 -181 114 -13 74 3 99 216 325 110 117
                                    200 215 200 218 0 6 -52 63 -266 290 -115 122 -155 171 -163 200 -32 119 89
                                    227 202 179z"/>
                                    </g>
                                </svg>
                        }
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