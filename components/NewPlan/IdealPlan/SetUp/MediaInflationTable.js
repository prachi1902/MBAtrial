import React, { useState, useEffect } from "react";

import axios, { responseHandler, errorHandler } from "lib/http";
import Table from "./MediaInflationTableComp";
import { useMediaPlan } from "@/redux/MediaPlanSlice";

const MediaInflationTable = ({ tab }) => {
  const { mediaPlanState } = useMediaPlan();
  const [digitalVehicles, setDigitalVehicles] = useState([]);
  const [traditionalVehicles, setTraditionalVehicles] = useState([]);

  useEffect(() => {
    if (
      mediaPlanState.newPlanDetails.brand &&
      mediaPlanState.newPlanDetails.country
    ) {
      axios({
        url: "/data_mgmt/dataset_detail",
        params: {
          dataset_name: "master_mapping",
          brand: mediaPlanState.newPlanDetails?.brand,
          country: mediaPlanState.newPlanDetails?.country,
        },
      })
        .then(responseHandler)
        .then((res) => {
          const tempDigitalVehicles = [];
          const tempTraditionalVehicles = [];
          res?.forEach((vehicle, i) => {
            if (vehicle.Category === "DIGITAL") {
              tempDigitalVehicles.push(vehicle);
            } else {
              tempTraditionalVehicles.push(vehicle);
            }
          });
          setDigitalVehicles(tempDigitalVehicles);
          setTraditionalVehicles(tempTraditionalVehicles);
        })
        .catch(errorHandler);
    }
  }, [
    mediaPlanState.newPlanDetails.brand,
    mediaPlanState.newPlanDetails.country,
  ]);

  return (
    <Table
      showTable={tab === "Media inflation"}
      digitalVehicles={digitalVehicles}
      traditionalVehicles={traditionalVehicles}
    >
      <Table.Columns />
      <Table.CategoryRow title="DIGITAL">
        {digitalVehicles.map((vehicle, i) => {
          return <Table.Row key={i} title={vehicle.Vehicle} />;
        })}
      </Table.CategoryRow>
      <Table.CategoryRow title="TRADITIONAL">
        {traditionalVehicles.map((vehicle, i) => {
          return <Table.Row key={i} title={vehicle.Vehicle} />;
        })}
      </Table.CategoryRow>
    </Table>
  );
};

export default MediaInflationTable;
