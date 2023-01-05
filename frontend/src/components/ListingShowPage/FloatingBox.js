import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FloatingBox.css';
import { createReservation } from '../../store/reservations';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import check from '../../assets/images/checkmark.gif';

const FloatingBox = ({listing, startDate, setStartDate, endDate, setEndDate, numDays, setNumDays, setShowLoginModal, reviews, setShowListingEdit, reservedDates, resSuccess1, setResSuccess1, resSuccess2, setResSuccess2, resSuccess3, setResSuccess3}) => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [ guests, setGuests ] = useState(1);

    const [ shake, setShake ] = useState(false);
    const [total, setTotal ] = useState(listing.price * numDays + parseInt(listing.price * numDays * 0.12) + parseInt(listing.price * numDays * 0.08));
    const temp = new Date();
    const today = new Date(temp.setHours(0,0,0,0));

    const listingId = listing.id;

    useEffect(() => {
        setNumDays( Math.floor(((endDate.getTime() - (new Date(startDate.setHours(0,0,0,0))).getTime())/1000/60/60/24) < 0 ? 0 : ((endDate.getTime() - (new Date(startDate.setHours(0,0,0,0))).getTime())/1000/60/60/24)));
    },[startDate,endDate])
 
    useEffect(() => {
        setTotal(listing.price * numDays + parseInt(listing.price * numDays * 0.12) + parseInt(listing.price * numDays * 0.08));
    },[numDays])


    const handleStartChange = (e) => {
        const startValue = e.target.value;
        const startYear = parseInt(startValue.split('-')[0])
        const startMonth = parseInt(startValue.split('-')[1])
        const startDay = parseInt(startValue.split('-')[2])
        setStartDate(new Date(`${startYear}, ${startMonth}, ${startDay}`))
    }
    const handleEndChange = (e) => {
        const endValue = e.target.value;
        const endYear = endValue.split('-')[0]
        const endMonth = endValue.split('-')[1]
        const endDay = endValue.split('-')[2]

        setEndDate(new Date(`${endYear}, ${endMonth}, ${endDay}`))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!user) {
            setShowLoginModal(true);
        }
        if (listing.userId === user.id) {
            setShowListingEdit(true);
        } else if (numDays === 0) {
            setShake(!shake);
            setTimeout(() => {
                setShake(false)
            },300);
            return
        } else {
            for (let i = 0; i < reservedDates.length; i++) {
                let resDay = new Date(reservedDates[i]).getTime();
                if (resDay > startDate.getTime() - 8640000 && resDay < endDate.getTime()) {
                    setShake(!shake);
                    setTimeout(() => {
                        setShake(false)
                    },300);
                    return
                } 
            }
            let timeout1;
            let timeout2;
            let timeout3;
            if (numDays > 0 && user)
            setResSuccess1(true);
            timeout1 = setTimeout(() => {
                setResSuccess1(false);
                setResSuccess2(true);
                clearTimeout(timeout1);
            },1200);
            timeout2 = setTimeout(() => {
                setResSuccess2(false);
                setResSuccess3(true);
                clearTimeout(timeout2);
            },2400);
            timeout3 = setTimeout(() => {
                setResSuccess2(false);
                clearTimeout(timeout3);
                dispatch(createReservation({
                    startDate,
                    endDate,
                    listingId,
                    guests,
                    total:(listing.price * numDays + parseInt(listing.price * numDays * 0.12) + parseInt(listing.price * numDays * 0.08)),
                    days:numDays
                }))
                .then(history.push(`/profile/`));
            },3965);
        }
    }

    // console.log((today.toISOString().split('T')[0]).replace(/-/g, "/"))
    // console.log(`${startDate.getFullYear()}-${(startDate.getMonth() + 1) < 10 ? `0${(startDate.getMonth() + 1)}` : (startDate.getMonth() + 1)}-${startDate.getDate() > 9 ? '':'0' }${startDate.getDate()}`);

    return (
        <div className='listing-floating-panel'>
        <div className='floating-box-border'>
            <div className='floating-box-top'>
                <div className='floating-box-price-review'>
                    <div className='floating-box-price'>
                        ${listing.price} <span id='floating-price-night'> night</span>
                    </div>
                    <div className='floating-box-review'><a 
                    className='float-box-tag'   href="#reviews-header">
                        {reviews.length > 0 ? `${reviews.length} reviews` : ''}</a>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='floating-box-form-top'>
                    <div className='floating-dates'>
                        <span className='floatbox-guests-span'>CHECK-IN</span>
                        <input onKeyDown={(e) => e.preventDefault()}
                        className='floating-start-date' 
                        type="date"
                        value={`${startDate.getFullYear()}-${(startDate.getMonth() + 1) < 10 ? `0${(startDate.getMonth() + 1)}` : (startDate.getMonth() + 1)}-${startDate.getDate() > 9 ? '':'0' }${startDate.getDate()}`}
                        onChange={handleStartChange}
                        min={(today.toISOString().split('T')[0])}
                        // min='2023-01-05'
                       />
                        <span className='floatbox-guests-span float-checkout'>CHECKOUT</span>
                        <input onKeyDown={(e) => e.preventDefault()}
                        className='floating-end-date' 
                        type="date" 
                        value={`${endDate.getFullYear()}-${(endDate.getMonth() + 1) < 10 ? `0${(endDate.getMonth() + 1)}` : (endDate.getMonth() + 1)}-${endDate.getDate() > 9 ? '':'0' }${endDate.getDate()}`}
                        onChange={handleEndChange}
                        min={`${startDate.getFullYear()}-${(startDate.getMonth() + 1) < 10 ? `0${(startDate.getMonth() + 1)}` : (startDate.getMonth() + 1)}-${startDate.getDate() > 9 ? '':'0' }${startDate.getDate()}`}
                        />
                    </div>
                    </div>
                    <span className='floatbox-guests-span'>GUESTS</span>
                    <select 
                    value={guests}
                    onChange={(e)=>(setGuests(e.target.value))}
                    className='floating-box-guests'
                    >
                        <option 
                        disabled={listing.guests < 1 ? 'disabled' : ''}
                        hidden={listing.guests < 1 ? 'hidden' : ''} 
                        value="1">1 guest</option>
                        <option 
                        disabled={listing.guests < 2 ? 'disabled' : ''}
                        hidden={listing.guests < 2 ? 'hidden' : ''}

                        value="2">2 guests</option>
                        <option 
                        disabled={listing.guests < 3 ? 'disabled' : ''}
                        hidden={listing.guests < 3 ? 'hidden' : ''} 
                        value="3">3 guests</option>
                        <option 
                        disabled={listing.guests < 4 ? 'disabled' : ''}
                        hidden={listing.guests < 4 ? 'hidden' : ''} 
                        value="4">4 guests</option>
                        <option 
                        disabled={listing.guests < 5 ? 'disabled' : ''}
                        hidden={listing.guests < 5 ? 'hidden' : ''} 
                        value="5">5 guests</option>
                        <option 
                        disabled={listing.guests < 6 ? 'disabled' : ''}
                        hidden={listing.guests < 6 ? 'hidden' : ''} 
                        value="6">6 guests</option>
                        <option 
                        disabled={listing.guests < 7 ? 'disabled' : ''} 
                        hidden={listing.guests < 7 ? 'hidden' : ''}
                        value="7">7 guests</option>
                        <option 
                        disabled={listing.guests < 8 ? 'disabled' : ''} 
                        hidden={listing.guests < 8 ? 'hidden' : ''}
                        value="8">8 guests</option>
                        <option 
                        disabled={listing.guests < 9 ? 'disabled' : ''}
                        hidden={listing.guests < 9 ? 'hidden' : ''} 
                        value="9">9 guests</option>
                        <option 
                        disabled={listing.guests < 10 ? 'disabled' : ''}
                        hidden={listing.guests < 10 ? 'hidden' : ''} 
                        value="10">10 guests</option>
                        <option 
                        disabled={listing.guests < 11 ? 'disabled' : ''}
                        hidden={listing.guests < 11 ? 'hidden' : ''} 
                        value="11">11 guests</option>
                        <option 
                        disabled={listing.guests < 12 ? 'disabled' : ''}
                        hidden={listing.guests < 12 ? 'hidden' : ''} 
                        value="12">12 guests</option>
                        <option 
                        disabled={listing.guests < 13 ? 'disabled' : ''}
                        hidden={listing.guests < 13 ? 'hidden' : ''} 
                        value="13">13 guests</option>
                        <option 
                        disabled={listing.guests < 14 ? 'disabled' : ''}
                        hidden={listing.guests < 14 ? 'hidden' : ''} 
                        value="14">14 guests</option>
                        <option 
                        disabled={listing.guests < 15 ? 'disabled' : ''}
                        hidden={listing.guests < 15 ? 'hidden' : ''} 
                        value="15">15 guests</option>
                        <option 
                        disabled={listing.guests < 16 ? 'disabled' : ''}
                        hidden={listing.guests < 16 ? 'hidden' : ''} 
                        value="16">16 guests</option>
                    </select>
                    <button type='submit'
                    className='floating-box-button'
                    id={shake ? 'shake' : ''}
                    >
                        {user && listing.userId === user.id ? 'Edit' : 'Reserve'}
                    </button>
                </form>
            </div>
            <span className='floating-box-charge'>You won't be charged yet</span>
            <div className='floating-box-bot'>
                <div className='floating-box-nights'>
                    <div>{listing.price} x {numDays} nights</div> 
                    <div>${listing.price * numDays} </div> 
                </div>
                <div className='floating-box-cleaning'>
                    <div>Cleaning fee</div> 
                    <div>${parseInt(listing.price * numDays * 0.08)} </div> 
                </div>
                <div className='floating-box-service'>
                    <div>Service fee</div> 
                    <div>${parseInt(listing.price * numDays * 0.12)}</div> 
                </div>
            </div>
            <div id='float-divider'></div>
            <div className='float-total'>
                <div>Total before taxes</div>
                <div>$ {listing.price * numDays + parseInt(listing.price * numDays * 0.12) + parseInt(listing.price * numDays * 0.08)}</div>
            </div>
        </div>
        {resSuccess1 && (
            <Modal>
                <div className='res-success-modal1'>
                    <img className='res-success-logo' src="/static/media/cozybnb_logo.ffe4f29d6fd26f4b6844.png"/>
                    <div>
                        Just a moment, we're getting <br /> your trip ready
                    </div>
                </div>
            </Modal> 
        )}
        {resSuccess2 && (
            <Modal>
                <div className='res-success-modal1'>
                    <div>
                        Reviewing payment details
                    </div>
                </div>
            </Modal> 
        )}
        {resSuccess3 && (
            <Modal>
                <div className='res-success-modal1'>
                    <div>
                        <img className='check-gif' src={check} alt="" />
                    </div>
                </div>
            </Modal> 
        )}
    </div>
    );
}
 
export default FloatingBox;