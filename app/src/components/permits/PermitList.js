import { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Tooltip, Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Moment from "react-moment";
import { Delete, Edit } from "@mui/icons-material";
import PermitForm from "./PermitForm";
import { Con } from "../../controller/Permit";
import { usePickerState } from "@mui/x-date-pickers/internals/hooks/usePickerState";
const moment = require("moment");
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
  const [rowVal, setRowVal] = useState();

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
      if (!confirm(`Are you sure you want to delete ${row.getValue("businessName")}`)) {
        return;
      }
      Con.Delete(row.getValue("permitNum"));
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );
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
        accessorKey: "attachment1",
        header: "Attachment1",
        columnDefType: "file",
      },
      {
        accessorKey: "attachment2",
        header: "Attachment2",
        columnDefType: "file",
      },
      {
        accessorKey: "attachment3",
        header: "Attachment3",
        columnDefType: "file",
      },
    ],
    []
  );

  const openEdit = (row, table) => {
    var currentRow = [];
    let dateIssued = moment();

    for (const [key, value] of Object.entries(row.original)) {
      if (value != null) {
        let x = moment(value);
        currentRow[key] = key === "valid" ? x.format("MMMM DD, YYYY") : value;
      } else {
        currentRow[key] = key === "issued" ? dateIssued.format("MMMM DD, YYYY") : "";
      }
    }

    const result = Object.fromEntries(Object.entries(currentRow));
    row["original"] = result;
    row["_valuesCache"] = result;

    setRowVal(result);
    console.log(rowVal);
    /*console.log(result); */
    setCreateModalOpen(true);

    /*  table.setEditingRow(row); */
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
              New Permit
            </Button>
          </Box>
        )}
        renderRowActions={({ cell, row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement='left' title='Edit'>
              <IconButton onClick={() => openEdit(row, table)}>
                <Edit />
              </IconButton>
            </Tooltip>
            {/*  <Tooltip arrow placement='left' title='Edit'>
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip> */}
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

      <PermitForm columns={columns} open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreateNewRow} onRefetch={refetch} rowVal={rowVal}></PermitForm>
    </Box>
  );
};

export default PermitList;
