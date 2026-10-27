"use server";
import {} from "@/src/actions/cadastro";
import { Button, Card, Grid, GridItem, Table } from "@chakra-ui/react";
import Link from "next/link";

export default async function PacientePage() {
  // const pacientes = await getPaciente(1);

  // const totalByPacientes = pacientes.length;

  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      width={"100%"}
      height={"100vh"}
      gap={"5"}
      margin={"5"}
    >
      <GridItem colSpan={[12, 12, 2, 12]}>
        <Link href={"/planoAlimentar/cadastroPlanoAlimentar"}>
          <Button>Novo Plano Alimentar</Button>
        </Link>
      </GridItem>

      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Card.Root height={"40"} width={"48"} borderRadius={"xl"}>
          <Card.Header> TOTAL PACIENTES</Card.Header>
          {/* <Card.Body>{totalByPacientes}</Card.Body> */}
        </Card.Root>
      </GridItem>

      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Card.Root height={"40"} width={"48"} borderRadius={"xl"}>
          <Card.Header>PLANOS ATIVOS</Card.Header>
          {/* <Card.Body>{totalByPacientes}</Card.Body> */}
        </Card.Root>
      </GridItem>

      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Card.Root height={"40"} width={"48"} borderRadius={"xl"}>
          <Card.Header> ULTIMOS 30 DIAS</Card.Header>
          {/* <Card.Body>{totalByPacientes}</Card.Body> */}
        </Card.Root>
      </GridItem>

      <GridItem colSpan={[12, 12, 10, 10]} width={"100"} height={"100vh"}>
        <Table.ScrollArea border={"1px solid"}>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Paciente</Table.ColumnHeader>
                <Table.ColumnHeader>Idade</Table.ColumnHeader>
                <Table.ColumnHeader>Data Plano</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            {/* <Table.Body>
              {pacientes.map((paciente) => (
                <Table.Row key={paciente?.id}>
                  <Table.Cell> {paciente?.nome}</Table.Cell>
                  <Table.Cell> {paciente?.datanascimento}</Table.Cell>
                  <Table.Cell> {paciente?.datanascimento} </Table.Cell>
                  <Table.Cell> {paciente?.sexo}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <IconButton> Ver Plano </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body> */}
          </Table.Root>
        </Table.ScrollArea>
      </GridItem>
    </Grid>
  );
}
