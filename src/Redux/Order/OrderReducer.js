// // src/redux/reducers/orderReducer.js
// import { projectsTableData, statisticsChartsData } from '@/data';
// import {
//     FETCH_TABLE_DATA_REQUEST,
//     FETCH_TABLE_DATA_SUCCESS,
//     FETCH_TABLE_DATA_FAILURE,
//     FETCH_TASK_DATA_REQUEST,
//     FETCH_TASK_DATA_SUCCESS,
//     FETCH_TASK_DATA_FAILURE,
//   } from './OrderType';


// //   Init State
  
//   const tableInitData = {
//     tables: [],
//     tableLoading: true,
//     tableError: null,
//   };

//   const taskInitData = {
//     tasks: [],
//     taskLoading: true,
//     taskError: null,
//   };

// //   reducer ---- 
  
// export  const TableReducer = (state = tableInitData, action) => {
//     switch (action.type) {
//       // Fetch Table Data
//       case FETCH_TABLE_DATA_REQUEST:
//         return { ...state, tableLoading: true };
//       case FETCH_TABLE_DATA_SUCCESS:
//         return { ...state, tableLoading: false, tables: action.payload };
//       case FETCH_TABLE_DATA_FAILURE:
//         return { ...state, tableLoading: false, tableError: action.payload };
//       default:
//         return state;
//     }
//   };
//  export const TaskReducer = (state = taskInitData, action) => {
//     switch (action.type) {
//       // Fetch Task Data
//       case FETCH_TASK_DATA_REQUEST:
//         return { ...state, taskLoading: true };
//       case FETCH_TASK_DATA_SUCCESS:
//         return { ...state, taskLoading: false, tasks: action.payload };
//       case FETCH_TASK_DATA_FAILURE:
//         return { ...state, taskLoading: false, taskError: action.payload };
//       default:
//         return state;
//     }
//   };



        

  