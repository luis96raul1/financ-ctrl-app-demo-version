import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Button } from "@nextui-org/react";
import { Layout } from "@/components/layouts";

import {
  selectCategories,
  setDataStatus,
  status,
} from "../redux/slices/mainData";
import { sessionStatus } from "../redux/slices/authConfigurations";
import { startNewDataRequest } from "../redux/slices/app/thunks";
import {
  Busy,
  TypeCategory,
  TypeComment,
  Lazy,
  TypeMovement,
  NotLoggedStatus,
} from "../utils/Constants";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { NewCategoryModal } from "@/components/modals/NewCategoryModal";
import Image from "next/image";
import { LoadingModal } from "@/components/modals/LoadingModal";
import { useRouter } from "next/router";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSettingsVisible, setModalSettingsVisible] = useState(false);

  const categories = useSelector(selectCategories);
  const processingStatus = useSelector(status);
  const { userName, photoURL } = useSelector(sessionStatus);

  const dispatch = useDispatch();
  const router = useRouter();

  const { authStatus } = useCheckAuth();

  useEffect(() => {
    if (authStatus === NotLoggedStatus) router.push("/auth/login");
  }, [authStatus, router]);

  useEffect(() => {
    if (categories.length === 0 && processingStatus === Lazy) {
      dispatch(
        setDataStatus({
          status: Busy,
          tasks: [TypeCategory, TypeMovement, TypeComment],
        })
      );
      dispatch(startNewDataRequest(TypeCategory));
      dispatch(startNewDataRequest(TypeMovement));
      dispatch(startNewDataRequest(TypeComment));
    }
  }, []);

  const changeModalSettings = () => {
    setModalSettingsVisible(!modalSettingsVisible);
  };

  return (
    <Layout navbar>
      <div
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p>Hola,</p>
          <p>{userName}</p>
        </div>
        {photoURL ? (
          <Image
            onClick={changeModalSettings}
            src={photoURL}
            alt="User Image"
            width={80}
            height={80}
          />
        ) : (
          <div onClick={changeModalSettings}>image</div>
        )}
      </div>

      <SettingsModal
        modalVisible={modalSettingsVisible}
        changeModalSettings={changeModalSettings}
      />

      <LoadingModal
        message="Cargando información"
        open={processingStatus === Busy}
      />

      <NewCategoryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {categories?.map(({ name, id, cloudId }) => (
          <Button
            key={id}
            color={"gradient"}
            onPress={() => router.push(`/categoryView/${id}`)}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <p>{name}</p>
            {!cloudId && <p>!</p>}
          </Button>
        ))}
        <Button
          style={{ marginTop: "10px" }}
          color={"gradient"}
          onPress={() => setModalVisible(true)}
        >
          Agregar nueva categoria
        </Button>
      </div>
    </Layout>
  );
}
