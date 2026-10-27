"use server";
import { getPaciente } from "@/src/actions/paciente";
import { Card, Grid, GridItem } from "@chakra-ui/react";

export default async function DahsboardPage() {
  const pacientes = await getPaciente(1);

  const totalByPacientes = pacientes.length;
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      height={"100vh"}
      gap={"5"}
      margin={"5"}
    >
      <GridItem
        colSpan={[12, 12, 11, 11]}
        height={"56"}
        width={"100"}
        marginTop={"3"}
      >
        <Card.Root height={"56"} width={"100"} borderRadius={"xl"}>
          <Card.Header>Seja Bem-Vindo(a) Nutricionista {}</Card.Header>
          <Card.Body>
            {" "}
            Hoje você possui {10} consulta para o dia de Hoje
          </Card.Body>
        </Card.Root>
      </GridItem>

      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Card.Root height={"56"} width={"56"} borderRadius={"xl"}>
          <Card.Header> NOVOS PACIENTES</Card.Header>
          <Card.Body>{totalByPacientes}</Card.Body>
        </Card.Root>
      </GridItem>

      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Card.Root height={"56"} width={"56"} borderRadius={"xl"}>
          <Card.Header>PLANOS ALIMETARES</Card.Header>
          <Card.Body>{totalByPacientes}</Card.Body>
        </Card.Root>
      </GridItem>
      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Card.Root height={"56"} width={"56"} borderRadius={"xl"}>
          <Card.Header>CONSULTAS HOJE</Card.Header>
          <Card.Body>{totalByPacientes}</Card.Body>
        </Card.Root>
      </GridItem>
      <GridItem
        colSpan={[12, 12, 2, 2]}
        height={"56"}
        width={"56"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Card.Root height={"56"} width={"56"} borderRadius={"xl"}>
          <Card.Header>PLANOS ALIMETARES</Card.Header>
          <Card.Body>{totalByPacientes}</Card.Body>
        </Card.Root>
      </GridItem>
      <GridItem
        colSpan={[12, 12, 11, 11]}
        height={"70"}
        width={"100"}
        border={"1px solid"}
        borderRadius={"xl"}
      >
        <Card.Root height={"60"} width={"100"} borderRadius={"xl"}>
          <Card.Header>Agenda de Consultas Hoje</Card.Header>
          <Card.Body></Card.Body>
        </Card.Root>
      </GridItem>
    </Grid>
  );
}
