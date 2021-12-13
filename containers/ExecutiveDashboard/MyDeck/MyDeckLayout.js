import React, { useState, useEffect } from "react";

import { Container } from "components/library";
import GraphSection from "./GraphSection";
import SliderSection from "./SliderSection";
import axios, { responseHandler, errorHandler } from "@/lib/http";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const MyDeckLayout = () => {
  const [loading, setLoading] = useState(false);
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "/my_deck/all_pages",
    })
      .then(responseHandler)
      .then((data) => setSlidesData(data.pages))
      .catch(errorHandler)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container mt="1rem" pb="10rem">
      {loading && <FullScreenLoader />}
      <GraphSection loading={loading} slidesData={slidesData} />
      {/* <SliderSection /> */}
    </Container>
  );
};

export default MyDeckLayout;
