import { Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function PriceText({ price }) {
  return (
    <Text
      lineHeight={"1lh"}
      fontWeight={"medium"}
      fontSize={"2xl"}
      letterSpacing={"tight"}>
      ${price}
    </Text>
  );
}

PriceText.propTypes = {
  price: PropTypes.number.isRequired,
};
