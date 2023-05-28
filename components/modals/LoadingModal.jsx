import { Default, PrimaryColor } from "@/utils/Constants";
import { Loading, Modal } from "@nextui-org/react";

export const LoadingModal = ({
  type = Default,
  message = null,
  color = PrimaryColor,
  open,
}) => {
  return (
    <Modal style={{ background: "none" }} open={open}>
      <Loading color={color} textColor={color} size="lg" type={type}>
        {message}
      </Loading>
    </Modal>
  );
};
