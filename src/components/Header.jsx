import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MaterialUISwitch from './MaterialUISwitch.jsx';
import { NameContext } from '../context/NameContext.jsx';
import { useAuthContext } from '@asgardeo/auth-react';


export default function Header() {
  const { name } = useContext(NameContext);
  const { state, signIn, signOut } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#A76571' }}>
        <Toolbar>
        <Box 
  component={Link} 
  to="/" 
  sx={{ 
    mr: 2, 
    display: 'flex', 
    alignItems: 'center', 
    textDecoration: 'none', 
    height: '64px', // Match AppBar's default height
    '& img': {
      maxHeight: '48px', // Adjust image size to fit neatly
      width: 'auto'
    },
    '&:hover': { filter: 'brightness(0.8)', opacity: 0.8 }
  }}
>
  <img src="/whitelogo.png" alt="Logo" />
</Box>




          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {name || 'Guest'} to CodeCraft Intranet
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/values">Values</Button>
          <Button color="inherit" component={Link} to="/events">Events</Button>
          <Button color="inherit" component={Link} to="/latest-event">Latest Event</Button>
          <Button color="inherit" component={Link} to="/emp-mgmt">Employee Management</Button>

          {state.isAuthenticated ? (
            <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>
          ) : (
            <Button color="inherit" onClick={() => signIn()}>Sign In</Button>
          )}

          <MaterialUISwitch />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
