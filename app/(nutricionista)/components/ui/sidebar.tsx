"use client";
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
        <HStack gap={"4"}>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image src={"https://bit.ly/broken-link"} />
          </Avatar.Root>
          <Stack gap={"0"}>
            <Text fontWeight={"medium"}>{}</Text>
            <Text color="fg.muted" textStyle={"sm"}></Text>
          </Stack>
        </HStack>
      </Stack>
    </Flex>
  );
}
