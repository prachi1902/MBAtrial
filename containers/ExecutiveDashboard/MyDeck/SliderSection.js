import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Text, Img, Box } from "@chakra-ui/react";

import { Section, Page } from "@/components/library";
import CustomScrollbar from "@/components/common/CustomScrollbar";

const SliderSection = () => {
  const [images, setImages] = useState([
    { thumbnail: "/png/graph.png", id: "1" },
    { thumbnail: "/png/graph.png", id: "2" },
    { thumbnail: "/png/graph.png", id: "3" },
    { thumbnail: "/png/graph.png", id: "4" },
    { thumbnail: "/png/graph.png", id: "5" },
    { thumbnail: "/png/graph.png", id: "6" },
    { thumbnail: "/png/graph.png", id: "7" },
    { thumbnail: "/png/graph.png", id: "8" },
    { thumbnail: "/png/graph.png", id: "9" },
    { thumbnail: "/png/graph.png", id: "10" },
    { thumbnail: "/png/graph.png", id: "11" },
    { thumbnail: "/png/graph.png", id: "12" },
    { thumbnail: "/png/graph.png", id: "13" },
    { thumbnail: "/png/graph.png", id: "14" },
    { thumbnail: "/png/graph.png", id: "15" },
    { thumbnail: "/png/graph.png", id: "16" },
    { thumbnail: "/png/graph.png", id: "17" },
    { thumbnail: "/png/graph.png", id: "18" },
  ]);

  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  return (
    <Section mt="1rem" pb="4rem">
      <Page py="1rem" pb="2rem" px="0.5rem" bg="bgGray">
        <Text
          textAlign="center"
          fontSize="0.875rem"
          ml="1.5rem"
          color="darkGray"
          fontStyle="italic"
          mb="1rem"
        >
          Click and drag to re-order slides
        </Text>
        {winReady && (
          <DragDropContext>
            <Droppable direction="horizontal" droppableId="droppable">
              {(provided, snapshot) => (
                <Box
                  display="flex"
                  width="100%"
                  overflowX="auto"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <CustomScrollbar
                    height="180px"
                    vertical={false}
                    horizontal={true}
                    isFlex={true}
                    isHalf={true}
                  >
                    {images.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={`${item.id}-id`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            minWidth="11.55rem"
                            height="8.8rem"
                            borderRadius="8px"
                            bg="white"
                            mb="1rem"
                            p="10px"
                            mx="0.3rem"
                            boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.2)"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Img
                              src={item.thumbnail}
                              mb="1.5rem"
                              width="100%"
                            />
                            <Text
                              fontSize="0.9rem"
                              ml="0.5rem"
                              textAlign="left"
                            >
                              Projections | Volume
                            </Text>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </CustomScrollbar>
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Page>
    </Section>
  );
};

export default SliderSection;
