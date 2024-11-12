import React from 'react';

import { useState } from 'react';

import { Stack, Button, Alert, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconTrash, IconEdit } from '@tabler/icons'; 

import Iconify from '../../../ui-component/iconify';
import TableStyle from '../../../ui-component/TableStyle';
import NewEmail from './NewEmail';
import { url } from 'api/url';
import { allEmailTemplate } from 'api/apis';
import { useEffect } from 'react';
import EditPage from './EditPage.js';

const EmailTemplate = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [allTemplateDate, setAllTemplateDate] = useState([]);
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'templateContent',
      headerName: 'Template Content',
      flex: 3
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 10,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ width: 'auto', padding: '4px' }}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={1}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleEditOpen(params.row);
                  }}
                  sx={{ minWidth: '30px', padding: '4px' }}
                >
                  <IconEdit fontSize="small" />
                </Button>
              </Stack>
            </Box>
          </>
        );
      },
      flex: 0.6
    }
  ];

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.template.emailtemplate}`;
    try {
      const response = await allEmailTemplate(com_url);
      console.log(`response?.data`, response?.data);

      if (response) {
        setAllTemplateDate(response?.data);
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEditOpen = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <NewEmail open={openAdd} onSuccess={fetchData} handleClose={handleCloseAdd} />
      <EditPage open={openEdit} handleClose={handleEditClose} EditData={selectedRow} onSuccess={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Email Template</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add New
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={allTemplateDate}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default EmailTemplate;
