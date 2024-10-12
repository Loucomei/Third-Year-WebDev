const UserPhoto = ({ picture, name }) => {
    return (
        <img src={picture} alt={name} />
    )
}
export default UserPhoto;