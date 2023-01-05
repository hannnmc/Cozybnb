import React, { useEffect, useState } from 'react';
import Calender from 'react-calendar';
import './DatePickerComp.css';
import 'react-calendar/dist/Calendar.css';
import * as reservationActions from '../../store/reservations';
import { useDispatch, useSelector } from 'react-redux';

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

function DatePickerComp({ setStartDate, setEndDate, value, onChange, reservedDates }) {

  const dispatch = useDispatch();
  const selectRange = true;
  const calendarType = "US";
  const tileDisabled = ({activeStartDate, date, view }) => (date.getTime() < ((new Date).getTime() - 86400000)) 
  || (reservedDates.includes(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`))
  
  useEffect(() => {
    dispatch(reservationActions.fetchReservations())
  },[])
  

  useEffect(() => {
      setStartDate(value[0]);
      setEndDate(value[1]);
  },[value])

  const minDetail = 'month';

  return (
    <div className='calendar-container'>
      <Calender 
      selectRange={selectRange}
      onChange={onChange} 
      value={value}
      calendarType={calendarType}
      tileDisabled={tileDisabled}
      minDetail={minDetail}
       />
    </div>
  );
}

export default DatePickerComp;