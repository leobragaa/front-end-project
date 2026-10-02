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
          <Link href={"/dashboard"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Dashboard
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/listaPaciente"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Paciente
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/planoAlimentarPaciente"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Plano Alimentar
            </Button>
          </Link>
        </Box>
        <Box>
          <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
            Conversa
          </Button>
        </Box>
        <Box>
          <Link href={"/"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Sair
            </Button>
          </Link>
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
