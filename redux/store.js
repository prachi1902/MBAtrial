import { configureStore } from "@reduxjs/toolkit";
import mediaPlanReducer from "./MediaPlanSlice";
import BrandOverviewSlice from "./BrandOverviewSlice";
import DataManagementSlice from "./DataManagementSlice";
import userReducer from "./UserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    mediaPlan: mediaPlanReducer,
    brandOverview: BrandOverviewSlice,
    dataManagement: DataManagementSlice,
  },
});
