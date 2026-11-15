"use client";

import {
  getPlanosAlimentar,
  PlanoAlimentar,
} from "@/src/actions/planoalimentar";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Alimento } from "@/src/actions/alimento";

export default function VisualizarPlano() {
  const [planos, setPlanos] = useState<PlanoAlimentar[]>([]);
  const [planoSelecionado, setPlanoSelecionado] =
    useState<PlanoAlimentar | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarPlanos() {
      try {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (!usuarioSalvo) {
          throw new Error("Usuário não encontrado. Faça login novamente.");
        }

        const usuario = JSON.parse(usuarioSalvo);

        if (!usuario.id) {
          throw new Error("ID do nutricionista não encontrado.");
        }

        const resposta = await getPlanosAlimentar(usuario.id);

        setPlanos(resposta as PlanoAlimentar[]);
      } catch (error) {
        console.error("Erro ao carregar planos:", error);
        setErro("Não foi possível carregar os planos alimentares.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPlanos();
  }, []);

  function formatarData(data: string) {
    if (!data) return "";

    const [ano, mes, dia] = data.substring(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function nomeAlimento(alimento: Alimento) {
    return alimento?.alimento_nome ?? "Alimento";
  }

  if (carregando) {
    return (
      <Flex justify="center" align="center" minH="80vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} minH="100vh">
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl">Planos Alimentares</Heading>
          <Text color="gray.500" mt={2}>
            Consulte os planos alimentares dos seus pacientes.
          </Text>
        </Box>

        <Link href="/pacientesNutricionista">
          <Button variant="outline">Voltar</Button>
        </Link>
      </Flex>

      {erro && (
        <Text color="red.500" mb={4}>
          {erro}
        </Text>
      )}

      {planos.length === 0 && !erro && (
        <Card.Root p={6}>
          <Text>Nenhum plano alimentar cadastrado.</Text>
        </Card.Root>
      )}

      <Flex gap={6} direction={{ base: "column", lg: "row" }} align="start">
        <Box w={{ base: "100%", lg: "350px" }}>
          <Heading size="md" mb={4}>
            Pacientes
          </Heading>

          <Stack gap={3}>
            {planos.map((plano) => (
              <Card.Root
                key={plano.id}
                cursor="pointer"
                borderWidth="1px"
                borderColor={
                  planoSelecionado?.id === plano.id ? "green.500" : "gray.200"
                }
                onClick={() => setPlanoSelecionado(plano)}
                p={4}
              >
                <Text fontWeight="bold">
                  {plano.paciente_id?.usuario_id?.nome ?? "Paciente sem nome"}
                </Text>

                <Text color="gray.500" fontSize="sm">
                  Plano: {formatarData(plano.data_plano)}
                </Text>

                <Text color="gray.500" fontSize="xs" mt={1}>
                  {plano.refeicao?.length ?? 0} refeições
                </Text>
              </Card.Root>
            ))}
          </Stack>
        </Box>

        <Box flex="1" w="100%">
          {!planoSelecionado ? (
            <Card.Root p={8} alignItems="center">
              <Heading size="md">Selecione um plano alimentar</Heading>
              <Text color="gray.500" mt={2}>
                Escolha um paciente para visualizar suas refeições.
              </Text>
            </Card.Root>
          ) : (
            <Stack gap={5}>
              <Card.Root p={5}>
                <Heading size="lg">
                  {planoSelecionado.paciente_id?.usuario_id?.nome}
                </Heading>

                <Text color="gray.500">
                  {planoSelecionado.paciente_id?.usuario_id?.email}
                </Text>

                <Text mt={3}>
                  Data do plano: {formatarData(planoSelecionado.data_plano)}
                </Text>
              </Card.Root>

              <Heading size="lg">Refeições</Heading>

              {planoSelecionado.refeicao
                ?.slice()
                .sort((a, b) => a.ordem_refeicao - b.ordem_refeicao)
                .map((refeicao) => (
                  <Card.Root key={refeicao.id} p={5}>
                    <Flex justify="space-between" align="center" mb={4}>
                      <Heading size="md">{refeicao.refeicao_nome}</Heading>

                      <Text color="green.600" fontWeight="bold">
                        {String(refeicao.horario_refeicao).slice(0, 5)}
                      </Text>
                    </Flex>

                    <Stack gap={3}>
                      {refeicao.itemrefeicao?.map((item) => (
                        <Flex
                          key={item.id}
                          justify="space-between"
                          align="center"
                          borderBottomWidth="1px"
                          borderColor="gray.100"
                          pb={2}
                        >
                          <Text fontWeight="medium">
                            {nomeAlimento(item.alimento_id)}
                          </Text>

                          <Text color="gray.500">
                            {item.quantidade_item} {item.unidade_item}
                          </Text>
                        </Flex>
                      ))}

                      {!refeicao.itemrefeicao?.length && (
                        <Text color="gray.500">
                          Nenhum alimento cadastrado nesta refeição.
                        </Text>
                      )}
                    </Stack>
                  </Card.Root>
                ))}
            </Stack>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
