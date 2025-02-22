import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#A76571', 
        padding: '1rem',
        textAlign: 'center',
        marginTop: 'auto'
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} CodeCraft Intranet Labs. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
