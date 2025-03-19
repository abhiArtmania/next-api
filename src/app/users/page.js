import Link from "next/link";
import DeleteButton from './deleteButton'

const getUser = async () => {
    const data = await fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    return data;
}
const userList = async () => {
    const userList = await getUser();
    return (
        <div>
            <h1>User List</h1>
            <ul>    
                {userList.map((user,ind) => {
                    return (
                        <li key={ind}>
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                            <span style={{marginLeft:'10px'}}>
                                <Link href={`/users/${user.id}/update`}>Edit</Link>
                            </span>
                            <span style={{marginLeft:'10px'}}>
                                <DeleteButton userId={user.id}/>
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default userList;