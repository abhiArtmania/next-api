"use client"
import { useEffect, useReducer } from 'react'
import '../../style.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const EditProduct = ({params}) => {
    const router = useRouter()
    const initialState = {
        name:'',
        price:'',
        company:'',
        color:'',
        category:''
    }
    const reducer = (state, {type,field,value,prefillState}) => {
        switch (type) {
            case 'HANDLE_INPUT_TEXT':
                return {
                    ...state,
                    [field]:value
                }
            case 'RESET_FIELDS':
                return initialState
            case 'PREFILL_DETAILS':
                return prefillState
            default:
                return state
        }
      }
    const [productDetail,dispatch] = useReducer(reducer,initialState)
    
    const getProductDetails = async () => {
        const { productId } = await params
        const response = await fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res)=>res.json())
        if(response?.success){
            const prodDetails = response?.data
            dispatch({
                type:'PREFILL_DETAILS',
                prefillState:{
                    name: prodDetails.name,
                    price: prodDetails.price,
                    company: prodDetails.company,
                    color: prodDetails.color,
                    category: prodDetails.category
                }
            })
        } else {
            alert("Unable to fetch roduct details")
        }
    }

    useEffect(()=>{
        getProductDetails()
    },[params])
    const handleInputChange = (e) =>{
        dispatch({
            type:'HANDLE_INPUT_TEXT',
            value:e.target.value,
            field:e.target.name
        })
    }
    const saveProductDetails = async () => {
        const { productId } = await params
        if(!productDetail.name || !productDetail.price || !productDetail.company || !productDetail.color || !productDetail.category){
            alert("All Fields are required")
            return;
        }
        const data = await fetch(`http://localhost:3000/api/products/${productId}`,{
            method:'PUT',
            body:JSON.stringify(productDetail)
        })
        .then((res)=>res.json())
        console.log(data,"data")
        if(data.success){
            alert('Product Updated')
            router.push('/productList')
        } else {
            alert('Failed to update product')
        }
    }
    return (
        <div className='edit-product'>
            <h1>Edit Product:</h1>
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
            <button className='btn' onClick={saveProductDetails}>Update</button>
            <div><Link href='/productList'>Product List</Link></div>
        </div>
    )
}

export default EditProduct;