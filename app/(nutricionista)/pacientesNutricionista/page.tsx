"use server";
import {} from "@/actions/cadastro";
import { getPaciente } from "@/actions/paciente";
import { Box, Button, Grid, GridItem, Table } from "@chakra-ui/react";
import Link from "next/link";

export default async function PacientePage() {
  const pacientes = await getPaciente(1);
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      width={"100vw"}
      height={"100vh"}
    >
      <GridItem colSpan={[12, 12, 2, 12]} width={"100vw"} height={"40"}>
        <Link href={"/pacienteCadastro"}>
          <Button>Cadastrar Paciente</Button>
        </Link>
      </GridItem>
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Box>Total Pacientes</Box>
      </GridItem>
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Box>Pacientes Ativos</Box>
      </GridItem>
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Box>Em Acompanhamento</Box>
      </GridItem>
      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Box>Novos Pacientes</Box>
      </GridItem>
      <GridItem colSpan={[12, 12, 10, 10]} width={"100"} height={"100vh"}>
        <Table.ScrollArea>
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
            <Table.Body>
              {pacientes.map((paciente) => (
                <Table.Row key={paciente?.tipousuario}>
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
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </GridItem>
    </Grid>
  );
}
