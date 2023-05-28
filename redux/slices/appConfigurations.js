import { createSlice } from "@reduxjs/toolkit";
import {
  TypeCategory,
  TypeComment,
  DarkTheme,
  GlobalCategoriesIds,
  GlobalCommentsIds,
  GlobalMovementsIds,
  LightTheme,
  TypeMovement,
} from "../../utils/Constants";
import { groupBy, maxBy } from "lodash";

const initialConfigurations = {
  ids: {
    categoriesIds: 0,
    movementsIdsByCategoryIds: {},
    commentsIdsByMovementAndCategoryIds: {},
  },
  faves: {},
  theme: DarkTheme,
};

export const appConfigurationsSlice = createSlice({
  name: "configurationDataSlice",
  initialState: {
    configurations: {
      ...initialConfigurations,
    },
  },
  reducers: {
    switchTheme: ({ configurations: { theme } }) => {
      if (theme === DarkTheme) {
        console.log("aaaaaaa", LightTheme);
        theme = LightTheme;
      } else {
        theme = DarkTheme;
      }
    },
    setGlobalIdCounter: (
      { configurations: { ids } },
      { payload: { type, data } }
    ) => {
      // const groupedData = groupBy(data, (el) => el.id);
      // console.log("---data---", data);
      switch (type) {
        case TypeCategory:
          ids[GlobalCategoriesIds] = maxBy(data, (el) => el.id).id;
          break;
        case TypeMovement:
          const movementsGroup = groupBy(data, (el) => el.categoryId);
          Object.keys(movementsGroup).forEach((key) => {
            const maxIdMovement = maxBy(movementsGroup[key], (el) => el.id);
            ids[GlobalMovementsIds][maxIdMovement.categoryId] =
              maxIdMovement.id;
          });
          break;
        case TypeComment:
          const commentsGroup = groupBy(
            data,
            (el) => "" + el.categoryId + el.movementId
          );
          Object.keys(commentsGroup).forEach((key) => {
            const maxIdComment = maxBy(commentsGroup[key], (el) => el.id);
            ids[GlobalCommentsIds][key] = maxIdComment.id;
          });
          break;
        case TypeComment:
          break;
      }
    },
    incrementIdsCounter: (
      { configurations: { ids } },
      { payload: { type, categoryId, movementId, amount = 1 } }
    ) => {
      switch (type) {
        case GlobalCategoriesIds:
          ids[GlobalCategoriesIds] = (ids[GlobalCategoriesIds] || 0) + amount;
          break;
        case GlobalMovementsIds:
          ids[GlobalMovementsIds][categoryId] =
            (ids[GlobalMovementsIds][categoryId] || 0) + amount;
          break;
        case GlobalCommentsIds:
          ids[GlobalCommentsIds]["" + categoryId + movementId] =
            (ids[GlobalCommentsIds]["" + categoryId + movementId] || 0) +
            amount;
          break;
          yi;
        default:
          throw new Error("Not possible to update: " + type);
      }
    },
    cleanConfigurations: (state) => {
      state.configurations = {
        ...initialConfigurations,
      };
    },
  },
});

export const {
  incrementIdsCounter,
  setGlobalIdCounter,
  switchTheme,
  cleanConfigurations,
} = appConfigurationsSlice.actions;

export const globalIds = (state) => state.appConfigurations.configurations.ids;

export const currentTheme = (state) =>
  state.appConfigurations.configurations.theme;

export default appConfigurationsSlice.reducer;
