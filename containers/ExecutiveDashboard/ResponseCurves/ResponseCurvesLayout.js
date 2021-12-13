import React from "react";

import { Container, Section, Page } from "../../../components/library";
import BrandsCarousel from "../../../components/ExecutiveDashboard/BrandsCarousel";
import ResponseCurvesSection from "./ResponseCurvesSection";

const ResponseCurvesLayout = () => {
  return (
    <Container mt="1rem" pb="10rem">
      <Section>
        <BrandsCarousel borderRadius="10px" />
      </Section>
      <ResponseCurvesSection />
    </Container>
  );
};

export default ResponseCurvesLayout;
