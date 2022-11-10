import React, { useEffect, useState } from 'react';
import Calender from 'react-calendar';
import './DatePickerComp.css';
import 'react-calendar/dist/Calendar.css';



function DatePickerComp() {
    const date = new Date('2022-11-2');
    const date1 = new Date('2022-11-5');
    const [value1, onChange] = useState(date);
    console.log(value1)
    // const defaultValue = [date,date1];
    // const value = date;
    const selectRange = true;

    // useEffect(() => {

    // },[value])

  return (
    <div>
      <Calender 
      selectRange={selectRange}
    //   defaultValue={defaultValue}
      onChange={onChange} 
    //   value={value}
       />
    </div>
  );
}

export default DatePickerComp;