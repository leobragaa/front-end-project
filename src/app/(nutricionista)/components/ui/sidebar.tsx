"use server";
// import { getUsuario } from "@/src/actions/cadastro";
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
import { BiLogOut, BiMessageDetail } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";
import { PiForkKnifeFill } from "react-icons/pi";

export default async function SideBar() {
  // const nutricionista = await getUsuario(1);
  return (
    <Flex as={"nav"} direction={"column"} h={"100vh"}>
      <Heading>
        <HStack alignItems={"center"}>
          <Image src={"/NutriFlowSFun.png"} w={"14"} />
          <Text color={"green.600"} fontWeight={"bold"}>
            NutriFlow
          </Text>
        </HStack>
      </Heading>
      <Stack gap={"12"}>
        <Box>
          <Link href={"/dashboard"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              <FaHome />
              Dashboard
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/planoAlimentar"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              <PiForkKnifeFill />
              Plano Alimentar
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/dadosClinicosCadastro"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              <LuPencilRuler />
              Dados Clínicos
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/pacientesNutricionista"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              <BsPerson />
              Pacientes
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/chatNutricionista"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              <BiMessageDetail />
              Conversa
            </Button>
          </Link>
        </Box>
      </Stack>
      {/* <Stack gap={"8"}>
        {nutricionista && (
          <HStack gap={"4"} key={nutricionista.email}>
            <Avatar.Root>
              <Avatar.Fallback name={nutricionista.nome} />
              <Avatar.Image src={"https://bit.ly/broken-link"} />
            </Avatar.Root>
            <Stack gap={"0"}>
              <Text fontWeight={"medium"}>{nutricionista.nome}</Text>
              <Text color="fg.muted" textStyle={"sm"}>
                {nutricionista.email}
              </Text>
            </Stack>
          </HStack>
        )}
      </Stack> */}
      <Box>
        <Link href={"/"}>
          <Button variant={"ghost"} w="100%" alignItems={"center"}>
            <BiLogOut />
            Sair
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
