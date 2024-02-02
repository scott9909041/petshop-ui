import { Box, Typography, Link as StyledLink, CircularProgress, Alert } from '@mui/joy';
import StyledSheet from '../../components/StyledSheet';
import PetForm from './PetForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import usePet from './usePet';

export default function PetDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { petResult } = usePet({ petId: params.id });
  const { data: pet, isLoading, isSuccess, isError } = petResult;
  const cancel = () => {
    navigate(-1);
  };

  return (
    <StyledSheet>
      <Box>
        <Box
          sx={{
            display: 'fex',
            justifyContent: 'space-between',
          }}
        >
          <Typography component='h1'>Pet Detail</Typography>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */}
          <Box>
            {isSuccess && (
              <Link to={`/pet/${params.id}/edit`}>
                <StyledLink
                  component='button'
                  sx={{
                    mr: 2,
                  }}
                >
                  Edit
                </StyledLink>
              </Link>
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */}
            <Link to={-1 as any}>
              <StyledLink
                component='button'
                color='neutral'
              >
                Back
              </StyledLink>
            </Link>
          </Box>
        </Box>
        {isSuccess && <Typography level='body-sm'>Click the edit link if to update the information.</Typography>}
      </Box>
      {isLoading && <CircularProgress size='sm' />}
      {isSuccess && (
        <PetForm
          pet={pet}
          disabled={true}
          cancelHandler={cancel}
          hideSubmitBtn={true}
          hideCancelBtn={true}
        />
      )}
      {isError && (
        <Alert
          variant='soft'
          color='danger'
        >
          Failed to load the specified pet.
        </Alert>
      )}
    </StyledSheet>
  );
}
