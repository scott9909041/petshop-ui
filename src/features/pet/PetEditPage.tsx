import { Box, Typography, Link as StyledLink, CircularProgress, Alert } from '@mui/joy';
import StyledSheet from '../../components/StyledSheet';
import PetForm from './PetForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import usePet from './usePet';
import { UpdatePetResp } from './pet.interface';

export default function PetDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const onUpdateSuccess = (resp: UpdatePetResp) => {
    navigate(`/pet/${resp.id}/view`);
  };
  const { petResult, updatePet, updatePetResult } = usePet({ petId: params.id, onUpdateSuccess });
  const { data: pet, isLoading, isSuccess, isError } = petResult;
  const { isPending, error } = updatePetResult;
  const cancel = () => {
    navigate('/pet/serach');
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
          <Link to={-1 as any}>
            <StyledLink
              component='button'
              color='neutral'
            >
              Back
            </StyledLink>
          </Link>
        </Box>
        <Typography level='body-sm'>Click the edit link if to update the information.</Typography>
      </Box>
      {isLoading && <CircularProgress size='sm' />}
      {isSuccess && (
        <PetForm
          pet={pet}
          disabled={false}
          submitButtonText='Update'
          submitHandler={updatePet}
          cancelHandler={cancel}
          isLoading={isPending}
          error={error}
        />
      )}
      {isError && (
        <Alert
          variant='soft'
          color='danger'
        >
          Something went wrong.
        </Alert>
      )}
    </StyledSheet>
  );
}
