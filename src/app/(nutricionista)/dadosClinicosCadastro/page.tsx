"use client";
import { dadosClinicosCadastro } from "@/src/actions/dadosclinicos";
import {
  Button,
  Card,
  Field,
  HStack,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { FaRegSave } from "react-icons/fa";

export default function DadosClinicosCadastro() {
  return (
    <Formik
      initialValues={{
        peso: 0,
        altura: 0,
        objetivopessoal: "",
        atvFisica: "",
        hidratacao: "",
        dataregistro: "",
        alergia: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const dadosClinicos = await dadosClinicosCadastro(values);
          console.log("Dentro do form Dados Clinicos", dadosClinicos);
        } catch (error) {
          console.log("Erro ao Cadastrar Dados Clinicos", error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Card.Root border={"1px solid"} margin={"5"}>
            <Card.Header>
              <Card.Title> Dados Clinicos</Card.Title>
            </Card.Header>
            <Card.Body gap={"5"}>
              <Field.Root>
                <Field.Label>Data da Consulta</Field.Label>
                <Input
                  placeholder="dd/mm/aaaa"
                  type="date"
                  name="dataregistro"
                  value={values.dataregistro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
              <HStack>
                <Field.Root>
                  <Field.Label>Peso</Field.Label>
                  <Input
                    placeholder="80.0"
                    type="number"
                    name="peso"
                    value={values.peso}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Altura</Field.Label>
                  <Input
                    placeholder="1.75 m"
                    type="number"
                    name="altura"
                    value={values.altura}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
              </HStack>
              <Field.Root>
                <Field.Label>Alergia</Field.Label>
                <Input
                  placeholder="Informe as alergias do Paciente"
                  type="Text"
                  name="alergia"
                  value={values.alergia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
              <HStack>
                <Field.Root>
                  <Field.Label> Objetivo Pessoal</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      placeholder=""
                      name="objetivopessoal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={"emagrecimento"}> Emagrecimento </option>
                      <option value={"hipertrofia"}> Hipertrofia </option>
                      <option value={"saude"}> Saúde </option>
                      <option value={"performanceEsporte"}>
                        Performance Esportiva
                      </option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
                <Field.Root>
                  <Field.Label> Atividade Física </Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      placeholder=""
                      name="atvfisica"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={"sedentario"}> Sedentario </option>
                      <option value={"baixo"}> Leve </option>
                      <option value={"moderado"}> Moderado</option>
                      <option value={"alto"}> Alto </option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
                <Field.Root>
                  <Field.Label> Hidratação </Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      placeholder=""
                      value={values.hidratacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={"hidratacaoBaixa"}>
                        {" "}
                        Hidratação Baixa{" "}
                      </option>
                      <option value={"hidratacaoMedia"}>
                        {" "}
                        Hidratação Media{" "}
                      </option>
                      <option value={"hidratacaoAlta"}> Hidratação Alta</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
              </HStack>
              {/* <Field.Root>
                <Field.Label>Observação</Field.Label>
                <Input
                  placeholder="Anote uma observação (Opcional)"
                  type="Text"
                  value={values.observacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root> */}
              {/* <Field.Root>
                <Field.Label>Patologia</Field.Label>
                <Input
                  placeholder="Informe as patologias do Paciente"
                  type="Text"
                  value={values.patologia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root> */}
            </Card.Body>
            <Card.Footer>
              <Button type="submit" disabled={isSubmitting}>
                <FaRegSave />
                Salvar Dados Clínicos
              </Button>
            </Card.Footer>
          </Card.Root>
        </form>
      )}
    </Formik>
  );
}
