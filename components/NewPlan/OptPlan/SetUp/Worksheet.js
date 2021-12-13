import React from "react";
import Workbook from "react-excel-workbook";
import { Img, IconButton } from "@chakra-ui/react";

import { useMediaPlan } from "redux/MediaPlanSlice";

const Worksheet = () => {
  const { mediaPlanState } = useMediaPlan();
  const getIMPValues = () => {
    const temp = [];
    Object.values(mediaPlanState.mediaInflationValues).forEach((value) => {
      const i = temp.findIndex((item) => item.vehicles === value.vehicles);
      if (i > -1) {
        temp[i][value.month] = value.maco_per_hl;
      } else {
        temp.push({
          vehicles: value.vehicles,
          category: value.category,
          [value.month]: value.maco_per_hl,
        });
      }
    });
    return temp;
  };
  const getBVTValues = () => {
    const temp = {};
    Object.values(mediaPlanState.bvtValues).forEach((map) => {
      temp[map.month] = map.bvt;
    });
    return [temp];
  };
  const getNRValues = () => {
    const temp = {};
    Object.values(mediaPlanState.nrHLValues).forEach((map) => {
      temp[map.month] = map.nr_per_hl;
    });
    return [temp];
  };
  const getMacoValues = () => {
    const temp = {};
    Object.values(mediaPlanState.macoHLValues).forEach((map) => {
      temp[map.month] = map.maco_per_hl;
    });
    return [temp];
  };

  return (
    <Workbook
      filename="Opt Plan Adjustments.xlsx"
      element={
        <IconButton
          variant="gray"
          ml="1rem"
          bg="#dddddd"
          isRound={true}
          icon={<Img src="/svg/Download.svg" />}
        />
      }
    >
      <Workbook.Sheet data={getIMPValues} name="Media Inflation">
        <Workbook.Column label="Vehicle" value="vehicles" />
        <Workbook.Column label="JAN" value="JAN" />
        <Workbook.Column label="FEB" value="FEB" />
        <Workbook.Column label="MAR" value="MAR" />
        <Workbook.Column label="APR" value="APR" />
        <Workbook.Column label="MAY" value="MAY" />
        <Workbook.Column label="JUN" value="JUN" />
        <Workbook.Column label="JUL" value="JUL" />
        <Workbook.Column label="AUG" value="AUG" />
        <Workbook.Column label="SEP" value="SEP" />
        <Workbook.Column label="OCT" value="OCT" />
        <Workbook.Column label="NOV" value="NOV" />
        <Workbook.Column label="DEC" value="DEC" />
      </Workbook.Sheet>
      <Workbook.Sheet data={getBVTValues} name="Brand Volume Trend">
        <Workbook.Column label="JAN" value="JAN" />
        <Workbook.Column label="FEB" value="FEB" />
        <Workbook.Column label="MAR" value="MAR" />
        <Workbook.Column label="APR" value="APR" />
        <Workbook.Column label="MAY" value="MAY" />
        <Workbook.Column label="JUN" value="JUN" />
        <Workbook.Column label="JUL" value="JUL" />
        <Workbook.Column label="AUG" value="AUG" />
        <Workbook.Column label="SEP" value="SEP" />
        <Workbook.Column label="OCT" value="OCT" />
        <Workbook.Column label="NOV" value="NOV" />
        <Workbook.Column label="DEC" value="DEC" />
      </Workbook.Sheet>
      <Workbook.Sheet data={getNRValues} name="NR per HL">
        <Workbook.Column label="JAN" value="JAN" />
        <Workbook.Column label="FEB" value="FEB" />
        <Workbook.Column label="MAR" value="MAR" />
        <Workbook.Column label="APR" value="APR" />
        <Workbook.Column label="MAY" value="MAY" />
        <Workbook.Column label="JUN" value="JUN" />
        <Workbook.Column label="JUL" value="JUL" />
        <Workbook.Column label="AUG" value="AUG" />
        <Workbook.Column label="SEP" value="SEP" />
        <Workbook.Column label="OCT" value="OCT" />
        <Workbook.Column label="NOV" value="NOV" />
        <Workbook.Column label="DEC" value="DEC" />
      </Workbook.Sheet>
      <Workbook.Sheet data={getMacoValues} name="MaCo per HL">
        <Workbook.Column label="JAN" value="JAN" />
        <Workbook.Column label="FEB" value="FEB" />
        <Workbook.Column label="MAR" value="MAR" />
        <Workbook.Column label="APR" value="APR" />
        <Workbook.Column label="MAY" value="MAY" />
        <Workbook.Column label="JUN" value="JUN" />
        <Workbook.Column label="JUL" value="JUL" />
        <Workbook.Column label="AUG" value="AUG" />
        <Workbook.Column label="SEP" value="SEP" />
        <Workbook.Column label="OCT" value="OCT" />
        <Workbook.Column label="NOV" value="NOV" />
        <Workbook.Column label="DEC" value="DEC" />
      </Workbook.Sheet>
    </Workbook>
  );
};

export default Worksheet;
