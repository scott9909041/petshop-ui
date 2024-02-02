export interface Pet {
  id: string;
  name: string;
  type: string;
  color: string;
}

export interface SearchPetParams {
  name: string;
}

export interface CreatePetResp {
  id: string;
}

export interface UpdatePetResp {
  id: string;
}
