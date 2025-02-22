import React, { useContext, useState } from 'react';
import { NameContext } from '../context/NameContext.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const NameInput = () => {
  const { setName } = useContext(NameContext);
  const [inputName, setInputName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setName(inputName);
    setInputName('');
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Enter your name"
            variant="outlined"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Removes the inner border
              },
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </section>
  );
};

export default NameInput;
