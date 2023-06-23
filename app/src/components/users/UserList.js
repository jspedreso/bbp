import { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Tooltip, Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Delete, Edit } from "@mui/icons-material";
import UserForm from "./UserForm";
import { Con } from "../../controller/User";

const PermitList = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  /*   const [globalFilter, setGlobalFilter] = useState(""); */
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isError, isFetching, isLoading, refetch } = Con.Get({
    tableData: "table-data",
    colFilters: columnFilters,
    /* globFilters: globalFilter, */
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting: sorting,
  });
  const [tableData, setTableData] = useState([]);
  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const onRefetch = () => {
    refetch();
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    Con.Update(values);
    tableData[row.index] = values;
    //send/receive api updates here, then refetch or update local table data for re-render
    onRefetch();
    setTableData([...tableData]);

    exitEditingMode(); //required to exit editing mode and close modal
  };

  const handleDeleteRow = useCallback(
    (row) => {
      /*   console.log(row); */
      // eslint-disable-next-line no-restricted-globals
      if (!confirm(`Are you sure you want to delete ${row.getValue("lastName")}`)) {
        return;
      }
      Con.Delete(row.getValue("userId"));
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: "userId",
        header: "User Id",
        enableEditing: false,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "accountType",
        header: "Account Type",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "password",
        header: "Password",
      },
    ],
    []
  );

  return (
    <Box sx={{ ml: 30 }}>
      <MaterialReactTable
        columns={columns}
        /*  data={data?.data ?? []} */ //data is undefined on first render
        data={data?.data ?? []} //data is undefined on first render
        editingMode='modal' //default
        enableEditing
        initialState={{ showColumnFilters: true }}
        enableGlobalFilter={false}
        manualFiltering
        manualPagination
        manualSorting
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onEditingRowSave={handleSaveRowEdits}
        /* onGlobalFilterChange={setGlobalFilter} */
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        renderTopToolbarCustomActions={() => (
          <Box>
            <Tooltip arrow title='Refresh Data'>
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button color='secondary' onClick={() => setCreateModalOpen(true)} variant='contained'>
              Create New Account
            </Button>
          </Box>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement='left' title='Edit'>
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        rowCount={data?.meta?.totalRowCount ?? 0}
        state={{
          columnFilters,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching,
          sorting,
          showGlobalFilter: false,
        }}
      />

      <UserForm columns={columns} open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreateNewRow} onRefetch={refetch} />
    </Box>
  );
};

export default PermitList;
