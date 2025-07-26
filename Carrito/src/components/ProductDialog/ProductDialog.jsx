import PropTypes from "prop-types";
import {
  Dialog,
  Text,
  Image,
  Button,
  HStack,
  Portal,
  RatingGroup,
  VStack,
  CloseButton,
} from "@chakra-ui/react";
import InputProducts from "../InputProducts/InputProducts";
import QuantityBadge from "../QuantityBadge/QuantityBadge";
import useField from "../../hooks/useField";
import icons from "../../constants/icons";
import { useContext } from "react";
import { CartContext, StoreContext } from "../../App";
import PriceText from "../PriceText/PriceText";

export default function ProductDialog({ product, trigger }) {
  const { value, handleNumericChange, resetField } = useField(0);
  const { addToCart, findProduct } = useContext(CartContext);
  const { updateStock } = useContext(StoreContext);

  const isInCart = findProduct(product);

  return (
    <>
      <Dialog.Root
        lazyMount
        placement={"center"}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              overflow={"hidden"}
              background={"var(--card-bg-color)"}>
              <Dialog.Context>
                {(store) => (
                  <>
                    <Dialog.Header>
                      <Dialog.Title>{product.title}</Dialog.Title>
                    </Dialog.Header>
                    <Image
                      height={["300px", "300px, 400px"]}
                      width={"100%"}
                      objectFit={"contain"}
                      src={product.image}
                      alt={product.title}
                    />

                    <Dialog.Body>
                      <VStack
                        marginTop={4}
                        gap={4}>
                        <HStack
                          paddingInline={[2, 4]}
                          width={"100%"}
                          alignItems={"center"}
                          justifyContent={"space-between"}>
                          <PriceText price={product.price} />

                          <RatingGroup.Root
                            readOnly
                            allowHalf
                            count={5}
                            defaultValue={product.rating.rate}
                            size={"md"}>
                            <RatingGroup.HiddenInput />
                            <RatingGroup.Control />
                          </RatingGroup.Root>
                        </HStack>
                        <HStack>
                          <InputProducts
                            min={0}
                            max={product.stock}
                            defaultValue={0}
                            value={value}
                            onChange={handleNumericChange}
                          />

                          <Button
                            onClick={() => {
                              store.setOpen(false);
                              addToCart(product, value);
                              updateStock(product.id, value);
                              resetField();
                            }}
                            disabled={value === 0 || value > product.stock}
                            variant={"solid"}>
                            Add <icons.cart />
                          </Button>
                        </HStack>
                        <HStack>
                          <Text>{product.stock} units available</Text>
                          {isInCart && (
                            <QuantityBadge quantity={isInCart.quantity} />
                          )}
                        </HStack>
                      </VStack>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton onClick={resetField} />
                      </Dialog.CloseTrigger>
                    </Dialog.Body>
                  </>
                )}
              </Dialog.Context>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}

ProductDialog.propTypes = {
  product: PropTypes.object.isRequired,
  trigger: PropTypes.node.isRequired,
};
