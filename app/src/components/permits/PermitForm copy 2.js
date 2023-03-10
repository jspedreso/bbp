/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { Button, Dialog, Box, DialogActions, DialogContent, DialogTitle, Stack, TextField, Select, MenuItem, InputLabel, Input } from "@mui/material";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import { useMutation } from "@tanstack/react-query";
import { Con } from "../../controller/Permit";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { MuiFileInput } from "mui-file-input";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { MRT_ShowHideColumnsButton } from "material-react-table";
/* import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
 */
/* const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};


 */
const toasterCss = { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored" };

const PermitForm = ({ open, columns, onClose, onSubmit, onRefetch, rowVal }) => {
  /*  console.log(rowVal !== undefined ? rowVal : "No Value"); */
  /*   const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      if (column.columnDefType !== "data") acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  ); */

  const [values, setValues] = useState();
  var title = rowVal !== undefined ? "Edit" : "Create New";
  var q = new Date(rowVal !== undefined ? rowVal.issued : null);
  /* moment(q).format("M d, YYYY"); */
  /*   console.log(q); */
  /*  console.log("default =" + rowVal.issued);
  console.log(Date(rowVal.issued)); */
  var x = rowVal !== undefined ? rowVal.issued : new Date();
  var y = rowVal !== undefined ? rowVal.valid : new Date();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [issuedDate, setIssueValue] = useState(x);
  const [validDate, setValidValue] = useState(y);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      var res = await Con.Add(formData);
      const d = mutation.data;
      if (d) {
        if (mutation.data.status === 200) {
          {
            toast.success(d.data.insertId, toasterCss);
          }
          onClose();
          onRefetch();
        } else {
          {
            toast.error("Failed", toasterCss);
          }
        }
      }

      return res;
    },
  });

  /*  const handleSubmit = () => {
    mutation.mutate(values);
  }; */

  const handleChange = (key, e) => {
    switch (key) {
      case "attachment1":
        setFile1(e);
        break;
      case "attachment2":
        setFile2(e);
        break;
      case "attachment3":
        setFile3(e);
        break;
      default:
        break;
    }
  };

  const defaultValues = {
    Native: "",
    TextField: "",
    Select: "",
    ReactSelect: { value: "vanilla", label: "Vanilla" },
    Checkbox: false,
    switch: false,
    RadioGroup: "",
    numberFormat: 123456789,
    AntdInput: "Test",
    AntdCheckbox: true,
    AntdSwitch: true,
    AntdSlider: 20,
    AntdRadio: 1,
    downShift: "apple",
    ReactDatepicker: new Date(),
    AntdSelect: "",
    MUIPicker: new Date("2020-08-01T00:00:00"),
    country: { code: "AF", label: "Afghanistan", phone: "93" },
    ChakraSwitch: true,
    reactMaskInput: "",
  };
  /*   const DisplyInput = (column) => {
    if (column.columnDefType === "data") {
      return <TextField key={column.accessorKey} label={column.header} name={column.accessorKey} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />;
    } else {
      return <MuiFileInput key={column.accessorKey} name={column.accessorKey} value={file[column.accessorKey]} onChange={(e) => handleChange(column.accessorKey, e)} />;
    }
  }; */
  const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);
  return (
    <Box sx={{ mt: 10, width: 500, flexGrow: 1 }}>
      <Dialog open={open} fullWidth={true} maxWidth='md'>
        <DialogTitle textAlign='center'>{title} Business Permit</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit((data) => setData(data))}>
            <Grid container spacing={2} sx={{ mt: 5 }}>
              <Grid item xs={6} sm={6} md={6}>
                <Stack
                  sx={{
                    width: "100%",
                    minWidth: { xs: "100px", sm: "200px", md: "300px" },
                    gap: "1.3rem",
                    mt: 1,
                  }}
                >
                  <Controller render={({ field }) => <TextField {...field} label='Permit Num' />} name='TextField' control={control} />
                  <TextField
                    key={columns[0].accessorKey}
                    defaultValue={rowVal !== undefined ? `${rowVal.permitNum}` : Date.now() + Math.random()}
                    label='Permit Num'
                    name={columns[0].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                  <TextField
                    key={columns[1].accessorKey}
                    defaultValue={rowVal !== undefined ? `${rowVal.businessName}` : ""}
                    label='Business Name'
                    name={columns[1].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                  <TextField
                    key={columns[2].accessorKey}
                    defaultValue={rowVal !== undefined ? `${rowVal.natureOfBusiness}` : ""}
                    label='Nature of Business'
                    name={columns[2].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                  <TextField
                    key={columns[3].accessorKey}
                    defaultValue={rowVal !== undefined ? `${rowVal.location}` : ""}
                    label='Location'
                    name={columns[3].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                  <TextField
                    key={columns[4].accessorKey}
                    defaultValue={rowVal !== undefined ? `${rowVal.proprietor}` : ""}
                    name={columns[4].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                  <TextField
                    key={columns[5].accessorKey}
                    defaultValue={rowVal !== undefined ? `${rowVal.address}` : ""}
                    label='Address'
                    name={columns[5].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                    id='filled-multiline-flexible'
                    multiline
                    rows={8}
                  />

                  {/*  {columns.map((column) => column.columnDefType === "data" && DisplyInput(column, 0))} */}
                </Stack>
              </Grid>
              <Divider />
              <Grid item xs={6} sm={6} md={6}>
                <Stack
                  sx={{
                    width: "100%",
                    minWidth: { xs: "100px", sm: "300px", md: "400px" },
                    gap: "1.3rem",
                    mt: 1,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                    <Select
                      defaultValue={rowVal !== undefined ? `${rowVal.status}` : ""}
                      key={columns[6].accessorKey}
                      name={columns[6].accessorKey}
                      label='Status'
                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                    >
                      <MenuItem value='Operational'>Operational</MenuItem>
                      <MenuItem value='Closed'>Closed</MenuItem>
                      <MenuItem value='Expired'>Expired</MenuItem>
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Date Issued'
                      name={columns[7].accessorKey}
                      onChange={(newValue) => {
                        setIssueValue(newValue);
                      }}
                      value={issuedDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label='Date Valid'
                      value={validDate}
                      name={columns[8].accessorKey}
                      onChange={(newValue) => {
                        setValidValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  {/*  <Input type='file'></Input> */}
                  {/*   <TextField key={columns[7].accessorKey} label='Date Issued' name={columns[7].accessorKey} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                  <TextField key={columns[8].accessorKey} label='Valid Until' name={columns[8].accessorKey} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} /> */}
                  <TextField
                    defaultValue={rowVal !== undefined ? `${rowVal.latitude}` : ""}
                    key={columns[9].accessorKey}
                    label='Latitude'
                    name={columns[9].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                  <TextField
                    defaultValue={rowVal !== undefined ? `${rowVal.longitude}` : ""}
                    key={columns[10].accessorKey}
                    label='Longitude'
                    name={columns[10].accessorKey}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                  />
                  <MuiFileInput key={columns[11].accessorKey} name={columns[11].accessorKey} value={file1} onChange={(e) => handleChange(columns[11].accessorKey, e)} />
                  <MuiFileInput key={columns[12].accessorKey} name={columns[12].accessorKey} value={file2} onChange={(e) => handleChange(columns[12].accessorKey, e)} />
                  <MuiFileInput key={columns[13].accessorKey} name={columns[13].accessorKey} value={file3} onChange={(e) => handleChange(columns[13].accessorKey, e)} />
                  {/*       {columns.map((column) => column.columnDefType === "file" && DisplyInput(column))} */}
                </Stack>
                {/*  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}> */}
                {/* Child components, such as markers, info windows, etc. */}
                {/*  </GoogleMap> */}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color='secondary' onClick={handleSubmit} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default PermitForm;
