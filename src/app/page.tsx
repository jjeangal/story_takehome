'use client'
import { Flex, Heading, List, ListItem } from "@chakra-ui/react";

export default function Home() {

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textColor="black"
      w="100%"
      h="100%"
    >
      <Heading mb={4}>
        Welcome!
      </Heading>
      <List spacing={3} textAlign="center">
        <ListItem>
          You can:
        </ListItem>
        <ListItem>
          Generate an image and register it as an IPAsset
        </ListItem>
        <ListItem>
          Or
        </ListItem>
        <ListItem>
          Explore IPassets, create variations of the images and register them as derivative IP assets
        </ListItem>
      </List>
    </Flex>
  );
}