import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  modalOpen: "none",
  tab: "Master",
  templateTypeData: {},
  shouldUpdate: true,
};

const DataManagementSlice = createSlice({
  name: "dataManagement",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
      state.shouldUpdate = true;
    },
    setTemplateTypeData: (state, action) => {
      state.templateTypeData = action.payload;
    },
    setShouldUpdate: (state, action) => {
      state.shouldUpdate = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = "none";
      state.templateTypeData = {};
    },
  },
});

export const useDataManagement = () => {
  const dispatch = useDispatch();
  const { setModal, setTab, setTemplateTypeData, setShouldUpdate, closeModal } =
    DataManagementSlice.actions;

  const dataMngDispatch = {
    setModal: (data) => dispatch(setModal(data)),
    setTab: (data) => dispatch(setTab(data)),
    setTemplateTypeData: (data) => dispatch(setTemplateTypeData(data)),
    setShouldUpdate: (data) => dispatch(setShouldUpdate(data)),
    closeModal: (data) => dispatch(closeModal(data)),
  };

  const dataMngState = useSelector((state) => state.dataManagement);

  return { dataMngState, dataMngDispatch };
};

export default DataManagementSlice.reducer;
