import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const pages = [{
  title: 'Home',
  path: '/'
},{
  title: 'Search',
  path: '../Search'
},{
  title: 'Watchlist',
  path: '../WatchList'
}];

const linkStyle = {
display: "flex",
justifyContent: "flex-end",
textDecoration: "none", 
marginRight: "1rem",
cursor: "pointer",
};

const containerStyle = {
display: "flex",
justifyContent: "flex-end", 
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#323E57',
    },
    secondary: {
      main: '#5b6478',
  },
},
});

const containerStyleBody = {
  backgroundColor: "#d7d7d7", 
  backgroundSize: "cover",
  height: "calc(100vh - 64px)", // Subtract the height of your top app bar here (64px is a common height)
};

const divStyle = {
  height: "100vh",
  backgroundColor: "#d7d7d7",
}

const myStyle = {
  backgroundColor: "#d7d7d7",
}

const Review = () => {
    const navigate = useNavigate();

      //states declarations
  //const [movies, setMovies] = useState(['Barbie', 'Spider Man', 'Interstellar', 'Good Will Hunding', 'Fast & Furious']);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [completedReview, setCompletedReview] = useState(false);
  const [reviewData, setReviewData] = useState(null); 
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/getMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching movies');
      }
  
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getMovieId = (movie) => {
    for(let i=0; i<movies.length; i++){
      if(movies[i].name == movie) return movies[i].id;
    }
  };

  const addReview = () => {

    callApiAddReview().then((res) =>{
    
    });
    console.log("post call api")
  };

  const serverUrl = "";

  const callApiAddReview = async () => {
    const url = serverUrl + "/api/addReview";
    console.log(url);

    const movieID = getMovieId(selectedMovie);



    const myBody = {
      reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
        userId: userId,
        movieId: movieID
    };
    console.log(myBody);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
  
        },
        body: JSON.stringify(myBody),
      });
  
  
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("did it work, pre body" + body);
        return body;

    } catch (error) {
      console.log(error);
    }
    
}


  const handleSubmit = () => {
    setSubmitted(true);
  
    if (selectedMovie && enteredTitle && enteredReview && selectedRating) {
      // console.log('Submitting review:', {
      //   reviewTitle: enteredTitle,
      //   reviewContent: enteredReview,
      //   reviewScore: selectedRating,
      //   userId: userId,
      //   movieId: selectedMovie.id,
      // });
  
      const reviewData = {
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
        userId: userId,
        movieId: selectedMovie.id,
      };
  


      addReview();
      

      
      setMovies([...movies, selectedMovie]);
      setReviewData({
        selectedMovie,
        enteredTitle,
        enteredReview,
        selectedRating,
      });
      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');
      setSubmitted(false);
      setCompletedReview(true);
          
    }
  };
  
    return (
        <>
          <ThemeProvider theme={theme}>

          
          <AppBar position="static" style={{background: '#323E57'}}>
                <Container maxWidth="xl">
                    <Toolbar 
                    disableGutters
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 0, // Remove default padding
                        margin: 0, // Remove default margin
                      }}>
                        <Typography 
                            variant="h6"
                            noWrap
                            component="a"
                            href="./Review"
                            sx={{
                              mr: 2,
                              display: { xs: 'none', md: 'flex' },
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                            }}
                          >
                            Review
                        </Typography>
                        <Container style={containerStyle}>
                            {pages.map((page) => (
                                <Link
                                    color="inherit"
                                    style={linkStyle}
                                    onClick={() => navigate(page.path)}
                                >
                                    <Typography variant="h6" color="inherit" noWrap sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        letterSpacing: '.2rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        marginLeft: 0
                                        }}>
                                            {page.title}
                                    </Typography>
                                </Link>
                            ))}
                        </Container>
                        
                    </Toolbar>
                </Container>
            </AppBar>
        <div style={{divStyle}}>
        {/* <Container maxWidth="xl" style={containerStyleBody}> */}
        <Container style={{myStyle}}>


      <Grid 
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >

        <Grid item>
          <Typography variant="h3" component="div">Review a Movie</Typography>
        </Grid>
        <Grid item xs={8}>
          
        </Grid>
        
        
        <Grid item xs={4}>
          <MovieSelection 
          movies={movies}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          setCompletedReview={setCompletedReview}/>
          {submitted && (!selectedMovie  &&
          <Typography variant="h15" style={{color: 'red'}} component="div">Select your movie</Typography>)}
          {completedReview && 
          <Typography variant="h15" style={{color: 'green'}} component="div">Your review has been received</Typography>}
        </Grid>
        <Grid item xs ={12}>
          
        </Grid>
        
        
        <Grid item xs={12}>
          <ReviewTitle enteredTitle={enteredTitle} setEnteredTitle={setEnteredTitle} setCompletedReview={setCompletedReview}/>
          {submitted && (!enteredTitle &&
          <Typography variant="h15" style={{color: 'red'}} component="div">Enter your review title</Typography>)}
          {completedReview && 
          <Typography variant="h15" style={{color: 'green'}} component="div">Your review has been received</Typography>}
        </Grid>
        <Grid item xs ={8}>
          
        </Grid>
        
        
        <Grid item xs={12}>
          <ReviewBody enteredReview={enteredReview} setEnteredReview={setEnteredReview} setCompletedReview={setCompletedReview}/>
          {submitted && (!enteredReview && 
          <Typography variant="h15" style={{color: 'red'}} component="div">Enter your review</Typography>)}
          {completedReview && 
          <Typography variant="h15" style={{color: 'green'}} component="div">Your review has been received</Typography>}
        </Grid>
        
        <Grid item xs ={4}>
          
        </Grid>
        <Grid item xs ={12}>
          
        </Grid>
        <Grid item xs ={12}>
          
        </Grid>
        <Grid item xs ={4}>
          
        </Grid>
        <Grid item>
          <ReviewRating 
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          setCompletedReview={setCompletedReview}/>
          {submitted && (!selectedRating && 
          <Typography variant="h15" style={{color: 'red'}} component="div">Select the rating</Typography>)}
          {completedReview && 
          <Typography variant="h15" style={{color: 'green'}} component="div">Your review has been received</Typography>}
        </Grid>
        <Grid item xs ={4}>
          
        </Grid>
        <Grid item xs ={12}>
          
        </Grid>
        <Grid item xs ={5}>
          
        </Grid>
        
        <Grid item>
          <Button 
          variant="contained"
          onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      {completedReview && reviewData && ( 
        <Grid
          container
          spacing={2}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography variant="h5" style={{ color: 'green' }} component="div">
              Your review has been received
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" component="div">
              Movie: {reviewData.selectedMovie} {/* Use the stored review data */}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" component="div">
              Review Title: {reviewData.enteredTitle}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" component="div">
              Review: {reviewData.enteredReview}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" component="div">
              Rating: {reviewData.selectedRating}
            </Typography>
          </Grid>
        </Grid>
      )}

        </Container>
        </div>
        </ThemeProvider>
        </>
    );
}

export default Review;
