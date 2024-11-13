import { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  Typography,
  Card,
  Box
} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddMeetings from './Addmeetings';
import { IconTrash, IconEdit } from '@tabler/icons';
import Iconify from '../../ui-component/iconify';
import { url } from 'api/url';
import { allService, deleteService } from 'api/apis';
import { toast } from 'react-toastify';
import EditPage from './EditPage';

const Meeting = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [serviceData, setserviceData] = useState([]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'desc',
      headerName: 'Description',
      flex: 1
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1
    },
    {
      field: 'time',
      headerName: 'Time',
      renderCell: (params) => {
        const { hours, minutes } = params.row;
        return `${hours}h ${minutes}m`;
      },
      flex: 1
    },
    // {
    //   field: 'onWebsite',
    //   headerName: 'Service Tab',
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Box
    //       sx={{
    //         backgroundColor: params.value === 'active' ? '#36d962' : '#32a3db',
    //         color: 'white',
    //         padding: '6px',
    //         borderRadius: '6px',
    //         textAlign: 'center'
    //       }}
    //     >
    //       {params.value}
    //     </Box>
    //   ),
    //   cellClassName: 'name-column--cell--capitalize'
    // },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            maxWidth: '100px',
            width: '70px',
            backgroundColor: params.value === 'Active' ? '#36d962' : '#ed6868',
            color: 'white',
            padding: '4px',
            borderRadius: '6px',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 10,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ width: 'auto', padding: '4px' }}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleEditOpen(params.row);
                  }}
                  sx={{ minWidth: '30px', padding: '4px' }}
                >
                  <IconEdit />
                </Button>
              </Stack>
            </Box>
            <Box sx={{ width: 'auto', padding: '4px' }}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#ed6868' }}
                  onClick={() => {
                    handleDeleteClick(params.row);
                  }}
                  sx={{ minWidth: '30px', padding: '4px' }}
                >
                  <IconTrash />
                </Button>
              </Stack>
            </Box>
          </>
        );
      },
      flex: 1
    }
  ];
  const handleDeleteClick = (row) => {
    setOpenConfirm(true);
    setSelectedRow(row);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow) {
      try {
        const id = selectedRow._id;
        const com_url = `${url.base_url}${url.service.delete_service}${id}`;

        const response = await deleteService(com_url);
        await fetchData();
        toast.success('Service deleted successfully');
      } catch (error) {
        toast.error('Error deleting service');
      } finally {
        setOpenConfirm(false);
        setSelectedRow(null);
      }
    }
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedRow(null);
  };

  const handleEditOpen = (row) => {
    setOpenEdit(true);
    setSelectedRow(row);
  };
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleEditClose = () => setOpenEdit(false);

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.service.all_service}`;
    try {
      const response = await allService(com_url);
      if (response) {
        setserviceData(response?.data);
      }
    } catch (error) {
      toast.error(`Error fetching data`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AddMeetings open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />
      <EditPage EditData={selectedRow} open={openEdit} handleClose={handleEditClose} onSuccess={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Service Lists</Typography>
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
                rows={serviceData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
        <Dialog open={openConfirm} onClose={handleCloseConfirm}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this service?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Meeting;
