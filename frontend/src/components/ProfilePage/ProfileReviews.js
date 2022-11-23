import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as userActions from "../../store/users";

const monthFullNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ProfileReviews = ({users, ownedReviews}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.fetchUsers());
    },[])

    if (users) return (
        <div className="show-reviews">
        {ownedReviews?.map(review => (
            <div className="show-review" key={review.id}>
                <div className='show-review-header'>
                    <div className='show-review-image'>
                        <img src={users[review.userId]?.photoUrl} alt="" />
                    </div>
                    <div className='show-review-top'>
                        <span>{users[review.userId]?.firstName}</span>
                        <span>{`${monthFullNames[new Date(review.createdAt).getMonth()]}, ${new Date(review.createdAt).getFullYear()}`}</span>
                    </div>
                </div>
                <div className='show-review-body'>{review.body}</div>
            </div>
        ))}
        </div>
    );
}
export default ProfileReviews;
