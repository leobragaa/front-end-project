"use client";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function DahsboardPage() {
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      height={"100vh"}
      gap={"5"}
    >
      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Box> Novos Pacientes </Box>
      </GridItem>

      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Box> Agendas do Dia </Box>
      </GridItem>
      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Box> Pacientes Totais </Box>
      </GridItem>
      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Box> Planos </Box>
      </GridItem>
    </Grid>
  );
}
