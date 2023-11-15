import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const SearchActor = ({ enteredActor, setEnteredActor, setCompletedSearch }) => {

  //states declarations
  const handleActorChange = (event) => {
    setEnteredActor(event.target.value);
    setCompletedSearch(false);
  };
  //constants and functions declarations

  return (
    <>
    
    {/* JSX block */}
    <TextField 
      id="outlined-basic" 
      label="Search Actor" 
      variant="outlined" 
      value={enteredActor} 
      onChange={handleActorChange}
      fullWidth/>


    </>
  );
}

export default SearchActor;
