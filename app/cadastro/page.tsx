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
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export default function CadastroPage() {
  return (
    <SimpleGrid
      justifyContent={"center"}
      marginTop={"20"}
      templateColumns={"2, 1fr"}
      flexDirection={["column", "column", "row", "row"]}
    >
      <Flex>
        <Card.Root w={"lg"} gap={"1"} direction={"column"}>
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
          <Card.Body gap={"2"}>
            <Text>Cadastre-se como:</Text>
            <NativeSelect.Root>
              <NativeSelect.Field placeholder="">
                <option value={"nutricionista"}> Nutricionista </option>
                <option value={"paciente"}> Paciente </option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.Root>
              <FieldLabel>
                Email <Field.RequiredIndicator />
              </FieldLabel>
              <Input placeholder="me@email.com" required />
            </Field.Root>
            <DateInput.Root>
              <DateInput.Label>Data de Nascimento</DateInput.Label>
              <DateInput.Control>
                <DateInput.Segments />
              </DateInput.Control>
            </DateInput.Root>
            <Field.Root>
              <FieldLabel>Senha</FieldLabel>
              <PasswordInput placeholder="°°°°°°°°°°°°" />
            </Field.Root>
            <Field.Root>
              <FieldLabel>Telefone</FieldLabel>
              <Input placeholder="(99) 99999-9999" required />
            </Field.Root>
            <Field.Root>
              <FieldLabel>CFN</FieldLabel>
              <Input placeholder="1234" required />
            </Field.Root>
          </Card.Body>
        </Card.Root>
      </Flex>
    </SimpleGrid>
  );
}
