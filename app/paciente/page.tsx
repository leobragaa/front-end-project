"use client";
import { Table } from "@chakra-ui/react";

export default function PacientePage() {
  return (
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
          <Table.Root>
            <Table.Cell></Table.Cell>
          </Table.Root>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
