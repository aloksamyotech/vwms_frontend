import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconEdit } from '@tabler/icons';
import Iconify from '../../../ui-component/iconify';
import TableStyle from '../../../ui-component/TableStyle';
import NewSms from './NewSms.js';
import EditPage from './EditPage';
import { url } from 'api/url';
import { allSmsTemplate } from 'api/apis';
import { toast } from 'react-toastify';

const SmsTemplate = () => {
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
      field: 'templateContent',
      headerName: 'Template Content',
      flex: 5,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ width: 'auto', padding: '4px' }}>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={1}>
            <Button variant="contained" onClick={() => handleEditOpen(params.row)} sx={{ minWidth: '30px', padding: '4px' }}>
              <IconEdit fontSize="small" />
            </Button>
          </Stack>
        </Box>
      ),
      flex: 0.6
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleEditOpen = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  const handleEditClose = () => setOpenEdit(false);

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.template.smstemplate}`;
    try {
      const response = await allSmsTemplate(com_url);
      if (response) {
        setAllTemplateDate(response.data);
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NewSms open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />
      <EditPage open={openEdit} EditData={selectedRow} handleClose={handleEditClose} onSuccess={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">SMS Template</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
            Add New
          </Button>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={allTemplateDate}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                slots={{ Toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default SmsTemplate;
