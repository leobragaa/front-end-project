"use client";
import { cadastroUsuario } from "@/actions/cadastro";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  Field,
  FieldLabel,
  Flex,
  Image,
  Input,
  Grid,
  GridItem,
  Button,
  Link,
  HStack,
} from "@chakra-ui/react";

import { Formik } from "formik";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        tipousuario: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const usuario = await cadastroUsuario(values);
          console.log("Dentro do Form para cadastro de usuario", usuario);
          router.push("/");
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
            marginTop={"2"}
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
                    <Card.Title> Cadastre sua Conta Profissional </Card.Title>
                  </Card.Header>
                  <Card.Body gap={"5"}>
                    <Field.Root>
                      <FieldLabel>Nome Completo</FieldLabel>
                      <Input
                        type="text"
                        name="nome"
                        placeholder="Leonardo Braga"
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Field.Root>
                    <Field.Root>
                      <FieldLabel>
                        Email <Field.RequiredIndicator />
                      </FieldLabel>
                      <Input
                        type="email"
                        name="email"
                        placeholder="leo@email.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Field.Root>
                    <HStack>
                      <Field.Root>
                        <FieldLabel>Senha</FieldLabel>
                        <PasswordInput
                          type="password"
                          name="senha"
                          placeholder="********"
                          value={values.senha}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Root>
                      {/* <Field.Root>
                        <FieldLabel>Confirmar Senha</FieldLabel>
                        <PasswordInput
                          type="confirmSenha"
                          name="confirmaSenha"
                          placeholder="********"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Root> */}
                    </HStack>
                    <Field.Root>
                      <FieldLabel>Telefone</FieldLabel>
                      <Input
                        type="text"
                        name="telefone"
                        placeholder="(99) 99999-9999"
                        value={values.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Field.Root>
                  </Card.Body>

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
                  <Card.Footer>
                    <Field.Root>
                      <FieldLabel>
                        Já possui Cadastro?
                        <Link variant={"underline"} href="/">
                          Realize o Login
                        </Link>
                      </FieldLabel>
                    </Field.Root>
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
