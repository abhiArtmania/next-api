"use client"
import { useReducer } from 'react'
import '../style.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AddProduct = () => {
    const router = useRouter()
    const initialState = {
        name:'',
        price:'',
        company:'',
        color:'',
        category:''
    }
    const reducer = (state, {type,field,value}) => {
        switch (type) {
            case 'HANDLE_INPUT_TEXT':
                return {
                    ...state,
                    [field]:value
                }
            case 'RESET_FIELDS':
                return initialState
            default:
                return state
        }
      }
    const [productDetail,dispatch] = useReducer(reducer,initialState)
    const handleInputChange = (e) =>{
        dispatch({
            type:'HANDLE_INPUT_TEXT',
            value:e.target.value,
            field:e.target.name
        })
    }
    const saveProductDetails = async () => {
        if(!productDetail.name || !productDetail.price || !productDetail.company || !productDetail.color || !productDetail.category){
            alert("All Fields are required")
            return;
        }
        const data = await fetch('http://localhost:3000/api/products',{
            method:'POST',
            body:JSON.stringify(productDetail)
        })
        .then((res)=>res.json())
        console.log(data,"data")
        if(data.success){
            dispatch({
                type:'RESET_FIELDS'
            })
            alert('Product created')
            router.push('/productList')
        } else {
            alert('Failed to create product')
        }
    }
    return (
        <div className='add-product'>
            <h1>Create Product:</h1>
            <input 
                value={productDetail.name} 
                type='text'
                name='name' 
                placeholder="Name" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <input 
                value={productDetail.price} 
                type='text' 
                name='price'
                placeholder="Price" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <input 
                value={productDetail.company} 
                type='text'
                name='company' 
                placeholder="Company" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <input 
                value={productDetail.color} 
                type='text'
                name='color' 
                placeholder="Color" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <input 
                value={productDetail.category} 
                type='text'
                name='category' 
                placeholder="Category" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <button className='btn' onClick={saveProductDetails}>Save</button>
            <div><Link href='/'>Home</Link></div>
        </div>
    )
}

export default AddProduct;