import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  countriesData: [],
  selectedCountry: {},
  selectedBrands: [],
};

const BrandOverviewSlice = createSlice({
  name: "brandOverview",
  initialState,
  reducers: {
    setCountriesData: (state, action) => {
      state.countriesData = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    updateSelectedBrands: (state, action) => {
      state.selectedBrands = action.payload;
    },
  },
});

export const useBrandOverview = () => {
  const dispatch = useDispatch();
  const { setCountriesData, setSelectedCountry, updateSelectedBrands } =
    BrandOverviewSlice.actions;

  const brandOverviewDispatch = {
    setCountriesData: (data) => dispatch(setCountriesData(data)),
    setSelectedCountry: (data) => dispatch(setSelectedCountry(data)),
    updateSelectedBrands: (data) => dispatch(updateSelectedBrands(data)),
  };

  const brandOverviewState = useSelector((state) => state.brandOverview);

  return { brandOverviewState, brandOverviewDispatch };
};

export default BrandOverviewSlice.reducer;
