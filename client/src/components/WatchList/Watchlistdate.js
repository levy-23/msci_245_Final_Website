import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const WatchlistDate = ({ enteredDate, setEnteredDate, setCompletedItem }) => {

  //states declarations
  const handleDateChange = (event) => {
    setEnteredDate(event.target.value);
    setCompletedItem(false);
  };
  //constants and functions declarations

  return (
    <>
    
    {/* JSX block */}
    <TextField 
      id="outlined-basic" 
      label="Watch By Date"
      variant="outlined" 
      value={enteredDate} 
      onChange={handleDateChange}
      fullWidth/>


    </>
  );
}

export default WatchlistDate;
