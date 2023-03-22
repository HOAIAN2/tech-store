import HotProducts from "./content/HotProducts"

function HomeContent() {
    return (
        <div className="content-home" style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
            <HotProducts />
        </div>
    )
}

export default HomeContent