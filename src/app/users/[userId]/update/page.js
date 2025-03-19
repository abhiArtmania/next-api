'use client'
import { useState, useEffect, useReducer } from 'react'
import '../../../style.css'

function UpdateUser({ params }) {
    const [userId, setUserId] = useState('')
    useEffect(async ()=>{
        getId();
    },[params])
    const getId = async () => {
        const paramId = await params.userId
        setUserId(paramId)
    }
    const initialState = {
        name:'',
        email:'',
        age:''
    }
    const reducer = (state, {type,field,value}) => {
        switch (type) {
            case 'HANDLE_INPUT_TEXT':
                return {
                    ...state,
                    [field]:value
                }
            case 'INITIAL_RENDER':
                return value
          default:
            return state
        }
    }
    const [userDetail,dispatch] = useReducer(reducer,initialState)

    useEffect(()=>{
        getUserDetails(userId)
    },[userId])

    const getUserDetails = async (userId) => {
        const data = await fetch(`http://localhost:3000/api/users/${userId}`)
        .then(response => response.json())
        dispatch({
            type:'INITIAL_RENDER',
            value:{
                name:data.name,
                email:data.email,
                age:data.age
            }
        })
    }
    const handleInputChange = (e) =>{
        dispatch({
            type:'HANDLE_INPUT_TEXT',
            value:e.target.value,
            field:e.target.name
        })
    }
    const updateUserDetails = async () => {
        const data = await fetch(`http://localhost:3000/api/users/${userId}`,{
            method:'PUT',
            body:JSON.stringify(userDetail)
        })
        .then((res)=>res.json())
        return data;
    }
    return(
        <div className='add-user'>
            <h1>Create Users:</h1>
            <input 
                value={userDetail.name} 
                type='text'
                name='name' 
                placeholder="Name" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <input 
                value={userDetail.email} 
                type='text' 
                name='email'
                placeholder="Email" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <input 
                value={userDetail.age} 
                type='text'
                name='age' 
                placeholder="Age" 
                className='input-field'
                onChange={(e)=>handleInputChange(e)}
            />
            <button className='btn' onClick={updateUserDetails}>Update</button>
        </div>
    )
}

export default UpdateUser;