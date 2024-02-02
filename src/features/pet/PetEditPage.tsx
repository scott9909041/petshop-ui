import { Box, Typography, CircularProgress, Alert } from '@mui/joy';
import StyledSheet from '../../components/StyledSheet';
import PetForm from './PetForm';
import { useNavigate, useParams } from 'react-router-dom';
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
    navigate(-1);
  };

  return (
    <StyledSheet>
      <Box>
        <Typography component='h1'>Pet Detail</Typography>
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
