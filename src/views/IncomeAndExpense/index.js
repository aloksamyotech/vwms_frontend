import { useEffect, useState } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Card,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Box
} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconTrash, IconEdit } from '@tabler/icons';

import Iconify from '../../ui-component/iconify';
import AddTask from './AddTask';
import { url } from 'api/url';
import { allInAndEx, deleteInAndEx } from 'api/apis';
import { toast } from 'react-toastify';
import EditPage from './EditPage';

const Task = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inAndExData, setInAndExData] = useState([]);
  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 10,
      renderCell: (params) => (
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
        </>
      ),
      flex: 0.6
    }
  ];

  const handleDeleteClick = (row) => {
    setOpenConfirm(true);
    setSelectedRow(row);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEditOpen = (row) => {
    setOpenEdit(true);
    setSelectedRow(row);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow) {
      try {
        const id = selectedRow._id;
        const com_url = `${url.base_url}${url.inAndEx.delete_inAndEx}${id}`;

        const response = await deleteInAndEx(com_url);
        await fetchData();
        toast.success(`Deleted Successfully`);
      } catch (error) {
        toast.error('Error deleting ');
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
    const com_url = `${url.base_url}${url.inAndEx.all_inAndEx}`;
    try {
      const response = await allInAndEx(com_url);
      if (response) {
        setInAndExData(response?.data);
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
      <AddTask open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />
      <EditPage EditData={selectedRow} open={openEdit} handleClose={handleEditClose} onSuccess={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Income & Expense</Typography>
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
                rows={inAndExData}
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

export default Task;
