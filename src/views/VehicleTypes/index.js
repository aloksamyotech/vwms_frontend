import { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Card,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconTrash } from '@tabler/icons';
import Iconify from '../../ui-component/iconify';
import AddCalls from './Addcalls';
import TableStyle from '../../ui-component/TableStyle';
import { url } from 'api/url';
import { allVehicleType, deleteVehicleType, updateVehicleStatus } from 'api/apis';
import { toast } from 'react-toastify';

const Call = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [allVehicleData, setAllVehicleData] = useState([]);

  const updateVehicleStatusAPI = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    const com_url = `${url.base_url}${url.vehicle_type.editStatus}${id}`;
    const data = { status: newStatus };
    try {
      const response = await updateVehicleStatus(com_url, data);
      if (response) {
        toast.success('Successfully updated status');
        fetchData();
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const columns = [
    {
      field: 'vehicleName',
      headerName: 'Vehicle Type',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'vehicleImage',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        <Box
          component="img"
          src={`http://localhost:8080/${params.value}`}
          sx={{ width: '100%', maxHeight: '40px', maxWidth: '65px', objectFit: 'contain' }}
          alt={params.row.vehicleName}
        />
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            width: '70px',
            height: '30px',
            backgroundColor: params.value === 'Active' ? '#36d962' : '#ed6868',
            color: 'white',
            padding: '4px',
            borderRadius: '6px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'editStatus',
      headerName: 'Edit Status',
      flex: 1,
      renderCell: (params) => (
        <Stack>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#36d962'
            }}
            sx={{
              width: '70px',
              height: '30px',
              color: 'white',
              padding: '4px',
              borderRadius: '6px',
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => updateVehicleStatusAPI(params.row._id, params.row.status)}
          >
            Edit
          </Button>
        </Stack>
      )
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 10,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#ed6868' }}
            onClick={() => handleDeleteClick(params.row)}
            sx={{ minWidth: '5px', padding: '4px' }}
          >
            <IconTrash fontSize="small" />
          </Button>
        </Stack>
      ),
      flex: 0.4
    }
  ];

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow) {
      try {
        const id = selectedRow._id;
        const com_url = `${url.base_url}${url.vehicle_type.delete}${id}`;
        const response = await deleteVehicleType(com_url);
        toast.success('Service deleted successfully');
        await fetchData();
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

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.vehicle_type.all}`;
    try {
      const response = await allVehicleType(com_url);
      if (response) {
        setAllVehicleData(response.data);
        console.log(`allVehicleData`, response.data);
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AddCalls open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Vehicle Types</Typography>
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
                rows={allVehicleData}
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
            <DialogContentText>Are you sure you want to delete?</DialogContentText>
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

export default Call;
