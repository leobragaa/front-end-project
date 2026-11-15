"use client";
import {} from "@/src/actions/cadastro";
import {
  getPlanosAlimentar,
  PlanoAlimentar,
} from "@/src/actions/planoalimentar";
import { Button, Card, Grid, GridItem, Table } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PacientePage() {
  const [planos, setPlanos] = useState<PlanoAlimentar[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPlanos() {
      try {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (!usuarioSalvo) {
          console.error("Usuário não encontrado no localStorage");
          return;
        }

        const usuario = JSON.parse(usuarioSalvo);

        if (!usuario.id) {
          console.error("ID do nutricionista não encontrado");
          return;
        }

        const resposta = await getPlanosAlimentar(usuario.id);

        setPlanos(resposta);
      } catch (error) {
        console.error("Erro ao buscar planos alimentares:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarPlanos();
  }, []);
  const totalByPacientes = planos.length;

  const hoje = new Date();

  const planosUltimos30Dias = planos.filter((plano) => {
    const dataPlano = new Date(plano.data_plano);

    const diferenca = hoje.getTime() - dataPlano.getTime();

    const dias = diferenca / (1000 * 60 * 60 * 24);

    return dias >= 0 && dias <= 30;
  });

  function calcularIdade(dataNascimento: string) {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aindaNaoFezAniversario =
      hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() &&
        hoje.getDate() < nascimento.getDate());

    if (aindaNaoFezAniversario) {
      idade--;
    }

    return idade;
  }

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
          <Card.Body>{totalByPacientes}</Card.Body>
        </Card.Root>
      </GridItem>

      <GridItem colSpan={[12, 12, 2, 2]} height={"40"} width={"48"}>
        <Card.Root height={"40"} width={"48"} borderRadius={"xl"}>
          <Card.Header> ULTIMOS 30 DIAS</Card.Header>
          <Card.Body>{planosUltimos30Dias.length}</Card.Body>
        </Card.Root>
      </GridItem>

      <GridItem colSpan={12} width="100%">
        <Table.ScrollArea border="1px solid">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Paciente</Table.ColumnHeader>
                <Table.ColumnHeader>Idade</Table.ColumnHeader>
                <Table.ColumnHeader>Data do Plano</Table.ColumnHeader>
                <Table.ColumnHeader>Refeições</Table.ColumnHeader>
                <Table.ColumnHeader>Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {carregando ? (
                <Table.Row>
                  <Table.Cell colSpan={5}>Carregando planos...</Table.Cell>
                </Table.Row>
              ) : planos.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={5}>
                    Nenhum plano alimentar encontrado.
                  </Table.Cell>
                </Table.Row>
              ) : (
                planos.map((plano) => (
                  <Table.Row key={plano.id}>
                    <Table.Cell>
                      {plano.paciente_id?.usuario_id?.nome}
                    </Table.Cell>

                    <Table.Cell>
                      {plano.paciente_id?.datanascimento
                        ? calcularIdade(plano.paciente_id.datanascimento) +
                          " anos"
                        : "Não informado"}
                    </Table.Cell>

                    <Table.Cell>
                      {new Date(plano.data_plano).toLocaleDateString("pt-BR")}
                    </Table.Cell>

                    <Table.Cell>{plano.refeicao?.length ?? 0}</Table.Cell>

                    <Table.Cell>
                      <Link
                        href={`/planoAlimentar/visualizarPlano?id=${plano.id}`}
                      >
                        <Button size="sm" variant="outline">
                          Ver Plano
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </GridItem>
    </Grid>
  );
}
