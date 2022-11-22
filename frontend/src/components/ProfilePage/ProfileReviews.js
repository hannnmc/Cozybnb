import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import * as userActions from "../../store/users";

const monthFullNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ProfileReviews = ({reviews, users}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.fetchUsers());
    },[])

    if (users) return (
        <div className="show-reviews">
        {reviews.map(review => (
            <div className="show-review" key={review.id}>
                <div className='show-review-header'>
                    <div className='show-review-image'>
                        <img src={users[review.userId].photoUrl} alt="" />
                    </div>
                    <div className='show-review-top'>
                        <span>{users[review.userId].firstName}</span>
                        <span>{`${monthFullNames[new Date(review.createdAt).getMonth()]}, ${new Date(review.createdAt).getFullYear()}`}</span>
                    </div>
                    <div>
                    {user && review.userId === user.id && (
                    <button 
                        onClick={() => dispatch(reviewActions.destroyReview(review.id))} 
                        className='listing-review-delete'
                        ><i className="fa-solid fa-xmark"></i>
                    </button>
                    )}
                    </div>
                </div>
                <div className='show-review-body'>{review.body}</div>
            </div>
        ))}
        </div>
    );
}
export default ProfileReviews;
