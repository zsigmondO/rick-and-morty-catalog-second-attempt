import {
  CharacterDetailPage,
  CharactersListApiRequest,
  CharactersListPage,
} from "./characters";

interface CharacterApiListElement {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string[];
  location: string[];
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharactersApiResponse {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: CharacterApiListElement[];
}

export function getCharacters(
  request: CharactersListApiRequest
): Promise<CharactersListPage> {
  return fetch(
    `https://rickandmortyapi.com/api/character?page=${request.pagination.page}&name=${request.filters.name}`
  )
    .then((result) => result.json() as Promise<CharactersApiResponse>)
    .then((response) => {
      return {
        pagination: {
          page: request.pagination.page,
          pageSize: 20,
          totalItems: response.info.count,
        },
        dataSource: response.results.map((item) => ({
          id: item.id,
          image: item.image,
          name: item.name,
          species: item.species,
          status: item.status,
        })),
      } as any;
    })
    .catch(() => ({
      pagination: {
        page: 0,
        pageSize: 20,
        totalItems: 0,
      },
      dataSource: [],
    }));
}

interface CharacterApiResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export function getCharacter(id: number): Promise<CharacterDetailPage> {
  return fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(async (result) => {
      return (result.json() as Promise<CharacterApiResponse>).then(
        (response) => ({
          id: response.id,
          name: response.name,
          status: response.status,
          species: response.species,
          type: response.type,
          gender: response.gender,
          image: response.image,
          created: response.created,
        })
      );
    })
    .catch(() => ({
      id: 577,
      name: "Your ID is invalid",
      status: "It's either too large",
      species: "Or not a valid natural number",
      type: "This is a fallback",
      gender: "You can ignore",
      image: "This message",
      created: "(type a number after /profile/ e.g. /profile/577)",
    }));
}
