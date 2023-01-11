import { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Tooltip, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import ExpireForm from "./ExpireForm";
import { Con } from "../../controller/Expire";
import { styled } from "@mui/material/styles";
import "../../css/expiration.css";
import { green } from "@mui/material/colors";

const ExpireList = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  /*   const [globalFilter, setGlobalFilter] = useState(""); */
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [isEdit, setEdit] = useState(false);

  const { data, isError, isFetching, isLoading, refetch } = Con.Get({
    tableData: "table-data",
    colFilters: columnFilters,
    /* globFilters: globalFilter, */
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting: sorting,
  });
  const [tableData, setTableData] = useState([]);
  const [rowVal, setRowVal] = useState();

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "permitNum",
        header: "Permit Num",
        enableEditing: false,
      },
      {
        accessorKey: "businessName",
        header: "Business Name",
      },
      {
        accessorKey: "natureOfBusiness",
        header: "Nature of Business",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "proprietor",
        header: "Proprietor",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "issued",
        header: "Date Issued",
      },
      {
        accessorKey: "valid",
        header: "Valid Until",
      },
      {
        accessorKey: "latitude",
        header: "Lat",
      },
      {
        accessorKey: "longitude",
        header: "Long",
      },
      {
        accessorKey: "remainingDays",
        header: "Days Remaining",
        columnDefType: "file",
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img alt='avatar' height={30} src={row.original.avatar} loading='lazy' style={{ borderRadius: "50%" }} />
            <Typography sx={{ color: green }}>{cell.getValue()}</Typography>
          </Box>
        ),
      },
      /*       {
        accessorKey: "attachment2",
        header: "Attachment2",
        columnDefType: "file",
      },
      {
        accessorKey: "attachment3",
        header: "Attachment3",
        columnDefType: "file",
      }, */
    ],
    []
  );

  const test = {
    style: { "background-color": "#0000" },
  };

  const getColor = () => {};

  const checkRemaining = (row) => {
    var sx;
    if (row.getValue("remainingDays") > 60) {
    }
    return sx;
  };

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
        /*  onEditingRowSave={handleSaveRowEdits} */
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
        muiTableBodyRowProps={({ isDetailPanel, row, table }) => {
          checkRemaining(row);
        }}
      />

      {createModalOpen && (
        <ExpireForm columns={columns} open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreateNewRow} onRefetch={refetch} rowVal={rowVal} isEdit={isEdit} />
      )}
    </Box>
  );
};

export default ExpireList;
