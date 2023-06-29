export interface CharactersListPage {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
  };
  dataSource: {
    id: string;
    image: string;
    name: string;
    gender: string;
    status: string;
  }[];
}

export interface CharactersListApiRequest {
  pagination: {
    page: number;
  };
  filters: {
    name: string;
  };
}

export interface CharacterDetailPage {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
}
