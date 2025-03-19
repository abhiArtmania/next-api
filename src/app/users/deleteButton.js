'use client'
const DeleteButton = ({userId})=>{
    const onDeleteUser = async()=>{
        const data = await fetch(`http://localhost:3000/api/users/${userId}`,{
            method:'DELETE'
        })
        .then(resp=>resp.json())
        .then((d)=>{
            if(d.success){
                console.log(d.message)
            } else {
                console.log("Show error")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <button onClick={onDeleteUser}>Delete</button>
    )
}

export default DeleteButton;