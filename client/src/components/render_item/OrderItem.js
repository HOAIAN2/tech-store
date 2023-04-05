function OrderItem({ data }) {
    return (
        <>
            {data.map((item, index) => {
                return item.products.map((item, index) => {

                })
            })}
        </>
    )
}


export default OrderItem;