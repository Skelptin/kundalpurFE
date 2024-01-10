import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import CircularProgress from '@mui/material/CircularProgress';
import { ExportPdfmanul } from '../../compoments/ExportPdf';


import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import Delete from '../../../../assets/Delete.png';


import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import UpdateCategory from './UpdateCategory';


import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import Add from './Add';
import Update from './Update'



const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const TRMaster = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [updatedata, setupdatedata] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const [deleteId, setdeleteId] = useState('');
  const [open3, setOpen3] = React.useState(false);


  const handleOpen1 = (data) => {
    setOpen1(true);
    setupdatedata(data);
  };




  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setdeleteId(id);
  };


  const handleClose5 = () => setOpen3(false);


  const handleClose4 = () => {
    setOpen3(false);
    serverInstance(`admin/delete-bhojnalayHead?id=${deleteId}`, 'delete').then((res) => {
      if (res.data.status === true) {
        setOpen(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
      if (res.data.status === false) {
        setOpen(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
    });
  };

  const getBhojnalayHead = () => {
    setloader(true);
    serverInstance('admin/get-bhojnalayHead', 'get').then((res) => {
      console.log(res.data)
      if (res.data) {
        setloader(false);
        setisData(res.data);
      }
    });
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };




  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });



  useEffect(() => {
   getBhojnalayHead();

    setopendashboard(true);


    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }),
    );
    setSortConfig({ key: key, direction: direction });
  };
  return (
    <>
      <Dialog
        open={open3}
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Add Trust Type
                  </h2>
                  <Typography
                    style={{ marginLeft: '1rem' }}
                    variant="body2"
                    color="primary"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>
              <Add setOpen={handleClose} updatedata={updatedata} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Update Trust Type
                  </h2>
                  <Typography
                    style={{ marginLeft: '1rem' }}
                    variant="body2"
                    color="primary"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <Update setOpen={handleClose1} updatedata={updatedata} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div>
        <div className="search-header-print">
          <div
            className="search-header-print"
            style={{
              borderBottom: '1px  solid gray',
              width: '100%',
              borderTop: ' 1px solid gray',
              paddingTop: '1%',
            }}
          >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  //   onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '0rem' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  //   onClick={() => ExportPdfmanul(isData, 'Report')}
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  //   onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Trust Type">
              <Button
                onClick={() => handleOepn()}
                className="add_btn_main_dhara"
              >
                + Add
              </Button>
            </Tooltip>
            &nbsp;&nbsp;
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>
                  Type
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                 Price
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                 Remark
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            {isData && isData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {index + 1}
                </TableCell>
                <TableCell>

                  {item.type}
                </TableCell>
                <TableCell>
                  {item.price}
                </TableCell>
                <TableCell>
                    {item?.remark}
                </TableCell>

                <TableCell>
                  <Tooltip title="Edit">
                    <img
                      onClick={() => handleOpen1(item)}
                      src={Edit}
                      alt="eye"
                      style={{ width: '20px', marginRight: '0.5rem' }}
                    />
                  </Tooltip>

                  <Tooltip title="Delete">
                    <img
                      onClick={() => handleClickOpen3(item?.id)}
                      src={Delete}
                      alt="eye"
                      style={{ width: '20px' }}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))

            }



            <TableFooter>
              <TableRow>
                <TablePagination
                  count={isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: 'secondary',
                  }}
                  nextIconButtonProps={{ color: 'secondary' }}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'page number',
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default TRMaster;
