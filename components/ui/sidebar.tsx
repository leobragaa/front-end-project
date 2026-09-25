import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
export default function SideBar() {
  return (
    <Flex as={"nav"} direction={"column"} h={"100vh"}>
      <Heading>
        <HStack alignItems={"center"}>
          <Image src={"NutriFlowSFun.png"} w={"14"} />
          <Text color={"green.600"} fontWeight={"bold"}>
            {" "}
            NutriFlow
          </Text>
        </HStack>
      </Heading>
      <Stack gap={"12"}>
        <Box>
          <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
            <Text>DashBoard</Text>
          </Button>
        </Box>
        <Box>
          <Link href={"/paciente"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Paciente
            </Button>
          </Link>
        </Box>
        <Box>
          <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
            Cadastrar Paciente
          </Button>
        </Box>
        <Box>
          <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
            Sair
          </Button>
        </Box>
      </Stack>
      <Stack gap={"8"}>
        <HStack gap={"4"} key={"usuario.email"}>
          <Avatar.Root>
            <Avatar.Fallback name="Pamonha" />
            <Avatar.Image src={"https://bit.ly/broken-link"} />
          </Avatar.Root>
          <Stack gap={"0"}>
            <Text fontWeight={"medium"}>Pamonha</Text>
            <Text color="fg.muted" textStyle={"sm"}>
              pamonha@email.com
            </Text>
          </Stack>
        </HStack>
      </Stack>
    </Flex>
  );
}
