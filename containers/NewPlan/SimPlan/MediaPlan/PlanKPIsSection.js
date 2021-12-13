import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Img,
  IconButton,
  Button,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import XLSX from "xlsx";
import { cloneDeep } from "lodash";

import axios, { responseHandler, errorHandler } from "@/lib/http";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import { Section, Page } from "components/library";
import { Tabs } from "components/FormComponents";
import PlanYearTable from "components/NewPlan/SimPlan/MediaPlan/PlanYearTable";
import PlanWeekTable from "@/components/NewPlan/SimPlan/MediaPlan/PlanWeekTable";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const PlanKPIsSection = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = React.useRef();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [data, setData] = useState({});
  const { control, watch } = useForm({
    defaultValues: {
      period: "FY Summary",
    },
  });
  const { mediaPlanDispatch, mediaPlanState } = useMediaPlan();
  const periodValue = watch("period");

  const simulate = () => {
    setLoading(true);
    window.scrollTo(0, 0);
    const weeksData = Object.keys(data).map((item) => data[item]);
    axios({
      method: "post",
      url: "/sim_plan/save_52week_plan",
      data: {
        sim_plan_id: mediaPlanState.selectedPlan.id,
        week_plan_52: weeksData,
      },
    })
      .then(responseHandler)
      .then(() => {
        axios({
          method: "post",
          url: "/sim_plan/execute",
          params: {
            sim_id: mediaPlanState.selectedPlan.id,
          },
        })
          .then(responseHandler)
          .then((data) => {
            mediaPlanDispatch.updateSelectedPlan({
              sim_spends: data.simulate_response,
              hasExecuted: true,
            });
          })
          .catch(errorHandler)
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        setLoading(false);
        errorHandler(err);
      });
  };

  const downloadPlan = () => {
    setDownloadLoading(true);
    axios({
      url: "/algo/response",
      responseType: "arraybuffer",
      params: { id: mediaPlanState.selectedPlan.id },
      method: "post",
    })
      .then(responseHandler)
      .then((res) => {
        const blob = new Blob([res], {
          type: "application/octet-stream",
        });
        const filename = "52-week-plan.xlsx";
        saveAs(blob, filename);
      })
      .catch(errorHandler)
      .finally(() => setDownloadLoading(false));
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) setFile(files[0]);
  };

  useEffect(() => {
    if (file) {
      handleFile();
    }
  }, [file]);

  const handleFile = () => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const sheetData = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      const temp = cloneDeep(data);
      sheetData.forEach((vehicle) => {
        if (vehicle.Vehicle) {
          Object.keys(vehicle).forEach((key) => {
            if (key.substring(0, 2) === "WK") {
              temp[vehicle.Vehicle + key.substring(2)] = {
                ...data[vehicle.Vehicle + key.substring(2)],
                planned_spend: vehicle[key],
              };
            }
          });
        }
      });
      setData(temp);
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const duplicateSim = () => {
    setLoading(true);
    window.scrollTo(0, 0);
    axios({
      url: "/sim_plan/",
      method: "post",
      data: {
        media_plan_id: mediaPlanState.newPlanDetails?.id,
        opt_plan_id: mediaPlanState.selectedPlan?.opt_id,
      },
    })
      .then(responseHandler)
      .then((res) => {
        mediaPlanDispatch.newSimPlanFromOpt({
          id: res.sim_plan_id,
          title: res.sim_plan_name,
          opt_id: mediaPlanState.selectedPlan?.opt_id,
          opt_plan_name: mediaPlanState.selectedPlan?.opt_plan_name,
          spends: mediaPlanState.selectedPlan?.opt_spends,
          opt_plan_details: mediaPlanState.selectedPlan?.opt_plan_details,
        });
      })
      .catch(errorHandler)
      .finally(() => setLoading(false));
  };

  return (
    <Section my="1rem">
      {loading && <FullScreenLoader />}
      <Page py="1rem" px="1.5rem">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          pb="1.5rem"
        >
          <Text width="220px">Plan KPIs</Text>
          <Tabs
            height="32px"
            fontSize="0.875rem"
            name="period"
            control={control}
            options={["FY Summary", "52 Week Plan"]}
          />
          <Flex>
            {mediaPlanState.selectedPlan?.hasExecuted ? (
              <>
                <Button onClick={duplicateSim}>Create new scenario plan</Button>
                <Tooltip label="Download Results">
                  <IconButton
                    onClick={downloadPlan}
                    isLoading={downloadLoading}
                    variant="gray"
                    ml="1rem"
                    bg="#dddddd"
                    isRound={true}
                    icon={<Img src="/svg/Download.svg" />}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Button
                  onClick={simulate}
                  leftIcon={<Img src="/svg/run plan.svg" />}
                >
                  Simulate
                </Button>
                <Tooltip label="Download Results">
                  <IconButton
                    onClick={downloadPlan}
                    isLoading={downloadLoading}
                    variant="gray"
                    ml="1rem"
                    bg="#dddddd"
                    isRound={true}
                    icon={<Img src="/svg/Download.svg" />}
                  />
                </Tooltip>
                <Box display="none">
                  <input
                    onChange={handleChange}
                    ref={inputRef}
                    name="uploadPlan"
                    type="file"
                    accept=".xls, .xlsx"
                  />
                </Box>
                <IconButton
                  variant="gray"
                  ml="1rem"
                  onClick={() => inputRef.current.click()}
                  bg="#dddddd"
                  isRound={true}
                  icon={<Img src="/svg/upload.svg" />}
                />
              </>
            )}
          </Flex>
        </Flex>
        {loading ? null : (
          <>
            <PlanWeekTable
              setData={setData}
              data={data}
              periodValue={periodValue}
            />
            <PlanYearTable periodValue={periodValue} />
          </>
        )}
      </Page>
    </Section>
  );
};

export default PlanKPIsSection;
