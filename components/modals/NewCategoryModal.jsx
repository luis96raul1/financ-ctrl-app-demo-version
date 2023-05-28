import { createNewElement, setDataStatus } from "../../redux/slices/mainData";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  globalIds,
  incrementIdsCounter,
} from "../../redux/slices/appConfigurations";
import { startNewDataBackUp } from "../../redux/slices/app/thunks";
import { Busy, TypeCategory, GlobalCategoriesIds } from "../../utils/Constants";
import { Input, Modal, Spacer } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export const NewCategoryModal = ({ modalVisible, setModalVisible }) => {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { categoriesIds } = useSelector(globalIds);

  const inputElement = useRef(null);

  // useEffect(() => {
  //   if (modalVisible) {
  //     setTimeout(() => {
  //       console.log("----------", inputElement.current);
  //       inputElement.current.focus();
  //     }, 1000);
  //   }
  // }, [modalVisible]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const newCategory = ({ name }) => {
    dispatch(setDataStatus({ status: Busy, tasks: [TypeCategory] }));
    const categoryData = {
      name,
      id: categoriesIds + 1,
      cloudId: null,
      date: Date.now(),
      data: [],
    };
    dispatch(createNewElement({ type: TypeCategory, data: categoryData }));
    dispatch(incrementIdsCounter({ type: GlobalCategoriesIds }));
    dispatch(startNewDataBackUp(TypeCategory, categoryData, true));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    reset();
    setModalVisible(false);
  };

  return (
    <Modal closeButton open={modalVisible} onClose={handleCloseModal} blur>
      <Modal.Header>Crear Nueva Categoría:</Modal.Header>
      <div>
        <form onSubmit={handleSubmit(newCategory)}>
          <Spacer y={1.5} />
          <Input
            bordered
            aria-labelledby="name"
            labelPlaceholder="Nombre de la categoría"
            {...register("name", {
              required: true,
            })}
          />
          <Spacer y={1.5} />

          {/* <Button onPress={newCategory}>Guardar</Button> */}
          <Input ref={inputElement} aria-labelledby="submit" type="submit" />
        </form>
      </div>
    </Modal>
  );
};
