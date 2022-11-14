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

function DatePickerComp({startDate, setStartDate, endDate, setEndDate, value, onChange }) {



    useEffect(() => {
        setStartDate(value[0]);
        setEndDate(value[1]);
    },[value])
    const selectRange = true;
    const view = 'month';
    const showFixedNumberOfWeeks = true;
    const calendarType = "US";
    const tileDisabled = ({activeStartDate, date, view }) => date.getTime() < ((new Date).getTime() - 86400000)
  return (
    <div className='calendar-container'>
      <Calender 
      selectRange={selectRange}
      // defaultValue={defaultValue}
      // goToRangeStartOnSelect={goToRangeStartOnSelect}
    //   showDoubleView={showDoubleView}
      view={view}
      onChange={onChange} 
      value={value}
      calendarType={calendarType}
      tileDisabled={tileDisabled}
       />
    </div>
  );
}

export default DatePickerComp;