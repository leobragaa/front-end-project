"use client";
import { dadosClinicosCadastro } from "@/actions/dadosclinicos";
import { Button, Card, Field, HStack, Input } from "@chakra-ui/react";
import { Formik } from "formik";

export default function CadastroPaciente() {
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
              <Card.Title> Plano Alimentar</Card.Title>
            </Card.Header>
            <Card.Body>
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
                    placeholder="1.68 m"
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
              <Field.Root>
                <Field.Label>Hidratação</Field.Label>
                <Input
                  placeholder="Informe as alergias do Paciente"
                  type="Text"
                  value={values.hidratacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
              <Card.Footer>
                <Button
                  justifyContent={"flex-end"}
                  type="submit"
                  disabled={isSubmitting}
                >
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
