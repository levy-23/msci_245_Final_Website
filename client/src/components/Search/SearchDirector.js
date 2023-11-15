import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const SearchDirector = ({ enteredDirector, setEnteredDirector, setCompletedSearch }) => {

  //states declarations
  const handleDirectorChange = (event) => {
    setEnteredDirector(event.target.value);
    setCompletedSearch(false);
  };
  //constants and functions declarations

  return (
    <>
    
    {/* JSX block */}
    <TextField 
      id="outlined-basic" 
      label="Search Director" 
      variant="outlined" 
      value={enteredDirector} 
      onChange={handleDirectorChange}
      fullWidth/>


    </>
  );
}

export default SearchDirector;
