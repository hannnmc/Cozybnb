const ProfileEditForm = (props) => {

    const {setShowProfileEditForm} = props;
    const saveChanges = (e) => {
        e.preventDefault();
    };

    return (
    <>
        <div>
            <form onSubmit={saveChanges}>
                <div>About</div>
                <div><textarea className="about-text"></textarea></div>
                <div>First name</div>
                <div><input type="text" /></div>
                <div>Last name</div>
                <div><input type="text" /></div>
                <div>Birthdate</div>
                <div><input type="text" /></div>
                <div>Phone Number</div>
                <div><input type="text" /></div>
                <div>
                    <div onClick={()=>setShowProfileEditForm(false)}>Cancel</div>
                    <div><button type="submit">Save</button></div>
                </div>
            </form>

        </div>
    </>        
    );
}
 
export default ProfileEditForm;