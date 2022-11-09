import React, { useState } from 'react';
import Calender from 'react-calendar';
import './DatePickerComp.css';
import 'react-calendar/dist/Calendar.css';

const date = new Date('2022-11-11');

function DatePickerComp() {
  const [value, onChange] = useState(null);
    // console.log(value);
    const [activeStartDate, setActiveStartDate] = useState(new Date('2022-11-23'));

    const onClickMonth = () => {

    };

  return (
    <div>
      <Calender 
      activeStartDate={activeStartDate}
      onClickMonth={onClickMonth}
      onChange={onChange} value={value} />
    </div>
  );
}

export default DatePickerComp;