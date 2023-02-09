
import Header from "../components/header/Header"
function Homelayout({ children }) {

    return (
        <div className="mainlayout">
            <Header/>
            {children}
        </div>
    )
}

export default Homelayout