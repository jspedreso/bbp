/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import { Button, Dialog, Box, DialogActions, DialogContent, DialogTitle, Stack, TextField, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Con } from "../../controller/User";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
const toasterCss = { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored" };

const UserForm = ({ open, columns, onClose, onSubmit, onRefetch, rowVal, isEdit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      if (column.columnDefType !== "data") acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  /*   const [values, setValues] = useState(); */
  var title = isEdit ? "Edit" : "Create New";

  const newVal = () => {
    return columns.reduce((acc, column) => {
      acc[column.accessorKey] = "";
      return acc;
    }, {});
  };

  var defaultValuess = rowVal !== undefined ? rowVal : newVal();
  console.log(defaultValuess);

  const { handleSubmit, reset, setValue, control } = useForm({ defaultValuess });
  const [isSubmitSuccessful, setSubmit] = useState(false);
  const mutation = useMutation({
    mutationFn: async (formData) => {
      var res;
      if (!isEdit) {
        res = await Con.Add(formData);
      } else {
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

  const onSubmitForm = (values) => {
    mutation.mutate(values);
  };

  /* const handleSubmit = () => {
    mutation.mutate(values);
  }; */
  const closeForm = () => {
    reset({}, { keepDefaultValues: true });
    onClose();
  };

  return (
    <Box sx={{ mt: 10, width: 500, flexGrow: 1 }}>
      <Dialog open={open}>
        <DialogTitle textAlign='center'>{title} Account</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2} sx={{ mt: 5 }}>
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: "1.5rem",
                }}
              >
                <Controller render={({ field }) => <TextField {...field} label='UserId' />} name={columns[0].accessorKey} control={control} />
                <Controller render={({ field }) => <TextField {...field} label='Firstname' />} name={columns[1].accessorKey} control={control} />
                <Controller render={({ field }) => <TextField {...field} label='Middlename' />} name={columns[2].accessorKey} control={control} />
                <Controller render={({ field }) => <TextField {...field} label='Lastname' />} name={columns[3].accessorKey} control={control} />
                <Controller render={({ field }) => <TextField {...field} label='User Type' />} name={columns[4].accessorKey} control={control} />
                <Controller render={({ field }) => <TextField {...field} label='Username' />} name={columns[5].accessorKey} control={control} />
                {/*  <Controller render={({ field }) => <TextField {...field} label='Password' />} name='password' control={control} /> */}
                {/* {columns.map((column) => (
                <TextField key={column.accessorKey} label={column.header} name={column.accessorKey} />
              ))} */}
              </Stack>
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
export default UserForm;
