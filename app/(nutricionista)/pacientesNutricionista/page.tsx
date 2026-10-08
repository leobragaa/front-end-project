"use client";
import { Box, Button, Grid, GridItem, Table } from "@chakra-ui/react";
import Link from "next/link";

export default function PacientePage() {
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
            {/* <Table.Body>
          <Table.Root>
            <Table.Cell></Table.Cell>
          </Table.Root>
        </Table.Body> */}
          </Table.Root>
        </Table.ScrollArea>
      </GridItem>
    </Grid>
  );
}
