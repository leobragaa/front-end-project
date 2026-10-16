"use client";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { io, Socket } from "socket.io-client";

export default function ConversationChatPage() {
  // Guardando a conexao
  const socketRef = useRef<Socket | null>(null);

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<
    { id: string | number; text: string; isMe: boolean }[]
  >([]);
  useEffect(() => {
    const socket = io("http://localhost:3333/message-conversation");
    // Está recebendo uma conexão, e caso reinicia retorna nulo
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Conectado ao chat:", socket.id);
    });

    socket.on("msgToClient", (message: string, senderId: string) => {
      console.log("Mensagem Recebida:", message, senderId);

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now(),
          text: message,
          isMe: senderId === socket.id,
        },
      ]);
    });
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);
  function sendMessage() {
    const message = messageInput.trim();

    if (!message) {
      return;
    }
    socketRef.current?.emit("message", message);
    setMessageInput("");
  }
  return (
    <Grid
      templateColumns={"repeat(12, 1fr)"}
      flexDirection={["column", "column", "row", "row"]}
      width={"100%"}
      height={"100vh"}
    >
      <GridItem colSpan={[12, 12, 12, 12]} width={"100%"} height={"100vh"}>
        <Flex>
          <VStack
            w={{ base: "full", md: "350px" }}
            display={{ base: "none", md: "flex" }}
            borderRadius={"lg"}
            borderRight={"1px solid"}
            borderLeft={"1px solid"}
            borderBottom={"1px solid"}
            align={"stretch"}
          >
            <Box p={4}>
              <Text>Conversas</Text>
            </Box>
            <HStack>
              <IconButton variant="ghost" aria-label="Anexar Arquivo">
                <FaSearch />
              </IconButton>
              <Input placeholder="Buscar Paciente..." />
            </HStack>
            <Flex direction={"column"}>
              <HStack>
                <Box position="relative">
                  <Avatar.Root size="md">
                    <Avatar.Fallback name="User" />
                  </Avatar.Root>
                  <Box
                    position="absolute"
                    bottom="0"
                    right="0"
                    boxSize="3"
                    bg="green.500"
                    borderRadius="full"
                    border="2px solid white"
                  />
                </Box>
                <VStack align={"start"} gap={0} flex={1}>
                  <Text fontWeight={"semibold"} fontSize={"sm"} lineClamp={1}>
                    User
                  </Text>
                  <Text fontSize={"xs"} color={"gray.500"} lineClamp={1}>
                    Online
                  </Text>
                </VStack>
              </HStack>
            </Flex>
          </VStack>
          <Flex
            direction={"column"}
            flex={"1"}
            border={"1px solid"}
            borderRadius={"lg"}
          >
            <VStack flex={1} p={4} gap={4} align={"stretch"}>
              {messages.map((msg) => (
                <Flex
                  key={msg.id}
                  justify={msg.isMe ? "flex-end" : "flex-start"}
                >
                  <Box
                    maxW="70%"
                    bg={msg.isMe ? "white" : "green.700"}
                    color={msg.isMe ? "gray.800" : "white"}
                    px={4}
                    py={2}
                    borderRadius="lg"
                    borderTopRightRadius={msg.isMe ? "none" : "lg"}
                    borderTopLeftRadius={msg.isMe ? "lg" : "none"}
                    boxShadow="sm"
                  >
                    <Text fontSize="sm">{msg.text}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
            <Box p={4} borderTop={"1px solid"}>
              <HStack gap={2}>
                <IconButton
                  variant="ghost"
                  aria-label="Anexar Arquivo"
                  color={"green.600"}
                >
                  <MdAttachFile />
                </IconButton>
                <Input
                  placeholder="Digite a sua mensagem...."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <IconButton
                  variant="ghost"
                  aria-label="Enviar Mensagem"
                  color={"green.600"}
                  onClick={sendMessage}
                >
                  <IoIosSend />
                </IconButton>
              </HStack>
            </Box>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}
