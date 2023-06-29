import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { CharactersListApiRequest, CharactersListPage } from "../characters";
import { getCharacters } from "../api";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
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
    {
      field: "name",
      headerName: "Name",
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Link to={`profile/${params.id}`}>{params.value}</Link>
      ),
    },
    { field: "species", headerName: "Species", width: 150, sortable: false },
    { field: "status", headerName: "Status", width: 150, sortable: false },
  ];

  const [data, setData] = useState<CharactersListPage>({
    dataSource: [],
    pagination: { pageSize: 0, page: 0, totalItems: 0 },
  });
  const [request, setRequest] = useState<CharactersListApiRequest>({
    filters: { name: "" },
    pagination: { page: 0 },
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getCharacters(request).then((item) => setData(item));
  }, [request]);

  useEffect(() => {
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

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) =>
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

export default Home;
