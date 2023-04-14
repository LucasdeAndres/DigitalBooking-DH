import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/calendarStyle.css';
import es from 'date-fns/locale/es';
import useWindowSize from '../hooks';

const CalendarHome = ({inline, dateInfo}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // setDefaultLocale('es');
  registerLocale('es', es);
  // Hook - windowSize
  const {width} = useWindowSize();


  

  // console.log(dateBooking);

  return (
    <DatePicker
      
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      monthsShown={width > 560 ? 2 : 1}
      dateFormat="dd/MM/yyyy"
      placeholderText="  Check in - Check out"
      onChange={(update) => {
        setDateRange(update);
        dateInfo(update)
      }}
      locale="es"
      inline={inline || false}
      //   isClearable={true}
      // fixedHeight
      // excludeDates={dateBooking}
    />
  );
};

export {CalendarHome};