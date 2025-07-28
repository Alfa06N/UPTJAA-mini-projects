import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import { StoreContext } from "../../../../App";

export default function CategoryList({ category }) {
  const { categories } = useContext(StoreContext);
  const otherCategories = categories
    ? categories.filter((item) => item !== category)
    : null;
  const navigate = useNavigate();

  return (
    <>
      <Flex
        width={"100%"}
        wrap={"wrap"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}>
        {otherCategories &&
          otherCategories.map((item) => {
            return (
              <Button
                key={item}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/shop-page/${item}`);
                }}
                size={"sm"}
                variant={"outline"}
                aria-label={`Go to category ${item}`}>
                <a href={`/shop-page/${item}`}>{item}</a>
              </Button>
            );
          })}
      </Flex>
    </>
  );
}

CategoryList.propTypes = {
  category: PropTypes.string.isRequired,
};
