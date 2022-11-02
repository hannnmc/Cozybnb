import { useState } from "react";
import { useSelector } from "react-redux";
import * as userActions from '../../store/users'
import { useDispatch } from "react-redux";

const ProfileEditForm = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => Object.values(state.session));
    const { birthDate, firstName, phoneNumber, lastName, about, id } = user[0];
    const { setShowProfileEditForm } = props;
    const [ errors, setErrors ] = useState([]);
    const [ bdate, setBdate ] = useState(birthDate);
    const [ number, setNumber ] = useState(phoneNumber);
    const [ fname, setFname ] = useState(firstName);
    const [ lname, setLname ] = useState(lastName);
    const [ desc, setDesc ] = useState(about);

    const saveChanges = (e) => {
        e.preventDefault();
        
        // setErrors([]);
        return dispatch(userActions.updateUser({
            firstName:fname,
            lastName:lname,
            about:desc,
            phoneNumber:number, 
            birthDate:bdate,
            id
        }))
        .then(setShowProfileEditForm(false))
        .catch(async (res) => {
        let data;
        try {
        data = await res.clone().json();
        } catch {
        data = await res.text(); 
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
        });
    };

    return (
        <>
            <div className="profile-edit-form">
                <form onSubmit={saveChanges}>
                    <div>About</div>
                    <div>
                        <textarea 
                        type="text" 
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        />
                    </div>
                    <div>First name</div>
                    <div>
                        <input 
                        type="text" 
                        value={fname}
                        onChange={(e)=>setFname(e.target.value)}
                        />
                    </div>
                    <div>Last name</div>
                    <div>
                        <input 
                        type="text" 
                        value={lname}
                        onChange={(e)=>setLname(e.target.value)}
                        />
                    </div>    
                    <div>Birthdate</div>
                    <div>
                    <input 
                    type="date" 
                    value={bdate}
                    onChange={(e)=>setBdate(e.target.value)}
                    />
                    </div>
                    <div>Phone Number</div>
                    <div>
                        <input 
                        type="number" 
                        value={number}
                        onChange={(e)=>setNumber(e.target.value)}
                        max="9999999999"
                        />
                    </div>
                    <div>
                        <div className="profile-cancel" onClick={() => setShowProfileEditForm(false)}>Cancel</div>
                        <div ><button className="profile-submit" type="submit">Save</button></div>
                    </div>
                </form>

            </div>
        </>
    );
}

export default ProfileEditForm;