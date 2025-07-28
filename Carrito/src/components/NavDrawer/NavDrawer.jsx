import {
  Drawer,
  Portal,
  List,
  CloseButton,
  Link,
  HStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../App";

export default function NavDrawer({ trigger }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const { categories } = useContext(StoreContext);

  return (
    <Drawer.Root placement={"top"}>
      <Drawer.Trigger>{trigger}</Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content background={"var(--background-color)"}>
            <Drawer.Header>
              <Drawer.Title>Categories</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <List.Root
                display={"flex"}
                flexDirection={"column"}
                gap={"1rem"}
                padding={"0.5rem 0"}
                listStyle={"none"}>
                {categories ? (
                  categories.map((currentCategory) => (
                    <List.Item key={currentCategory}>
                      <Drawer.ActionTrigger asChild>
                        <Link
                          href={`/shop-page/${currentCategory}`}
                          onClick={(event) => {
                            event.preventDefault();
                            navigate(`/shop-page/${currentCategory}`);
                          }}
                          colorPalette={
                            currentCategory === category ? "purple" : "gray"
                          }
                          fontWeight={
                            currentCategory === category ? "bold" : "normal"
                          }
                          textDecoration={"none"}>
                          {currentCategory.charAt(0).toUpperCase() +
                            currentCategory.slice(1)}
                        </Link>
                      </Drawer.ActionTrigger>
                    </List.Item>
                  ))
                ) : (
                  <HStack width={"100%"}>Loading Categories...</HStack>
                )}
              </List.Root>
            </Drawer.Body>
            <Drawer.Footer></Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size={"sm"} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

NavDrawer.propTypes = {
  trigger: PropTypes.node,
};
