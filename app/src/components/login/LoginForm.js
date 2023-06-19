import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Con } from "../../controller/Login";
import TokenContext from "../../App";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
/* import useToken from "../../useToken"; */
import { redirect } from "react-router-dom";
const Copyright = (props) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {"Copyright © "}
      <Link color='inherit' href='https://mui.com/'>
        Barangay Mulawin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
const toasterCss = { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored" };
const theme = createTheme();

const LogInForm = ({ setToken }) => {
  /*  const { setToken, token } = useToken(); */

  var defVal = { emailAddress: "", password: "" };
  const { handleSubmit, reset, setValue, getValues, control } = useForm({ defVal });
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const onSubmitForm = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: async (formData) => {
      var res;
      res = await Con.Add(formData);
      return res;
    },
    onSuccess: (data, variables, context) => {
      if (data.token !== "") {
        setToken(data);
        toast.success("Welcome ", toasterCss);
        /*  redirect("/home"); */
        /* window.location.href("http://localhost:3000"); */
        /*  window.location("http://localhost:3000"); */
        /*  setToken(); */
      } else {
        console.log("failed");
        toast.warn("Your username and password did not match", toasterCss);
      }
      /* setSubmit(true);
      toast.success(!isEdit ? "Successfully added " + data.data.insertId : "Record successfully updated", toasterCss);
      reset();
      onClose();
      onRefetch(); */
    },
    onError: (error, variables, context) => {
      /* toast.error(error, toasterCss); */
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <Box /* component='form' onSubmit={handleSubmit(onSubmitForm)} */ /* noValidate sx={{ mt: 1 }} */>
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate sx={{ mt: 1 }}>
              {/*   <Controller render={({ field }) => <TextField {...field} required fullWidth id='email' label='Email Address' autoComplete='email' autoFocus />} name='email' control={control} /> */}
              <Controller render={({ field }) => <TextField {...field} label='Username' fullWidth margin='normal' />} name='username' defaultValue='' control={control} />
              <Controller render={({ field }) => <TextField {...field} label='Password' fullWidth margin='normal' type='password' />} name='password' defaultValue='' control={control} />
              {/*    <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus onChange={(e) => setUserName(e.target.value)} /> */}
              {/* <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              /> */}
              {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </form>
            {/* <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default LogInForm;
