import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function SideBar() {
  return (
    <Flex as={"nav"} direction={"column"} h={"100vh"}>
      <Heading>
        <Image src={"NutriFlowSFun.png"} w={"14"} />
        <Text> NutriFlow</Text>
      </Heading>
      <Stack gap={"4"}>
        <Box>
          <Button variant={"ghost"}>DashBoard</Button>
        </Box>
        <Box>
          <Button variant={"ghost"}> Paciente </Button>
        </Box>
        <Box>
          <Button variant={"ghost"}> Cadastrar Paciente </Button>
        </Box>
        <Box>
          <Button variant={"ghost"}>Sair</Button>
        </Box>
      </Stack>
    </Flex>
  );
}
