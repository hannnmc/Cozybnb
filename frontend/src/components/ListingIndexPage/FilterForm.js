import React, { useState } from 'react';
import { Input } from '../Forms';
import './FilterForm.css';

function FilterForm({ minGuests, maxGuests, minPrice, maxPrice, setMinGuests, setMaxGuests, setMinPrice, setMaxPrice }) {
    const parseValue = val => val === '' ? val : parseInt(val);   
    const [ showFilter, setShowFilter ] = useState(false);

    const toggleFilter = (e) => {
        e.preventDefault();
        setShowFilter(open => !open);
        console.log(showFilter)
    }
    

  return (
    <div className="filter-form">
      <div className="filter-fields">

        <div className="wrapper">
            <div className='filter-top'>
            <div className='filter-button' onClick={toggleFilter}>
                    <button>
                        <div>
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" width={'16px'} height={'16px'} fill={'#222222'}><path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
                        </div>
                        <div>
                            <span>Filters</span>
                        </div>
                    </button>
                </div>
                {showFilter && (
                <div className="price-input">
                    <div>Price</div>
                    <div className="field">
                    <Input
                    label="Min:"
                    type="number"
                    value={minPrice}
                    onChange={e => setMinPrice(parseValue(e.target.value))}
                    />
                    </div>
                    <div className="field">
                    <Input
                    label="Max:"
                    type="number"
                    value={maxPrice}
                    onChange={e => setMaxPrice(parseValue(e.target.value))}
                    />
                    </div>
                </div>
                )}
                
            </div>

            {/* <div className="slider">
                <div className="progress"></div>
            </div>
            <div className="range-input">
                <input type="range" className="range-min" min="100" max="2900" value={minPrice} step="any"
                onChange={e => setMinPrice(parseValue(e.target.value))}
                />
                <input type="range" className="range-max" min="101" max="3000" value={maxPrice} step="any" 
                onChange={e => setMaxPrice(parseValue(e.target.value))}
                />
            </div> */}
        </div>



      </div>
    </div>
  )
}

export default FilterForm;
