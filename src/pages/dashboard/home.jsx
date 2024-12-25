import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Menu,

} from "@material-tailwind/react";
import { StatisticsChart } from "@/widgets/charts";
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, Skeleton, TextField } from "@mui/material";

// import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "@/context/authContext";

import SellerTable from "@/components/SellerTable";

import { BsSearch } from "react-icons/bs";
import TasksCard from "@/components/TasksCard";
import { ToastContainer } from "react-toastify";
import { AdmintableData, AdminTaskData, SellerTableData, sellerTasksData } from "@/data/dummyData";
import AdminTable from "@/components/AdminATable";
export function Home() {

  const { userInfo ,setpageHeading } = useAuth()

  useEffect(() => {
    setpageHeading({title:"Home",backURL:null})
    return () => {
      
    };
  }, []);
  // dispatch here
  // const dispatch = useDispatch();

  const [tasksDetails, settasksDetails] = useState({
    tasks: userInfo.roll == 'admin' ? [...AdminTaskData] : userInfo.roll == 'user' ? [...sellerTasksData] : [],
    error: null,
    loading: false,
  });

  const [tableDetails, settableDetails] = useState({

    tables: userInfo.roll == 'admin' ? [...AdmintableData] : userInfo.roll == 'user' ? [...SellerTableData] : [],
    error: null,
    loading: false,
  });


  const [status, setStatus] = useState("All");
  const [adminTableSearch, setadminTableSearch] = useState('');


  const handleChange = (event) => {
    setStatus(event.target.value);
  };



  return (
    <div className="mt-4">
      <ToastContainer />

      <div className="mb-6 grid grid-cols-1 gap-y-6 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {tasksDetails.loading ?
          [1, 2, 3].map((load, i) => <Card key={i} className="py-3 mx-auto md:w-full w-[70%] p-3">
            <Skeleton variant="rounded" className="w-[70%] mt-2" height={10} />
            <Skeleton variant="rounded" className="w-[90%] my-2" height={50} />
          </Card>)
          :
          tasksDetails.tasks.map((task, i) => (
            <TasksCard key={i} roll={'admin'} title={task.title} data={task.data} />
          ))
          // <StatisticsChart

          //   key={props.title}
          //   {...props}
          // footer={
          //   <Typography
          //     variant="small"
          //     className="flex items-center font-normal text-blue-gray-600"
          //   >
          //     <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
          //     &nbsp;{props.footer}
          //   </Typography>
          // }
          //   /> 
        }
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Order data
              </Typography>
              {/* <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography> */}
            </div>
            <Menu placement="left-start">

              {userInfo.roll == 'user' ?
                <FormControl className="w-44" variant="outlined" size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={handleChange}
                    label="Status"
                    defaultValue="All"
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
                :
                <FormControl className="w-44" variant="outlined" size="small">

                  <TextField
                    label="Search"
                    size="small"
                    value={adminTableSearch}
                    className="w-[100%]"
                    onChange={(event) => setadminTableSearch(event.target.value)}
                    id="outlined-end-adornment"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'gray', // Default border color
                        },
                        '&:hover fieldset': {
                          borderColor: '#e80674', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#e80674', // Border color when focused
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#e80674', // Label color when focused
                      },
                      '& .MuiInputAdornment-root': {
                        color: 'gray', // Default icon color
                      },
                      '& .Mui-focused .MuiInputAdornment-root': {
                        color: '#e80674', // Icon color when focused
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <BsSearch />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </FormControl>
              }


            </Menu>
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2 relative">
            {/* {userInfo == "seller" &&
              <CustomizeTable roll={userInfo} data={tables} loading={tableLoading} heading={["Order ID/ waybill ID", "Created Date", "Pickup & Delivery Address", "Payment Mode"]} />}

            {userInfo == 'admin' && <CustomizeTable roll={userInfo} data={Admintable} loading={tableLoading} heading={["Seller ID", "Wallat Amount", "Subscription Plan", "Action"]} />}
 */}


            {userInfo.roll == 'user' &&
              <SellerTable data={tableDetails.tables} loading={tableDetails.loading} searchKey={status} heading={["Order ID/ waybill ID", "Created Date", "Pickup & Delivery Address", "Payment Mode"]} />
            }

            {userInfo.roll == 'admin' &&
              <AdminTable data={tableDetails.tables} setChanges={settableDetails} searchKey={adminTableSearch} loading={tableDetails.loading} heading={["Seller Name", "Wallat Amount", "Subscription Plan", "Action"]} />}




          </CardBody>
        </Card>
        {/* <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card> */}
      </div>
    </div>
  );
}

export default Home;
