import { useEffect, useState } from "react"
import "./search_content.scss"
import { getaddressforsidbar, getbrand } from "../../utils/supplier/index"
import Itemsidebarsearchpage from "../render_item/Itemsearchsidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"



function Search_content() {
    const [sidebaraddress, setsidebaraddress] = useState([])
    const [sidebarbrand, setsidebarbrand] = useState([])
    const [indextoshowitemsidebar] = useState(5)

    useEffect(() => {
        getaddressforsidbar()
            .then((rs) => {
                setsidebaraddress(rs)
            })
        getbrand()
            .then((rs) => {
                setsidebarbrand(rs)
            })
    }, [])


    return (
        <div className="wrapsearch_content">
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
                                <Itemsidebarsearchpage arr={sidebaraddress} index={indextoshowitemsidebar} />
                            </div>
                            {/* {sidebaraddress.length > indextoshowitemsidebar ? <button onClick={renderitemwhenclickbtnmore}>Xem Thêm</button> : <></>} */}
                        </li>
                        <li>
                            <div className="title_item_sidebar_list">Theo Thương Hiệu</div>
                            <div className="wrap_item_sidebar_search_item">
                                <Itemsidebarsearchpage arr={sidebarbrand} index={indextoshowitemsidebar} numbertoshowwhenclick={5} />
                            </div>
                            {/* {sidebarbrand.length > indextoshowitemsidebar ? <button onClick={renderitemwhenclickbtnmore}>Xem Thêm</button> : <></>} */}
                        </li>
                        <li>
                            <div className="title_item_sidebar_list">Theo Đánh Giá</div>
                            <div className="wrap_item_sidebar_search_item">
                                <Itemsidebarsearchpage star={true} />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main_search_page"></div>
        </div >
    )
}


export default Search_content