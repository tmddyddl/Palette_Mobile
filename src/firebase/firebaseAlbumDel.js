import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebaseAlbum"; // Firebase 설정 파일 임포트

const deleteImageFromFirebase = async (imageUrl) => {
  const storageRef = ref(storage, imageUrl); // 이미지의 Firebase Storage 경로 설정
  try {
    await deleteObject(storageRef);
    console.log("Image deleted successfully from Firebase Storage");
  } catch (error) {
    console.error("Error deleting image from Firebase Storage:", error);
    throw error; // 에러 처리를 위해 throw
  }
};

export default deleteImageFromFirebase;
