import { useState } from 'react';
import './ReviewForm.css';
import StarRating from '../StarRating'


const ReviewForm = () => {
    const [about, setAbout] = useState("");
    const handleSubmit = (e) => {
        e.preventdefault();
    }

    // console.log(cleanliness)
    return (
        <div className='reviews-modal'>
            <div className='reviews-modal-header'>Tell us about your stay</div>
            <form onSubmit={handleSubmit} className='reviews-form'>
                <label>Cleanliness:
                <div className='star-rating'>
                <StarRating />
                </div>
                </label>
                <label>Accuracy:
                <div className='star-rating'>
                <StarRating />
                </div>
                </label>
                <label>Communication:
                <div className='star-rating'>
                <StarRating />
                </div>
                </label>
                <label>Location:
                <div className='star-rating'>
                <StarRating />
                </div>
                </label>
                <label>Check-in:
                <div className='star-rating'>
                <StarRating />
                </div>
                </label>
                <label>Value:
                <div className='star-rating'>
                <StarRating />
                </div>
                </label>

                <div className='review-span'>
                    Write a review
                </div>
                <div className='review-public'>Tell other's about your stay by writing a public review.</div>

                <textarea className='review-textbox'
                value={about}
                onChange={(e)=> setAbout(e.target.value)}
                placeholder='How was your stay?'
                >
                </textarea>

                <button>Post review</button>
            </form>
        </div>
    );
}
 
export default ReviewForm;