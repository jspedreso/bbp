/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { Button, Dialog, Box, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMutation } from "@tanstack/react-query";
import { Con } from "../../controller/Permit";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { MuiFileInput } from "mui-file-input";
import FormControl from "@mui/material/FormControl";
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

const Input = styled("input")({
  display: "none",
});

const PermitForm = ({ open, columns, onClose, onSubmit, onRefetch, mode }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [file, setFile] = useState([]);
  /*   console.log(values); */
  /*   console.log(JSON.stringify(values));
  console.log("address=" +values); */
  /*  const defDateIssued = useState(); */

  /*   const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDOk0E4IVlaoAJq2BbSwxJVq6xnDL892Ts",
  }); */

  /* const [map, setMap] = React.useState(null); */
  /* const onLoad = React.useCallback(function callback(map) { */
  // This is just an example of getting and using the map instance!!! don't just blindly copy!
  /*   const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
 */
  /*  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []); */

  const mutation = useMutation({
    mutationFn: async (formData) => {
      var res = await Con.Add(formData);
      const d = mutation.data;
      if (d) {
        if (mutation.data.status === 200) {
        } else {
        }
      }
      onClose();
      onRefetch();
      return res;
    },
  });

  const handleSubmit = () => {
    mutation.mutate(values);
  };

  const handleChange = (key, e) => {
    setFile((file[key] = e));
    console.log(key + "=" + JSON.stringify(file[key]));
  };
  const DisplyInput = (column) => {
    if (column.columnDefType === "data") {
      return <TextField key={column.accessorKey} label={column.header} name={column.accessorKey} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />;
    } else {
      return <MuiFileInput key={column.accessorKey} name={column.accessorKey} value={file[column.accessorKey]} onChange={(e) => handleChange(column.accessorKey, e)} />;
    }
  };

  return (
    <Box sx={{ mt: 10, width: 500, flexGrow: 1 }}>
      <Dialog open={open} mode={mode} fullWidth={true} maxWidth='md'>
        <DialogTitle textAlign='center'>Create New Business Permit</DialogTitle>
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
                  {columns.map((column) => column.columnDefType === "data" && DisplyInput(column, 0))}
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
                  {columns.map((column) => column.columnDefType === "file" && DisplyInput(column))}
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
