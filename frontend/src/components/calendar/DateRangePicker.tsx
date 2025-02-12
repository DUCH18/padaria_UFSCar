import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useContext } from 'react';
import { HandleChartsContext } from '../../contexts/charts/HandleChartsContext';

export const DateRangePicker = () => {
  const {
    dateRange,
    handleRangeChange
  } = useContext(HandleChartsContext);

  return (
    <DateRange
      ranges={dateRange}
      onChange={handleRangeChange}
      color='#F59E0B'
      rangeColors={['#F59E0B']}
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      months={1}
      direction="horizontal"
      maxDate={new Date()}
      minDate={new Date(2020, 0, 1)}
    />
  )
}
