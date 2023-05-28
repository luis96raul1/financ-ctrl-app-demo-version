import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSyncMissingData } from "../../redux/slices/app/thunks";
import { startLogout } from "../../redux/slices/auth/thunks";
import {
  selectCategories,
  selectComments,
  selectMovements,
  setDataStatus,
  status,
} from "../../redux/slices/mainData";
import {
  Busy,
  TypeCategory,
  TypeComment,
  Lazy,
  TypeMovement,
} from "../../utils/Constants";
import { Modal } from "@nextui-org/react";
import { currentTheme, switchTheme } from "@/redux/slices/appConfigurations";

export const SettingsModal = ({ modalVisible, changeModalSettings }) => {
  const dispatch = useDispatch();
  const theme = useSelector(currentTheme);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleTheme = () => {
    dispatch(switchTheme());
  };

  return (
    <Modal closeButton open={modalVisible} onClose={changeModalSettings} blur>
      <Modal.Header>Opciones:</Modal.Header>
      <div>
        <p onClick={handleTheme}>{theme}</p>
      </div>
      <div>
        {/* <p>Generar respaldo en la nube</p> */}
        <p onClick={handleLogout}>Cerrar sesión</p>
      </div>
    </Modal>
  );
};
