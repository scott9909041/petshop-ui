import { Alert, Box, Button, CircularProgress, Divider, FormControl, FormLabel, Input } from '@mui/joy';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pet } from './pet.interface';

interface PetFormProps {
  pet?: Pet;
  disabled?: boolean;
  submitButtonText?: string;
  isLoading?: boolean;
  error?: Error | null;
  hideSubmitBtn?: boolean;
  submitHandler?: (pet: Pet) => void;
  cancelHandler: () => void;
}

export default function PetForm({
  pet,
  submitHandler,
  cancelHandler,
  hideSubmitBtn = false,
  submitButtonText = 'Submit',
  disabled = false,
  isLoading = false,
  error,
}: PetFormProps) {
  const { register, handleSubmit } = useForm<Pet>({
    defaultValues: pet,
    disabled,
  });
  const submitValidHandler: SubmitHandler<Pet> = (data) => {
    console.log('here', data);
    submitHandler?.(data);
  };
  const cancelClickHandler = () => {
    cancelHandler();
  };

  return (
    <form onSubmit={handleSubmit(submitValidHandler)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type='text'
            placeholder='Enter complete name'
            {...register('name', { required: true })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input
            type='text'
            placeholder='Enter the breed of the pet'
            {...register('type', { required: true })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Color</FormLabel>
          <Input
            type='text'
            placeholder='Describe the color in text'
            {...register('color')}
          />
        </FormControl>
        {error && (
          <Alert
            variant='soft'
            color='danger'
          >
            {error.message}
          </Alert>
        )}
        <Divider />
        {!hideSubmitBtn && (
          <Button type='submit'>{isLoading ? <CircularProgress size='sm' /> : submitButtonText || 'Submit'}</Button>
        )}
        {!isLoading && (
          <Button
            type='button'
            onClick={cancelClickHandler}
            color='neutral'
          >
            Cancel
          </Button>
        )}
      </Box>
    </form>
  );
}
