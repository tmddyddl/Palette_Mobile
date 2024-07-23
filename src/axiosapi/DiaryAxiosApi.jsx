import AxiosInstance from "./AxiosInstance";

const AxiosApi = {
  // 다이어리 저장
  diaryReg: async (saveData) => {
    return await AxiosInstance.post("/diary/save", saveData);
  },

  // 커플 다이어리 조회
  getCoupleDiaries: async (email) => {
    return await AxiosInstance.get("/diary/load", {
      params: {
        email: email,
      },
    });
  },

  // 다이어리 삭제
  deleteDiary: async (email, date) => {
    return await AxiosInstance.delete("/diary/delete", {
      params: { email, date },
    });
  },
};
export default AxiosApi;
