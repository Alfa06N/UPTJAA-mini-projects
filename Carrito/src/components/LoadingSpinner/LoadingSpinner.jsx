import { VStack, Spinner, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

export default function LoadingSpinner() {
  const color = useColorModeValue("purple.700", "purple.300");
  return (
    <>
      <VStack
        flex={1}
        justifyContent={"center"}
        colorPalette={"purple"}>
        <Spinner
          borderWidth={"3px"}
          size={"md"}
          color={color}></Spinner>
        <Text
          fontSize={"lg"}
          color={color}>
          Loading...
        </Text>
      </VStack>
    </>
  );
}
