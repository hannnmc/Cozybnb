import React, { useEffect, useState } from 'react';
import Calender from 'react-calendar';
import './DatePickerComp.css';
import 'react-calendar/dist/Calendar.css';

// let lunar = false;

// if (new Date().getFullYear() % 4 === 0) lunar = true;
// const maxMonthDays = {
//     0:31,
//     1:lunar ? 29 : 28,
//     2:31,
//     3:30,
//     4:31,
//     5:30,
//     6:31,
//     7:31,
//     8:30,
//     9:31,
//     10:30,
//     11:31,
// }

function DatePickerComp({startDate, setStartDate, endDate, setEndDate }) {

    const [value, onChange] = useState([startDate,endDate]);
    // console.log(value)

    useEffect(() => {
        setStartDate(value[0]);
        setEndDate(value[1]);
    },[value])

    const defaultValue = [startDate, endDate];
    const selectRange = true;
    // const showDoubleView = true;
    // const showNavigation = false;
    const view = 'month';
    // const goToRangeStartOnSelect = false;
    const showFixedNumberOfWeeks = true;
  return (
    <div className='calendar-container'>
      <Calender 
      selectRange={selectRange}
      defaultValue={defaultValue}
      // showFixedNumberOfWeeks={showFixedNumberOfWeeks}
      // goToRangeStartOnSelect={goToRangeStartOnSelect}
    //   showDoubleView={showDoubleView}
      view={view}
      onChange={onChange} 
      value={value}
       />
    </div>
  );
}

export default DatePickerComp;