import { useEffect } from 'react'
import './FloatingBox.css'

const FloatingBox = ({listing, startDate, setStartDate, endDate, setEndDate, numDays, setNumDays}) => {
    
    const handleStartChange = (e) => {
        const startValue = e.target.value;
        const startYear = startValue.split('-')[0]
        const startMonth = startValue.split('-')[1]
        const startDay = startValue.split('-')[2]
        // setStartDate()
        // console.log(startYear, startMonth, startDay)
        setStartDate(new Date(`${startYear}, ${startMonth}, ${startDay}`))
        console.log(new Date(`${startYear}, ${startMonth}, ${startDay}`))
    }
    const handleEndChange = (e) => {
        const endValue = e.target.value;
        const endYear = endValue.split('-')[0]
        const endMonth = endValue.split('-')[1]
        const endDay = endValue.split('-')[2]
        // setEndDate()
        // console.log(endYear, endMonth, endDay)
        setEndDate(new Date(`${endYear}, ${endMonth}, ${endDay}`))
        console.log(new Date(`${endYear}, ${endMonth}, ${endDay}`))
    }
    
    // useEffect(() => {
        
        // console.log(startDate)
        // console.log(new Date(endDate.getFullYear(), endDate.getMonth()+1, endDate.getDate()))
        // console.log(endDate)
    // },[startDate,endDate])

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
                <form >
                    <div className='floating-box-form-top'>
                    <div className='floating-dates'>
                        <input 
                        className='floating-start-date' 
                        type="date"
                        value={`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`}
                        onChange={handleStartChange}
                       />
                        <input className='floating-end-date' type="date" 
                        value={`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`}
                        onChange={handleEndChange}
                        />
                    </div>
                    </div>
                    <select className='floating-box-guests'>
                        <option value="select">1 guest</option>
                    </select>
                    <button className='floating-box-button'>
                        Reserve
                    </button>
                </form>
            </div>
            <span className='floating-box-charge'>You won't be charged yet</span>
            <div className='floating-box-bot'>
                <div className='floating-box-nights'>
                    <div>{listing.price} x 5 nights</div> 
                    <div>${listing.price * 5} </div> 
                </div>
                <div className='floating-box-cleaning'>
                    <div>Cleaning fee</div> 
                    <div>${parseInt(listing.price * .2)} </div> 
                </div>
                <div className='floating-box-service'>
                    <div>Service fee</div> 
                    <div>${parseInt(listing.price * .35)}</div> 
                </div>
            </div>
            <div id='float-divider'></div>
            <div className='float-total'>
                <div>Total before taxes</div>
                <div>${listing.price * 5 + parseInt(listing.price * .35) + parseInt(listing.price * .2)}</div>
            </div>
        </div>
    </div>
    );
}
 
export default FloatingBox;