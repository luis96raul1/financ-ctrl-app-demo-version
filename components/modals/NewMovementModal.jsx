import { startNewDataBackUp } from "@/redux/slices/app/thunks";
import {
  globalIds,
  incrementIdsCounter,
} from "@/redux/slices/appConfigurations";
import {
  createNewElement,
  fullStatus,
  selectMovements,
  setDataStatus,
} from "@/redux/slices/mainData";
import {
  Busy,
  GlobalMovementsIds,
  TypeComment,
  TypeMovement,
} from "@/utils/Constants";
import { Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Comments } from "../form/Comments";

export const NewMovementModal = ({
  modalVisible,
  setModalVisible,
  categoryId,
  categoryCloudId,
  movementType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const { movementsIdsByCategoryIds } = useSelector(globalIds);

  const [extraData, setExtraData] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsToSave, setCommentsToSave] = useState(null);

  const { tasks } = useSelector(fullStatus);

  const movementsList = useSelector(selectMovements);

  useEffect(() => {
    if (commentsToSave && tasks[0] === "comments") {
      const currentMovement = movementsList.filter(
        (movement) => movement.id === commentsToSave.movementId
      )[0];
      dispatch(
        startNewDataBackUp("comments", commentsToSave, currentMovement.cloudId)
      );
      setCommentsToSave(null);
    }
  }, [movementsList, tasks]);

  const newMovement = ({ title, amount, comment, commentTitle }) => {
    if (extraData && (commentTitle || comment || comments.length !== 0)) {
      dispatch(
        setDataStatus({ status: Busy, tasks: [TypeMovement, "comments"] })
      );

      const commentsToUpload = {
        id: "" + categoryId + (movementsIdsByCategoryIds[categoryId] || 0) + 1,
        cloudId: null,
        movementId: (movementsIdsByCategoryIds[categoryId] || 0) + 1,
        categoryId,
        title: commentTitle,
        date: Date.now(),
        data:
          comment === undefined || comment.trim() === ""
            ? comments
            : [{ comment: comment.trim(), date: Date.now() }, ...comments],
      };

      dispatch(createNewElement({ type: TypeComment, data: commentsToUpload }));
      setCommentsToSave(commentsToUpload);
    } else {
      dispatch(setDataStatus({ status: Busy, tasks: [TypeMovement] }));
    }

    const movementToUpload = {
      id: (movementsIdsByCategoryIds[categoryId] || 0) + 1,
      categoryId,
      cloudId: null,
      title: title.trim(),
      amount,
      type: movementType,
      date: new Date().getTime(),
    };
    dispatch(createNewElement({ type: TypeMovement, data: movementToUpload }));
    dispatch(
      startNewDataBackUp(TypeMovement, movementToUpload, categoryCloudId)
    );
    dispatch(
      incrementIdsCounter({
        type: GlobalMovementsIds,
        categoryId,
      })
    );

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setExtraData(false);
    reset();
  };

  const handleExtraData = () => {
    setExtraData(!extraData);
    resetField("commentTitle");
    resetField("comment");
    setComments([]);
  };

  return (
    <Modal
      closeButton
      open={modalVisible}
      onClose={handleCloseModal}
      blur
      // style={{
      //   background: "linear-gradient(45deg, #F55178 0%, #8F2B7F 100%)",
      // }}
    >
      <form onSubmit={handleSubmit(newMovement)}>
        <Spacer y={1.5} />

        <Input
          bordered
          aria-labelledby="title"
          labelPlaceholder="Nombre del movimiento"
          status={errors.title ? "error" : null}
          {...register("title", { required: true })}
        />
        <Spacer y={1.5} />
        <Input
          bordered
          aria-labelledby="amount"
          type="number"
          step={0.0001}
          labelPlaceholder="Monto"
          status={errors.amount ? "error" : null}
          {...register("amount", {
            required: true,
          })}
        />
        <Spacer y={1.5} />
        <Text onClick={handleExtraData}>
          {extraData ? "No Agregar Notas" : "Agregar Notas"}
        </Text>
        <Spacer y={1} />
        {extraData && (
          <Comments
            categoryId={categoryId}
            register={register}
            comments={comments}
            setComments={setComments}
            resetField={resetField}
            getValues={getValues}
          />
        )}
        <Input aria-labelledby="submit" type="submit" />
        <Spacer y={1} />
      </form>
    </Modal>
  );
};
