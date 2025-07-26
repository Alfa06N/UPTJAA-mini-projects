import { ColorModeButton, useColorModeValue } from "./components/ui/color-mode";
import {
  Container,
  Heading,
  Stack,
  Group,
  HStack,
  IconButton,
  Text,
  Card,
  Link,
  Flex,
  Box,
  Button,
  Input,
  InputGroup,
  useBreakpointValue,
  Portal,
  Float,
  Circle,
  Popover,
  VStack,
  EmptyState,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import NavDrawer from "./components/NavDrawer/NavDrawer";
import icons from "./constants/icons";
import { Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext, StoreContext } from "./App";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import useField from "./hooks/useField";
import PropTypes from "prop-types";
import useOpen from "./hooks/useOpen";

export default function Layout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const headerText = useBreakpointValue({
    base: "Shopping",
    sm: "Shopping Cart",
  });

  return (
    <>
      <Container
        padding={"0.5rem 0.8rem"}
        width={"100dvw"}
        position={"sticky"}
        top={0}
        zIndex={100}
        borderBottom={"1px solid"}
        borderColor={useColorModeValue("gray.400", "gray.700")}
        background={"var(--background-color)"}>
        <HStack>
          <NavDrawer
            trigger={
              <IconButton
                variant={"ghost"}
                size={["sm", "md", "xl"]}
                aria-label="Menu"
                alignContent={"center"}>
                <icons.menu></icons.menu>
              </IconButton>
            }></NavDrawer>

          <Heading
            as={"h1"}
            size={["md", "lg", "xl"]}>
            <Link
              href="/"
              textDecoration={"none"}
              colorPalette={"gray"}
              onClick={(event) => {
                event.preventDefault();
                navigate("/");
              }}>
              {headerText}
            </Link>
          </Heading>
          <Stack
            direction={"row"}
            spacing={4}
            alignItems={"center"}
            justifyContent={"flex-end"}
            flexGrow={1}>
            <SearchInput />

            <IconButton
              variant={"ghost"}
              onClick={() => {
                navigate("/cart");
              }}
              aria-label="Cart"
              size={["sm", "md", "xl"]}>
              <icons.cart></icons.cart>
              {cart.length > 0 && (
                <Float>
                  <Circle size={"4"}>{cart.length}</Circle>
                </Float>
              )}
            </IconButton>
            <ColorModeButton size={["sm", "md", "xl"]}></ColorModeButton>
          </Stack>
        </HStack>
      </Container>

      <Outlet></Outlet>

      <Box
        as="footer"
        py="4"
        px="6"
        mt="6">
        <Flex
          width={"100%"}
          justify={"space-between"}
          align={"center"}>
          <Text fontSize={"sm"}>
            © {new Date().getFullYear()}{" "}
            <Link href="https://github.com/Alfa06N">Alfa06N</Link>. Todos los
            derechos reservados.
          </Text>
          <Flex gap="3">
            <Link
              href="https://github.com/Alfa06N"
              isExternal>
              <IconButton
                variant={"ghost"}
                size={"md"}
                aria-label="GitHub">
                <icons.github />
              </IconButton>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

function SearchInput() {
  const { isOpen, openFunction, closeFunction } = useOpen(false);
  const { value, handleChange, resetField } = useField("");
  const { products } = useContext(StoreContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedInput(value || "");
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [value]);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(debouncedInput.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [debouncedInput, products]);

  const trigger = useBreakpointValue({
    base: (
      <IconButton
        onClick={openFunction}
        variant={"ghost"}
        size={["sm", "md", "xl"]}
        aria-label="Search">
        {<icons.search />}
      </IconButton>
    ),
    sm: (
      <InputGroup width={"clamp(100px, 50%, 300px)"}>
        <Input
          cursor={"pointer"}
          onClick={openFunction}
          readOnly={true}
          padding={"0.5rem 1rem"}
          variant={"subtle"}
          placeholder="Search"
          background={"var(--card-bg-color)"}
        />
      </InputGroup>
    ),
  });

  return (
    <Popover.Root
      open={isOpen}
      onInteractOutside={closeFunction}
      background={"var(--card-bg-color)"}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              {products ? (
                <Popover.Title fontWeight={"medium"}>
                  <Group attached>
                    <Input
                      width={"100%"}
                      placeholder="Search products"
                      value={value}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <Button onClick={resetField}>Reset</Button>
                  </Group>
                  {filteredProducts.length > 0 && (
                    <VStack
                      marginTop={2}
                      overflow={"auto"}>
                      {filteredProducts.map((product) => (
                        <ProductItem
                          onClick={() => {
                            // resetField();
                            closeFunction();
                          }}
                          key={product.id}
                          product={product}
                          title={product.title}
                        />
                      ))}
                    </VStack>
                  )}
                </Popover.Title>
              ) : (
                <EmptyState.Root>
                  <EmptyState.Content>
                    <EmptyState.Indicator>
                      <icons.alert />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                      <EmptyState.Title>There are no products</EmptyState.Title>
                      <EmptyState.Description>
                        Waiting for products to be loaded
                      </EmptyState.Description>
                    </VStack>
                  </EmptyState.Content>
                </EmptyState.Root>
              )}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

function ProductItem({ product, onClick }) {
  const navigate = useNavigate();

  return (
    <ProductDialog
      product={product}
      trigger={
        <Card.Root
          aria-label={product.title}
          width={"100%"}
          padding={2}
          onClick={() => {
            navigate(`/shop-page/${product.category}`);
            onClick();
          }}
          direction={"row"}
          marginInline={0}
          background={"var(--card-bg-color)"}
          cursor={"pointer"}
          overflow={"hidden"}
          key={product.id}>
          <Card.Title
            fontSize={"sm"}
            lineClamp={1}>
            {product.title}
          </Card.Title>
        </Card.Root>
      }
    />
  );
}

ProductItem.propTypes = {
  product: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
