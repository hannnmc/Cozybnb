import './ListingReviews.css'


const monthFullNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const ListingReviews = ({reviews, users}) => {
    return (
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

                </div>
            <div className='show-review-body'>{review.body}</div>
            {/* {review.userId === userId && (
                <button 
                  onClick={() => dispatch(reviewActions.destroyReview(review.id))} 
                className='delete-icon'
                >asdfasdf
                <i className="fa-solid fa-rectangle-xmark" />
            </button>
            )} */}
            </div>
        ))}
        </div>
    );
}
 
export default ListingReviews;

