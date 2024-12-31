import React from "react";
import { HStack, Avatar, Text } from "@chakra-ui/react";

const Message = ({ text, uri, user = "other" }) => {
  return (
    <HStack
      alignSelf={user === "me" ? "flex-end" : "flex-start"}
      paddingX={"4"}
      paddingY={"2"}
      bg={"gray.100"}
      borderRadius={"base"}
    >
      {user === "other" && <Avatar src={uri}></Avatar>}
      <Text>{text}</Text>
      {user === "me" && <Avatar src={uri}></Avatar>}
    </HStack>
  );
};

export default Message;
