import React from 'react';
import { Container, Grid, TextField, FormLabel, Button, Typography, Card, Box,FormControl , Select ,MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    password: Yup.string().required('password is required'),
  confirmedPass: Yup.string().min(6, 'New Password should be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required')
});

const SMSSetting = () =>{
    return (
        <Container>
          <Typography variant="h3" style={{ marginBottom: '22px' }}>
          Twilio Configuration


          </Typography>
          <Formik
            initialValues={{
              host: '',
              mode: '',
              accountSID : '',
              authToken : '',
              twilioStatus : '',
              emailFrom : '',
              twilioNumber : '',
              ReplyTo : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Card>
                    <Box width="100%" padding="30px" paddingLeft="200px" paddingRight="200px">
                    <Grid container spacing={3}>
                   
                    <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Mode</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="mode"
                      name="mode"
                      label=""
                      size="small"
                    //   value={formik.values.payType || null}
                    //   onChange={formik.handleChange}
                    //   error={formik.touched.payType && Boolean(formik.errors.payType)}
                    >
                      <MenuItem value="">Select Option</MenuItem>
                      <MenuItem value="Held">Held</MenuItem>
                      <MenuItem value="Note Held">Note Held</MenuItem>
                    </Select>
                    {/* <FormHelperText error={formik.touched.payType && Boolean(formik.errors.payType)}>
                      {formik.touched.payType && formik.errors.payType}
                    </FormHelperText> */}
                  </FormControl>
                </Grid>
               
    
                    <Grid item xs={12} sm={12}>
                      <FormLabel>Account SID
                      </FormLabel>
                      <Field
                        name="accountSID"
                        as={TextField}  
                        type="text"
                        placeholder="SMTP.gmail.com"
                        fullWidth
                        size="small"
                        // error={touched.accountSID && !!errors.accountSID}
                        // helperText={touched.accountSID && errors.accountSID}
                      />
                    </Grid>
                   
    
                    <Grid item xs={12} sm={12}>
                      <FormLabel>Auth Token</FormLabel>
                      <Field
                        name="authToken"
                        as={TextField}
                        type="text"
                        placeholder="SMTP.gmail.com"
                        fullWidth
                        size="small"
                        error={touched.authToken && !!errors.authToken}
                        helperText={touched.authToken && errors.authToken}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormLabel>Twilio number</FormLabel>
                      <Field
                        name="twilioNumber"
                        as={TextField}
                        type="text"
                        placeholder="SMTP.gmail.com"
                        fullWidth
                        size="small"
                        error={touched.twilioNumber && !!errors.twilioNumber}
                        helperText={touched.twilioNumber && errors.twilioNumber}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Twilio Status</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="twilioStatus"
                      name="twilioStatus"
                      label=""
                      size="small"
                    //   value={formik.values.payType || null}
                    //   onChange={formik.handleChange}
                    //   error={formik.touched.payType && Boolean(formik.errors.payType)}
                    >
                      <MenuItem value="Planned">Planned</MenuItem>
                      <MenuItem value="Held">Held</MenuItem>
                      <MenuItem value="Note Held">Note Held</MenuItem>
                    </Select>
                    {/* <FormHelperText error={formik.touched.payType && Boolean(formik.errors.payType)}>
                      {formik.touched.payType && formik.errors.payType}
                    </FormHelperText> */}
                  </FormControl>
                </Grid>
                  
    
                 

               
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit">
                      Update Setting
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
    
export default SMSSetting