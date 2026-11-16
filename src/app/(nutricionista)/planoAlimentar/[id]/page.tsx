
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  getPlanoCompleto,
  PlanoAlimentar,
} from "@/src/actions/planoalimentar";

import { atualizarRefeicao, excluirRefeicao } from "@/src/actions/refeicao";

import {
  atualizarItemRefeicao,
  excluirItemRefeicao,
} from "@/src/actions/itemrefeicao";

export default function EditarPlanoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [plano, setPlano] = useState<PlanoAlimentar | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPlano() {
      try {
        console.log("ID recebido pela página:", params.id);

        const resposta = await getPlanoCompleto(params.id);

        setPlano(resposta);
      } catch (error) {
        console.error("Erro ao carregar plano:", error);
        alert("Não foi possível carregar o plano alimentar.");
      } finally {
        setCarregando(false);
      }
    }

    if (params.id) {
      carregarPlano();
    }
  }, [params.id]);

  // Atualiza os campos da refeição na tela
  function alterarRefeicao(
    idRefeicao: string,
    campo: string,
    valor: string | number,
  ) {
    setPlano((atual) => {
      if (!atual) return atual;

      return {
        ...atual,
        refeicao: atual.refeicao?.map((refeicao) =>
          refeicao.id === idRefeicao
            ? { ...refeicao, [campo]: valor }
            : refeicao,
        ),
      };
    });
  }

  // Atualiza os campos do alimento na tela
  function alterarItem(
    idRefeicao: string,
    idItem: string,
    campo: string,
    valor: string | number,
  ) {
    setPlano((atual) => {
      if (!atual) return atual;

      return {
        ...atual,
        refeicao: atual.refeicao?.map((refeicao) =>
          refeicao.id === idRefeicao
            ? {
                ...refeicao,
                itemrefeicao: refeicao.itemrefeicao.map((item) =>
                  item.id === idItem
                    ? { ...item, [campo]: valor }
                    : item,
                ),
              }
            : refeicao,
        ),
      };
    });
  }

  // Salva as alterações da refeição
  async function salvarRefeicao(idRefeicao: string) {
    const refeicao = plano?.refeicao?.find(
      (item) => item.id === idRefeicao,
    );

    if (!refeicao) return;

    try {
      await atualizarRefeicao(idRefeicao, {
        refeicao_nome: refeicao.refeicao_nome,
        horario_refeicao: refeicao.horario_refeicao,
        ordem_refeicao: refeicao.ordem_refeicao,
      });

      alert("Refeição atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar refeição:", error);
      alert("Erro ao atualizar refeição.");
    }
  }

  // Salva as alterações de um alimento
  async function salvarItem(idItem: string) {
    const item = plano?.refeicao
      ?.flatMap((refeicao) => refeicao.itemrefeicao)
      .find((item) => item.id === idItem);

    if (!item) return;

    try {
      await atualizarItemRefeicao(idItem, {
        quantidade_item: item.quantidade_item,
        unidade_item: item.unidade_item,
      });

      alert("Alimento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar alimento:", error);
      alert("Erro ao atualizar alimento.");
    }
  }

  // Exclui um alimento da refeição
  async function removerItem(
    idRefeicao: string,
    idItem: string,
  ) {
    if (!confirm("Deseja realmente excluir este alimento?")) return;

    try {
      await excluirItemRefeicao(idItem);

      setPlano((atual) => {
        if (!atual) return atual;

        return {
          ...atual,
          refeicao: atual.refeicao?.map((refeicao) =>
            refeicao.id === idRefeicao
              ? {
                  ...refeicao,
                  itemrefeicao: refeicao.itemrefeicao.filter(
                    (item) => item.id !== idItem,
                  ),
                }
              : refeicao,
          ),
        };
      });
    } catch (error) {
      console.error("Erro ao excluir alimento:", error);
      alert("Erro ao excluir alimento.");
    }
  }

  // Exclui uma refeição inteira
  async function removerRefeicao(idRefeicao: string) {
    if (!confirm("Deseja excluir esta refeição e todos os seus alimentos?")) {
      return;
    }

    try {
      await excluirRefeicao(idRefeicao);

      setPlano((atual) => {
        if (!atual) return atual;

        return {
          ...atual,
          refeicao: atual.refeicao?.filter(
            (refeicao) => refeicao.id !== idRefeicao,
          ),
        };
      });
    } catch (error) {
      console.error("Erro ao excluir refeição:", error);
      alert("Erro ao excluir refeição.");
    }
  }

  if (carregando) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!plano) {
    return (
      <Box p={6}>
        <Text>Plano alimentar não encontrado.</Text>
        <Button mt={4} onClick={() => router.back()}>
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1100px" mx="auto">
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="xl">Editar Plano Alimentar</Heading>
          <Text color="gray.500" mt={2}>
            Paciente: {plano.paciente_id.usuario_id.nome}
          </Text>
        </Box>

        <Button variant="outline" onClick={() => router.back()}>
          Voltar
        </Button>
      </Flex>

      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        mb={6}
      >
        <Text fontWeight="bold">Data de criação do plano</Text>
        <Text>
          {new Date(`${plano.data_plano}T12:00:00`).toLocaleDateString("pt-BR")}
        </Text>
      </Box>

      <Heading size="lg" mb={4}>
        Refeições
      </Heading>

      <Stack gap={5}>
        {plano.refeicao
          ?.slice()
          .sort((a, b) => a.ordem_refeicao - b.ordem_refeicao)
          .map((refeicao) => (
            <Box
              key={refeicao.id}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
            >
              <Stack gap={3}>
                <Box>
                  <Text fontWeight="semibold" mb={1}>
                    Nome da refeição
                  </Text>

                  <Input
                    value={refeicao.refeicao_nome}
                    onChange={(e) =>
                      alterarRefeicao(
                        refeicao.id,
                        "refeicao_nome",
                        e.target.value,
                      )
                    }
                  />
                </Box>

                <Flex gap={3} wrap="wrap">
                  <Box flex="1" minW="150px">
                    <Text fontWeight="semibold" mb={1}>
                      Horário
                    </Text>

                    <Input
                      type="time"
                      value={refeicao.horario_refeicao.slice(0, 5)}
                      onChange={(e) =>
                        alterarRefeicao(
                          refeicao.id,
                          "horario_refeicao",
                          e.target.value,
                        )
                      }
                    />
                  </Box>

                  <Box flex="1" minW="150px">
                    <Text fontWeight="semibold" mb={1}>
                      Ordem da refeição
                    </Text>

                    <Input
                      type="number"
                      value={refeicao.ordem_refeicao}
                      onChange={(e) =>
                        alterarRefeicao(
                          refeicao.id,
                          "ordem_refeicao",
                          Number(e.target.value),
                        )
                      }
                    />
                  </Box>
                </Flex>

                <Heading size="md" mt={3}>
                  Alimentos
                </Heading>

                {refeicao.itemrefeicao.map((item) => (
                  <Box
                    key={item.id}
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    <Text fontWeight="bold" color="gray.800" mb={2}>
                      {item.alimento_id.alimento_nome}
                    </Text>

                    <Flex gap={3} wrap="wrap">
                      <Box flex="1" minW="120px">
                        <Text fontSize="sm" mb={1}>
                          Quantidade
                        </Text>

                        <Input
                          type="number"
                          value={item.quantidade_item}
                          onChange={(e) =>
                            alterarItem(
                              refeicao.id,
                              item.id!,
                              "quantidade_item",
                              Number(e.target.value),
                            )
                          }
                        />
                      </Box>

                      <Box flex="1" minW="120px">
                        <Text fontSize="sm" mb={1}>
                          Unidade
                        </Text>

                        <Input
                          value={item.unidade_item}
                          onChange={(e) =>
                            alterarItem(
                              refeicao.id,
                              item.id!,
                              "unidade_item",
                              e.target.value,
                            )
                          }
                        />
                      </Box>
                    </Flex>

                    <Flex justify="flex-end" gap={2} mt={3}>
                      <Button
                        size="sm"
                        colorPalette="blue"
                        onClick={() => salvarItem(item.id!)}
                      >
                        Salvar alimento
                      </Button>

                      <Button
                        size="sm"
                        colorPalette="red"
                        variant="outline"
                        onClick={() => removerItem(refeicao.id, item.id!)}
                      >
                        Excluir alimento
                      </Button>
                    </Flex>
                  </Box>
                ))}

                {refeicao.itemrefeicao.length === 0 && (
                  <Text color="gray.500">
                    Nenhum alimento cadastrado nesta refeição.
                  </Text>
                )}

                <Flex justify="flex-end" gap={3} mt={3}>
                  <Button
                    colorPalette="blue"
                    onClick={() => salvarRefeicao(refeicao.id)}
                  >
                    Salvar refeição
                  </Button>

                  <Button
                    colorPalette="red"
                    variant="outline"
                    onClick={() => removerRefeicao(refeicao.id)}
                  >
                    Excluir refeição
                  </Button>
                </Flex>
              </Stack>
            </Box>
          ))}
      </Stack>

      {(!plano.refeicao || plano.refeicao.length === 0) && (
        <Text color="gray.500">
          Este plano ainda não possui refeições.
        </Text>
      )}
    </Box>
  );
}
