import { useEffect, useState } from "react"
import { getAddress, getBrands } from "../../utils/supplier/index"
import ItemSidebarSearchPage from "../render_item/ItemSidebarSearchPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"
import "./SearchContent.scss"



function SearchContent() {
    const [addDress, setAddress] = useState([])
    const [brands, setBrands] = useState([])
    const [indexToShow] = useState(5)

    useEffect(() => {
        getAddress()
            .then((rs) => {
                setAddress(rs)
            })
        getBrands()
            .then((rs) => {
                setBrands(rs)
            })
    }, [])


    return (
        <div className="wrap_search_content">
            <div className="sidebar_search_page">
                <nav className="wrap_sidebar_search_page">
                    <h3>
                        <FontAwesomeIcon icon={faList} />
                        Tìm Kiếm Theo
                    </h3>
                    <ul className="list_item_sidebar_search_page">
                        <li>
                            <div className="title_item_sidebar_list">Theo Địa Chỉ</div>
                            <div className="wrap_item_sidebar_search_item">
                                <ItemSidebarSearchPage arr={addDress} index={indexToShow} />
                            </div>
                            {/* {sidebaraddress.length > indexToShow ? <button onClick={renderitemwhenclickbtnmore}>Xem Thêm</button> : <></>} */}
                        </li>
                        <li>
                            <div className="title_item_sidebar_list">Theo Thương Hiệu</div>
                            <div className="wrap_item_sidebar_search_item">
                                <ItemSidebarSearchPage arr={brands} index={indexToShow} numberToShow={5} />
                            </div>
                            {/* {brands.length > indexToShow ? <button onClick={renderitemwhenclickbtnmore}>Xem Thêm</button> : <></>} */}
                        </li>
                        <li>
                            <div className="title_item_sidebar_list">Theo Đánh Giá</div>
                            <div className="wrap_item_sidebar_search_item">
                                <ItemSidebarSearchPage star={true} />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main_search_page"></div>
        </div >
    )
}


export default SearchContent