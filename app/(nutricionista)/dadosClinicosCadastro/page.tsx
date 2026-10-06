"use client";
import { dadosClinicosCadastro } from "@/actions/dadosclinicos";
import {
  Button,
  Card,
  Field,
  HStack,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { Formik } from "formik";

export default function DadosClinicosCadastro() {
  return (
    <Formik
      initialValues={{
        peso: parseFloat(""),
        altura: parseFloat(""),
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
          <Card.Root>
            <Card.Header>
              <Card.Title> Dados Clinicos</Card.Title>
            </Card.Header>
            <Card.Body>
              <Field.Root>
                <Field.Label>Data da Consulta</Field.Label>
                <Input
                  placeholder="dd/mm/aaaa"
                  type="date"
                  value={values.dataregistro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
              <HStack>
                <Field.Root>
                  <Field.Label>Peso</Field.Label>
                  <Input
                    placeholder="80.0 kg"
                    type="number"
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
              <Card.Footer>
                <Button type="submit" disabled={isSubmitting}>
                  CADASTRAR DADOS CLINICOS
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card.Root>
        </form>
      )}
    </Formik>
  );
}
