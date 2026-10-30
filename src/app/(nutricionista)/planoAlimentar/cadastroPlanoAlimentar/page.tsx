"use client";
import { registerAlimento } from "@/src/actions/alimento";
import { registerItemRefeicao } from "@/src/actions/itemrefeicao";
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
} from "@chakra-ui/react";
import { Formik } from "formik";
import { FaRegSave } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { LuUserSearch } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";

export default function CadastroPlanoAlimeentar() {
  return (
    <Formik
      initialValues={{
        data_plano: "",
        paciente_id: "",
        refeicao: [
          {
            planoalimentar_id: "",
            refeicao_nome: "",
            ordem_refeicao: 0,
            horario_refeicao: "",
            itemrefeicao: [
              {
                quantidade_item: 0,
                unidade_item: "g",
                alimento_id: "",
                refeicao_id: "",
                alimento: {
                  alimento_nome: "",
                  descricao_alimento: "",
                  calorias_alimento: 0,
                  proteina_alimento: 0,
                  carboidrato_alimento: 0,
                },
              },
            ],
          },
        ],
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const planoAlimentar = await registerPlanoAlimentar({
            data_plano: values.data_plano,
            paciente_id: values.paciente_id,
          });

          for (const refeicaoForm of values.refeicao) {
            const refeicao = await registerRefeicao({
              refeicao_nome: refeicaoForm.refeicao_nome,
              ordem_refeicao: refeicaoForm.ordem_refeicao,
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
        }
        setSubmitting(false);
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
              <Field.Root>
                <Field.Label>
                  <LuUserSearch />
                  Paciente
                </Field.Label>
                <Input
                  placeholder="Selecione o Paciente"
                  name="paciente_id"
                  value={values.paciente_id}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>
                  <HiCalendarDateRange />
                  Data Registro
                </Field.Label>
                <Input
                  placeholder="dd/mm/aaaa"
                  name="data_plano"
                  value={values.data_plano}
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
            </Card.Body>
            <Card.Body>
              <Text> Refeição</Text>
              <HStack gap={"6"} marginTop={"5"}>
                <Field.Root>
                  <Field.Label> Momento Refeição</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      placeholder=""
                      name={`refeicao[0].refeicao_nome`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={"cafe_manha"}> Café da Manhã </option>
                      <option value={"lache_manha"}> Lanche da Manhã </option>
                      <option value={"almoco"}> Almoço </option>
                      <option value={"lache_tade"}> Lanche da Tarde </option>
                      <option value={"janta"}> Janta </option>
                      <option value={"ceia"}> Ceia </option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Horario da Refeição</Field.Label>
                  <Input
                    placeholder="06:00"
                    type="time"
                    name={`refeicao[0].horario_refeicao`}
                    value={values.refeicao[0].horario_refeicao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
              </HStack>
            </Card.Body>

            <Card.Body gap={"4"}>
              <Text> Alimentos </Text>
              <Field.Root>
                <Field.Label>Informe o Alimento:</Field.Label>
                <Input
                  placeholder="Exemplo: Maçã"
                  type="Text"
                  name={`refeicao[0].itemrefeicao[0].alimento.alimento_nome`}
                  value={
                    values.refeicao[0].itemrefeicao[0].alimento.alimento_nome
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>

              <HStack>
                <Field.Root>
                  <Field.Label>Quantidade do Alimentos:</Field.Label>
                  <Input
                    type="number"
                    name={`refeicao[0].itemrefeicao[0].quantidade_item`}
                    value={values.refeicao[0].itemrefeicao[0].quantidade_item}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Quantidade a Unitaria:</Field.Label>
                  <Input
                    type={"text"}
                    name={`refeicao[0].itemrefeicao[0].unidade_item`}
                    value={values.refeicao[0].itemrefeicao[0].unidade_item}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
              </HStack>
              <HStack>
                <Field.Root>
                  <Field.Label>Quantidade Calóricas:</Field.Label>
                  <Input
                    placeholder="Exemplo: 2"
                    type="number"
                    name={`refeicao[0].itemrefeicao[0].alimento
                        .calorias_alimento`}
                    value={
                      values.refeicao[0].itemrefeicao[0].alimento
                        .calorias_alimento
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Quantidade Proteica:</Field.Label>
                  <Input
                    placeholder={"kcal"}
                    type="number"
                    name={`refeicao[0].itemrefeicao[0].alimento[0].proteina_alimento`}
                    value={
                      values.refeicao[0].itemrefeicao[0].alimento
                        .proteina_alimento
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
              </HStack>
              <Field.Root>
                <Field.Label>Descrição de Consumo:</Field.Label>
                <Input
                  placeholder="Informe a descrição de consumo do alimento"
                  name={`refeicao[0].itemrefeicao[0].alimento
                      .descricao_alimento`}
                  value={
                    values.refeicao[0].itemrefeicao[0].alimento
                      .descricao_alimento
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                />
              </Field.Root>
              <Button width={"%50"} variant={"solid"}>
                <TiPlus />
                Adicionar Alimentos
              </Button>
            </Card.Body>

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
