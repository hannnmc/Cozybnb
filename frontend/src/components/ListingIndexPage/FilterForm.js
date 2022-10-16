import React from 'react';
import { Input } from '../Forms';

function FilterForm({ minGuests, maxGuests, setMinGuests, setMaxGuests }) {
  const parseValue = val => val === '' ? val : parseInt(val);

  return (
    <div className="filter-form">
      <h2>Filter results:</h2>
      <div className="filter-fields">
        <Input
          label="Minimum Guests:"
          type="number"
          value={minGuests}
          onChange={e => setMinGuests(parseValue(e.target.value))}
        />

        <Input
          label="Maximum Guests:"
          type="number"
          value={maxGuests}
          onChange={e => setMaxGuests(parseValue(e.target.value))}
        />
      </div>
    </div>
  )
}

export default FilterForm;
