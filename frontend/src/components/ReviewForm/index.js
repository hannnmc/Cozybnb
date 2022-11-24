import { useState } from 'react';
import './ReviewForm.css';
import StarRating from '../StarRating';
import StarRating2 from '../StarRating/StarRating2';
import StarRating3 from '../StarRating/StarRating3';
import StarRating4 from '../StarRating/StarRating4';
import StarRating5 from '../StarRating/StarRating5';
import StarRating6 from '../StarRating/StarRating6';
import * as reviewActions from '../../store/reviews';
import { useDispatch } from 'react-redux';


const ReviewForm = ({user,listing,setReviewModal}) => {

    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const [cleanliness, setCleanliness] = useState(5);
    const [accuracy, setAccuracy] = useState(5);
    const [communication, setCommunication] = useState(5);
    const [location, setLocation] = useState(5);
    const [checkin, setCheckin] = useState(5);
    const [value, setValue] = useState(5);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(reviewActions.createReview({
            listingId:listing.id,
            body,
            cleanliness,
            accuracy,
            communication,
            location,
            checkin,
            value
        }))
        .then(setReviewModal(false))
    }

    return (
        <div className='reviews-modal'>
            <div className='reviews-modal-header'>Tell us about your stay</div>
            <form onSubmit={handleSubmit} className='reviews-form'>
                <label>Cleanliness
                <div className='star-rating'>
                <StarRating 
                setCleanliness={setCleanliness}
                />
                </div>
                </label>
                <label>Accuracy
                <div className='star-rating'>
                <StarRating2
                setAccuracy={setAccuracy}
                />
                </div>
                </label>
                <label>Communication
                <div className='star-rating'>
                <StarRating3 
                setCommunication={setCommunication}
                />
                </div>
                </label>
                <label>Location
                <div className='star-rating'
                >
                <StarRating4 
                setLocation={setLocation}
                />
                </div>
                </label>
                <label>Check-in
                <div className='star-rating'>
                <StarRating5 
                setCheckin={setCheckin}
                />
                </div>
                </label>
                <label>Value
                <div className='star-rating'>
                <StarRating6 
                value={value}
                setValue={setValue}
                />
                </div>
                </label>

                <div className='review-span'>
                    Write a review
                </div>
                <div className='review-public'>Tell others about your stay by writing a public review</div>

                <textarea className='review-textbox'
                value={body}
                onChange={(e)=> setBody(e.target.value)}
                placeholder='How was your stay?'
                required
                >
                </textarea>

                <button>Post review</button>
            </form>
        </div>
    );
}
 
export default ReviewForm;