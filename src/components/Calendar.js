import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/calendarStyle.css';
import es from 'date-fns/locale/es';
import useWindowSize from '../hooks';


const Calendar = ({inline, dateInfo, fechasDeshabilitar}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // setDefaultLocale('es');
  registerLocale('es', es);
  // Hook - windowSize
  const {width} = useWindowSize();

  const getDisabledDates = (fechasDeshabilitar) => {
    const disabledDates = [];
  
    fechasDeshabilitar.forEach((fecha) => {
      const start = new Date(fecha.start);
      const end = new Date(fecha.end);
  
      const interval = end.getTime() - start.getTime();
      const dayInterval = 1000 * 60 * 60 * 24;
  
      for (let i = 0; i <= interval; i += dayInterval) {
        const date = new Date(start.getTime() + i);
        disabledDates.push(date);
      }
    });
  
    return disabledDates;
  };
  
  




  console.log(fechasDeshabilitar);

function getDisabledDatesNew(fechas) {
  console.log("se esta usando el getDisableNew");
  const disabledDates = [];

    console.log(fechas);
    const start = new Date(fechas[0]);
    const end = new Date(fechas[1]);

    console.log(start, end);

    const interval = end.getTime() - start.getTime();
    const dayInterval = 1000 * 60 * 60 * 24;

    for (let i = 0; i <= interval; i += dayInterval) {
      const date = new Date(start.getTime() + i);
      disabledDates.push(date);
    }

  return disabledDates;
};

const array1 = [1, 2, 3, 4, 5];
const array2 = [6, 7, 8, 9, 4];

const hayNumeroEnComun = array1.some(num => array2.includes(num));

console.log(hayNumeroEnComun); // false

  const handleChange = (update) => {

      console.log(update);

      const rangedDates = getDisabledDates(fechasDeshabilitar)

      console.log(rangedDates);

      setDateRange(update);
  
      const arrayFechas = getDisabledDatesNew(update)
  
      console.log(arrayFechas);
  
      const fechasEnComun = rangedDates.some(fecha => {
        const fechaObj = new Date(fecha);
        const coincidencia = arrayFechas.some(fecha2 => {
          const fecha2Obj = new Date(fecha2);
          return fechaObj.getTime() === fecha2Obj.getTime();
        });
        return coincidencia;
      });
  
      console.log(fechasEnComun);
  
      if (fechasEnComun) {
        setDateRange([null, null])
        dateInfo(dateRange)
      }else {
        setDateRange(update);
        dateInfo(update)
      }
    

  }
  

  // console.log(dateBooking);

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      monthsShown={width > 560 ? 2 : 1}
      dateFormat="dd/MM/yyyy"
      placeholderText="Check in - Check out"
      onChange={handleChange}
      excludeDateIntervals={fechasDeshabilitar}
      locale="es"
      inline={inline || false}
      //   isClearable={true}
      // fixedHeight
      // excludeDates={dateBooking}
    />
  );
};

export {Calendar};