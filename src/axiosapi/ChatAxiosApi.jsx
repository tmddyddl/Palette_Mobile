import AxiosInstance from "./AxiosInstance";
import Common from "../common/Common";

const ChatAxiosApi = {
  chatMessagesSave: async (roomId, sender, receiver, message) => {
    console.log("receiver" + receiver);
    const chat = {
      roomId: roomId,
      sender: sender,
      receiver: receiver,
      message: message,
    };
    return await AxiosInstance.post("/chat/messages", chat);
  },

  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await AxiosInstance.get(
      Common.PALLETE_DOMAIN + `/chat/room/${roomId}`
    );
  },

  // // 채팅방 목록 보기
  // chatList: async (email, firstEmail, secondEmail) => {
  //   console.log("첫이메일:  " + firstEmail + "이메일:" + email);
  //   console.log("두번째 이메일" + secondEmail);
  //   const emailcheck = {
  //     email: email,
  //     firstEmail: firstEmail,
  //     receiver: secondEmail,
  //   };
  //   return await AxiosInstance.get(
  //     Common.PALLETE_DOMAIN + "/chat/list",
  //     emailcheck
  //   );
  // },

  chatList: async (email, firstEmail, secondEmail, roomId) => {
    return await AxiosInstance.get(Common.PALLETE_DOMAIN + "/chat/list", {
      params: {
        email: email,
        firstEmail: firstEmail,
        receiver: secondEmail,
        roomId: roomId,
      },
    });
  },

  chatCreate: async (name, sender, receiver) => {
    const chat = {
      name: name,
      sender: sender,
      receiver: receiver,
    };
    return await AxiosInstance.post(Common.PALLETE_DOMAIN + "/chat/new", chat);
  },

  pastChatDetail: async (roomId) => {
    return await AxiosInstance.get(`/chat/messages/${roomId}`);
  },

  // 커플 계정 뽑아오기
  coupleEmail: async (email) => {
    const member = {
      email: email,
    };
    return await AxiosInstance.post("/chat2/coupleEmail", member);
  },
  // 채팅룸 삭제하기
  deleteChatRoom: async (roomId) => {
    try {
      console.log("Deleting chat room:", roomId);
      const response = await AxiosInstance.delete(`/chatroom/${roomId}`);
      console.log("Delete response:", response);
      return response.data;
    } catch (error) {
      console.error("Error deleting chat room:", error);
      throw error;
    }
  },
};

export default ChatAxiosApi;
