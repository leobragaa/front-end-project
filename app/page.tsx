"use client";

import { realizarLogin } from "@/actions/login";

import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  createListCollection,
  Field,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Portal,
  Select,
  Stack,
  Strong,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const tiposDeUsuarioList = createListCollection({
    items: [
      { label: "Nutricionista", value: "Nutricionista" },
      { label: "Paciente", value: "Paciente" },
    ],
  });
  return (
    <Formik
      initialValues={{ email: "", senha: "", tipousuario: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        try {
          const usuario = await realizarLogin(
            values.email,
            values.senha,
            values.tipousuario,
          );
          console.log("Dentro do form", usuario);

          if (values.tipousuario === "Paciente") {
            router.push("/dashboardPaciente");
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.log("Erro em logar", error);
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid
            flexDirection={["column", "column", "row", "row"]}
            templateColumns="repeat(8, 1fr)"
            height={"100vh"}
            w={""}
            gap="3"
          >
            <GridItem colSpan={[8, 8, 5, 5]} background="green.900">
              <Flex direction={["column"]} alignItems={"center"}>
                <Box marginTop={"20px"}>
                  <Image
                    maxW="sm"
                    src="NutriFlowSFun.png"
                    alt="Logo lateral NutriFlow"
                  />
                </Box>
                <Flex marginTop={"50px"}>
                  <Text fontFamily="var(--font-)" fontSize="50px">
                    Nutri
                  </Text>
                  <Text fontFamily="sans-serif" fontSize="50px">
                    Flow
                  </Text>
                </Flex>
                <Center gap="1">
                  <Box>NUTRIÇÃO °</Box>
                  <Box>PERFORMANCE °</Box>
                  <Box>EQUILIBRIO </Box>
                </Center>
              </Flex>
            </GridItem>

            <GridItem colSpan={[8, 8, 3, 3]} marginLeft={"5"} marginRight={"5"}>
              <Card.Root marginTop={["0px", "0px", "8", "8"]}>
                <Card.Header alignItems="center">
                  <Image
                    justifyContent="center"
                    src="NutriFlowSFun.png"
                    boxSize="50px"
                    borderRadius="10px"
                    alt="Logo do topo NutriFlow"
                  />
                  <Card.Title>Acesse sua Conta </Card.Title>
                  <Card.Description margin="2px">no NutriFlow</Card.Description>
                </Card.Header>
                <Card.Body>
                  <Stack gap="4">
                    <Select.Root
                      collection={tiposDeUsuarioList}
                      value={values.tipousuario ? [values.tipousuario] : []}
                      onValueChange={(selecaoTipoUsuario) => {
                        setFieldValue(
                          "tipousuario",
                          selecaoTipoUsuario.value[0],
                        );
                      }}
                      size="sm"
                      width="320px"
                    >
                      <Select.HiddenSelect />
                      <Select.Label>Quem está acessando:</Select.Label>
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Informe quem está acessando" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {tiposDeUsuarioList.items.map((items) => (
                              <Select.Item item={items} key={items.value}>
                                {items.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                    <Field.Root>
                      <Field.Label color="green.600" fontSize="15px">
                        <strong>E-MAIL :</strong>
                      </Field.Label>
                      <Input
                        placeholder="seu-email@example.com"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && errors.email}
                    </Field.Root>

                    <Field.Root>
                      <Field.Label color="green.600" fontSize="15px">
                        <strong>SENHA :</strong>
                      </Field.Label>
                      <Input
                        type="password"
                        name="senha"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.senha}
                      />
                      {errors.senha && touched.senha && errors.senha}
                    </Field.Root>
                  </Stack>
                  <Field.Root>
                    <Field.Label>
                      {" "}
                      Esqueceu a Senha?
                      <Text color={"green.600"}>
                        <Link href={"#"}>Recupere sua Senha</Link>
                      </Text>
                    </Field.Label>
                  </Field.Root>
                  <Checkbox.Root maxW="240px" marginTop="10px">
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize={"sm"}>
                      Aceito os Termos <Link href={"#"}>de Uso do Sistema</Link>
                    </Checkbox.Label>
                  </Checkbox.Root>
                </Card.Body>
                <Card.Footer justifyContent="center">
                  <Button
                    background="orange.600"
                    color="white"
                    width="50%"
                    cursor="pointer"
                    type="submit"
                    variant="solid"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    <Strong> ENTRAR </Strong>
                  </Button>
                </Card.Footer>
                <Card.Footer>
                  <Field.Root>
                    <Field.Label>
                      Não possui Cadastro?
                      <Text color={"green.600"}>
                        <Link href={"/cadastro"}> Crie sua Conta </Link>
                      </Text>
                      Prossional
                    </Field.Label>
                  </Field.Root>
                </Card.Footer>
              </Card.Root>
            </GridItem>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
