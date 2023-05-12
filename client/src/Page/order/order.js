import HeaderOrder from "../../components/header/HeaderOder"
import OrderContent from "../../components/order/orderContent"
import { useUserData } from "../../Context"
import { useLocation, Navigate } from "react-router-dom"
function Order() {
    const [user] = useUserData()
    const location = useLocation()
    if (!user) return <Navigate to='/login' replace state={{ from: location }} />
    return (
        <div className="warporder" style={{ flexDirection: "column", display: 'flex', height: '100vh' }}>
            <HeaderOrder />
            <OrderContent />
        </div>
    )
}

export default Order