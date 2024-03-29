import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { default as Container, default as Copyright } from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React from 'react';
import { Signin } from '../../../../utils/customer';
import { useSnackbar } from 'notistack';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  closeDialog: PropTypes.func,
};

function LoginForm(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#212B36',
      },
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values, props) => {
    const input = {
      email: values.email,
      password: values.password,
    };
    console.log(input);
    const data = await Signin(JSON.stringify(input));
    if (data.status === 1) {
      localStorage.setItem('user', JSON.stringify(data.data));
      enqueueSnackbar('Login Successfully', { variant: 'success' });
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } else {
      enqueueSnackbar('Email or Password Incorrect', { variant: 'error' });
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter valid email'),
    password: Yup.string(),
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4">
              Sign In
            </Typography>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              {(props) => (
                <Form>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={<ErrorMessage name="password" />}
                  />
                  <FormControlLabel
                    control={<Field as={Checkbox} value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default LoginForm;
