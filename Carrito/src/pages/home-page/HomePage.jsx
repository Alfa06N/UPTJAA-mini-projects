import { useContext } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Stack, Card, Image, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../App";
import PropTypes from "prop-types";

export default function HomePage() {
  const navigate = useNavigate();
  const { products, categories } = useContext(StoreContext);

  return (
    <>
      {products ? (
        <Stack
          wrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
          overflowX={"hidden"}
          spacing={4}
          padding={(0, 4)}>
          {categories &&
            categories.map((category) => (
              <Card.Root
                key={category}
                width={"95%"}
                height={"400px"}
                backgroundColor={"var(--card-bg-color)"}
                borderRadius={"8px"}
                boxShadow={"md"}
                padding={0}
                margin={"0.5rem 0rem"}
                variant={"outline"}>
                <Card.Header /* Header */
                  fontSize={["md", "lg"]}
                  fontWeight={"600"}
                  cursor={"pointer"}
                  onClick={() => {
                    navigate(`/shop-page/${category}`);
                  }}
                  padding={(2, 4)}
                  width={"fit-content"}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Card.Header>
                <Card.Body /* Body */ padding={2}>
                  <Box
                    height="100%"
                    overflowY={"hidden"}
                    overflowX="auto"
                    whiteSpace="nowrap"
                    css={{
                      "&::-webkit-scrollbar": {
                        height: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "4px",
                      },
                    }}>
                    {products
                      .filter((product) => product.category === category)
                      .map((product) => (
                        <ItemBox
                          key={product.id}
                          product={product}
                        />
                      ))}
                  </Box>
                </Card.Body>
              </Card.Root>
            ))}
        </Stack>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

function ItemBox({ product }) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        navigate(`/shop-page/${product.category}`);
      }}
      key={product.id}
      display="inline-flex"
      alignSelf={"center"}
      justifySelf={"center"}
      width={"fit-content"}
      height={"100%"}
      borderRadius="md"
      overflow="hidden"
      mx="2">
      <Image
        cursor={"pointer"}
        onClick={() => {}}
        src={product.image}
        alt={product.title}
        maxH={"280px"}
        maxW={"280px"}
        objectFit="contain"
      />
    </Box>
  );
}

ItemBox.propTypes = {
  product: PropTypes.object.isRequired,
};
