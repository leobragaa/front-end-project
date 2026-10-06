"use client";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

export default function DahsboardPagePaciente() {
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      height={"100vh"}
    >
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"56"}>
        <Box> OIIIIIIIS </Box>
      </GridItem>

      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"56"}>
        <Box> OIIIIIIIS </Box>
      </GridItem>
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"56"}>
        <Box> OIIIIIIIS </Box>
      </GridItem>
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"56"}>
        <Box> OIIIIIIIS </Box>
      </GridItem>
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"56"}>
        <Box> OIIIIIIIS </Box>
      </GridItem>
      <GridItem
        colSpan={[12, 12, 12, 12]}
        width={"100"}
        height={"100vh"}
        background={"orange.500"}
      ></GridItem>
    </Grid>
  );
}
