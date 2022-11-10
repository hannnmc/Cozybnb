import React, { useEffect, useState } from 'react';
import Calender from 'react-calendar';
import './DatePickerComp.css';
import 'react-calendar/dist/Calendar.css';

let lunar = false;

if (new Date().getFullYear() % 4 === 0) lunar = true;
const maxMonthDays = {
    0:31,
    1:lunar ? 29 : 28,
    2:31,
    3:30,
    4:31,
    5:30,
    6:31,
    7:31,
    8:30,
    9:31,
    10:30,
    11:31,
}

function DatePickerComp() {
    const [startDate, setStartDate] = useState(new Date());
    const [numDays, setNumDays] = useState(5);
    const [endMonth, setEndMonth] = useState(startDate.getMonth());
    const [endDay, setEndDay] = useState(startDate.getDate() + numDays);
    const [startingDay, setStartingday] = useState(startDate.getDate());
    const [newDay, setNewDay] = useState(startDate.getDate());
    const [endYear, setEndYear] = useState(startDate.getFullYear());
    const dayOverage = (startingDay + numDays) % maxMonthDays[startDate.getMonth()];

    const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), endMonth, endDay));

    useEffect(() => {
        if (dayOverage < startDate.getDate()) {
            if (endMonth === 12) {
                setEndYear(startDate.getFullYear() + 1);
                setEndMonth(1);
                setEndDay(dayOverage);
            } else {
                setEndMonth(startDate.getMonth() + 1);
                setEndDay(dayOverage);
                console.log('in overage')
            }
        } else {
            setEndDay(startDate.getDate() + numDays)
            console.log('not in overage')
        }
        // let endDateString = `${startDate.getFullYear()}, ${endMonth}, ${endDay}`
        // console.log(endDateString)
        console.log(`start date ${startDate}`);
        console.log( `end date ${endDate}`)
    },[])    
    
    const defaultValue = [startDate, endDate];
    const selectRange = true;
    // const showDoubleView = true;
    // const showNavigation = false;
    const view = 'month';

  return (
    <div className='calendar-container'>
      <Calender 
      selectRange={selectRange}
      defaultValue={defaultValue}
    //   showDoubleView={showDoubleView}
      view={view}
    //   showNavigation={showNavigation}
    //   onChange={onChange} 
    //   value={value}
       />
    </div>
  );
}

export default DatePickerComp;