import "./App.css";
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";

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

export interface RickAndMortyApiResponse {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: RickAndMortyListElement[];
}

export interface RickAndMortyListPage {
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

export interface RickAndMortyApiRequest {
  pagination: {
    page: number;
  };
  filters: {
    name: string;
  };
}

export function makeAnEndpointCallRickAndMorty(
  request: RickAndMortyApiRequest
): Promise<RickAndMortyListPage> {
  return fetch(
    `https://rickandmortyapi.com/api/character?page=${request.pagination.page}&name=${request.filters.name}`
  )
    .then((result) => result.json() as Promise<RickAndMortyApiResponse>)
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

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Avatar",
    width: 150,
    disableColumnMenu: true,
    filterable: false,
    hideSortIcons: true,
    sortable: false,
    renderCell: (params) => {
      return (
        <div>
          <img src={params.value} width={100} height={100} />
        </div>
      );
    },
  },
  { field: "name", headerName: "Name", width: 250, sortable: false },
  { field: "species", headerName: "Species", width: 150, sortable: false },
  { field: "status", headerName: "Status", width: 150, sortable: false },
];

function App() {
  const [data, setData] = React.useState<RickAndMortyListPage>({
    dataSource: [],
    pagination: { pageSize: 0, page: 0, totalItems: 0 },
  });
  const [request, setRequest] = React.useState<RickAndMortyApiRequest>({
    filters: { name: "" },
    pagination: { page: 0 },
  });
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    makeAnEndpointCallRickAndMorty(request).then((item) => setData(item));
  }, [request]);

  React.useEffect(() => {
    const debounceFunction = setTimeout(() => {
      setRequest({
        filters: { name: inputValue },
        pagination: { page: 0 },
      });
    }, 500);

    return () => clearTimeout(debounceFunction);
  }, [inputValue]);

  const onPageChange = (pagination: GridPaginationModel) =>
    setRequest({ ...request, pagination: { page: pagination.page } });

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

    return (
    <div style={{ height: 650, width: "100%" }}>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        onChange={onTextChange}
      />
      <DataGrid
        rows={data.dataSource}
        columns={columns}
        rowCount={data.pagination.totalItems}
        rowHeight={120}
        disableColumnMenu={true}
        disableColumnFilter={true}
        disableColumnSelector={true}
        paginationMode="server"
        paginationModel={data.pagination}
        onPaginationModelChange={onPageChange}
        disableRowSelectionOnClick
        pageSizeOptions={[20]}
      />
    </div>
  );
}

export default App;
