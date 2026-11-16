
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Grid, GridItem, Heading, Text, Button } from "@chakra-ui/react";

export default function DashboardPage() {
  const router = useRouter();
  const [nome, setNome] = useState("Nutricionista");

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      setNome(usuario.nome);
    }
  }, []);

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      gap={5}
      p={5}
      minH="100vh"
      alignContent="start"
    >
      {/* Boas-vindas */}
      <GridItem colSpan={12}>
        <Card.Root
          borderRadius="xl"
          bg="green.700"
          color="white"
          p={4}
        >
          <Card.Header>
            <Heading size="xl">
              Seja bem-vindo(a), {nome}!
            </Heading>
          </Card.Header>

          <Card.Body>
            <Text>
              Bem-vindo ao NutriFlow. Aqui você pode acompanhar
              seus pacientes e gerenciar seus planos alimentares.
            </Text>
          </Card.Body>
        </Card.Root>
      </GridItem>

      {/* Pacientes */}
      <GridItem colSpan={[12, 6, 4]}>
        <Card.Root height="100%" borderRadius="xl">
          <Card.Header>
            <Heading size="md">Pacientes</Heading>
          </Card.Header>

          <Card.Body>
            <Text color="gray.500">
              Gerencie os pacientes cadastrados no NutriFlow.
            </Text>
          </Card.Body>

          <Card.Footer>
            <Button
              colorPalette="green"
              variant="outline"
              onClick={() => router.push("/pacientes")}
            >
              Visualizar pacientes
            </Button>
          </Card.Footer>
        </Card.Root>
      </GridItem>

      {/* Planos alimentares */}
      <GridItem colSpan={[12, 6, 4]}>
        <Card.Root height="100%" borderRadius="xl">
          <Card.Header>
            <Heading size="md">Planos alimentares</Heading>
          </Card.Header>

          <Card.Body>
            <Text color="gray.500">
              Consulte, crie e gerencie os planos alimentares
              dos seus pacientes.
            </Text>
          </Card.Body>

          <Card.Footer>
            <Button
              colorPalette="green"
              variant="outline"
              onClick={() => router.push("/visualizarPlano")}
            >
              Visualizar planos
            </Button>
          </Card.Footer>
        </Card.Root>
      </GridItem>

      {/* Cadastro de plano */}
      <GridItem colSpan={[12, 6, 4]}>
        <Card.Root height="100%" borderRadius="xl">
          <Card.Header>
            <Heading size="md">Novo plano alimentar</Heading>
          </Card.Header>

          <Card.Body>
            <Text color="gray.500">
              Crie um novo planejamento alimentar para um paciente.
            </Text>
          </Card.Body>

          <Card.Footer>
            <Button
              colorPalette="green"
              variant="outline"
              onClick={() => router.push("/planoAlimentar")}
            >
              Criar plano
            </Button>
          </Card.Footer>
        </Card.Root>
      </GridItem>

      {/* Informações do sistema */}
      <GridItem colSpan={12}>
        <Card.Root borderRadius="xl">
          <Card.Header>
            <Heading size="md">NutriFlow</Heading>
          </Card.Header>

          <Card.Body>
            <Text color="gray.500">
              Plataforma de gerenciamento nutricional para
              facilitar a comunicação entre nutricionistas
              e pacientes e o acompanhamento dos planos alimentares.
            </Text>
          </Card.Body>
        </Card.Root>
      </GridItem>
    </Grid>
  );
}
