"use client";
import { Grid, GridItem, Text } from "@chakra-ui/react";

export default function DahsboardPage() {
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      height={"100vh"}
    >
      <GridItem colSpan={[12, 12, 12, 12]}>
        <Text> HIIIIIIIIIIII </Text>
      </GridItem>
    </Grid>
  );
}
