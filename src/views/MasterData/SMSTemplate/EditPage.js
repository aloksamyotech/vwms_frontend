import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormLabel, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { url } from 'api/url';
import { createTemplate, editSmsTemplate } from 'api/apis';
import { useState } from 'react';

const AddLead = (props) => {
  const { open, handleClose, onSuccess, EditData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required('Required field').max(50, 'Enter less than 50 characters'),
    templateContent: yup.string().required('Required field').max(200, 'Enter less than 200 characters')
  });

  const initialValues = {
    templateType: 'SMSTemplate',
    name: EditData?.name || '',
    templateContent: EditData?.templateContent || ''
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">Edit SMS Template</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            const id = EditData?._id;
            const com_url = `${url.base_url}${url.template.edit}${id}`;

            const response = await editSmsTemplate(com_url, values);

            if (response) {
              await onSuccess();
              resetForm();
              handleClose();
              toast.success('Successfully Edited');
            } else {
              toast.warning('Edit Failed');
            }
            setIsLoading(false);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormLabel>Template Name</FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    size="small"
                    placeholder="Enter template name"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel>SMS Content</FormLabel>
                  <TextField
                    id="templateContent"
                    name="templateContent"
                    type="text"
                    placeholder="Enter SMS content"
                    size="small"
                    fullWidth
                    multiline
                    rows={7}
                    value={values.templateContent}
                    onChange={handleChange}
                    error={touched.templateContent && Boolean(errors.templateContent)}
                    helperText={touched.templateContent && errors.templateContent}
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
                <Button onClick={handleClose} variant="outlined" color="error">
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddLead;
