import { useEffect, useState, useRef } from "react";
import { baseIMG } from "../../utils/api-config"


function Product_adv_main({ data }) {
    function formatprice(price) {
        const arrprice = price.toString().split("").reverse()
        const rs = []
        let i = 0;
        for (i; i < arrprice.length; i++) {
            rs.push(arrprice[i])
            if (i != 0 && (i + 1) % 3 === 0) {
                rs.push(',')
            }
        }
        return rs.reverse().join("") + 'VND';
    }

    function test(element, index) {
        const valuetransforms = element.attributes.valuetransfrom.value
        const stringtransfrom = `translate(calc(${valuetransforms}% - 100%), 0px)`
        element.attributes.valuetransfrom.value = valuetransforms - 100
        element.style.transform = stringtransfrom
    }

    useEffect(() => {
        if (data.length != 0) {
            const [...a] = document.querySelectorAll(".content1avtmain_item")
            a.every((element, index) => {
                if (index < 3) {
                    element.setAttribute('valuetransfrom', -100 * (4 - (index + 1)))
                    element.style.transform = `translate(calc(-100%*${4 - (index + 1)}), 0px)`
                    return true
                } else {
                    element.setAttribute('valuetransfrom', 0)
                    element.style.transform = `translate(0%, 0px)`
                    return true
                }
            })
            setInterval(() => {
                const [...a] = document.querySelectorAll(".content1avtmain_item")
                a.every((element, index) => {
                    if (index < 4) {
                        test(element, index)
                        return true
                    }
                })
                setTimeout(() => {
                    a[0].style.transform = `translate(0%, 0px)`
                    a[0].attributes.valuetransfrom.value = 0
                    document.querySelector(".wrapcontent1_adv_main").appendChild(a[0])
                }, 1000)
            }, 5000)

        }
    }, [data])

    return (
        <>
            <div className="content1_adv_main">
                <div className="back"></div>
                <div className="wrapcontent1_adv_main">
                    {data.map((item, index) => {
                        return <div key={index} className='content1avtmain_item' >
                            <div className="wrapcontentadvmain">
                                <img src={`${baseIMG}products/${item.images} `}></img>
                                <div className='detail'>
                                    <div className='price'>{formatprice(item.price)}</div>
                                    <div className='btn'>Detail</div>
                                </div>
                            </div>
                        </div>
                    })}

                </div>
                <div className="next"></div>
            </div>
        </>
    )
}

export default Product_adv_main

