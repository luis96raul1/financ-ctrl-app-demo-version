import { CategoryData } from "@/components/data/CategoryData";
import { Layout } from "@/components/layouts";
import { LoadingModal } from "@/components/modals/LoadingModal";
import { NewMovementModal } from "@/components/modals/NewMovementModal";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import {
  selectCategories,
  selectComments,
  selectMovements,
  status,
} from "@/redux/slices/mainData";
import { NotLoggedStatus } from "@/utils/Constants";
import { Busy } from "@/utils/Constants";
import { Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

export default function CategoryView() {
  const [movementType, setMovementType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const processingStatus = useSelector(status);
  const router = useRouter();

  const { categoryId } = router.query;

  const categoriesList = useSelector(selectCategories);
  const movementsList = useSelector(selectMovements);
  const commentsList = useSelector(selectComments);

  const { authStatus } = useCheckAuth();

  useEffect(() => {
    if (authStatus === NotLoggedStatus) router.push("/auth/login");
  }, [authStatus, router]);

  const category = useMemo(
    () =>
      categoriesList.filter(
        (category) => category.id === parseInt(categoryId)
      )[0] || {},
    [categoriesList, categoryId]
  );

  const movements = useMemo(
    () =>
      movementsList.filter(
        (movement) => movement.categoryId === parseInt(categoryId)
      ),
    [movementsList, categoryId]
  );

  const comments = useMemo(
    () =>
      commentsList.filter(
        (comment) => comment.categoryId === parseInt(categoryId)
      ),
    [commentsList, categoryId]
  );

  const changeModalStatus = (type) => {
    setModalVisible(!modalVisible);
    setMovementType(type);
  };

  return (
    <Layout title={category?.name} navbar backNavigation>
      <div>
        <div>
          <Text>Filtro de movimientos</Text>
          <Text>Crear etiqueta</Text>
          <Text onClick={() => changeModalStatus("expense")}>
            Agregar gasto
          </Text>
          <Text onClick={() => changeModalStatus("income")}>
            Agregar ingreso
          </Text>
        </div>

        <NewMovementModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          categoryId={category.id}
          categoryCloudId={category.cloudId}
          movementType={movementType}
        />

        <LoadingModal open={processingStatus === Busy} />

        <div style={{ height: "80vh", overflow: "auto" }}>
          {movements &&
            movements.map((movement) => (
              <CategoryData
                key={movement.id}
                movement={movement}
                comments={
                  comments
                    ? comments.filter(
                        (comment) => comment.movementId === movement.id
                      )[0]
                    : null
                }
              />
            ))}
        </div>
      </div>
    </Layout>
  );
}
