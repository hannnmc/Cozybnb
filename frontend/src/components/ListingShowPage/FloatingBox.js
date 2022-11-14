import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FloatingBox.css';
import { createReservation } from '../../store/reservations';

const FloatingBox = ({listing, startDate, setStartDate, endDate, setEndDate, numDays, setNumDays}) => {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [ guests, setGuests ] = useState(1);
    const [total, setTotal ] = useState(listing.price * numDays + parseInt(listing.price * numDays * 0.12) + parseInt(listing.price * numDays * 0.08));

    

    const listingId = listing.id;
    const userId = user.id;

    useEffect(() => {
        setNumDays( ((endDate.getTime() - startDate.getTime())/1000/60/60/24) < 0 ? 0 : parseInt((endDate.getTime() - startDate.getTime())/1000/60/60/24) );
    },[startDate,endDate])

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
        dispatch(createReservation({
            startDate,
            endDate,
            listingId,
            userId,
            guests,
            total
        }))
    }
    
    return (
        <div className='listing-floating-panel'>
        <div className='floating-box-border'>
            <div className='floating-box-top'>
                <div className='floating-box-price-review'>
                    <div className='floating-box-price'>
                        ${listing.price} <span id='floating-price-night'> night</span>
                    </div>
                    <div className='floating-box-review'>
                        {listing.averageRating ? listing.averageRating : '0 reviews'}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='floating-box-form-top'>
                    <div className='floating-dates'>
                        <input onKeyDown={(e) => e.preventDefault()}
                        className='floating-start-date' 
                        type="date"
                        value={`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() > 9 ? '':'0' }${startDate.getDate()}`}
                        onChange={handleStartChange}
                       />
                        <input onKeyDown={(e) => e.preventDefault()}
                        className='floating-end-date' 
                        type="date" 
                        value={`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate() > 9 ? '':'0' }${endDate.getDate()}`}
                        onChange={handleEndChange}
                        />
                    </div>
                    </div>
                    <select 
                    value={guests}
                    onChange={(e)=>(setGuests(e.target.value))}
                    className='floating-box-guests
                    '>
                        <option value="1">1 guest</option>
                        <option value="2">2 guests</option>
                        <option value="3">3 guests</option>
                        <option value="4">4 guests</option>
                        <option value="5">5 guests</option>
                        <option value="6">6 guests</option>
                        <option value="7">7 guests</option>
                        <option value="8">8 guests</option>
                        <option value="9">9 guests</option>
                        <option value="10">10 guests</option>
                        <option value="11">11 guests</option>
                        <option value="12">12 guests</option>
                        <option value="13">13 guests</option>
                        <option value="14">14 guests</option>
                        <option value="15">15 guests</option>
                        <option value="16">16 guests</option>
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
                <div>$ {total}</div>
            </div>
        </div>
    </div>
    );
}
 
export default FloatingBox;