import React from 'react';
import { Container, Grid, TextField, FormLabel, Button, Typography, Card, Box, FormControl, Select, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  password: Yup.string().required('password is required'),
  confirmedPass: Yup.string().min(6, 'New Password should be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required')
});
const SmtpConfig = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          host: '',
          SMTPAuth: '',
          username: '',
          password: '',
          SMTPSecure: '',
          emailFrom: '',
          port: '',
          ReplyTo: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Card>
              <Box width="100%" padding="40px" paddingLeft="200px" paddingRight="200px" marginTop="40px">
                <Grid container spacing={6}>
              
              <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 5, md: 6 }}>
              <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel>Status</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="vehicleType"
                      name="vehicleType"
                      maxRows={10}
                      label=""
                      size="small"
                      fullWidth
                    //   value={formik.values.vehicleType || null}
                    //   onChange={formik.handleChange}
                    //   error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)}
                    //   helperText={formik.touched.vehicleType && formik.errors.vehicleType}
                    >
                      <MenuItem value="Enable">Enable</MenuItem>
                      <MenuItem value="Disable">Disable</MenuItem>
                      </Select>
                    {/* <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.vehicleType && formik.errors.vehicleType}
                    </FormHelperText> */}
                  </FormControl>
                </Grid>

               
                <Grid item xs={12} sm={12} md={12}>
  <FormLabel>Bank Details</FormLabel>
  <TextField
    id="SMSContent"
    name="SMSContent"
    type="textbox"
    min="0"
    placeholder="Enter package SMSContent"
    size="small"
    fullWidth
    multiline
    rows={7} 
    // value={formik.values.SMSContent}
    // onChange={formik.handleChange}
    // error={formik.touched.SMSContent && Boolean(formik.errors.SMSContent)}
    // helperText={formik.touched.SMSContent && formik.errors.SMSContent}
  />
</Grid>
              </Grid>
                 
                 
                  <Grid container  style={{marginTop:'10px'}}>
                    <Button variant="contained" color="primary" type="submit">
                   Update
                    </Button>
                   
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SmtpConfig;
