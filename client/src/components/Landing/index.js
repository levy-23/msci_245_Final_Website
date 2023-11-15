import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const pages = [{
        title: 'Search',
        path: './Search'
    },{
        title: 'Watchlist',
        path: './WatchList'
    },{
        title: 'Review',
        path: './Review'
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

  const popcornImage = "https://static.vecteezy.com/system/resources/previews/013/455/136/original/night-open-air-cinema-on-lawn-in-city-park-free-vector.jpg";

  const containerStyleBody = {
    backgroundImage: `url(${popcornImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "calc(100vh - 64px)", // Subtract the height of your top app bar here (64px is a common height)
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const paperStyle = {
    padding: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    textAlign: "center", 
    marginTop: "20px"
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "400px",
    height: "auto",
  };

const Landing = () => {
    const navigate = useNavigate();

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
                            href="/"
                            sx={{
                              mr: 2,
                              display: { xs: 'none', md: 'flex' },
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                            }}
                          >
                            Home
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


            <Container maxWidth="xl" style={containerStyleBody}>
                <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: "100%", marginTop: "20px"  }}>
                    {/* <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={paperStyle}>
                        <img src={popcornImage} alt="Popcorn" style={imageStyle} />
                    </Paper>
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} style={paperStyle}>
                            <Typography variant="h4" gutterBottom>
                                Welcome to Movie Explorer!
                            </Typography>
                            <Typography variant="body1">
                                Search for your favorite movies, add reviews, and create your watchlist!
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </>
    );
}

export default Landing;
