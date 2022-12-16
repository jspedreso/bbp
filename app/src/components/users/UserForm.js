/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import { Button, Dialog, Box, DialogActions, DialogContent, DialogTitle, Stack, TextField, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Con } from "../../controller/User";

const UserForm = ({ open, columns, onClose, onSubmit, onRefetch, mode }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

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

  return (
    <Box sx={{ mt: 10, width: 500, flexGrow: 1 }}>
      <Dialog open={open}>
        <DialogTitle textAlign='center'>Create New Account</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
              }}
            >
              {columns.map((column) => (
                <TextField key={column.accessorKey} label={column.header} name={column.accessorKey} />
              ))}
            </Stack>
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
export default UserForm;
