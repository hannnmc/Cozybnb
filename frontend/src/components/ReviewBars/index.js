import './ReviewBars.css';

const ReviewBars = ({listingReview}) => {

    let avgCleanliness = 0;
    let avgAccuracy = 0;
    let avgCommunication = 0;
    let avgLocation = 0;
    let avgCheckin = 0;
    let avgValue = 0;

    listingReview.forEach((review) => {
        avgCleanliness += review.cleanliness / listingReview.length
        avgAccuracy += review.accuracy / listingReview.length
        avgCommunication += review.communication / listingReview.length
        avgLocation += review.location / listingReview.length
        avgCheckin += review.checkin / listingReview.length
        avgValue += review.value / listingReview.length
    })

    const cleanlinessBar = {
        width: `${avgCleanliness/5*100}%`,
        backgroundColor: `#222222`
    }
    const accuracyBar = {
        width: `${avgAccuracy/5*100}%`,
        backgroundColor: `#222222`
    }
    const communicationBar = {
        width: `${avgCommunication/5*100}%`,
        backgroundColor: `#222222`
    }
    const LocatoinBar = {
        width: `${avgLocation/5*100}%`,
        backgroundColor: `#222222`
    }
    const checkinBar = {
        width: `${avgCheckin/5*100}%`,
        backgroundColor: `#222222`
    }
    const valueBar = {
        width: `${avgValue/5*100}%`,
        backgroundColor: `#222222`,
    }

    return (
        <div className='review-bars'>
            <div className='review-bars-left'>
                <div>
                    <h1>Cleanliness</h1>
                    <div>
                        <div style={cleanlinessBar}></div>
                    </div>
                    <span>{parseFloat(avgCleanliness).toFixed(1)}</span>
                </div>
                <div>
                    <h1>Accuracy</h1>
                    <div>
                        <div style={accuracyBar}></div>
                    </div>
                    <span>{parseFloat(avgAccuracy).toFixed(1)}</span>
                </div>
                <div>
                    <h1>Communication</h1>
                    <div>
                        <div style={communicationBar}></div>
                    </div>
                    <span>{parseFloat(avgCommunication).toFixed(1)}</span>
                </div>
            </div>
            <div className='review-bars-right'>
                <div>
                    <h1>Location</h1>
                    <div>
                        <div style={LocatoinBar}></div>
                    </div>
                    <span>{parseFloat(avgLocation).toFixed(1)}</span>
                </div>
                <div>
                    <h1>Check-in</h1>
                    <div>
                        <div style={checkinBar}></div>
                    </div>
                    <span>{parseFloat(avgCheckin).toFixed(1)}</span>
                </div>
                <div>                    
                    <h1>Value</h1>
                    <div>
                        <div style={valueBar}></div>
                    </div>
                    <span>{parseFloat(avgValue).toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
}
 
export default ReviewBars;