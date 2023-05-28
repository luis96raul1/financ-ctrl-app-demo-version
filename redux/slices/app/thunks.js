import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { sortBy, groupBy, upperFirst } from "lodash";
import {
  Busy,
  TypeCategory,
  TypeComment,
  TypeMovement,
} from "../../../utils/Constants";
import {
  deleteElement,
  savedInCloudData,
  saveGottenFromCloud,
  setDataStatus,
} from "../mainData";
import { setGlobalIdCounter } from "../appConfigurations";

export const startNewDataBackUp = (
  type,
  { id, cloudId, ...newData },
  parentCloudId
) => {
  return (dispatch, getState) => {
    if (!parentCloudId) return;
    const { uid } = getState().sessionData.sessionStatus;
    const newDoc = doc(collection(FirebaseDB, `${uid}/FinanceData/${type}`));
    const data = { id, ...newData };
    if (type !== TypeCategory) data.belongsTo = parentCloudId;
    setDoc(newDoc, data)
      .then(() =>
        dispatch(
          savedInCloudData({
            type,
            localId: id,
            cloudId: newDoc.id,
          })
        )
      )
      .catch((error) => {
        console.log(`error en startNewDataBackUp (${type}):`, error);
        dispatch(setDataStatus({ status: Error }));
      });
  };
};

export const startNewDataDelete = (type, cloudId) => {
  return (dispatch, getState) => {
    const { uid } = getState().sessionData.sessionStatus;
    const newDoc = doc(FirebaseDB, `${uid}/FinanceData/${type}`, cloudId);
    deleteDoc(newDoc)
      .then(() => dispatch(deleteElement({ type, cloudId })))
      .catch((error) => console.log(`It couldn't be deleted error: ${error}`));
  };
};

export const startNewDataRequest = (type) => {
  return (dispatch, getState) => {
    const { uid } = getState().sessionData.sessionStatus;
    if (!uid) return;
    const newDoc = collection(FirebaseDB, `${uid}/FinanceData/${type}`);
    getDocs(newDoc)
      .then((response) => {
        if (response.empty) {
          dispatch(setGlobalIdCounter({ data: [{ id: 0 }], type }));
          dispatch(saveGottenFromCloud({ data: [], type }));
        } else {
          const data = [];
          response.forEach((doc) =>
            data.push({ cloudId: doc.id, ...doc.data() })
          );
          const sortedData = sortBy(data, (el) => el.date).reverse();
          dispatch(setGlobalIdCounter({ data: sortedData, type }));
          dispatch(saveGottenFromCloud({ data: sortedData, type }));

          // dispatch(updateDataStatus({ type }));
        }
      })
      .catch((error) => {
        console.log(`error en startNewDataRequest: ${type}`, error);
        dispatch(setDataStatus({ status: Error }));
      });
  };
};

export const startSyncMissingData = (type, data, parentIds) => {
  return (dispatch, getState) => {
    dispatch(setDataStatus({ status: Busy }));

    data.forEach((element, index, all) => {
      let parentId = true;

      if (type === TypeMovement)
        parentId = parentIds.find((parent) => parent.id === element.categoryId);
      if (type === TypeComment)
        parentId = parentIds.find((parent) => parent.id === element.movementId);

      dispatch(
        startNewDataBackUp(type, element, parentId, index + 1 === all.length)
      );
    });
  };
};
