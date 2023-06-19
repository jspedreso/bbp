/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import { Button, Dialog, Box, DialogActions, DialogContent, DialogTitle, Stack, TextField, Select, MenuItem, InputLabel, Link } from "@mui/material";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import { useMutation } from "@tanstack/react-query";
import { Con } from "../../controller/Permit";
import Divider from "@mui/material/Divider";
/* import { MuiFileInput } from "mui-file-input"; */
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";

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

const PermitForm = ({ open, columns, onClose, onSubmit, onRefetch, rowVal, isEdit }) => {
  /*  console.log(rowVal !== undefined ? rowVal : "No Value"); */
  const [values, setValues] = useState(
    () => {}
    /*   columns.reduce((acc, column) => {
      if (column.columnDefType !== "data") acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {}) */
  );
  /*   const [values, setValues] = useState(); */
  var title = isEdit ? "Edit" : "Create New";
  var x = isEdit ? rowVal.issued : new Date();
  var y = isEdit ? rowVal.valid : new Date();

  const newVal = () => {
    return columns.reduce((acc, column) => {
      acc[column.accessorKey] = "";

      return acc;
    }, {});
  };
  var defaultValues = Object.keys(rowVal).length > 0 ? rowVal : newVal();
  /* console.log(defaultValues.length); */
  const { handleSubmit, reset, setValue, getValues, control } = useForm({ defaultValues });

  const onSubmitForm = (values) => {
    mutation.mutate(values);
  };

  const [isSubmitSuccessful, setSubmit] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [status, setStatus] = useState();
  const [issuedDate, setIssueValue] = useState(x);
  const [validDate, setValidValue] = useState(y);
  const mutation = useMutation({
    mutationFn: async (formData) => {
      var res;
      if (!isEdit) {
        res = await Con.Add(formData);
        if (res.data.affectedRows > 0) {
          /*   var upFile = await Con.UploadAdd(formData); */
        }
      } else {
        /*   let fd = new FormData();
        fd.append("attachment1", formData.attachment1);
        console.log(fd); */

        res = await Con.Update(formData);
      }
      return res;
    },
    onSuccess: (data, variables, context) => {
      setSubmit(true);
      toast.success(!isEdit ? "Successfully added " + data.data.insertId : "Record successfully updated", toasterCss);
      reset();
      onClose();
      onRefetch();
    },
    onError: (error, variables, context) => {
      toast.error(error, toasterCss);
    },
  });

  const closeForm = () => {
    reset({}, { keepDefaultValues: false });
    onClose();
  };

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const handleChange = (key, e) => {
    console.log(key);
    switch (key) {
      case "attachment1":
        setFile1(e);
        break;
      case "attachment2":
        setFile2(e);
        break;
      case "attachment3":
        setFile3(e);
        /*   setFile3(e); */
        break;

      default:
        setValue(key);
        break;
    }
  };

  const getCoordinates = (e) => {
    e.preventDefault();
    var lat = getValues("latitude");
    var long = getValues("longitude");
    /*  `this is just a ${sample}`; */
    var url = `https://earth.google.com/web/@${lat},${long},42.70620933a,12379.43469093d,1y,0h,0t,0r`;
    window.open(url, "_blank", "noreferrer");
  };

  /*   useEffect(() => {
    reset({ defaultValues });
  }, [isSubmitSuccessful]); */
  return (
    <Box sx={{ mt: 10, width: 500, flexGrow: 1 }}>
      <Dialog open={open} fullWidth={true} maxWidth='md'>
        <DialogTitle textAlign='center'>{title} Business Permit</DialogTitle>

        <DialogContent>
          <form>
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
                  <Controller render={({ field }) => <TextField {...field} label='Permit Num' />} name={columns[0].accessorKey} control={control} />
                  <Controller render={({ field }) => <TextField {...field} label='Business Name' />} name={columns[1].accessorKey} control={control} />
                  <Controller render={({ field }) => <TextField {...field} label='Nature of Business' />} name={columns[2].accessorKey} control={control} />
                  <Controller render={({ field }) => <TextField {...field} label='Location' />} name={columns[3].accessorKey} control={control} />
                  <Controller render={({ field }) => <TextField {...field} label='Proprietor' />} name={columns[4].accessorKey} control={control} />
                  <Controller render={({ field }) => <TextField {...field} label='Address' multiline rows={8} />} name={columns[5].accessorKey} control={control} />
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
                  {/* <Controller
                    render={({ field }) => (
                      <Select defaultValue={rowVal !== {} ? rowVal.status : "Operational"} variant='outlined' name='reason'>
                        <MenuItem value='Operational'>Operational</MenuItem>
                        <MenuItem value='Closed'>Closed</MenuItem>
                        <MenuItem value='Expired'>Expired</MenuItem>
                      </Select>
                    )}
                    name={columns[0].accessorKey}
                    control={control}
                  /> */}

                  <FormControl fullWidth>
                    <InputLabel id='statusLabel'>Status</InputLabel>
                    <Select defaultValue={isEdit ? rowVal.status : "Operational"} key={columns[6].accessorKey} name='status' label='Status' onChange={handleStatusChange}>
                      <MenuItem value='Operational'>Operational</MenuItem>
                      <MenuItem value='Closed'>Closed</MenuItem>
                      <MenuItem value='Expired'>Expired</MenuItem>
                    </Select>
                  </FormControl>

                  {/*  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                    <Select
                      value={isEdit ? rowVal.status : "Operational"}
                      defaultValue={isEdit ? rowVal.status : "Operational"}
                      key={columns[6].accessorKey}
                      name={columns[6].accessorKey}
                      label='Status'
                      onChange={handleChange}
                    >
                      <MenuItem value='Operational'>Operational</MenuItem>
                      <MenuItem value='Closed'>Closed</MenuItem>
                      <MenuItem value='Expired'>Expired</MenuItem>
                    </Select>
                  </FormControl> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker label='Date Issued' inputFormat='MM/DD/YYYY' name={columns[7].accessorKey} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                    <DesktopDatePicker label='Date Valid' inputFormat='MM/DD/YYYY' name={columns[8].accessorKey} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                    {/*  <DatePicker
                      label='Date Issued'
                      name={columns[7].accessorKey}
                      onChange={(newValue) => {
                        setIssueValue(newValue);
                      }}
                      value={issuedDate}
                      renderInput={(params) => <TextField {...params} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />}
                    /> */}
                    {/*   <DatePicker label='Date Valid' value={validDate} name={columns[8].accessorKey} onChange={handleChange} renderInput={(params) => <TextField {...params} />} /> */}
                  </LocalizationProvider>

                  <Controller render={({ field }) => <TextField {...field} label='longitude' />} name={columns[9].accessorKey} control={control} />
                  <Controller render={({ field }) => <TextField {...field} label='latitude' />} name={columns[10].accessorKey} control={control} />
                  <Link href='#' component='button' variant='body2' onClick={getCoordinates}>
                    Open in Google Earth
                  </Link>
                  {/*   <TextField
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
                  /> */}
                  <Controller
                    name='attachment1'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        type='file'
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                        }}
                      />
                    )}
                  />
                  <Controller
                    name='attachment2'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        type='file'
                        onChange={(e) => {
                          field.onChange(e.target.file[0]);
                        }}
                      />
                    )}
                  />
                  <Controller
                    name='attachment3'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        type='file'
                        onChange={(e) => {
                          field.onChange(e.target.file[0]);
                        }}
                      />
                    )}
                  />
                  {/*   <MuiFileInput key={columns[11].accessorKey} name={columns[11].accessorKey} value={file1} onChange={(e) => handleChange(columns[11].accessorKey, e)} />
                  <MuiFileInput key={columns[12].accessorKey} name={columns[12].accessorKey} value={file2} onChange={(e) => handleChange(columns[12].accessorKey, e)} />
                  <MuiFileInput key={columns[13].accessorKey} name={columns[13].accessorKey} value={file3} onChange={(e) => handleChange(columns[13].accessorKey, e)} /> */}
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
          <Button onClick={closeForm}>Cancel</Button>
          <Button type='button ' onClick={handleSubmit(onSubmitForm)} color='secondary' variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default PermitForm;
