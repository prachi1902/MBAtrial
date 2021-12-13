import React from "react";

import { Container, Section, Page } from "../../../components/library";
import BrandsCarousel from "../../../components/ExecutiveDashboard/BrandsCarousel";
import ProjectionsSection from "./ProjectionsSection";

const ProjectionsLayout = () => {
  return (
    <Container mt="1rem" pb="10rem">
      <Section>
        <BrandsCarousel borderRadius="10px" />
      </Section>
      <ProjectionsSection />
    </Container>
  );
};

export default ProjectionsLayout;
