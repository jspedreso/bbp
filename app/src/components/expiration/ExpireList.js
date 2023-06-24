import { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Tooltip, IconButton, Typography, createTheme, ThemeProvider } from "@mui/material";
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

  const cellDisplay = (cell, row) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography sx={{ color: setCellColor(row) }}>{cell.getValue()}</Typography>
      </Box>
    );
  };

  const TEST = (isDetailPanel, row, table) => {
    console.log(isDetailPanel);
  };

  const setCellColor = (rowValue) => {
    var remainingDays = rowValue.original.remainingDays;
    var color = "#000000";
    if (remainingDays > 30 && remainingDays < 60) {
      color = "##ff6666"; //orange
    } else if (remainingDays > 0 && remainingDays < 30) {
      color = "#CC5500";
    } else if (remainingDays > 60 && remainingDays <= 90) {
      color = "#f1c232"; //yellow
    } else if (remainingDays > 90) {
      color = "#274e13";
    } else if (remainingDays < 0) {
      color = "#cc0000";
    }

    return color;
  };
  const ccc = {
    /*  style: { ".MuiTableRow-root": "#000000" }, */
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "permitNum",
        header: "Permit Num",
        enableEditing: false,
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      /*  {
        accessorKey: "businessName",
        header: "Business Name",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      }, */
      {
        accessorKey: "natureOfBusiness",
        header: "Nature of Business",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      /* {
        accessorKey: "location",
        header: "Location",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      }, */
      {
        accessorKey: "proprietor",
        header: "Proprietor",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      {
        accessorKey: "address",
        header: "Address",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      {
        accessorKey: "issued",
        header: "Date Issued",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      {
        accessorKey: "valid",
        header: "Valid Until",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      {
        accessorKey: "latitude",
        header: "Lat",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      {
        accessorKey: "longitude",
        header: "Long",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
      },
      {
        accessorKey: "remainingDays",
        header: "Days Remaining",
        columnDefType: "file",
        Cell: ({ cell, row }) => cellDisplay(cell, row),
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

  const tableTheme = () =>
    createTheme({
      components: {
        muiTableBodyProps: {
          muiTableRow: {
            root: {
              background: "#000",
            },
          },
        },
      },
    });
  return (
    <Box component='main' sx={{ ml: 30 }}>
      {/*   <ThemeProvider theme={tableTheme}> */}
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
        renderDetailPanel={({ row }) => (
          <div>
            <span>First Name: {row.original.businessName}</span>
            <span>Last Name: {row.original.location}</span>
          </div>
        )}
        muiTableBodyProps={ccc}
      />
      {/* </ThemeProvider> */}
      {createModalOpen && (
        <ExpireForm columns={columns} open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreateNewRow} onRefetch={refetch} rowVal={rowVal} isEdit={isEdit} />
      )}
    </Box>
  );
};

export default ExpireList;
