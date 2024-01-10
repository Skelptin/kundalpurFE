import React, { useEffect, useState } from 'react'
import { Box, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";

import { serverInstance } from '../../../../../../../../API/ServerInstance';

import './Add.css'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  background: '#FFFFF',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const AddSal = ({ addSalaryCallback }) => {


  const [open, setOpen] = useState(false)

  const [dept, setDept] = useState('')
  const [deptList, setDeptList] = useState('')

  const [des, setDes] = useState('')
  const [desList, setDesList] = useState('')

  const [isData , setIsData] = useState('')

  const [remark, setRemark] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [EID, setEID] = useState('')
  const [empName, setEmpName] = useState('')
  const [amtPaid, setAmtPaid] = useState('')


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const resetForm = () => {
    setDept('');
    setDes('');
    setRemark('');
    setYear('');
    setMonth('');
    setEID('');
    setEmpName('');
    setAmtPaid('');
  };




  const addSalary = (e) => {
    e.preventDefault();
    try {

      const data = {
        employeeId: EID,
        employeeName: empName,
        department: dept,
        designation: des,
        year: year,
        month: month,
        amountPaid: amtPaid,
        remark: remark
      }
      serverInstance('hr/add-employeeSalary', 'post', data).then((res) => {
        
        if (res.status ) {
          console.log(res);
          setOpen(false);
          // setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
          console.log("THis is" + data)
          handleClose()
          addSalaryCallback()
          resetForm()
        }
        if (res?.status === false) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Error!', res?.msg, 'error');

        }
      })
    } catch (err) {
      console.log(err)
      Swal.fire('Error!', 'something went wrong', 'error')
    }
  }

  const getDepartment = () => {
    serverInstance('admin/get-department', 'get').then((res) => {
      if (res.status) {
        setDeptList(res.data);

      } else {
        Swal('Error', 'something went  wrong', 'error');
      }
    });
  };

  const getDesignation = () => {

    serverInstance('admin/get-designation', 'get').then((res) => {
      if (res.status) {
        setDesList(res.data)
      } else {
        console.log("Can't get Designation  ")
      }
    })
  }

  const getEmployee =  () => {

    try {

      serverInstance('hr/get-employee', 'get').then((res) => {
        if (res.data) {
          setIsData(res.data)
          console.log(isData)
         
        }
      })
    } catch (err) {
      console.log(err)
    }
  }



  const getEmployeeDetails = (selectedEID) => {
    const selectedEmployee = (isData && isData.find((emp) => emp.employeeID === selectedEID));

    if (selectedEmployee) {
        setEmpName(selectedEmployee.employeeName);
        setDes(selectedEmployee.designation);
        setDept(selectedEmployee.department);
    }
    //  else{
    //   handleClose();
    //   Swal.fire("Employee Doesn't Exist ")
      
    // }
};

const handleEID = (e) => {
  const selectedEID = e.target.value;
  setEID(selectedEID);

  getEmployeeDetails(selectedEID);
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
    getEmployee();
    getDesignation();
    getDepartment();

  }, [])


  return (
    <div className='mainContainer' style={{}}>


      <button id="srcbtn" onClick={handleOpen} style={{ width: '10rem' }}>
        +Add Salary
      </button>

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
              <form onSubmit={addSalary}>
                <div className="add-div-close-div">
                  <h2 clssName="add_text_only">Create Employee Salary</h2>
                  <CloseIcon onClick={() => handleClose()} />
                </div>

                <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                  {currDate} / {currTime}
                </Typography>

                <div className="flex_div_main_add_user">

                  <div className="main-input-div1">

                    <div className="inner-input-divadd">
                      <label >Employee ID*</label>
                      <input
                        type="text"
                        placeholder='Enter Employee ID'
                        id="phone"
                        required
                        name="phone"
                        value={EID}
                        onChange={handleEID}
                      />
                    </div>

                    <div className="inner-input-divadd">
                      <label >Select Year*</label>
                      <input
                        type="year"
                        placeholder='Select Year'
                        id="year"
                        required
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>

                  </div>

                  <div className="main-input-div1">

                    <div className="inner-input-divadd">
                      <label >Employee Name*</label>
                      <input
                        type="text"
                        placeholder='Enter Employee Name'
                        id="empName"
                        required
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                      />
                    </div>

                    <div className="inner-input-divadd">
                      <label >Select Month</label>
                      <Select
                        sx={{
                          width: '18rem',
                          height: '2rem',
                          borderRadius: '0.5rem',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        id="month"
                        required
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>Select Month</MenuItem>
                        <MenuItem value="01">January</MenuItem>
                        <MenuItem value="02">February</MenuItem>
                        <MenuItem value="03">March</MenuItem>

                        <MenuItem value="04">April</MenuItem>
                        <MenuItem value="05">May</MenuItem>
                        <MenuItem value="06">June</MenuItem>

                        <MenuItem value="07">July</MenuItem>
                        <MenuItem value="08">August</MenuItem>
                        <MenuItem value="09">September</MenuItem>

                        <MenuItem value="10">October</MenuItem>
                        <MenuItem value="11">November</MenuItem>
                        <MenuItem value="12">December</MenuItem>


                      </Select>
                    </div>

                  </div>

                  <div className="main-input-div1">
                    <div className="inner-input-divadd" >
                      <label htmlFor="Department">Select Department*</label>
                      <Select
                        required
                        sx={{
                          width: '18rem',
                          height: '2rem',
                          borderRadius: '0.5rem',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        displayEmpty
                      >

                        <MenuItem value="" disabled>
                          Select Department
                        </MenuItem>

                        {deptList && deptList?.map((item, index) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item?.departmentName_hi}

                            >
                              {item?.departmentName_hi}
                            </MenuItem>
                          )
                        })}

                      </Select>
                    </div>

                    <div className="inner-input-divadd" >
                      <label htmlFor="Department">Amount Paid*</label>
                      <input
                        placeholder='Enter Amount Paid'
                        required
                        sx={{
                          width: '18rem',
                          height: '2rem',
                          borderRadius: '0.5rem',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}

                        value={amtPaid}
                        onChange={(e) => setAmtPaid(e.target.value)}

                      />

                    </div>
                  </div>

                  <div className="main-input-div1">

                    <div className="inner-input-divadd">
                      <label >Select Designation*</label>
                      <Select
                        required
                        sx={{
                          width: '18rem',
                          height: '2rem',
                          borderRadius: '0.5rem',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Designation
                        </MenuItem>

                        {desList && desList?.map((item, index) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item?.hi_designation}

                            >
                              {item?.hi_designation}
                            </MenuItem>
                          )
                        })}


                      </Select>
                    </div>

                    <div className="inner-input-divadd">
                      <label >Remark</label>
                      <input
                        type="text"
                        placeholder='Enter Remark'
                        id="remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                      />
                    </div>


                  </div>



                </div>

                <div className="save-div-btn">
                  <button className="save-div-btn-btn" >

                    Add Salary

                  </button>
                  <button
                    type='button'
                    onClick={() => handleClose()}
                    className="save-div-btn-btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>


    </div>
  )
}

export default AddSal