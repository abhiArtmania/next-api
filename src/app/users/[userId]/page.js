const getUserDetails = async (userId) => {
    const data = await fetch(`http://localhost:3000/api/users/${userId}`)
    .then(response => response.json())
    return data;
}
const UserDetails = async ({params}) => {
    const user = await getUserDetails(params.userId);
    return (
        <div>
            <h1>User Details:</h1>
            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Age: {user.age}</h3>
            <h3>Address: {user.address}</h3>
        </div>
    );
}

export default UserDetails;