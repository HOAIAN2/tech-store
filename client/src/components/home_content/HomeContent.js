import HotProducts from "./content/HotProducts"
import CategoryProduct from "./content/CategoryProduct"
import ProductHome from "./content/ProductHome"

function HomeContent() {
    return (
        <div className="content-home" style={{}}>
            <div className="component1" style={{ backgroundColor: "#fff", boxShadow: "0 0 1px" }}>
                <HotProducts />
                <div className="maincontenthome" style={{ width: "100%", height: "maxcontent", backgroundColor: "#fff", paddingTop: "10px" }}>
                    <div className="wrapmaincontenthome" style={{ width: "1257px", margin: "auto" }}>
                        <CategoryProduct />
                    </div>
                </div>
            </div>
            <ProductHome />
        </div>
    )
}

export default HomeContent