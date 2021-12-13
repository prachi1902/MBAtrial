import React, { useState, useEffect } from "react";
import { Flex, Text, Img, Button, IconButton, Box } from "@chakra-ui/react";
import XLSX from "xlsx";

import { Section, Page } from "@/components/library";
import { useMediaPlan } from "@/redux/MediaPlanSlice";
import MediaInflationTable from "./MediaInflationTable";
import VolumeTable from "./VolumeTable";
import MacoHLTable from "./MacoHLTable";
import NRHLTable from "./NRHLTable";
import Worksheet from "./Worksheet";

const TableSection = ({ showAdjustment }) => {
  const tabs = ["Media inflation", "Brand Volume Trend", "NR/HL", "MaCo/HL"];
  const [tab, setTab] = useState("Media inflation");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mediaPlanDispatch } = useMediaPlan();

  const inputRef = React.useRef();
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
    setLoading(true);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      const MISheet = wb.Sheets["Media Inflation"];
      const MISheetData = XLSX.utils.sheet_to_json(MISheet);
      MISheetData.forEach((vehicle) => {
        months.forEach((month) => {
          mediaPlanDispatch.updateMIValues({
            [month + vehicle.Vehicle]: {
              maco_per_hl: vehicle[month] || 0,
              month: month,
              vehicles: vehicle.Vehicle,
            },
          });
        });
      });
      const BVTSheet = wb.Sheets["Brand Volume Trend"];
      const BVTSheetData = XLSX.utils.sheet_to_json(BVTSheet);
      BVTSheetData.forEach((vehicle) => {
        months.forEach((month) => {
          mediaPlanDispatch.updateBVTValues({
            [month]: { bvt: vehicle[month] || 0, month: month },
          });
        });
      });
      const NRHLSheet = wb.Sheets["NR per HL"];
      const NRHLSheetData = XLSX.utils.sheet_to_json(NRHLSheet);
      NRHLSheetData.forEach((vehicle) => {
        months.forEach((month) => {
          mediaPlanDispatch.updateNRHLValues({
            [month]: { nr_per_hl: vehicle[month] || 0, month: month },
          });
        });
      });
      const MacoHLSheet = wb.Sheets["MaCo per HL"];
      const MacoHLSheetData = XLSX.utils.sheet_to_json(MacoHLSheet);
      MacoHLSheetData.forEach((vehicle) => {
        months.forEach((month) => {
          mediaPlanDispatch.updateMacoHLValues({
            [month]: { maco_per_hl: vehicle[month] || 0, month: month },
          });
        });
      });
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
    setLoading(false);
  };

  return (
    <Section display={showAdjustment ? "block" : "none"} my="1rem">
      <Page py="1rem" px="1.5rem">
        <Flex align="flex-end" justifyContent="space-between">
          <Text>Adjustments</Text>
          <Flex>
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
              isLoading={loading}
              bg="#dddddd"
              onClick={() => inputRef.current.click()}
              isRound={true}
              icon={<Img src="/svg/upload.svg" />}
            />
            <Worksheet />
          </Flex>
        </Flex>
        <Flex my="1rem">
          {tabs.map((data, i) => (
            <Button
              key={i}
              variant={tab === data ? "primary" : "basic"}
              onClick={() => {
                if (tab === data) {
                  null;
                } else {
                  setTab(data);
                }
              }}
              size="sm"
              border={tab === data ? "solid 1px #B27831" : "none"}
              color={tab === data ? "buttonText" : "darkGray"}
              boxShadow="none"
              fontWeight="normal"
              borderRadius="4px"
            >
              {data}
            </Button>
          ))}
        </Flex>
        <MediaInflationTable tab={tab} />
        <VolumeTable tab={tab} />
        <NRHLTable tab={tab} />
        <MacoHLTable tab={tab} />
      </Page>
    </Section>
  );
};

export default TableSection;

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
