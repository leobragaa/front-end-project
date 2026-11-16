
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
  Separator,
} from "@chakra-ui/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { FaSearch } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string | number;
  text: string;
  isMe: boolean;
  time: string;
}

export default function ConversationChatPage() {
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messageInput, setMessageInput] = useState("");
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);

  // Conexão com o servidor Socket.IO
  useEffect(() => {
    const socket = io(
      "http://localhost:3333/message-conversation"
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Conectado ao chat:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Erro na conexão:", error.message);
      setConnected(false);
    });

    socket.on(
      "msgToClient",
      (message: string, senderId: string) => {
        setMessages((previous) => [
          ...previous,
          {
            id: `${Date.now()}-${Math.random()}`,
            text: message,
            isMe: senderId === socket.id,
            time: new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("msgToClient");
      socket.disconnect();

      socketRef.current = null;
    };
  }, []);

  // Rola automaticamente para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Enviar mensagem
  function sendMessage() {
    const message = messageInput.trim();

    if (!message || !socketRef.current?.connected) {
      return;
    }

    socketRef.current.emit("message", message);

    setMessageInput("");
  }

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "300px 1fr" }}
      height="calc(100vh - 20px)"
      gap={0}
      overflow="hidden"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
    >
      {/* LISTA DE CONVERSAS */}
      <GridItem
        display={{ base: "none", md: "block" }}
        borderRight="1px solid"
        borderColor="gray.200"
        bg="white"
      >
        <VStack align="stretch" height="100%" gap={0}>
          {/* Título */}
          <Box p={5}>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                Conversas
              </Text>

              <IoChatbubbleEllipsesOutline
                size={23}
                color="#4A7A35"
              />
            </HStack>

            <Text fontSize="sm" color="gray.500" mt={1}>
              Comunicação com seus pacientes
            </Text>
          </Box>

          {/* Pesquisa */}
          <Box px={4} pb={4}>
            <HStack
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              px={3}
              bg="gray.50"
            >
              <FaSearch color="#718096" />

              <Input
                placeholder="Buscar paciente..."
                variant="subtle"
                border="none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                _focus={{ boxShadow: "none" }}
              />
            </HStack>
          </Box>

          <Separator />

          {/* Contato atual */}
          <Box
            p={4}
            bg="green.50"
            borderLeft="4px solid"
            borderColor="green.600"
          >
            <HStack gap={3}>
              <Box position="relative">
                <Avatar.Root size="lg">
                  <Avatar.Fallback name="Paciente" />
                </Avatar.Root>

                <Box
                  position="absolute"
                  bottom="0"
                  right="0"
                  boxSize="12px"
                  bg={connected ? "green.500" : "gray.400"}
                  borderRadius="full"
                  border="2px solid white"
                />
              </Box>

              <VStack align="start" gap={0}>
                <Text fontWeight="semibold" color="gray.800">
                  Paciente
                </Text>

                <Text fontSize="xs" color="gray.500">
                  {connected ? "Conectado ao chat" : "Desconectado"}
                </Text>
              </VStack>
            </HStack>
          </Box>

          <Box flex={1} />
        </VStack>
      </GridItem>

      {/* ÁREA DO CHAT */}
      <GridItem minW={0}>
        <Flex direction="column" height="100%">
          {/* CABEÇALHO */}
          <HStack
            p={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            justify="space-between"
            bg="white"
          >
            <HStack gap={3}>
              <Avatar.Root size="md">
                <Avatar.Fallback name="Paciente" />
              </Avatar.Root>

              <VStack align="start" gap={0}>
                <Text fontWeight="bold" color="gray.800">
                  Paciente
                </Text>

                <HStack gap={1}>
                  <Box
                    boxSize="7px"
                    borderRadius="full"
                    bg={connected ? "green.500" : "red.400"}
                  />

                  <Text fontSize="xs" color="gray.500">
                    {connected ? "Online" : "Offline"}
                  </Text>
                </HStack>
              </VStack>
            </HStack>

            <Text fontSize="xs" color="gray.500">
              NutriFlow
            </Text>
          </HStack>

          {/* MENSAGENS */}
          <Flex
            flex={1}
            direction="column"
            overflowY="auto"
            p={{ base: 3, md: 5 }}
            gap={4}
            bg="gray.50"
          >
            {messages.length === 0 && (
              <Flex
                flex={1}
                direction="column"
                justify="center"
                align="center"
                textAlign="center"
                gap={3}
              >
                <Box
                  p={4}
                  borderRadius="full"
                  bg="green.50"
                  color="green.700"
                >
                  <IoChatbubbleEllipsesOutline size={35} />
                </Box>

                <Text fontWeight="semibold" color="gray.700">
                  Nenhuma mensagem ainda
                </Text>

                <Text fontSize="sm" color="gray.500">
                  Envie uma mensagem para iniciar a conversa.
                </Text>
              </Flex>
            )}

            {messages.map((msg) => (
              <Flex
                key={msg.id}
                justify={msg.isMe ? "flex-end" : "flex-start"}
                width="100%"
              >
                <Box
                  maxW={{ base: "85%", md: "70%" }}
                  bg={msg.isMe ? "green.700" : "white"}
                  color={msg.isMe ? "white" : "gray.800"}
                  px={4}
                  py={3}
                  borderRadius="xl"
                  borderTopRightRadius={msg.isMe ? "sm" : "xl"}
                  borderTopLeftRadius={msg.isMe ? "xl" : "sm"}
                  boxShadow="sm"
                  border={msg.isMe ? "none" : "1px solid"}
                  borderColor="gray.200"
                >
                  <Text fontSize="sm" whiteSpace="pre-wrap">
                    {msg.text}
                  </Text>

                  <Text
                    fontSize="10px"
                    textAlign="right"
                    mt={1}
                    color={msg.isMe ? "green.100" : "gray.400"}
                  >
                    {msg.time}
                  </Text>
                </Box>
              </Flex>
            ))}

            <div ref={messagesEndRef} />
          </Flex>

          {/* CAMPO DE ENVIO */}
          <Box
            p={{ base: 3, md: 4 }}
            borderTop="1px solid"
            borderColor="gray.200"
            bg="white"
          >
            <HStack gap={2}>
              <Input
                placeholder="Digite sua mensagem..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                borderRadius="full"
                bg="gray.50"
                disabled={!connected}
                _focus={{
                  borderColor: "green.500",
                  boxShadow: "0 0 0 1px #4A7A35",
                }}
              />

              <IconButton
                aria-label="Enviar mensagem"
                borderRadius="full"
                bg="green.700"
                color="white"
                onClick={sendMessage}
                disabled={!connected || !messageInput.trim()}
                _hover={{
                  bg: "green.800",
                }}
              >
                <IoIosSend size={23} />
              </IconButton>
            </HStack>

            {!connected && (
              <Text fontSize="xs" color="red.500" mt={2}>
                Aguardando conexão com o servidor...
              </Text>
            )}
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}
