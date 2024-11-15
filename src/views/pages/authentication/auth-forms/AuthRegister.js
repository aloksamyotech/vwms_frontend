import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';

import axios from 'axios';
import {
  Box,
  Button,
  MenuItem,
  Checkbox,
  Select,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50),
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email')
      .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters')
      .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50)
      .required('Password is required'),
    role: Yup.string().required('Role is required')
  });

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          role: 'employee',
          agree: checked
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          values.permissions = {
            vehicleType: true,
            serviceList: true,
            packages: true,
            bookings: true,
            paymentTransaction: true,
            outOfService: true,
            incomeExpense: true,
            users: true,
            reports: true
          };

          axios
            .post('http://localhost:8080/user/create', values)
            .then((res) => {
              if (res?.data?.message == 'Already Exist') {
                toast.warning(`${res?.data?.message}`);
                resetForm();
              } else {
                toast.success(res?.data?.message || 'Registered Successfully');
                resetForm();
                setTimeout(() => {
                  navigate('/login');
                }, 1000);
              }
            })
            .catch((err) => {
              console.error(`error: ${err}`);
              toast.error(err.response?.data?.message || '500 Error Not Registered');
            });
        }}
      >
        {({ errors, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="name"
                  type="text"
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth size="small" error={touched.role && !!errors.role}>
                  <InputLabel id="role-label"></InputLabel>
                  <Field
                    name="role"
                    as={Select}
                    defaultValue="user"
                    onChange={handleChange}
                    sx={{
                      ...theme.typography.customInput,
                      height: '56px',
                      minWidth: '200px'
                    }}
                  >
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Field>
                  {touched.role && errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => {
                        setChecked(event.target.checked);
                        handleChange({
                          target: {
                            name: 'agree',
                            value: event.target.checked
                          }
                        });
                      }}
                      name="agree"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
