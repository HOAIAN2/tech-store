import HeaderOrder from "../../components/header/HeaderOder"
import OderContent from "../../components/order/orderContent"

function Order() {
    return (
        <div className="warporder" style={{ flexDirection: "column", display: 'flex', height: '100vh' }}>
            <HeaderOrder />
            <OderContent />
        </div>
    )
}

export default Order