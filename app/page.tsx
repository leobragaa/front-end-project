import { ColorModeButton } from "@/components/ui/color-mode";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Center>
      <Card.Root maxW="sm">
        <Card.Header>
          <Card.Title>Sign up</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Input type="color" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Input />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">Cancel</Button>
          <Button variant="solid">Sign in</Button>
          <ColorModeButton />
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}
