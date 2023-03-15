import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByID } from '../../utils/Product'
import NotFound from '../errors/NotFound'

function ProductPage() {
    const [product, setProduct] = useState({})
    const [notFound, setNotFound] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        getProductByID(id)
            .then(data => {
                setProduct(data)
            })
            .catch(error => {
                if (error.message === '404') setNotFound(true)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (notFound) return <NotFound />
    return (
        <div>{JSON.stringify(product)}</div>
    )
}
export default ProductPage