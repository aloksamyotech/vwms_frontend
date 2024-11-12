import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { url } from 'api/url';
import { createTemplate } from 'api/apis';
import { useState } from 'react';

const AddLead = ({ open, handleClose, onSuccess }) => {
  const [editorState, setEditorState] = useState('')
  const [ isLoading , setIsLoading] = useState(false)
  

  const validationSchema = yup.object({
    name: yup.string().required('Template Name is required').max(50, 'Enter less than 50 characters'),
    subject: yup.string().required('Email Subject is required').max(200, 'Enter less than 100 characters'),
    templateContent: yup.string().required('Email templateContent is required')
  });

  const initialValues = {
    templateType: 'email',
    name: '',
    subject: '',
    templateContent: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)
        const contentState = editorState.getCurrentContent().getPlainText();
        const templateContent = contentState;

        const finalValues = { ...values, templateContent };

        const com_url = `${url.base_url}${url.template.create}`;

        const response = await createTemplate(com_url, finalValues);

        if (response) {
          toast.success('Template successfully created');
          onSuccess();
          handleClose();
          resetForm();
          setEditorState('');
        } else {
          toast.error('Failed to create the template. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred while creating the template.');
      }
      setIsLoading(false)
    }
  });

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    const contentState = convertToRaw(editorState.getCurrentContent());
    const templateContent = JSON.stringify(contentState);
    formik.setFieldValue('templateContent', templateContent);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="add-lead-dialog-title">
      <DialogTitle id="add-lead-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Add Email Template</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <DialogContentText id="add-lead-dialog-description">
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12}>
                <FormLabel>Template Name</FormLabel>
                <TextField
                  id="name"
                  name="name"
                  placeholder="Template Name"
                  size="small"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid item xs={12}>
                <FormLabel>Email Subject</FormLabel>
                <TextField
                  id="subject"
                  name="subject"
                  placeholder="Enter Email Subject"
                  size="small"
                  fullWidth
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </Grid>

              <Grid item xs={12}>
                <FormLabel>Email Content</FormLabel>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  editorStyle={{
                    minHeight: '200px',
                    border: '1px solid #F1F1F1',
                    padding: '5px'
                  }}
                />
                {formik.touched.templateContent && formik.errors.templateContent && (
                  <Typography color="error">{formik.errors.templateContent}</Typography>
                )}
              </Grid>
            </Grid>
          </DialogContentText>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={() => {
                formik.resetForm();
                setEditorState(EditorState.createEmpty());
                handleClose();
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLead;
