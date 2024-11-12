import React from 'react';
import { Container, Grid, TextField, FormLabel, Button, Box, Card, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { url } from 'api/url';
import { editEmployee } from 'api/apis';
import { useState } from 'react';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required').max(50, 'Enter less than 50 characters'),
  lastName: Yup.string().required('Last Name is required').max(50, 'Enter less than 50 characters'),
  email: Yup.string().required('Email is required').email('Enter a valid email').max(50, 'Enter less than 50 characters'),
  phone: Yup.string().required('Phone is required').max(15, 'Enter less than 15 characters')
});

const AddUser = ({ open, handleClose, EditData, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Container>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              firstName: EditData?.firstName || '',
              lastName: EditData?.lastName || '',
              email: EditData?.email || '',
              phone: EditData?.phone || ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              setIsLoading(true);
              const id = EditData?._id;
              const com_url = `${url.base_url}${url.employee.edit}${id}`;

              try {
                const response = await editEmployee(com_url, values);
                if (response) {
                  await onSuccess();
                  resetForm();
                  handleClose();
                  toast.success('Successfully Updated');
                } else {
                  toast.warning('Edit Failed');
                }
              } catch (error) {
                toast.error('An error occurred while updating');
              }
              setIsLoading(false);
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <Card style={{ paddingTop: '15px' }}>
                  <Box width="100%" padding="30px">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <FormLabel>First Name</FormLabel>
                        <Field
                          name="firstName"
                          as={TextField}
                          placeholder="Enter First Name"
                          fullWidth
                          size="small"
                          error={touched.firstName && !!errors.firstName}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormLabel>Last Name</FormLabel>
                        <Field
                          name="lastName"
                          as={TextField}
                          placeholder="Enter Last Name"
                          fullWidth
                          size="small"
                          error={touched.lastName && !!errors.lastName}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormLabel>Email</FormLabel>
                        <Field
                          name="email"
                          as={TextField}
                          placeholder="Enter Email"
                          fullWidth
                          size="small"
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormLabel>Phone</FormLabel>
                        <Field
                          name="phone"
                          as={TextField}
                          type="text"
                          placeholder="Enter Phone"
                          fullWidth
                          size="small"
                          error={touched.phone && !!errors.phone}
                          helperText={touched.phone && errors.phone}
                        />
                      </Grid>

                      <DialogActions style={{ padding: '10px' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          style={{ textTransform: 'capitalize', marginLeft: '8px' }}
                          color="primary"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Updating...' : 'Update'}
                        </Button>
                        <Button
                          type="button"
                          variant="outlined"
                          style={{ textTransform: 'capitalize' }}
                          onClick={handleClose}
                          color="error"
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Grid>
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AddUser;
