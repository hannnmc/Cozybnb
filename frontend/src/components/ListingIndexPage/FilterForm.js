import React from 'react';
import { Input } from '../Forms';
import './FilterForm.css';

function FilterForm({ minGuests, maxGuests, setMinGuests, setMaxGuests }) {
  const parseValue = val => val === '' ? val : parseInt(val);

  return (
    <div className="filter-form">
      <div className="filter-fields">

        <div class="wrapper">
            <Input
            label="Minimum Guests:"
            type="number"
            value={minGuests}
            onChange={e => setMinGuests(parseValue(e.target.value))}
            />
            <br />
            <Input
            label="Maximum Guests:"
            type="number"
            value={maxGuests}
            onChange={e => setMaxGuests(parseValue(e.target.value))}
            />
      <header>

      </header>
      <div class="price-input">
        <div class="field">
          <span>Min</span>
          <input type="number" class="input-min" value="1"/>
        </div>
        <div class="separator">-</div>
        <div class="field">
          <span>Max</span>
          <input type="number" class="input-max" value={maxGuests}/>
        </div>
      </div>
      <div class="slider">
        <div class="progress"></div>
      </div>
      <div class="range-input">
        <input type="range" class="range-min" min="100" max="2900" value={minGuests} step="30"/>
        <input type="range" class="range-max" min="101" max="3000" value={maxGuests} step="30"/>
      </div>
        </div>



      <div className='filter-button'>
        <button>
            <div>
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" width={'16px'} height={'16px'} fill={'#222222'}><path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
            </div>
            <div>
                <span>Filters</span>
            </div>
        </button>
      </div>
      </div>
    </div>
  )
}

export default FilterForm;
