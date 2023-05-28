import { configureStore } from "@reduxjs/toolkit";
import mainDataSlice from "./slices/mainData";
import appConfigurationsSlice from "./slices/appConfigurations";
import sessionSlice from "./slices/authConfigurations";

export default configureStore({
  reducer: {
    mainData: mainDataSlice,
    appConfigurations: appConfigurationsSlice,
    sessionData: sessionSlice,
  },
});
