'use client'
import { useRouter } from "next/navigation" 

const ProductEditButton = ({productId}) => {
    const router = useRouter()
    const onEditProduct = () => {
        router.push(`/productList/${productId}`)
    }
    return(
        <button onClick={onEditProduct}>Edit</button>
    )
}

export default ProductEditButton