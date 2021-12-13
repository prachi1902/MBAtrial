import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  newPlanDetails: {},
  selectedTab: "Set Up",
  selectedPlan: {
    type: "ideal",
    title: "Ideal Media Plan",
    hasExecuted: false,
  },
  listOfAllPlans: [
    {
      type: "ideal",
      title: "Ideal Media Plan",
      hasExecuted: false,
    },
  ],
  mediaInflationValues: {},
  bvtValues: {},
  nrHLValues: {},
  macoHLValues: {},
  impMediaInflationValues: {},
  impBvtValues: {},
  impNRHLValues: {},
  impMacoHLValues: {},
  lyDetails: {},
  weekEdited: {},
  idealPlanSpends: [],
  createNew: false,
};

const MediaPlanSlice = createSlice({
  name: "mediaPlan",
  initialState,
  reducers: {
    createNewPlan: (state, action) => {
      state.newPlanDetails = action.payload;
    },
    changeNewPlanFlag: (state, action) => {
      state.createNew = action.payload;
    },
    updateTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    updateListOfPlans: (state, action) => {
      state.listOfAllPlans = action.payload;
    },
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    updatePlanBrandDetails: (state, action) => {
      state.newPlanDetails = {
        ...state.newPlanDetails,
        ...action.payload,
        year: 2021,
      };
    },
    executeIdealPlan: (state, action) => {
      state.selectedPlan.hasExecuted = true;
      state.listOfAllPlans[0].hasExecuted = true;
    },
    newOptPlan: (state, action) => {
      state.selectedPlan = {
        id: action.payload.id,
        type: "opt",
        title: action.payload.title,
        hasExecuted: false,
        constraints: {
          opt_plan_id: action.payload.id,
          min_qwoa: 0,
          weakly_reach_max: 0,
          weakly_reach_min: 0,
        },
      };
      state.listOfAllPlans.push({
        id: action.payload.id,
        type: "opt",
        title: action.payload.title,
        hasExecuted: false,
        constraints: {
          opt_plan_id: action.payload.id,
          min_qwoa: 0,
          weakly_reach_max: 0,
          weakly_reach_min: 0,
        },
      });
      state.selectedTab = "Set Up";
    },
    newSimPlanFromOpt: (state, action) => {
      state.selectedPlan = {
        id: action.payload.id,
        type: "sim",
        from: "opt",
        title: action.payload.title,
        hasExecuted: false,
        opt_id: action.payload.opt_id,
        opt_plan_name: action.payload.opt_plan_name,
        opt_spends: action.payload?.spends,
        opt_plan_details: action.payload?.opt_plan_details,
        sim_spends: [],
      };
      state.listOfAllPlans.push({
        id: action.payload.id,
        type: "sim",
        from: "opt",
        title: action.payload.title,
        hasExecuted: false,
        opt_id: action.payload.opt_id,
        opt_plan_name: action.payload.opt_plan_name,
        opt_spends: action.payload?.spends,
        opt_plan_details: action.payload?.opt_plan_details,
        sim_spends: [],
      });
      state.selectedTab = "Media Plan";
    },
    updateSelectedPlan: (state, action) => {
      let tempList = [...state.listOfAllPlans];
      const i = tempList.findIndex(
        (plan) =>
          plan.id === state.selectedPlan.id &&
          plan.type === state.selectedPlan.type
      );
      tempList[i] = { ...state.selectedPlan, ...action.payload };
      state.listOfAllPlans = tempList;
      state.selectedPlan = { ...state.selectedPlan, ...action.payload };
    },
    updateMIValues: (state, action) => {
      state.mediaInflationValues = {
        ...state.mediaInflationValues,
        ...action.payload,
      };
    },
    updateBVTValues: (state, action) => {
      state.bvtValues = {
        ...state.bvtValues,
        ...action.payload,
      };
    },
    updateNRHLValues: (state, action) => {
      state.nrHLValues = {
        ...state.nrHLValues,
        ...action.payload,
      };
    },
    updateMacoHLValues: (state, action) => {
      state.macoHLValues = {
        ...state.macoHLValues,
        ...action.payload,
      };
    },
    updateIMPMIValues: (state, action) => {
      state.impMediaInflationValues = {
        ...state.impMediaInflationValues,
        ...action.payload,
      };
    },
    updateIMPBVTValues: (state, action) => {
      state.impBvtValues = {
        ...state.impBvtValues,
        ...action.payload,
      };
    },
    updateIMPNRValues: (state, action) => {
      state.impNRHLValues = {
        ...state.impNRHLValues,
        ...action.payload,
      };
    },
    updateIMPMacoValues: (state, action) => {
      state.impMacoHLValues = {
        ...state.impMacoHLValues,
        ...action.payload,
      };
    },
    updateLYDetails: (state, action) => {
      state.lyDetails = action.payload;
    },
    updateEditedWeekDetails: (state, action) => {
      state.weekEdited = { ...state.weekEdited, ...action.payload };
    },
    updateIdealPlanSpends: (state, action) => {
      state.idealPlanSpends = action.payload;
    },
    resetPlan: (state, action) => {
      state.newPlanDetails = {};
      state.selectedTab = "Set Up";
      state.selectedPlan = {
        type: "ideal",
        title: "Ideal Media Plan",
        hasExecuted: false,
      };
      state.listOfAllPlans = [
        {
          type: "ideal",
          title: "Ideal Media Plan",
          hasExecuted: false,
        },
      ];
    },
  },
});

