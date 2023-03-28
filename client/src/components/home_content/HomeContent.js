import HotProducts from "./content/HotProducts"
import CategoryProduct from "./content/CategoryProduct"

function HomeContent() {
    return (
        <div className="content-home" style={{ height: "100vh", justifyContent: "center" }}>
            <HotProducts />
            <div className="maincontenthome" style={{ width: "100%", position: "relative" }}>
                <div className="wrapmaincontenthome" style={{ position: "absolute", width: "1257px", left: "50%", transform: "translateX(-50%)" }}>
                    <CategoryProduct />
                </div>
            </div>
        </div>
    )
}

export default HomeContent