import "./App.css";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface RickAndMortyListElement {
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

export interface RickAndMortyListPage {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: RickAndMortyListElement[];
}

export interface RickAndMortyApiRequest {
  pagination: {
    currentPage: number;
  };
  filters: {
    name: string;
  };
}

export function makeAnEndpointCallRickAndMorty(
  request: RickAndMortyApiRequest
): Promise<RickAndMortyListPage> {
  return fetch(
    `https://rickandmortyapi.com/api/character?page=${request.pagination.currentPage}&name=${request.filters.name}`
  )
    .then((result) => result.json())
    .then((result) => result as RickAndMortyListPage);
}

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Avatar",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <img src={params.value} width={100} height={100} />
        </div>
      );
    },
  },
  { field: "name", headerName: "Name", width: 250 },
  { field: "gender", headerName: "Gender", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
];

function App() {
  const [data, setData] = React.useState<RickAndMortyListPage>();

  React.useEffect(() => {
    makeAnEndpointCallRickAndMorty({
      filters: { name: "" },
      pagination: { currentPage: 3 },
    }).then((item) => setData(item));
  }, []);

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={data?.results || []}
        columns={columns}
        rowCount={data?.results.length}
        rowHeight={120}
        paginationMode="server"
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20]}
      />
    </div>
  );
}

export default App;
