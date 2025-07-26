import { useContext } from "react";
import { CartContext, StoreContext } from "../../App";
import {
  Text,
  Card,
  VStack,
  HStack,
  Image,
  Button,
  EmptyState,
} from "@chakra-ui/react";
import QuantityBadge from "../../components/QuantityBadge/QuantityBadge";
import PriceText from "../../components/PriceText/PriceText";
import PropTypes from "prop-types";
import icons from "../../constants/icons";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import useFetch from "../../hooks/useFetch";
import RemoveDialog from "../../components/RemoveDialog/RemoveDialog";
import { toaster } from "../../components/ui/toaster";
import { useColorModeValue } from "../../components/ui/color-mode";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart } = useContext(CartContext);

  const isCartEmpty = cart.length === 0;
  const emptyTextColor = useColorModeValue(
    "colorPalette.700",
    "colorPalette.300"
  );
  return (
    <>
      {isCartEmpty ? (
        <EmptyCart />
      ) : (
        <VStack
          marginTop={5}
          gap={3}
          flex={1}
          padding={"0 1rem"}
          alignItems={"flex-start"}>
          {cart.map((item) => (
            <ItemCard
              key={item.id}
              idProduct={item.id}
              quantity={item.quantity}
            />
          ))}
        </VStack>
      )}
    </>
  );
}

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <EmptyState.Root
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flex={1}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <icons.cart />
        </EmptyState.Indicator>
        <VStack textAlign={"center"}>
          <EmptyState.Title>Your cart is empty</EmptyState.Title>
          <EmptyState.Description>
            Explore our products and add items to your cart
          </EmptyState.Description>
          <Button
            variant={"solid"}
            onClick={() => {
              navigate("/");
            }}>
            Home <icons.home />
          </Button>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}

function ItemCard({ idProduct, quantity }) {
  const { getProduct, restoreStock } = useContext(StoreContext);
  const { removeFromCart } = useContext(CartContext);
  const { data } = useFetch(() => getProduct(idProduct));

  return (
    <>
      {data && (
        <Card.Root
          variant={"outline"}
          background={"var(--card-bg-color)"}
          justifyContent={["center", "flex-start"]}
          alignItems={["center", "center"]}
          flexDirection={["column", "row"]}
          width={"100%"}>
          <Image
            height={"160px"}
            width={"160px"}
            objectFit={"contain"}
            src={data.image}></Image>
          <Card.Body
            justifyContent={"center"}
            gap={4}>
            <Text
              textAlign={["center", "left"]}
              lineClamp={1}
              fontSize={["sm", "md"]}>
              {data.title}
            </Text>
            <HStack
              wrap={"wrap"}
              justifyContent={["center", "flex-start"]}
              alignItems={"center"}
              gap={4}>
              <PriceText price={data.price * quantity} />
              <QuantityBadge quantity={quantity} />

              <HStack>
                <ProductDialog
                  product={data}
                  trigger={
                    <Button
                      flex={1}
                      variant={"solid"}>
                      Add <icons.cart />
                    </Button>
                  }
                />
                <RemoveDialog
                  trigger={
                    <Button
                      flex={1}
                      variant={"solid"}
                      colorPalette={"red"}>
                      Remove <icons.trash />
                    </Button>
                  }
                  action={() => {
                    restoreStock(idProduct, quantity);
                    removeFromCart(data);

                    toaster.create({
                      description: `Product sucessfully removed from cart`,
                      type: "success",
                    });
                  }}
                />
              </HStack>
            </HStack>
          </Card.Body>
        </Card.Root>
      )}
    </>
  );
}

ItemCard.propTypes = {
  idProduct: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
