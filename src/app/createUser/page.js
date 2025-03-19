"use client"
import { useReducer } from 'react'
import '../style.css'

const CreateUsers = () => {
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
          default:
            return state
        }
      }
    const [userDetail,dispatch] = useReducer(reducer,initialState)
    const handleInputChange = (e) =>{
        dispatch({
            type:'HANDLE_INPUT_TEXT',
            value:e.target.value,
            field:e.target.name
        })
    }
    const saveUserDetails = async () => {
        const data = await fetch('http://localhost:3000/api/users',{
            method:'POST',
            body:JSON.stringify(userDetail)
        })
        .then((res)=>res.json())
        return data;
    }
    return (
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
            <button className='btn' onClick={saveUserDetails}>Save</button>
        </div>
    )
}

export default CreateUsers;