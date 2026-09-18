"use client";

import { realizarLogin } from "@/actions/login";
import {
  Button,
  Card,
  Center,
  CheckboxCard,
  Field,
  Grid,
  GridItem,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <Center>
      <Formik
        initialValues={{ email: "", senha: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          try {
            const usuario = await realizarLogin(values.email, values.senha);
            console.log("Dentro do form", usuario);
            router.push("/dashboard");
          } catch (error) {
            console.log("Erro em logar");
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap="8">
              <GridItem colSpan={1}>
                <Image
                  width="full"
                  src="NutriFlow.png"
                  alt="Logo lateral NutriFlow"
                />
              </GridItem>

              <GridItem colSpan={1}>
                <Center alignItems="center" marginTop="100px">
                  <Card.Root width="500px">
                    <Card.Header alignItems="center">
                      <Image
                        justifyContent="center"
                        src="NutriFlowSFun.png"
                        boxSize="50px"
                        borderRadius="10px"
                        fit="cover"
                        alt="Logo do topo NutriFlow"
                      />
                      <Card.Title>Acesse sua Conta </Card.Title>
                      <Card.Description margin="4px">
                        no NutriFlow
                      </Card.Description>
                    </Card.Header>
                    <Card.Body>
                      <Stack gap="4">
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
                      <CheckboxCard.Root maxW="240px" marginTop="10px">
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Indicator />
                          <CheckboxCard.Label>
                            Aceito os Termos
                          </CheckboxCard.Label>
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                      <Button
                        type="submit"
                        variant="solid"
                        disabled={isSubmitting}
                      >
                        Acessar
                      </Button>
                    </Card.Footer>
                  </Card.Root>
                </Center>
              </GridItem>
            </Grid>
          </form>
        )}
      </Formik>
    </Center>
  );
}
