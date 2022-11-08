import './FloatingBox.css'

const FloatingBox = ({listing}) => {
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
                       <input className='floating-start-date' type="date" />
                        <input className='floating-end-date' type="date" />
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
                <div>${listing.price * 5}</div>
            </div>
        </div>
    </div>
    );
}
 
export default FloatingBox;