import axios from "axios";
import Common from "../common/Common";
const LoginAxios = {
  // 회원가입
  memberSignUp: async (
    email,
    pwd,
    name,
    registrationNumber,
    nickName,
    coupleName
  ) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name,
      registrationNumber: registrationNumber,
      nickName: nickName,
      coupleName: coupleName,
    };
    return await axios.post(Common.PALLETE_DOMAIN + "/auth/signup", member);
  },
  // 아이디 중복확인
  emailIsExist: async (email) => {
    const emailObject = {
      email: email,
    };
    return await axios.post(Common.PALLETE_DOMAIN + "/auth/email", emailObject);
  },
  // 커플이름 중복확인
  coupleNameSearch: async (coupleName) => {
    const couple = {
      coupleName: coupleName,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/coupleNameSearch",
      couple
    );
  },
  // 커플이름 등록
  coupleNameInsert: async (email, coupleName) => {
    const couple = {
      email: email,
      coupleName: coupleName,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/coupleNameInsert",
      couple
    );
  },
  // 커플에 계정 추가 등록
  secondCoupleNameInsert: async (email, coupleName) => {
    const couple = {
      email: email,
      coupleName: coupleName,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/secondCoupleNameInsert",
      couple
    );
  },
  // 커플이름 중복일 경우 짝 이메일 확인
  coupleEmailCheck: async (coupleName) => {
    const couple = {
      coupleName: coupleName,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/coupleEmailCheck",
      couple
    );
  },
  // 로그인
  login: async (email, pwd) => {
    const member = {
      email: email,
      pwd: pwd,
    };
    return await axios.post(Common.PALLETE_DOMAIN + "/auth/login", member);
  },
  //계정으로 커플이름 search
  emailToCoupleNameSearch: async (email) => {
    const member = {
      email: email,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/emailToCoupleNameSearch",
      member
    );
  },
  //두번째 커플 계정 존재 확인
  secondEmailExist: async (couple) => {
    const member = {
      couple: couple,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/secondEmailExist",
      member
    );
  },
  //아이디 찾기
  findIdResult: async (name, registrationNumber) => {
    const member = {
      name: name,
      registrationNumber: registrationNumber,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/findIdResult",
      member
    );
  },
  //패스워드 찾기
  findPwdResult: async (email, name, registrationNumber) => {
    const member = {
      email: email,
      name: name,
      registrationNumber: registrationNumber,
    };
    return await axios.post(
      Common.PALLETE_DOMAIN + "/auth/findPwdResult",
      member
    );
  },
  //이미 커플이 완성되어 있는지 확인.
  isExistCouple: async (coupleName) => {
    return await axios.get(
      Common.PALLETE_DOMAIN + `/auth/isExistCouple?coupleName=${coupleName}`
    );
  },
};
export default LoginAxios;
