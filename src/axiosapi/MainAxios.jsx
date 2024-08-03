import AxiosInstance from "./AxiosInstance";
const MainAxios = {
  //닉네임 찾기
  searchNickName: async (email, coupleName) => {
    return await AxiosInstance.get(
      `/main/searchNickName?email=${email}&coupleName=${coupleName}`
    );
  },
  //디데이 검색.
  searchDday: async (coupleName) => {
    return await AxiosInstance.get(`/main/searchDday?coupleName=${coupleName}`);
  },
  //디데이 값 저장.
  saveDday: async (coupleName, dDay) => {
    return await AxiosInstance.get(
      `/main/saveDday?coupleName=${coupleName}&dDay=${dDay}`
    );
  },
  //커플 검색에 맞는 리스트 값.
  visitCoupleNameSearchList: async (coupleName) => {
    return await AxiosInstance.get(
      `/main/visitCoupleNameSearchList?coupleName=${coupleName}`
    );
  },
  //사용자의 성별 가져오기
  mySexSearch: async (email) => {
    return await AxiosInstance.get(`main/mySexSearch?email=${email}`);
  },
};
export default MainAxios;
