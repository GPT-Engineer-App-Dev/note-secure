import React, { useState } from "react";
import { Box, VStack, HStack, Input, IconButton, Textarea, Container, Heading, useColorMode, useColorModeValue, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { FaPlus, FaSun, FaMoon, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const addNote = () => {
    if (inputTitle.trim() === "" || inputContent.trim() === "") {
      toast({
        title: "Error",
        description: "Title and content cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newNote = {
      id: Date.now(),
      title: inputTitle,
      content: inputContent,
    };
    setNotes([newNote, ...notes]);
    setInputTitle("");
    setInputContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Heading pb={4}>Chakra Keep</Heading>
          <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound size="md" alignSelf="flex-start" onClick={toggleColorMode} aria-label="Toggle color mode" />
        </HStack>
        <Box background={formBackground} p={4} borderRadius="md" shadow="md">
          <VStack spacing={4}>
            <Input placeholder="Title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
            <Textarea placeholder="Take a note..." value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote}>
              Add
            </Button>
          </VStack>
        </Box>
        <SimpleGrid columns={2} spacing={4}>
          {notes.map((note) => (
            <Box key={note.id} p={4} shadow="md" borderWidth="1px" borderRadius="md" background={formBackground}>
              <VStack align="stretch">
                <HStack justifyContent="space-between">
                  <Heading size="md">{note.title}</Heading>
                  <IconButton icon={<FaTrash />} isRound size="sm" onClick={() => deleteNote(note.id)} aria-label="Delete note" />
                </HStack>
                <Box>{note.content}</Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
