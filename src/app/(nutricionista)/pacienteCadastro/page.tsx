"use client";
import { pacienteCadastro } from "@/src/actions/paciente";
import {
  Button,
  Card,
  Field,
  Grid,
  GridItem,
  HStack,
  Input,
  NativeSelect,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CadastroPaciente() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        id: parseInt(""),
        nome: "",
        email: "",
        senha: "",
        sexo: "",
        telefone: "",
        datanascimento: "",
        cpf: "",
        cidade: "",
        estado: "",
        endereco: "",
        cep: "",
        tipousuario: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const paciente = await pacienteCadastro(values);
          console.log("Dentro do For, de Paciente", paciente);
          router.push("/listaPaciente");
        } catch (error) {
          console.log("Erro ao Cadastrar Paciente", error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid
            templateColumns={"repeat(12, 1fr)"}
            flexDirection={["column", "column", "row", "row"]}
            height={"100vh"}
            width={"100vw"}
          >
            <GridItem
              colSpan={[12, 12, 12, 12]}
              width={"100vw"}
              height={"100vh"}
              margin={"5"}
            >
              <Card.Root justifyContent={"center"} width={"70%"}>
                <Link href="/pacientesNutricionista">
                  <Button variant={"ghost"}>
                    {" "}
                    <FaArrowLeftLong /> <Text>Voltar</Text>
                  </Button>
                </Link>
                <Card.Header>
                  <Card.Title>Dados Pessoais</Card.Title>
                </Card.Header>
                <Card.Body gap={"5"}>
                  <HStack>
                    <Field.Root>
                      <Field.Label>Nome Completo</Field.Label>
                      <Input
                        placeholder="Informe Nome Completo do Paciente"
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Data de Nascimento</Field.Label>
                      <Input
                        placeholder="dd/mm/aaaa"
                        type="text"
                        name="datanascimento"
                        value={values.datanascimento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label> Sexo </Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          placeholder=""
                          name="sexo"
                          value={values.sexo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value={"masculino"}> Masculino</option>
                          <option value={"Femino"}> Feminino</option>
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Field.Root>
                  </HStack>
                  <HStack>
                    <Field.Root>
                      <Field.Label>E-mail</Field.Label>
                      <Input
                        placeholder="exemplo@email.com"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Telefone</Field.Label>
                      <Input
                        placeholder="(67) 99999-9999"
                        type="text"
                        name="telefone"
                        value={values.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>CPF</Field.Label>
                      <Input
                        placeholder="000.000.000-00"
                        type="text"
                        name="cpf"
                        value={values.cpf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                  </HStack>
                  <Field.Root>
                    <Field.Label>Endereço</Field.Label>
                    <Input
                      placeholder="Digite o Endereço do Paciente"
                      type="text"
                      name="endereco"
                      value={values.endereco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field.Root>
                  <HStack>
                    <Field.Root>
                      <Field.Label>Cidade</Field.Label>
                      <Input
                        placeholder="Digite a Cidade"
                        type="text"
                        name="cidade"
                        value={values.cidade}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Estado</Field.Label>
                      <Input
                        placeholder="Digite o Estado Ex: ( MS )"
                        type="text"
                        name="estado"
                        value={values.estado}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>CEP</Field.Label>
                      <Input
                        placeholder="00000-00"
                        type="text"
                        name="cep"
                        value={values.cep}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                  </HStack>
                </Card.Body>
                <Card.Footer>
                  <Button
                    justifyContent={"flex-end"}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    CADASTRAR
                  </Button>
                </Card.Footer>
                {/* Cadastro dos Dados Clinicos do Paciente */}
              </Card.Root>
            </GridItem>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
