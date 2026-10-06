"use client";
import { pacienteCadastro } from "@/actions/paciente";
import {
  Button,
  Card,
  Field,
  Grid,
  GridItem,
  HStack,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CadastroPaciente() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
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
            <GridItem colSpan={[12, 12, 2, 12]} width={"80"} height={"28"}>
              <Link href={"/pacientesNutricionista"}>
                <Button>Voltar para Pacientes</Button>
              </Link>
            </GridItem>
            <GridItem
              colSpan={[12, 12, 12, 12]}
              width={"100vw"}
              height={"100vh"}
            >
              <Card.Root justifyContent={"center"}>
                <Card.Header>
                  <Card.Title>Dados Pessoais</Card.Title>
                </Card.Header>
                <Card.Body gap={"5"}>
                  <HStack>
                    <Field.Root>
                      <Field.Label>
                        Nome Completo
                        <Input
                          placeholder="Informe Nome Completo do Paciente"
                          type="text"
                          name="nome"
                          value={values.nome}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        Data de Nascimento
                        <Input
                          placeholder="dd/mm/aaaa"
                          type="text"
                          name="datanascimento"
                          value={values.datanascimento}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
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
                      <Field.Label>
                        E-mail
                        <Input
                          placeholder="exemplo@email.com"
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        Telefone
                        <Input
                          placeholder="(67) 99999-9999"
                          type="text"
                          name="telefone"
                          value={values.telefone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        CPF
                        <Input
                          placeholder="000.000.000-00"
                          type="text"
                          name="cpf"
                          value={values.cpf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
                    </Field.Root>
                  </HStack>
                  <Field.Root>
                    <Field.Label>
                      Endereço
                      <Input
                        placeholder="Digite o Endereço do Paciente"
                        type="text"
                        name="endereco"
                        value={values.endereco}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field.Label>
                  </Field.Root>
                  <HStack>
                    <Field.Root>
                      <Field.Label>
                        Cidade
                        <Input
                          placeholder="Digite a Cidade"
                          type="text"
                          name="cidade"
                          value={values.cidade}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        Estado
                        <Input
                          placeholder="Digite o Estado Ex: ( MS )"
                          type="text"
                          name="estado"
                          value={values.estado}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        CEP
                        <Input
                          placeholder="00000-00"
                          type="text"
                          name="cep"
                          value={values.cep}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field.Label>
                    </Field.Root>
                  </HStack>
                  <Card.Footer>
                    <Button
                      justifyContent={"flex-end"}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      CADASTRAR
                    </Button>
                  </Card.Footer>
                </Card.Body>
                {/* Cadastro dos Dados Clinicos do Paciente */}
              </Card.Root>
            </GridItem>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
