import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom'
import { formatArray } from "../home_content/content/ProductHome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { usePropData, PROP_ACTION } from '../../Context'


function ItemSidebarSearchPage({ arr = [], typeprop, index, numberToShow, star = false }) {
    const [brands, setBrands] = useState([])
    const [fetchjust1time, setfetchjust1time] = useState(true)
    const [hideShowButton, setHideShowButton] = useState(false)

    const [, dispatchProp] = usePropData()


    function renderItems(e) {
        setHideShowButton(true)
        const a = e.target.parentElement.children
        for (let index = 0; index < a.length; index++) {
            if (a[index].style.display === 'none') {
                a[index].style.display = 'block'
                break;
            }
        }
    }
    function hideListItem(e) {
        setHideShowButton(false)
        const a = e.target.parentElement.children
        for (let index = 1; index < a.length; index++) {
            if (a[index].style.display === 'block') {
                a[index].style.display = 'none'
            } else break;
        }
    }

    function selectItem(prop) {
        return (e) => {
            for (let index = 0; index < e.target.children.length; index++) {
                if (e.target.children[index].className.baseVal && e.target.children[index].className.baseVal.includes('svgactive')) {
                    e.target.children[index].classList.remove('svgactive')
                } else if (typeof (e.target.children[index].className) === 'string' && e.target.children[index].className.includes('spanactive')) {
                    e.target.children[index].classList.remove('spanactive')
                } else {
                    if ((index + 1) % 2 === 0) {
                        e.target.children[0].classList.add('svgactive')
                        e.target.children[1].classList.add('spanactive')
                    }
                }
            }
            if (prop === 'TP. Hồ Chí Minh') prop = 'Hồ Chí Minh'
            if (typeprop === 'address') dispatchProp({ type: PROP_ACTION.SETPROPADDRESS, payload: prop })
            if (typeprop === 'brand') dispatchProp({ type: PROP_ACTION.SETPROPBRAND, payload: prop })

        }
    }

    useEffect(() => {
        if (arr.length != 0) {
            const b = arr.slice(index)
            const a = formatArray(b, numberToShow)
            setBrands(a)
        }
    }, [arr])


    if (arr?.length !== 0 && arr?.length > index) {
        return (
            <>
                <div className="wrap_item_sidebar_search_item">
                    {
                        arr.map((item, index1) => {
                            if (index1 < index) {
                                return (
                                    <div key={index1} className="item_sidebar_search_item" onClick={selectItem(item)}>
                                        <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                                        {/* <input type="checkbox"></input> */}
                                        <span>{item}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                {brands.map((item, index) => {
                    return (
                        <div key={index} className="wrap_item_sidebar_search_item" style={{ display: "none" }}>
                            {
                                item.map((item, index) => {
                                    return (
                                        <div key={index} className="item_sidebar_search_item" onClick={selectItem(item)}>
                                            {/* <input type="checkbox"></input> */}
                                            <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                                            <span>{item}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}



                <button onClick={renderItems} style={{ marginRight: "40px" }} >Xem Thêm</button>
                <button onClick={hideListItem} style={{ display: `${hideShowButton ? 'inline-block' : 'none'}` }} >Ẩn Bớt</button>
            </>
        )
    } else if (star) {
        return (
            <>
                <div className="item_sidebar_search_item" onClick={selectItem()} value={'star5'}>
                    <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                    <div className="wrapstar">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div>
                <div className="item_sidebar_search_item" onClick={selectItem()} value={'star4'}>
                    <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                    <div className="wrapstar">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div><div className="item_sidebar_search_item" onClick={selectItem()} value={'star3'}>
                    <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                    <div className="wrapstar">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div><div className="item_sidebar_search_item" onClick={selectItem()} value={'star2'}>
                    <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                    <div className="wrapstar">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div><div className="item_sidebar_search_item" onClick={selectItem()} value={'star1'}>
                    <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                    <div className="wrapstar">
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div>
            </>
        )
    } else {
        return (
            arr.map((item, index3) => {
                return (
                    <div key={index3} className="item_sidebar_search_item" onClick={selectItem(item)}>
                        {/* <input type="checkbox"></input> */}
                        <FontAwesomeIcon icon={faCaretRight} className="svgselect" />
                        <span>{item}</span>
                    </div>
                )
            })
        )
    }
}


export default ItemSidebarSearchPage