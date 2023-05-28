import { Button, Card, Text } from "@nextui-org/react";
import { useState } from "react";
import { round, remove } from "lodash";
import { capitalize } from "lodash";
import { useDispatch } from "react-redux";
import { startNewDataDelete } from "@/redux/slices/app/thunks";
import { TypeMovement } from "@/utils/Constants";

export const CategoryData = ({
  movement: { id, cloudId, title, amount, type, date },
  comments,
}) => {
  const [fullDataView, setFullDataView] = useState([]);
  const dispatch = useDispatch();

  const handleFullDataView = (id) => {
    if (fullDataView.includes(id)) {
      const newData = [...fullDataView];
      remove(newData, (currentId) => currentId === id);
      setFullDataView(newData);
    } else {
      setFullDataView([id, ...fullDataView]);
    }
  };

  const getExtendedDate = (miliSecTime) => {
    const date = new Date(miliSecTime);
    return date.toLocaleString("es-CO", {
      dateStyle: "full",
      timeStyle: "short",
    });
  };

  const getShortedDate = (miliSecTime) => {
    const refToday = new Date().toLocaleDateString();
    const refYesterday = new Date();
    refYesterday.setDate(refYesterday.getDate() - 1);
    const refThisWeek = new Date();
    refThisWeek.setDate(refThisWeek.getDate() - 7);

    const currentDate = new Date(miliSecTime);

    switch (true) {
      case currentDate.toLocaleDateString() === refToday:
        return "Hoy";
      case currentDate.toLocaleDateString() ===
        refYesterday.toLocaleDateString():
        return "Ayer";
      case currentDate > refThisWeek:
        return capitalize(
          currentDate
            .toLocaleString("es-CO", {
              dateStyle: "full",
            })
            .split(",")[0]
        );
      default:
        return currentDate.toLocaleString("es-CO", {
          dateStyle: "short",
        });
    }
  };

  const getCommentDate = (miliSecTime) => {
    const date = new Date(miliSecTime);
    return date.toLocaleString("es-CO", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const formatNumb = (number) =>
    number >= 10000 ? `${Math.round(number / 100) / 10}k` : round(amount, 2);

  const formatTitle = (title, limit) => {
    const suffix = title.length > limit ? "..." : "";
    return title.substring(0, limit) + suffix;
  };

  const backgroundColor = (type) => {
    if (type === "expense")
      return "linear-gradient(45deg, #F55178 0%, #8F2B7F 100%)";
    return "linear-gradient(45deg, #00ADB4 0%, #00669B 100%)";
  };

  const editCard = () => {
    console.log("aaaaaaaaa");
  };

  const deleteMovement = () => {
    dispatch(startNewDataDelete(TypeMovement, cloudId));
  };

  return (
    <Card
      isHoverable
      isPressable
      variant="shadow"
      css={{
        mw: "400px",
        margin: "auto",
        marginTop: "8px",
        marginBottom: "8px",
        background: backgroundColor(type),
      }}
      onPress={() => handleFullDataView(id)}
    >
      <Card.Body>
        {fullDataView.includes(id) ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              width: "100%",
            }}
          >
            <div>
              <Text h4 b style={{ textAlign: "center" }}>
                {title}
              </Text>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 3.5fr",
                justifyItems: "center",
              }}
            >
              <Text>{type === "expense" ? "Gasto :" : "Ingreso :"} </Text>
              <Text>S/. {amount}</Text>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 3.5fr",
                justifyItems: "center",
              }}
            >
              <Text>Fecha :</Text>
              <Text>{getExtendedDate(date)}</Text>
            </div>
            <div style={{ marginTop: "15px" }}>
              {comments && (
                <div>
                  {comments.title && <Text>{comments.title}</Text>}
                  <Text>{!comments.cloudId && "*"}</Text>
                  {comments.data?.map(({ comment, isChecked, date }, id) => (
                    <div
                      key={id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{comment}</Text>
                      <Text>{getCommentDate(date)}</Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Card.Divider />
            <Card.Footer>
              <Button size="sm" onPress={deleteMovement}>
                Borrar
              </Button>
            </Card.Footer>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>{formatTitle(title, 15)}</Text>
            <Text>S/. {formatNumb(amount)}</Text>
            <Text>{getShortedDate(date)}</Text>
            {comments?.commentsData?.some((comment) => comment.isChecked) && (
              <Text>*</Text>
            )}
            {!cloudId && <Text>!</Text>}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
