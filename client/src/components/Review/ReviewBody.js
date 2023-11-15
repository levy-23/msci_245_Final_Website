import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ReviewBody = ({ enteredReview, setEnteredReview, setCompletedReview }) => {

  //states declarations
  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
    setCompletedReview(false);
  };
  //constants and functions declarations

  return (
    <>
    
    {/* JSX block */}
    <TextField 
      id="outlined-basic" 
      inputProps={{ maxLength: 200 }} 
      multiline 
      label="Review Body" 
      variant="outlined" 
      maxRows={5} 
      value={enteredReview}
      onChange={handleReviewChange}
      fullWidth/>



    </>
  );
}

export default ReviewBody;