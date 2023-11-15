import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

const MovieSelection = ({ movies, selectedMovie, setSelectedMovie, setCompletedReview }) => {
  const handleChange = (event) => {
    setSelectedMovie(event.target.value);
    setCompletedReview(false);
  };

  console.log("Movies:", movies); // Add this line for debugging

  return (
      <FormControl fullWidth >
      <InputLabel>Select Movie</InputLabel>
      <Select value={selectedMovie} onChange={handleChange}>
        {movies && movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.name}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
  );
};

export default MovieSelection;