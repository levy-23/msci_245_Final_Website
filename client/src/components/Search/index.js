import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import SearchTitle from './SearchTitle';
import SearchActor from './SearchActor';
import SearchDirector from './SearchDirector';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'movie', label: 'Movie Name', minWidth: 170 },
    { id: 'Director_Name', label: 'Director Names', minWidth: 100 },
    { id: 'Review_Content', label: 'Reviews', minWidth: 100 },
    { id: 'Average_Rating', label: 'Average Rating', minWidth: 100 },
  ];


const pages = [{
    title: 'Home',
    path: '/'
  },{
    title: 'Watchlist',
    path: '../WatchList'
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

const Search = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredDirector, setEnteredDirector] = useState('');
    const [enteredActor, setEnteredActor] = useState('');
    const [completedSearch, setCompletedSearch] = useState(false);
    const [completedSearchTitle, setCompletedSearchTitle] = useState(false);
    const [completedSearchDirector, setCompletedSearchDirector] = useState(false);
    const [completedSearchActor, setCompletedSearchActor] = useState(false);
    const [searchResults, setSearchResults] = useState({});
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    function createData(movieName, directors, reviews, avgRating) {
        return { movieName, directors, reviews, avgRating};
      };
    

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

    const addSearch = () => {

        callApiGetSearchMovies().then((res) =>{
        
        });
    };

    const serverUrl = "";

  const callApiGetSearchMovies = async () => {
    const url = serverUrl + "/api/getSearchedMovies";
    console.log(url);

    // const movieID = getMovieId(selectedMovie);
    // console.log("movieID: " + movieID);

    const myBody = {
      searchTitle: enteredTitle,
      searchDirector: enteredDirector,
      searchActor: enteredActor,
    };
    console.log("myBody on next line: ");
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
        console.log("body0 (next line ): ");
        console.log(body[0]);
        setSearchResults(body[0]);
        console.log("body full (next line ): ");
        console.log(body);
        setRows(body);
        if (response.status !== 200) throw Error(body.message);
        return body;

    } catch (error) {
      console.log(error);
    }
    
}
    

    const handleSubmit = () => {
        addSearch();
        setCompletedSearch(true);
    };

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
                            href="./Search"
                            sx={{
                              mr: 2,
                              display: { xs: 'none', md: 'flex' },
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                            }}
                          >
                            Search
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
                <Grid item>
                <Typography variant="h3" color="inherit" noWrap>
                        Search Movies
                    </Typography>
                </Grid> 
                <Grid itme xs={8}>

                </Grid>
                <Grid item xs={4}>
                    <SearchTitle enteredTitle={enteredTitle} setEnteredTitle={setEnteredTitle} setCompletedSearch={setCompletedSearch}/>
                </Grid>
                <Grid item xs={4}>
                    <SearchDirector enteredDirector={enteredDirector} setEnteredDirector={setEnteredDirector} setCompletedSearch={setCompletedSearch}/>
                </Grid>
                <Grid item xs={4}>
                    <SearchActor enteredActor={enteredActor} setEnteredActor={setEnteredActor} setCompletedSearch={setCompletedSearch}/>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item>
                    <Button 
                    variant="contained"
                    onClick={handleSubmit}>
                        Search
                    </Button>
                </Grid>
                
            </Grid> 
            </Container>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              console.log("column.id :   ")
                              console.log(column.id);
                              console.log("row[column.id] :   ")
                              console.log(row[column.id]);
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
        </>

    );
}

export default Search;
