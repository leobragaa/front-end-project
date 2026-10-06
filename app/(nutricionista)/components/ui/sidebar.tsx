"use server";
import { getUsuario } from "@/actions/cadastro";
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

export default async function SideBar() {
  const nutricionista = await getUsuario(1);
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
              Dashboard
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/planoAlimentar"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Plano Alimentar
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/dadosClinicosCadastro"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Dados Clínicos
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/pacientesNutricionista"}>
            <Button variant={"ghost"} w="100%" justifyContent={"flex-start"}>
              Pacientes
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
        {nutricionista.map((usuario) => (
          <HStack gap={"4"} key={usuario?.email}>
            <Avatar.Root>
              <Avatar.Fallback name={usuario?.nome} />
              <Avatar.Image src={"https://bit.ly/broken-link"} />
            </Avatar.Root>
            <Stack gap={"0"}>
              <Text fontWeight={"medium"}>{usuario?.nome}</Text>
              <Text color="fg.muted" textStyle={"sm"}>
                {usuario?.email}
              </Text>
            </Stack>
          </HStack>
        ))}
      </Stack>
    </Flex>
  );
}
