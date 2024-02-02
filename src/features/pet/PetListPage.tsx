import { Alert, Box, Typography, Link as StyledLink, CircularProgress } from '@mui/joy';
import StyledSheet from '../../components/StyledSheet';
import { Link, useSearchParams } from 'react-router-dom';
import usePet from './usePet';
import PetTable from './PetTable';

export default function PetListPage() {
  const [params] = useSearchParams();
  const name = params.get('name');
  const { searchPetResult } = usePet({ queryPetReq: name ? { name } : undefined });
  const { data: pets = [], isLoading, isSuccess, isError } = searchPetResult;

  return (
    <StyledSheet
      sx={{
        width: 600,
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'fex',
            justifyContent: 'space-between',
          }}
        >
          <Typography component='h1'>Search Result</Typography>
          <Link
            to={{
              pathname: `../serach`,
            }}
          >
            <StyledLink
              component='button'
              color='neutral'
            >
              Back
            </StyledLink>
          </Link>
        </Box>
        {isSuccess && <Typography level='body-sm'>There are {pets.length} results:</Typography>}
      </Box>
      {isLoading && <CircularProgress size='sm' />}
      {isSuccess && <PetTable pets={pets} />}
      {isError && (
        <Alert
          variant='soft'
          color='danger'
        >
          Failed to load pet data.
        </Alert>
      )}
      <PetTable pets={pets} />
    </StyledSheet>
  );
}
