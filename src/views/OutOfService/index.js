import { useState } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box
} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import { IconTrash } from '@tabler/icons';
import { toast } from 'react-toastify';
import AddPolicy from './AddPolicy';
import { useEffect } from 'react';
import { url } from 'api/url';
import { allOutOfServices, deleteOutOfService } from 'api/apis';

const PolicyManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [allOutOfServicesData, setAllOutOfServicesData] = useState([]);
  const columns = [
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 2,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 2,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'desc',
      headerName: 'Description',
      flex: 2,
      cellClassName: 'name-column--cell--capitalize'
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
            onClick={() => {
              handleDeleteClick(params.row);
            }}
            sx={{ minWidth: '30px', padding: '4px' }}
          >
            <IconTrash />
          </Button>
        </Stack>
      ),
      flex: 1
    }
  ];

  const handleDeleteClick = (row) => {
    setOpenConfirm(true);
    setSelectedRow(row);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedRow(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow) {
      try {
        const id = selectedRow._id;
        const com_url = `${url.base_url}${url.out_of_service.delete}${id}`;

        const response = await deleteOutOfService(com_url);
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

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.out_of_service.all}`;
    try {
      const response = await allOutOfServices(com_url);
      if (response) {
        setAllOutOfServicesData(response?.data);
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
      <AddPolicy open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Out of service(Schedule Holidays)</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Schedule Now
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={allOutOfServicesData}
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
            <DialogContentText>Are you sure you want to delete</DialogContentText>
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

export default PolicyManagement;
