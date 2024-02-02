import { Box, Button, Divider, FormControl, FormLabel, Input, Typography } from '@mui/joy';
import StyledSheet from '../../components/StyledSheet';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PetSearchPage() {
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();

  const searchPet = () => {
    navigate({
      pathname: '../list',
      search: createSearchParams({ name: searchName }).toString(),
    });
  };

  const goCreatePet = () => {
    navigate({
      pathname: '../create',
    });
  };

  return (
    <StyledSheet>
      <Box>
        <Typography component='h1'>OSP Pet Shop Management System</Typography>
        <Typography level='body-sm'>Enter search condition to start</Typography>
      </Box>
      <FormControl>
        <FormLabel>Pet Name</FormLabel>
        <Input
          name='pet-name'
          type='text'
          placeholder='Enter complete name'
          value={searchName}
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
      </FormControl>
      <Button
        onClick={searchPet}
        sx={{ mt: 1 }}
      >
        Search
      </Button>
      <Divider />
      <Button
        onClick={goCreatePet}
        sx={{ mt: 1 }}
        color='success'
      >
        Create New Pet
      </Button>
    </StyledSheet>
  );
}
