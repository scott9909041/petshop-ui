import { Box, Typography } from '@mui/joy';
import StyledSheet from '../../components/StyledSheet';
import PetForm from './PetForm';
import { useNavigate } from 'react-router-dom';
import usePet from './usePet';
import { CreatePetResp } from './pet.interface';

export default function PetCreatePage() {
  const navigate = useNavigate();
  const onCreateSuccess = (resp: CreatePetResp) => {
    navigate(`/pet/${resp.id}/view`);
  };
  const { createPet, createPetResult } = usePet({ onCreateSuccess });
  const { isPending, error } = createPetResult;
  const cancel = () => {
    navigate('/pet/serach');
  };

  return (
    <StyledSheet>
      <Box>
        <Typography component='h1'>Create pet</Typography>
        <Typography level='body-sm'>Enter detail information and click create button.</Typography>
      </Box>
      <PetForm
        submitButtonText='Create'
        submitHandler={createPet}
        cancelHandler={cancel}
        isLoading={isPending}
        error={error}
      />
    </StyledSheet>
  );
}
