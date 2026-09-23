import SideBar from "@/components/ui/sidebar";
import { Grid, GridItem, Text } from "@chakra-ui/react";

export default function DahsboardPage() {
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      height={"100vh"}
    >
      <GridItem colSpan={[12, 12, 2, 2]}>
        <SideBar />
      </GridItem>
      <GridItem colSpan={[12, 12, 10, 10]}>
        <Text> HIIIIIIIIIIII </Text>
      </GridItem>
    </Grid>
  );
}
