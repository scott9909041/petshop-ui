import axios from 'axios';
import { CreatePetReq, CreatePetResp, Pet, QueryPetReq, UpdatePetResp } from './pet.interface';
import { API_URL } from '../../lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface usePetProps {
  queryPetReq?: QueryPetReq;
  petId?: string;
  onCreateSuccess?: (resp: CreatePetResp) => void;
  onUpdateSuccess?: (resp: UpdatePetResp) => void;
}

interface SearchPetResult {
  data?: Pet[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface PetResult {
  data?: Pet;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface CreatePetResult {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

interface UpdatePetResult {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

interface usePetReturn {
  petResult: PetResult;
  searchPetResult: SearchPetResult;
  createPetResult: CreatePetResult;
  createPet: (pet: Pet) => void;
  updatePetResult: CreatePetResult;
  updatePet: (pet: Pet) => void;
}

export default function usePet(props: usePetProps): usePetReturn {
  const { queryPetReq, petId, onCreateSuccess, onUpdateSuccess } = props;
  const queryClient = useQueryClient();

  const {
    data: searchPets,
    isLoading: isSearchLoading,
    isSuccess: isSearchSuccess,
    isError: isSearchError,
  } = useQuery<Pet[]>({
    queryKey: ['pets', queryPetReq],
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    queryFn: () => axios.post<Pet[]>(`${API_URL}/pet/query`, queryPetReq).then((resp) => resp.data || []),
    enabled: !!queryPetReq,
  });

  const searchPetResult: SearchPetResult = {
    data: searchPets,
    isLoading: isSearchLoading,
    isSuccess: isSearchSuccess,
    isError: isSearchError,
  };

  const {
    data: pet,
    isLoading: isPetLoading,
    isSuccess: isPetSuccess,
    isError: isPetError,
  } = useQuery<Pet>({
    queryKey: ['pets', petId],
    queryFn: () => axios.get<Pet>(`${API_URL}/pet/${petId}`).then((resp) => resp.data),
    enabled: !!petId,
  });

  const petResult: PetResult = {
    data: pet,
    isLoading: isPetLoading,
    isSuccess: isPetSuccess,
    isError: isPetError,
  };

  const {
    mutate: mutatePost,
    isPending: isPostPending,
    isSuccess: isPostSuccess,
    isError: isPostError,
    error: postError,
  } = useMutation({
    mutationFn: (pet: CreatePetReq) => axios.post<CreatePetResp>(`${API_URL}/pet`, pet).then((resp) => resp.data),
    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: ['pets'] }).catch(() => {});
      onCreateSuccess?.(resp);
    },
  });

  const createPet = (pet: CreatePetReq) => {
    mutatePost(pet);
  };

  const createPetResult: CreatePetResult = {
    isPending: isPostPending,
    isSuccess: isPostSuccess,
    isError: isPostError,
    error: postError,
  };

  const {
    mutate: mutatePatch,
    isPending: isPatchPending,
    isSuccess: isPatchSuccess,
    isError: isPatchError,
    error: patchError,
  } = useMutation({
    mutationFn: (pet: Pet) => axios.patch<UpdatePetResp>(`${API_URL}/pet/${pet.id}`, pet).then((resp) => resp.data),
    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: ['pets', pet?.id] }).catch(() => {});
      onUpdateSuccess?.(resp);
    },
  });

  const updatePet = (pet: Pet) => {
    mutatePatch(pet);
  };

  const updatePetResult: UpdatePetResult = {
    isPending: isPatchPending,
    isSuccess: isPatchSuccess,
    isError: isPatchError,
    error: patchError,
  };

  return {
    petResult,
    searchPetResult,
    createPetResult,
    createPet,
    updatePetResult,
    updatePet,
  };
}
