import Link from 'next/link'
import '../style.css'
import ProductEditButton from './ProductEditButton'

const getProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products')
    .then((res)=>res.json())
    if(response.success){
        return response.data
    } else {
        return {success:false}
    }
}

const ProductList = async () => {
    const products = await getProducts()
    console.log(products,"============products")
    return(
        <div className='product-list'>
            <h1>Product List</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Company</td>
                        <td>Color</td>
                        <td>Category</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,ind)=>{
                        return <tr key={ind}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.company}</td>
                            <td>{product.color}</td>
                            <td>{product.category}</td>
                            <td>
                                <ProductEditButton productId={product._id}/>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div>
                <Link href='/'>Home</Link>
                <br/>
                <Link href='/addProduct'>Add Product</Link>
            </div>
        </div>
    )
}

export default ProductList