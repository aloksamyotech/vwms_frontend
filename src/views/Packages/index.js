import { useState } from 'react';

import {
  Stack,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Card
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconTrash, IconEdit } from '@tabler/icons';

import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddLead.js';
import { useEffect } from 'react';
import { url } from 'api/url';
import { allIPackage, deletePackage } from 'api/apis';
import { toast } from 'react-toastify';
import EditPage from './EditPage';

const Lead = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const columns = [
    {
      field: 'name',
      headerName: 'Package Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'vehicleType',
      headerName: 'Vehicle Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'desc',
      headerName: 'Description',
      flex: 1.2
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.6
    },
    {
      field: 'time',
      headerName: 'Time',
      renderCell: (params) => {
        const { hours, minutes } = params.row;
        if (hours == '0') {
          return `${minutes}m`;
        } else if (minutes == '0') {
          return `${hours}h`;
        } else {
          return `${hours}h ${minutes}m`;
        }
      },
      flex: 1
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
            <Box sx={{ width: 'auto', padding: '4px' }}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={1}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#ed6868', minWidth: '3px', padding: '4px' }}
                  onClick={() => {
                    handleDeleteClick(params.row);
                  }}
                >
                  <IconTrash fontSize="small" />
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
        const com_url = `${url.base_url}${url.package.delete}${id}`;

        const response = await deletePackage(com_url);

        toast.success(`Deleted Successfully`);
        await fetchData();
      } catch (error) {
        toast.error('Error deleting Package');
      } finally {
        setOpenConfirm(false);
        setSelectedRow(null);
      }
    }
  };
  const handleEditOpen = (row) => {
    setOpenEdit(true);
    setSelectedRow(row);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedRow(null);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.package.all}`;
    try {
      const response = await allIPackage(com_url);

      const data = response.data;
      const rowData = data?.map((item, index) => {
        return {
          _id: item._id,
          name: item.name,
          desc: item.desc,
          vehicleType: item.type.vehicleName,
          hours: item.hours,
          minutes: item.minutes,
          price: item.price,
          status: item.status || 'Active'
        };
      });

      if (response) {
        setPackageData(rowData);
      }
    } catch (error) {
      toast.error(`Error fetching Data`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <AddLead open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />
      <EditPage EditData={selectedRow} open={openEdit} handleClose={handleEditClose} fetchData={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Packages</Typography>
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
                rows={packageData}
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

export default Lead;
