"use client";
import {
  Card,
  Center,
  Field,
  HStack,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { Formik } from "formik";

export default function CadastroPaciente() {
  return (
    // <Formik>
    //     <form>
    <Card.Root justifyContent={"center"}>
      <Card.Header>
        <Card.Title>Dados Pessoais</Card.Title>
      </Card.Header>
      <Card.Body gap={"5"}>
        <HStack>
          <Field.Root>
            <Field.Label>
              Nome Completo
              <Input placeholder="Informe Nome Completo do Paciente" />
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Data de Nascimento
              <Input placeholder="dd/mm/aaaa" type="date" />
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label> Sexo </Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field placeholder="">
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
              <Input placeholder="exemplo@email.com" type="email" />
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Telefone
              <Input placeholder="(67) 99999-9999" type="text" />
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label>
              CPF
              <Input placeholder="000.000.000-00" type="text" />
            </Field.Label>
          </Field.Root>
        </HStack>
        <Field.Root>
          <Field.Label>
            Endereço
            <Input placeholder="Digite o Enderço do Paciente" type="text" />
          </Field.Label>
        </Field.Root>
        <HStack>
          <Field.Root>
            <Field.Label>
              Cidade
              <Input placeholder="Digite a Cidade" />
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Estado
              <Input placeholder="Digite o Estado Ex: ( MS )" />
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label>
              CEP
              <Input placeholder="00000-00" />
            </Field.Label>
          </Field.Root>
        </HStack>
      </Card.Body>
      <Card.Header>
        <Card.Title> Dados Clinicos</Card.Title>
      </Card.Header>
      <Card.Body>
        <HStack>
          <Field.Root>
            <Field.Label>Peso</Field.Label>
            <Input placeholder="80.0 kg" type="number" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Altura</Field.Label>
            <Input placeholder="1.75 m" type="number" />
          </Field.Root>
        </HStack>
        <Field.Root>
          <Field.Label>Alergia</Field.Label>
          <Input placeholder="Informe as alergias do Paciente" type="Text" />
        </Field.Root>
      </Card.Body>
    </Card.Root>
    //     </form>
    // </Formik>
  );
}
