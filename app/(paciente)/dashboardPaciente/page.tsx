"use client";
import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";

export default function DahsboardPagePaciente() {
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      height={"100vh"}
    >
      <HStack margin="10" gap={"10"}>
        <GridItem
          colSpan={[12, 12, 2, 2]}
          height={"56"}
          width={"56"}
          border={"1px solid"}
          borderRadius={"xl"}
        >
          <Box> Novos Planos </Box>
        </GridItem>

        <GridItem
          colSpan={[12, 12, 2, 2]}
          height={"56"}
          width={"56"}
          border={"1px solid"}
          borderRadius={"xl"}
        >
          <Box> Agenda e Proxima Consulta</Box>
        </GridItem>

        <GridItem
          colSpan={[12, 12, 2, 2]}
          height={"56"}
          width={"56"}
          border={"1px solid"}
          borderRadius={"xl"}
        >
          <Box> Plano Alimentar </Box>
        </GridItem>
      </HStack>
      <GridItem colSpan={[12, 12, 12, 12]} width={"100"} height={"100vh"}>
        <Box> Evolução </Box>
        
      </GridItem>
    </Grid>
  );
}
