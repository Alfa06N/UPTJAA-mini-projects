import { Dialog, Portal, Button, CloseButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function RemoveDialog({ trigger, action }) {
  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              You&apos;re going to remove a product from your cart
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger>
                <Button
                  onClick={action}
                  colorPalette={"red"}>
                  Remove from Cart
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

RemoveDialog.propTypes = {
  trigger: PropTypes.node.isRequired,
  action: PropTypes.func.isRequired,
};
