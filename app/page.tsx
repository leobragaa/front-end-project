"use client";

import { realizarLogin } from "@/actions/login";
import { Button, Card, Center, Field, Input, Stack } from "@chakra-ui/react";
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
            console.log("Denstro do form", usuario);
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
            <Card.Root maxW="sm">
              <Card.Header>
                <Card.Title>Login no Site</Card.Title>
                <Card.Description>
                  Ensira suas credenciais para fazer login no nosso sistema
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack gap="4" w="full">
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Senha: </Field.Label>
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
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" variant="solid" disabled={isSubmitting}>
                  Sign in
                </Button>
              </Card.Footer>
            </Card.Root>
          </form>
        )}
      </Formik>
    </Center>
  );
}
