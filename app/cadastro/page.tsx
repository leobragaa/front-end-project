"use client";
import { cadastrarUsuario } from "@/actions/cadastrar";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  DateInput,
  Field,
  FieldLabel,
  Flex,
  Image,
  Input,
  NativeSelect,
  Grid,
  GridItem,
  Button,
  Link,
  Stack,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        nome: "",
        cfn: "",
        email: "",
        senha: "",
        telefone: "",
        datanascimento: new Date(),
        tipousuario: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const usuario = await cadastrarUsuario(
            values.nome,
            values.cfn,
            values.email,
            values.senha,
            values.telefone,
            values.datanascimento,
            values.tipousuario,
          );
          console.log("Dentro do Form para cadastro de usuario", usuario);
          router.push("/login");
        } catch (error) {
          console.log("Erro em Cadastrar", error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid
            justifyContent={"center"}
            marginTop={"20"}
            height={"100vh"}
            flexDirection={["column", "colum", "row", "row"]}
            templateColumns="repeat(5, 1fr)"
          >
            <GridItem colSpan={[5, 5, 5, 5]}>
              <Flex justifyContent={"center"}>
                <Card.Root w={"md"} gap={"1"} justifyContent={"center"}>
                  <Card.Header alignItems={"center"} gap={"2"}>
                    <Image
                      src="NutriFlowSFun.png"
                      boxSize="50px"
                      borderRadius="10px"
                      fit="cover"
                      alt="Logo do topo NutriFlow"
                    />
                    <Card.Title> Cadastre sua Conta </Card.Title>
                  </Card.Header>
                  <Card.Body gap={"5"}>
                    <NativeSelect.Root>
                      <NativeSelect.Field placeholder="">
                        <option
                          value={values.tipousuario}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          Nutricionista
                        </option>
                        <option
                          value={values.tipousuario}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          Paciente
                        </option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <Field.Root>
                      <FieldLabel>Nome</FieldLabel>
                      <Input
                        placeholder="Informe seu Nome"
                        value={values.nome}
                        required
                      />
                    </Field.Root>
                    <Field.Root>
                      <FieldLabel>
                        Email <Field.RequiredIndicator />
                      </FieldLabel>
                      <Input
                        placeholder="me@email.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Field.Root>
                    <DateInput.Root>
                      <DateInput.Label>Data de Nascimento</DateInput.Label>
                      <DateInput.Control>
                        <DateInput.Segments
                          defaultValue={
                            values.datanascimento instanceof Date
                              ? values.datanascimento
                                  .toISOString()
                                  .split("T")[0]
                              : values.datanascimento
                          }
                        />
                      </DateInput.Control>
                    </DateInput.Root>
                    <Field.Root>
                      <FieldLabel>Senha</FieldLabel>
                      <PasswordInput
                        placeholder="°°°°°°°°°°°°"
                        value={values.senha}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Root>
                    <Field.Root>
                      <FieldLabel>Telefone</FieldLabel>
                      <Input
                        placeholder="(99) 99999-9999"
                        value={values.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Field.Root>
                    <Field.Root>
                      <FieldLabel>CFN</FieldLabel>
                      <Input placeholder="1234" value={values.cfn} required />
                    </Field.Root>
                  </Card.Body>

                  <Link
                    variant={"underline"}
                    justifyContent={"center"}
                    href="/"
                  >
                    Realize o Login
                  </Link>

                  <Card.Footer justifyContent={"center"}>
                    <Button
                      background={"orange.600"}
                      color={"white"}
                      width="50%"
                      cursor={"pointer"}
                      type="submit"
                      variant={"solid"}
                      disabled={isSubmitting}
                    >
                      <strong> CADASTRAR </strong>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              </Flex>
            </GridItem>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
