import {
  ChakraProvider,
  Grid,
  GridItem,
  defaultSystem,
} from "@chakra-ui/react";
import SideBar from "./components/ui/sidebar";

export default async function NutricionistaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      height={"100vh"}
    >
      <GridItem colSpan={[12, 12, 2, 2]}>
        <SideBar />
      </GridItem>
      <GridItem colSpan={[12, 12, 10, 10]}>{children}</GridItem>
    </Grid>
  );
}
