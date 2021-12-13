import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

import Table from "./Table";

const FormatSpendTable = () => {
  return (
    <Box margin="auto" width="96%">
      <Table>
        <Table.Columns />
        <Table.CategoryRow title="DIGITAL">
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
        </Table.CategoryRow>
        <Table.CategoryRow title="TRADITIONAL">
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
        </Table.CategoryRow>
        <Table.CategoryRow title="TRADITIONAL 2">
          <Table.Row title="Variable Name" />
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
        </Table.CategoryRow>
        <Table.CategoryRow title="DIGITAL 2">
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
        </Table.CategoryRow>
        <Table.CategoryRow title="TRADITIONAL 3">
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
        </Table.CategoryRow>
        <Table.CategoryRow title="DIGITAL 3">
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
        </Table.CategoryRow>
        <Table.CategoryRow title="TRADITIONAL 4">
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
          <Table.Row title="Vehicle name">
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
            <Table.SubRow title="Format Name" />
          </Table.Row>
          <Table.Row title="Variable Name" />
          <Table.Row title="Variable Name" />
        </Table.CategoryRow>
      </Table>
    </Box>
  );
};

export default FormatSpendTable;
