import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FloatingBox.css';
import { createReservation } from '../../store/reservations';
import { useHistory } from 'react-router-dom';
// import $ from "jquery";

// const options = [
//     {label: "1 guest", value: 1},
//     {label: "2 guests", value: 2},
//     {label: "3 guests", value: 3},
//     {label: "4 guests", value: 4},
//     {label: "5 guests", value: 5},
//     {label: "6 guests", value: 6},
//     {label: "7 guests", value: 7},
//     {label: "8 guests", value: 8},
//     {label: "9 guests", value: 9},
//     {label: "10 guests", value: 10},
//     {label: "11 guests", value: 11},
//     {label: "12 guests", value: 12},
//     {label: "13 guests", value: 13},
//     {label: "14 guests", value: 14},
//     {label: "15 guests", value: 15},
//     {label: "16 guests", value: 16}
// ]

const FloatingBox = ({listing, startDate, setStartDate, endDate, setEndDate, numDays, setNumDays, setShowLoginModal, reviews}) => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [ guests, setGuests ] = useState(1);
    const [total, setTotal ] = useState(listing.price * numDays + parseInt(listing.price * numDays * 0.12) + parseInt(listing.price * numDays * 0.08));
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const listingId = listing.id;

    useEffect(() => {
        setNumDays( Math.ceil((endDate.getTime() - startDate.getTime())/1000/60/60/24) < 0 ? 0 : parseInt((endDate.getTime() - startDate.getTime())/1000/60/60/24) );

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
        if (endDate.getTime() - startDate.getTime() > 8639999 && user)
        dispatch(createReservation({
            startDate,
            endDate,
            listingId,
            guests,
            total:(listing.price * numDays + parseInt(listing.price * numDays * 0.12) + parseInt(listing.price * numDays * 0.08))
        }))
        .then(history.push(`/profile/`))
    }
    
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
                        value={`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() > 9 ? '':'0' }${startDate.getDate()}`}
                        onChange={handleStartChange}
                        min={((yesterday).toISOString().split('T')[0])}
                       />
                        <span className='floatbox-guests-span float-checkout'>CHECKOUT</span>
                        <input onKeyDown={(e) => e.preventDefault()}
                        className='floating-end-date' 
                        type="date" 
                        value={`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate() > 9 ? '':'0' }${endDate.getDate()}`}
                        onChange={handleEndChange}
                        min={startDate.toISOString().split('T')[0]}
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
                    className='floating-box-button'>
                        Reserve
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
    </div>
    );
}
 
export default FloatingBox;