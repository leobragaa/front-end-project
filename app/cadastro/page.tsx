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

export default function CadastroPage() {
  return (
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
            <Card.Footer>
              <Button>Cadastrar</Button>
            </Card.Footer>
            <Stack>
              <Link variant={"underline"} href="/">
                Realize o Login
              </Link>
            </Stack>
          </Card.Root>
        </Flex>
      </GridItem>
    </Grid>
  );
}
