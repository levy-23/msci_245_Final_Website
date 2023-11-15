import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ReviewTitle = ({ enteredTitle, setEnteredTitle, setCompletedReview }) => {

  //states declarations
  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
    setCompletedReview(false);
  };
  //constants and functions declarations

  return (
    <>
    
    {/* JSX block */}
    <TextField 
      id="outlined-basic" 
      label="Review Title" 
      variant="outlined" 
      value={enteredTitle} 
      onChange={handleTitleChange}
      fullWidth/>


    </>
  );
}

export default ReviewTitle;
