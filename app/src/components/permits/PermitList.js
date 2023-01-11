import { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Tooltip, Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify";

import { Delete, Edit } from "@mui/icons-material";
import PermitForm from "./PermitForm";
import { Con } from "../../controller/Permit";
/* import { resolveTo } from "@remix-run/router"; */

const toasterCss = { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored" };
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

  /*  const onRefetch = () => {
    refetch();
  }; */

  /*  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    Con.Update(values);
    tableData[row.index] = values;
    onRefetch();
    setTableData([...tableData]);

    exitEditingMode(); 
  }; */

  const handleDeleteRow = useCallback(
    (row) => {
      /*   console.log(row); */
      // eslint-disable-next-line no-restricted-globals
      if (!confirm(`Are you sure you want to delete ${row.getValue("businessName")}`)) {
        return;
      }
      var permitNum = row.getValue("permitNum");
      /*    var x = Con.Delete(permitNum);
      console.log(x); */
      (async () => {
        var d = await Con.Delete(permitNum);
        var response = JSON.parse(d.request.response);
        if (response.affectedRows > 0) {
          toast.success("Successfully deleted " + permitNum, toasterCss);
        }
      })();

      /*  toast.success(!isEdit ? "Successfully added " + data.data.insertId : "Record successfully updated", toasterCss); */
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

  const openEdit = (row, table, mode) => {
    var currentRow = [];
    let dateIssued = moment();

    for (const [key, value] of Object.entries(row.original)) {
      if (value != null) {
        /*   let x = moment(value); */
        currentRow[key] = value;
      } else {
        currentRow[key] = key === "valid" || key === "issued" ? dateIssued.format("MMMM DD, YYYY") : "";
      }
    }

    const result = Object.fromEntries(Object.entries(currentRow));
    row["original"] = result;
    row["_valuesCache"] = result;
    setRowVal(row.original);

    /*console.log(result); */
    setEdit(true);
    setCreateModalOpen(true);

    /*  table.setEditingRow(row); */
  };

  const openAdd = () => {
    setRowVal({});
    setEdit(false);
    setCreateModalOpen(true);
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
            <Button color='secondary' onClick={openAdd} variant='contained'>
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

      {createModalOpen && (
        <PermitForm columns={columns} open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreateNewRow} onRefetch={refetch} rowVal={rowVal} isEdit={isEdit} />
      )}
    </Box>
  );
};

export default PermitList;
