import { createSlice } from "@reduxjs/toolkit";
import { Lazy } from "../../utils/Constants";
import { sortBy, dropWhile, drop, isEmpty, remove } from "lodash";

export const mainDataSlice = createSlice({
  name: "categoriesDataSlice",
  initialState: {
    categories: [
      // {
      //   id: 1,
      //   cloudId: null,
      //   name: "Fresas",
      //   date: new Date().getTime(),
      //   data: [],
      // },
      // {
      //   id: 2,
      //   name: "Teclados",
      //   data: [],
      //   cloudId: null,
      //   date: new Date().getTime(),
      // },
      // {
      //   id: 3,
      //   name: "Terreno",
      //   data: [],
      //   cloudId: null,
      //   date: new Date().getTime(),
      // },
    ],
    movements: [
      // {
      //   id: 1,
      //   categoryId: 1,
      //   cloudId: null,
      //   title: "fumigacion",
      //   amount: 80,
      //   type: "expense",
      //   date: new Date().getTime(),
      //   pendingComments: true,
      // },
      // {
      //   id: 2,
      //   categoryId: 1,
      //   movementId: null,
      //   title: "pago semanal",
      //   amount: 800,
      //   type: " income",
      //   date: new Date().getTime(),
      //   pendingComments: false,
      // },
    ],
    comments: [
      // {
      //   id: 1,
      //   cloudId: null,
      //   movementId: 1,
      //   categoryId: 1,
      //   title: "",
      //   commentsData: [
      //     {
      //       subTitle: "Comentario con estatus pendiente",
      //       isChecked: true,
      //       image: "",
      //     },
      //     {
      //       isChecked: false,
      //       subTitle: "Comentario sin estatus pendiente",
      //       image: "",
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   cloudId: null,
      //   movementId: 2,
      //   categoryId: 1,
      //   title: "ejemplo de title",
      //   commentsData: [
      //     {
      //       subTitle: "Comentario sin estatus pendiente",
      //       isChecked: false,
      //       image: "",
      //     },
      //     {
      //       isChecked: false,
      //       subTitle: "Comentario sin estatus pendiente",
      //       image: "",
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   cloudId: null,
      //   movementId: 1,
      //   categoryId: 2,
      //   title: "",
      //   commentsData: [
      //     {
      //       subTitle: "Comentario sin estatus pendiente",
      //       isChecked: false,
      //       image: "",
      //     },
      //     {
      //       isChecked: false,
      //       subTitle: "Comentario sin estatus pendiente",
      //       image: "",
      //     },
      //   ],
      // },
    ],
    // status: Lazy,
    status: {
      mainData: Lazy,
      tasks: [],
    },

    // oldData: {
    //   id: 1,
    //   cloudId: null,
    //   name: "Fresas",
    //   date: new Date().getTime(),
    //   data: [
    //     {
    //       id: 1,
    //       cloudId: null,
    //       title: "fumigacion",
    //       amount: 80,
    //       type: "expense",
    //       date: new Date().getTime(),
    //       comments: {
    //         image: "",
    //         pendingTaskStatus: true,
    //         data: [
    //           {
    //             image: "",
    //             isChecked: true,
    //             title: "Comentario con estatus pendiente",
    //           },
    //           {
    //             image: "",
    //             isChecked: false,
    //             title: "Comentario sin estatus pendiente",
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       id: 2,
    //       backuped: false,
    //       title: "pago semanal",
    //       amount: 800,
    //       type: " income",
    //       date: new Date().getTime(),
    //       comments: {
    //         image: "",
    //         pendingTaskStatus: false,
    //         data: [],
    //       },
    //     },
    //     {
    //       id: 3,
    //       cloudId: null,
    //       title: "cosecha",
    //       amount: 450,
    //       type: "expense",
    //       date: new Date().getTime(),
    //       comments: {
    //         image: "",
    //         pendingTaskStatus: false,
    //         data: [],
    //       },
    //     },
    //   ],
    // },
  },
  reducers: {
    createNewElement: (state, { payload: { type, data } }) => {
      state[type].unshift({ ...data });
    },

    deleteElement: (state, { payload: { type, cloudId } }) => {
      remove(state[type], (el) => el.cloudId === cloudId);
    },

    saveInLocalData: (state, { payload: { type, data } }) => {
      state[type].unshift({ ...data });
    },

    savedInCloudData: (state, { payload: { type, localId, cloudId } }) => {
      state[type].forEach((element) => {
        if (element.id === localId) element.cloudId = cloudId;
      });

      state.status.tasks = state.status.tasks.filter((el) => el !== type);
      if (isEmpty(state.status.tasks)) state.status.mainData = Lazy;
    },

    saveGottenFromCloud: (state, { payload: { data, type } }) => {
      state[type] = data;

      state.status.tasks = state.status.tasks.filter((el) => el !== type);
      if (isEmpty(state.status.tasks)) state.status.mainData = Lazy;
    },

    setDataStatus: (state, { payload: { status, tasks } }) => {
      state.status.mainData = status;
      state.status.tasks = tasks;
    },

    // updateDataStatus: (state, { paylad: { type } }) => {
    //   state.status.tasks = state.status.tasks.filter((el) => el !== type);
    //   if (isEmpty(state.status.tasks)) state.status.mainData = Lazy;
    // },

    sortDataBy: (state, { payload: { type } }) => {
      state[type] = sortBy(state[type], (el) => el.date).reverse();
      console.log(state[type]);
    },
    cleanData: (state) => {
      state.categories = [];
      state.movements = [];
      state.comments = [];
      state.status = {
        mainData: Lazy,
        tasks: [],
      };
    },
  },
});

export const {
  createNewElement,
  deleteElement,
  savedInCloudData,
  saveGottenFromCloud,
  setDataStatus,
  // updateDataStatus,
  sortDataBy,
  cleanData,
} = mainDataSlice.actions;

export const selectCategories = (state) => state.mainData.categories;
export const selectMovements = (state) => state.mainData.movements;
export const selectComments = (state) => state.mainData.comments;
export const status = (state) => state.mainData.status.mainData;
export const fullStatus = (state) => state.mainData.status;

export default mainDataSlice.reducer;
