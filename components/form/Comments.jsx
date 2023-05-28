import { Button, Input, Spacer } from "@nextui-org/react";

export const Comments = ({
  register,
  comments,
  setComments,
  resetField,
  getValues,
}) => {
  const addNewComment = () => {
    const currentComment = {
      comment: getValues("comment").trim(),
      date: Date.now(),
    };
    setComments((prev) => [currentComment, ...prev]);
    resetField("comment");
  };

  return (
    <>
      <Input
        bordered
        aria-labelledby="commentTitle"
        // type="number"
        labelPlaceholder="Título"
        // status={errors.amount ? "error" : null}
        {...register("commentTitle")}
      />
      <Spacer y={1.5} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Input
          bordered
          aria-labelledby="comment"
          labelPlaceholder="Comentario"
          {...register("comment")}
        />
        <Button onPress={addNewComment}>+</Button>
      </div>
      <Spacer y={1.5} />
      {comments.map(({ comment }, id) => (
        <div key={id}>{comment}</div>
      ))}
      <Spacer y={1.5} />
    </>
  );
};