export const useMediaPlan = () => {
  const dispatch = useDispatch();
  const {
    createNewPlan,
    updateTab,
    selectPlan,
    updatePlanBrandDetails,
    executeIdealPlan,
    newOptPlan,
    updateListOfPlans,
    updateSelectedPlan,
    newSimPlanFromOpt,
    updateMIValues,
    updateBVTValues,
    updateNRHLValues,
    updateMacoHLValues,
    resetPlan,
    updateLYDetails,
    updateEditedWeekDetails,
    updateIMPMIValues,
    updateIMPBVTValues,
    updateIMPNRValues,
    updateIMPMacoValues,
    updateIdealPlanSpends,
    changeNewPlanFlag,
  } = MediaPlanSlice.actions;

  const mediaPlanDispatch = {
    createNewPlan: (data) => dispatch(createNewPlan(data)),
    changeNewPlanFlag: (data) => dispatch(changeNewPlanFlag(data)),
    updateListOfPlans: (data) => dispatch(updateListOfPlans(data)),
    updateTab: (data) => dispatch(updateTab(data)),
    selectPlan: (data) => dispatch(selectPlan(data)),
    updatePlanBrandDetails: (data) => dispatch(updatePlanBrandDetails(data)),
    executeIdealPlan: (data) => dispatch(executeIdealPlan(data)),
    newOptPlan: (data) => dispatch(newOptPlan(data)),
    updateSelectedPlan: (data) => dispatch(updateSelectedPlan(data)),
    newSimPlanFromOpt: (data) => dispatch(newSimPlanFromOpt(data)),
    updateMIValues: (data) => dispatch(updateMIValues(data)),
    updateBVTValues: (data) => dispatch(updateBVTValues(data)),
    updateNRHLValues: (data) => dispatch(updateNRHLValues(data)),
    updateMacoHLValues: (data) => dispatch(updateMacoHLValues(data)),
    updateLYDetails: (data) => dispatch(updateLYDetails(data)),
    updateEditedWeekDetails: (data) => dispatch(updateEditedWeekDetails(data)),
    updateIMPMIValues: (data) => dispatch(updateIMPMIValues(data)),
    updateIMPBVTValues: (data) => dispatch(updateIMPBVTValues(data)),
    updateIMPNRValues: (data) => dispatch(updateIMPNRValues(data)),
    updateIMPMacoValues: (data) => dispatch(updateIMPMacoValues(data)),
    updateIdealPlanSpends: (data) => dispatch(updateIdealPlanSpends(data)),
    resetPlan: (data) => dispatch(resetPlan(data)),
  };

  const mediaPlanState = useSelector((state) => state.mediaPlan);

  return { mediaPlanState, mediaPlanDispatch };
};

export default MediaPlanSlice.reducer;
