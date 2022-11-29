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

function DatePickerComp({startDate, setStartDate, endDate, setEndDate, value, onChange, numDays, listingReservation, setNumDays }) {

  const dispatch = useDispatch();
  const reservedDates = [];
  const selectRange = true;
  const view = 'month';
  const showFixedNumberOfWeeks = true;
  const calendarType = "US";
  const tileDisabled = ({activeStartDate, date, view }) => (date.getTime() < ((new Date).getTime() - 86400000)) 
  || (reservedDates.includes(`${date.getFullYear()}${date.getMonth()}${date.getDate()}`))



  if (listingReservation)
    listingReservation.forEach((reservation) => {
      const resDays = Math.ceil((new Date(reservation.endDate).getTime() - new Date(reservation.startDate).getTime())/1000/60/60/24) < 0 ? 0 : Math.ceil((new Date(reservation.endDate).getTime() - new Date(reservation.startDate).getTime())/1000/60/60/24)
      for (let i = 0; i < resDays; i++) {
        let start = new Date(reservation.startDate);
        start.setDate(start.getDate() + i)
        reservedDates.push(`${start.getFullYear()}${start.getMonth()}${start.getDate()}`)
        // reservedDates.push([new Date(reservation.startDate).getTime(), new Date(reservation.endDate).getTime()])
      }
    })
  
  useEffect(() => {
    dispatch(reservationActions.fetchReservations())
  },[])
  
  // useEffect(() => {
  //   setNumDays( Math.ceil((endDate.getTime() - startDate.getTime())/1000/60/60/24) < 0 ? 0 : Math.ceil((endDate.getTime() - startDate.getTime())/1000/60/60/24) );
  // },[startDate,endDate])

  useEffect(() => {
      setStartDate(value[0]);
      setEndDate(value[1]);
  },[value])



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