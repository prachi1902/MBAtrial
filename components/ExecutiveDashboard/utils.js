import { Tooltip } from "@chakra-ui/react";

export const graphDropDownOptions = [
  {
    label: "Spends",
    values: [
      { label: "S&M", value: "Spends S&M" },
      { label: "Marketing", value: "Spends Marketing" },
      { label: "Sales", value: "Spends Sales" },
    ],
  },
  {
    label: "Net Revenue",
    values: [{ value: "Net Revenue", label: "Net Revenue" }],
  },
  { label: "MaCo", values: [{ value: "MaCo", label: "MaCo" }] },
  { label: "Volume", values: [{ value: "Volume", label: "Volume" }] },
  {
    label: (
      <Tooltip
        label="Return on Investment = Incremental MACO / Marketing Spends"
        placement="bottom-start"
        width="19.25rem"
        padding="15px"
        fontSize="0.79rem"
        color="#3B3A39"
        lineHeight="1.3rem"
      >
        ROI
      </Tooltip>
    ),
    values: [{ label: "ROI", value: "ROI" }],
  },
  {
    label: "Market Share",
    values: [{ label: "Market Share", value: "Market Share" }],
  },
  {
    label: "% of NR",
    values: [
      { label: "S&M", value: "S&M % of NR" },
      { label: "Marketing", value: "Marketing % of NR" },
      { label: "Sales", value: "Sales % of NR" },
    ],
  },
  {
    label: "$/HL",
    values: [
      { label: "S&M", value: "S&M $/HL" },
      { label: "Marketing", value: "Marketing $/HL" },
      { label: "Sales", value: "Sales $/HL" },
    ],
  },
  {
    label: "NR/HL",
    values: [{ value: "NR/HL", label: "NR/HL" }],
  },
];

export const returnProperty = (selectedType, data) => {
  switch (selectedType) {
    case "Spend":
      return (data.media_spend / 1000000)?.toFixed(2);
    case "Net Revenue":
      return (data.media_nr / 1000000)?.toFixed(2);
    case "MaCo":
      return (data.media_maco / 1000000)?.toFixed(2);
    case "Volume":
      return (data.media_volume / 1000)?.toFixed(2);
    case "ROI":
      return data.media_roi?.toFixed(2);
    default:
      return 0;
  }
};

export const chartColor = [
  "#971B1E",
  "#2A9872",
  "#E02124",
  "#F7951D",
  "#00C0C7",
  "#5144D3",
  "#DA3490",
  "#9089FA",
  "#47E26F",
  "#2780EB",
  "#DFBF03",
  "#CB6F10",
];

export const returnLabels = (selectedType) => {
  switch (selectedType) {
    case "Spends":
      return { yLabel: "MM $", prefix: "$", suffix: "MM" };
    case "Net Revenue":
      return { yLabel: "MM $", prefix: "$", suffix: "MM" };
    case "MaCo":
      return { yLabel: "MM $", prefix: "$", suffix: "MM" };
    case "Volume":
      return { yLabel: "K HL", prefix: "", suffix: "K HL" };
    case "ROI":
      return { yLabel: "$", prefix: "$", suffix: "" };
    default:
      return { yLabel: "MM $", prefix: "$", suffix: "MM" };
  }
};

export const returnLabelsProjections = (selectedType) => {
  switch (selectedType) {
    case "net_revenue":
      return { yLabel: "MM $", prefix: "$", suffix: "MM" };
    case "maco":
      return { yLabel: "MM $", prefix: "$", suffix: "MM" };
    case "volume":
      return { yLabel: "K HL", prefix: "", suffix: "K HL" };
  }
};
