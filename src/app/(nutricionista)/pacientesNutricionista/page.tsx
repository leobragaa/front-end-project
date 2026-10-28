"use server";
import {} from "@/src/actions/cadastro";
import { Button, Card, Grid, GridItem, Table, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

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
        <Link href={"/pacienteCadastro"}>
          <Button>Novo Paciente</Button>
        </Link>
        <Link href={"/dadosClinicosCadastro"}>
          <Button>Cadastrar Dado Clinico</Button>
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
          <Card.Header> EM ACOMPANHAMENTO</Card.Header>
          {/* <Card.Body>{totalByPacientes}</Card.Body> */}
        </Card.Root>
      </GridItem>

      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Card.Root height={"40"} width={"48"} borderRadius={"xl"}>
          <Card.Header> NOVOS PACIENTES</Card.Header>
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
                <Table.ColumnHeader>Contato</Table.ColumnHeader>
                <Table.ColumnHeader>Objetivo</Table.ColumnHeader>
                <Table.ColumnHeader>Última Consulta</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            {/* <Table.Body>
              {pacientes.map((paciente) => (
                <Table.Row key={paciente?.id}>
                  <Table.Cell> {paciente?.nome}</Table.Cell>
                  <Table.Cell> {paciente?.datanascimento}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    {paciente?.telefone} {paciente?.email}
                  </Table.Cell>
                  <Table.Cell> {paciente?.sexo}</Table.Cell>
                  <Table.Cell> </Table.Cell>
                  <Table.Cell> {paciente?.cpf}</Table.Cell>
                  <Table.Cell> {paciente?.cpf}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body> */}
          </Table.Root>
        </Table.ScrollArea>
      </GridItem>
    </Grid>
  );
}
