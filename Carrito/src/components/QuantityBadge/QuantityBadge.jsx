import { Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function QuantityBadge({ quantity, onClick }) {
  return (
    <Badge
      cursor={"pointer"}
      onClick={onClick && onClick}
      size={["xs", "sm"]}>
      {quantity} {quantity > 1 ? "units" : "unit"} in cart
    </Badge>
  );
}

QuantityBadge.propTypes = {
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
