"use client";
import { registerAlimento } from "@/src/actions/alimento";
import { registerItemRefeicao } from "@/src/actions/itemrefeicao";
import { getPaciente, Paciente } from "@/src/actions/paciente";
import { registerPlanoAlimentar } from "@/src/actions/planoalimentar";
import { registerRefeicao } from "@/src/actions/refeicao";
import {
  Button,
  Card,
  Field,
  HStack,
  Input,
  Link,
  NativeSelect,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";

function novoAlimento() {
  return {
    quantidade_item: 0,
    unidade_item: "g",
    alimento: {
      alimento_nome: "",
      descricao_alimento: "",
      calorias_alimento: 0,
      proteina_alimento: 0,
      carboidrato_alimento: 0,
    },
  };
}

function novaRefeicao(ordem: number) {
  return {
    refeicao_nome: "",
    ordem_refeicao: ordem,
    horario_refeicao: "",
    itemrefeicao: [novoAlimento()],
  };
}

export default function CadastroPlanoAlimeentar() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    async function carregarPacientes() {
      try {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (!usuarioSalvo) return;

        const usuario = JSON.parse(usuarioSalvo);

        const resposta = await getPaciente(usuario.id);

        setPacientes(resposta);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      }
    }

    carregarPacientes();
  }, []);

  return (
    <Formik
      initialValues={{
        paciente_id: "",
        refeicao: [novaRefeicao(1)],
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const usuarioSalvo = localStorage.getItem("usuario");

          if (!usuarioSalvo) {
            throw new Error("Usuário não encontrado. Faça login novamente.");
          }

          const usuario = JSON.parse(usuarioSalvo);

          if (!usuario.id) {
            throw new Error("ID do nutricionista não encontrado.");
          }

          const planoAlimentar = await registerPlanoAlimentar({
            paciente_id: values.paciente_id,
            nutricionista_id: usuario.id,
          });

          for (const [indice, refeicaoForm] of values.refeicao.entries()) {
            const refeicao = await registerRefeicao({
              refeicao_nome: refeicaoForm.refeicao_nome,
              ordem_refeicao: indice + 1,
              horario_refeicao: refeicaoForm.horario_refeicao,
              plano_alimentar_id: planoAlimentar.id,
            });

            for (const alimentosForm of refeicaoForm.itemrefeicao) {
              const alimento = await registerAlimento({
                alimento_nome: alimentosForm.alimento.alimento_nome,
                descricao_alimento: alimentosForm.alimento.descricao_alimento,
                calorias_alimento: alimentosForm.alimento.calorias_alimento,
                proteina_alimento: alimentosForm.alimento.proteina_alimento,
                carboidrato_alimento:
                  alimentosForm.alimento.carboidrato_alimento,
              });

              await registerItemRefeicao({
                refeicao_id: refeicao.id,
                alimento_id: alimento.id,
                quantidade_item: alimentosForm.quantidade_item,
                unidade_item: alimentosForm.unidade_item,
              });
            }
          }
          console.log("Plano Alimentar finalizado e cadastrado !");
        } catch (error) {
          console.log("Erro ao Cadastrar Plano Alimentar ", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Card.Root
            border={"1px solid"}
            width={"80%"}
            justifyContent={"center"}
            margin={"5"}
          >
            <Link href="/planoAlimentar">
              <Button variant={"ghost"}>
                {" "}
                <FaArrowLeftLong /> <Text>Voltar</Text>
              </Button>
            </Link>
            <Card.Header>
              <Card.Title> Cadastro Plano Alimentar</Card.Title>
            </Card.Header>
            <Card.Body gap={"2"}>
              <NativeSelect.Root>
                <NativeSelect.Field
                  name="paciente_id"
                  value={values.paciente_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Selecione um paciente</option>

                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.usuario_id.nome}
                    </option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Card.Body>

            <FieldArray name="refeicao">
              {({ push, remove }) => (
                <Card.Body gap="5">
                  <HStack justify="space-between">
                    <Text fontWeight="bold">Refeições</Text>

                    <Button
                      type="button"
                      onClick={() =>
                        push(novaRefeicao(values.refeicao.length + 1))
                      }
                    >
                      <TiPlus />
                      Adicionar Refeição
                    </Button>
                  </HStack>

                  {values.refeicao.map((refeicao, indice) => (
                    <Card.Root
                      key={indice}
                      border="1px solid"
                      padding="4"
                      gap="4"
                    >
                      <HStack justify="space-between">
                        <Text fontWeight="bold">Refeição {indice + 1}</Text>

                        <Button
                          type="button"
                          size="sm"
                          colorPalette="red"
                          variant="outline"
                          disabled={values.refeicao.length === 1}
                          onClick={() => remove(indice)}
                        >
                          <IoCloseOutline />
                          Remover
                        </Button>
                      </HStack>

                      <HStack align="start">
                        <Field.Root required>
                          <Field.Label>Momento da Refeição</Field.Label>

                          <NativeSelect.Root>
                            <NativeSelect.Field
                              name={`refeicao.${indice}.refeicao_nome`}
                              value={refeicao.refeicao_nome}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Selecione</option>
                              <option value="cafe_manha">Café da Manhã</option>
                              <option value="lanche_manha">
                                Lanche da Manhã
                              </option>
                              <option value="almoco">Almoço</option>
                              <option value="lanche_tarde">
                                Lanche da Tarde
                              </option>
                              <option value="janta">Janta</option>
                              <option value="ceia">Ceia</option>
                            </NativeSelect.Field>

                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                        </Field.Root>

                        <Field.Root required>
                          <Field.Label>Horário da Refeição</Field.Label>

                          <Input
                            type="time"
                            name={`refeicao.${indice}.horario_refeicao`}
                            value={refeicao.horario_refeicao}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Field.Root>
                      </HStack>

                      <FieldArray name={`refeicao.${indice}.itemrefeicao`}>
                        {({
                          push: adicionarAlimento,
                          remove: removerAlimento,
                        }) => (
                          <VStack align="stretch" gap="4">
                            <HStack justify="space-between">
                              <Text fontWeight="semibold">Alimentos</Text>

                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  adicionarAlimento(novoAlimento())
                                }
                              >
                                <TiPlus />
                                Adicionar Alimento
                              </Button>
                            </HStack>

                            {refeicao.itemrefeicao.map((item, indiceItem) => (
                              <Card.Root
                                key={indiceItem}
                                border="1px solid"
                                padding="3"
                                gap="3"
                              >
                                <HStack justify="space-between">
                                  <Text fontWeight="medium">
                                    Alimento {indiceItem + 1}
                                  </Text>

                                  <Button
                                    type="button"
                                    size="xs"
                                    colorPalette="red"
                                    variant="ghost"
                                    disabled={
                                      refeicao.itemrefeicao.length === 1
                                    }
                                    onClick={() => removerAlimento(indiceItem)}
                                  >
                                    <IoCloseOutline />
                                    Remover
                                  </Button>
                                </HStack>

                                <Field.Root required>
                                  <Field.Label>Nome do Alimento</Field.Label>

                                  <Input
                                    placeholder="Exemplo: Maçã"
                                    name={`refeicao.${indice}.itemrefeicao.${indiceItem}.alimento.alimento_nome`}
                                    value={item.alimento.alimento_nome}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Field.Root>

                                <HStack>
                                  <Field.Root required>
                                    <Field.Label>Quantidade</Field.Label>

                                    <Input
                                      type="number"
                                      min="0"
                                      name={`refeicao.${indice}.itemrefeicao.${indiceItem}.quantidade_item`}
                                      value={item.quantidade_item}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </Field.Root>

                                  <Field.Root required>
                                    <Field.Label>Unidade</Field.Label>

                                    <Input
                                      placeholder="g, ml, unidade"
                                      name={`refeicao.${indice}.itemrefeicao.${indiceItem}.unidade_item`}
                                      value={item.unidade_item}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </Field.Root>
                                </HStack>

                                <HStack>
                                  <Field.Root>
                                    <Field.Label>Calorias (kcal)</Field.Label>

                                    <Input
                                      type="number"
                                      min="0"
                                      name={`refeicao.${indice}.itemrefeicao.${indiceItem}.alimento.calorias_alimento`}
                                      value={item.alimento.calorias_alimento}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </Field.Root>

                                  <Field.Root>
                                    <Field.Label>Proteínas (g)</Field.Label>

                                    <Input
                                      type="number"
                                      min="0"
                                      name={`refeicao.${indice}.itemrefeicao.${indiceItem}.alimento.proteina_alimento`}
                                      value={item.alimento.proteina_alimento}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </Field.Root>

                                  <Field.Root>
                                    <Field.Label>Carboidratos (g)</Field.Label>

                                    <Input
                                      type="number"
                                      min="0"
                                      name={`refeicao.${indice}.itemrefeicao.${indiceItem}.alimento.carboidrato_alimento`}
                                      value={item.alimento.carboidrato_alimento}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </Field.Root>
                                </HStack>

                                <Field.Root>
                                  <Field.Label>
                                    Descrição de Consumo
                                  </Field.Label>

                                  <Input
                                    placeholder="Descrição do alimento"
                                    name={`refeicao.${indice}.itemrefeicao.${indiceItem}.alimento.descricao_alimento`}
                                    value={item.alimento.descricao_alimento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Field.Root>
                              </Card.Root>
                            ))}
                          </VStack>
                        )}
                      </FieldArray>
                    </Card.Root>
                  ))}
                </Card.Body>
              )}
            </FieldArray>

            <Card.Footer>
              <Field.Root alignItems={"flex-start"}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  backgroundColor={"green.400"}
                >
                  <FaRegSave />
                  Salvar Plano Alimentar
                </Button>
              </Field.Root>
              <Field.Root alignItems={"flex-end"}>
                <Button type="reset" backgroundColor={"red.400"}>
                  <IoCloseOutline />
                  Cancelar
                </Button>
              </Field.Root>
            </Card.Footer>
          </Card.Root>
        </form>
      )}
    </Formik>
  );
}
