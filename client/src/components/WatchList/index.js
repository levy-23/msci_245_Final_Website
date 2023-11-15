import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import WatchListSelection from './WatchListSelection';
import Watchlistdate from './Watchlistdate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

const pages = [{
  title: 'Home',
  path: '/'
},{
  title: 'Search',
  path: '../Search'
},{
  title: 'Review',
  path: '../Review'
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

const WatchList = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [completedItem, setCompletedItem] = useState(false);
    const [items, setItems] = useState([]);
    const [userId, setUserId] = useState(1);
    const [enteredDate, setEnteredDate] = useState('');
    const [watchlistID, setWatchlistID] = useState('');

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
      
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      setWatchlistID(value); 
      removeWatchlist();
      if (currentIndex === -1) {
        newChecked.push(value);
        
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };


  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(()=> {
    fetchWatchlist();
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
      console.log("normal moview data: ");
      console.log(data);
      setMovies(data);
      console.log("normal movies: ");
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await fetch('/api/getWatchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching movies');
      }
  
      const data = await response.json();
      console.log("watchlist data: ");
      console.log(data);
      setItems(data);
      console.log("Items: ");
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  };

    const handleSubmit = (movieItem, movieDate) => {
        // setItems(prevState => ({
        //     arrayvar: [...prevState.arrayvar, movieItem]
        //   }))
        addWatchlist();
        //getWatchlist();
        setSelectedMovie('');
        setEnteredDate('');
    }

    const getMovieId = (movie) => {
      for(let i=0; i<movies.length; i++){
        if(movies[i].name == movie) return movies[i].id;
      }
    };
  
    const addWatchlist = () => {
  
      callApiAddWatchlist().then((res) =>{
        getWatchlist();
      });
      console.log("post call api")
    };

    const getWatchlist = () => {
      fetchWatchlist().then((res) => {

      });
    }

    const removeWatchlist = () => {
      callApiRemoveWatchlist().then((res) => {
        getWatchlist();
      });
    }
  
    const serverUrl = "";
  
    const callApiAddWatchlist = async () => {
      const url = serverUrl + "/api/addWatchlist";
      console.log(url);
  
      const movieID = getMovieId(selectedMovie);
  
  
  
      const myBody = {
          watchByDate: enteredDate,
          movieName: selectedMovie,
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

  const callApiRemoveWatchlist = async () => {
    const url = serverUrl + "/api/removeWatchlist";
    console.log(url);

    const movieID = getMovieId(selectedMovie);



    const myBody = {
      watchlistID: watchlistID,
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

    return (
        <>
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
                            href="./WatchList"
                            sx={{
                              mr: 2,
                              display: { xs: 'none', md: 'flex' },
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                            }}
                          >
                            Watchlist
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
            <Container>
        <Grid 
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                  
                <Grid item >
                <Typography variant="h3" color="inherit" noWrap>
                        Build a WatchList 
                    </Typography>
                </Grid>
                
                <Grid item xs={8}></Grid>
                <Grid item xs = {4}>
                    <WatchListSelection
                    movies={movies}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    setCompletedItem={setCompletedItem}/>
                </Grid>
                <Grid item xs={4}>
                  <Watchlistdate enteredDate={enteredDate} setEnteredDate={setEnteredDate} setCompletedItem={setCompletedItem}/>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item>
                    <Button 
                    variant="contained"
                    onClick={() => handleSubmit(selectedMovie, enteredDate)}>
                        Add Movie
                    </Button>
                </Grid> 
                <Grid item xs={12}></Grid>

        </Grid>
        </Container>
        <Grid 
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                  <Grid item>
                  <Typography variant="h4" color="inherit" noWrap marginLeft="15px">
                        WatchList 
                    </Typography>
                </Grid>
                {/*Remove from grading from here */}
                <Grid item>
                <Typography variant="h10" color="inherit" noWrap marginLeft="15px">
                        Note explaining functionality (added to help grading, should be removed): From the top you may add movies to a watchlist and the date you aim to watch the movies by.
                        </Typography>
                </Grid>
                <Grid item>
                <Typography variant="h10" color="inherit" noWrap marginLeft="15px">
                        Below you can see your watchlist which is populated from a new table in the database. You may toggle to list.
                    </Typography>
                </Grid>
                <Grid item>
                <Typography variant="h10" color="inherit" noWrap marginLeft="15px">
                         Once the user watches the movie, they should check the list item. They user may want to see all their watch movies. 
                    </Typography>
                </Grid>
                <Grid item>
                <Typography variant="h10" color="inherit" noWrap marginLeft="15px">
                        If the user is done with this list item, they should check it again after they watched it and the list item will delete itself from the database.
                    </Typography>
                </Grid>
                {/*Remove from grading to here */}
              </Grid>
                    
                    
                    
                    
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {items.map((value) => {
              const labelId = `checkbox-list-label-${value.watchlistID}`;
                          
              return (
                <ListItem
                  key={value.watchlistID}
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={handleToggle(value.watchlistID)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value.watchlistID) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.movieName} secondary={value.watchByDate}/>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </>
    );
}

export default WatchList;
