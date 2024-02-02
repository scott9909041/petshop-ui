export interface Pet {
  id: string;
  name: string;
  type: string;
  color: string;
  father?: Pet;
  mother?: Pet;
}

export interface SearchPetParams {
  name: string;
}

export interface CreatePetReq {
  name: string;
  type: string;
  color: string;
  fatherId?: string;
  motherId?: string;
}

export interface CreatePetResp {
  id: string;
}

export interface UpdatePetResp {
  id: string;
}
