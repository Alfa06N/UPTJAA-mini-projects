import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import {
  VStack,
  Text,
  HStack,
  Card,
  Image,
  Button,
  Badge,
} from "@chakra-ui/react";
import ProductDialog from "../../../../components/ProductDialog/ProductDialog";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import QuantityBadge from "../../../../components/QuantityBadge/QuantityBadge";
import CategoryList from "../CategoryList/CategoryList";
import { CartContext, StoreContext } from "../../../../App";
import PropTypes from "prop-types";

export default function CategoryPage() {
  const { category } = useParams();
  const { filterProductsByCategory } = useContext(StoreContext);

  const products = filterProductsByCategory(category);

  return (
    <>
      {products ? (
        <>
          <HStack
            wrap={"wrap"}
            gap={4}
            justifyContent={"center"}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </HStack>
          <VStack
            as={"section"}
            justifyContent={"center"}
            marginTop={6}>
            <Text marginBlock={3}>Other categories available</Text>
            <CategoryList category={category} />
            <HStack></HStack>
          </VStack>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

function ProductCard({ product }) {
  const { findProduct } = useContext(CartContext);
  const navigate = useNavigate();
  const isInCart = findProduct(product);

  return (
    <Card.Root
      key={product.id}
      display={"flex"}
      flexDirection={"column"}
      overflow={"hidden"}
      variant={"elevated"}
      height={"100%"}
      width={"clamp(300px, 40%, 400px)"}
      background={"var(--card-bg-color)"}>
      <Image
        height={"200px"}
        width={"100%"}
        objectFit="contain"
        src={product.image}
        alt={product.title}
      />
      <Card.Body
        gap={"2"}
        flexGrow={1}>
        <Card.Title
          lineClamp={1}
          fontSize={"md"}>
          {product.title}
        </Card.Title>
        <Card.Description lineClamp={3}>{product.description}</Card.Description>
        <Text
          fontWeight={"medium"}
          fontSize={"2xl"}
          letterSpacing={"tight"}
          marginTop={2}>
          ${product.price}
        </Text>
      </Card.Body>
      <Card.Footer
        justifyContent={"flex-end"}
        gap={2}>
        {isInCart && (
          <QuantityBadge
            onClick={() => {
              navigate("/cart");
            }}
            quantity={isInCart.quantity}
          />
        )}
        {product.stock ? (
          <ProductDialog
            product={product}
            trigger={
              <Button variant={"ghost"}>Add to cart</Button>
            }></ProductDialog>
        ) : (
          <Badge colorPalette={"red"}>Sold out</Badge>
        )}
      </Card.Footer>
    </Card.Root>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
