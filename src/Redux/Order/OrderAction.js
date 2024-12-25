// // src/redux/actions/orderActions.js
// import axios from 'axios';
// // import api from '../../configs/BaseURL'
// import {
//   FETCH_TABLE_DATA_REQUEST,
//   FETCH_TABLE_DATA_SUCCESS,
//   FETCH_TABLE_DATA_FAILURE,

//   FETCH_TASK_DATA_REQUEST,
//   FETCH_TASK_DATA_SUCCESS,
//   FETCH_TASK_DATA_FAILURE,
// } from './OrderType.js';
// import api from '@/configs/BaseURL.js';
// import projectsTableData from '@/data/projects-table-data.js';
// import { toast } from 'react-toastify';
// import statisticsChartsData from '@/data/statistics-charts-data.js';

// // Fetch Table Data
// // export const fetchTableData = (roll) => {
// //   return (dispatch) => {
// //     dispatch({ type: FETCH_TABLE_DATA_REQUEST });

// //     let URL = roll == 'admin' ? '/todos' : roll == 'seller' ? '/users'
// //       : false;
// //     if (URL == false) {
// //       dispatch({
// //         type: FETCH_TABLE_DATA_FAILURE,
// //         payload: 'Invalid role',
// //       });
// //     }
// //     else {
// //       api
// //         .get(URL) // Replace with your API URL
// //         .then((response) => {
// //           dispatch({
// //             type: FETCH_TABLE_DATA_SUCCESS,
// //             // replace response data
// //             payload: projectsTableData,
// //           });
// //         })
// //         .catch((error) => {
// //           toast.error("Some error table")
// //           dispatch({
// //             type: FETCH_TABLE_DATA_FAILURE,
// //             // replace error.message 
// //             payload: "somthing error",
// //           });
// //         });
// //     }

// //   };
// // }

// // // Fetch Task Data
// // export const fetchTaskData = (roll) => {
// //   return (dispatch) => {
// //     dispatch({ type: FETCH_TASK_DATA_REQUEST });

// //     let URL = roll == 'admin' ? '/todos' : roll == 'seller' ? '/todos'
// //       : false;

// //     if (URL == false) {
// //       toast.error("Invalid Roll")

// //       dispatch({
// //         type: FETCH_TASK_DATA_FAILURE,
// //         payload: 'Invalid role',
// //       });
// //     } else {
// //       api
// //         .get(URL) // Replace with your API URL
// //         .then((response) => {
// //           dispatch({
// //             type: FETCH_TASK_DATA_SUCCESS,
// //             // replace response data
// //             payload: statisticsChartsData,
// //           });
// //         })
// //         .catch((error) => {
// //           toast.error("Some error Tasks")
// //           dispatch({
// //             type: FETCH_TASK_DATA_FAILURE,
// //             payload: "error on teask fetching",
// //           });
// //         });

// //     }
// //   };
// // }
