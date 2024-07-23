import AxiosInstance from "./AxiosInstance";

const AlbumAxiosApi = {
  albumReg: async (saveData) => {
    return await AxiosInstance.post("/album/save", saveData);
  },

  getImages: async (email) => {
    return await AxiosInstance.get("/album/images", {
      params: {
        email: email,
      },
    });
  },

  deleteImage: async (email, imgUrl) => {
    return await AxiosInstance.delete("/album/delete", {
      params: {
        email: email,
        imgUrl: imgUrl,
      },
    });
  },

  getCustomer: async (email) => {
    return await AxiosInstance.get("/member/customer", {
      params: {
        email: email,
      },
    });
  },

  getPayment: async (saveData) => {
    return await AxiosInstance.post("/payment/complete", saveData);
  },

  getAmount: async (email) => {
    return await AxiosInstance.get("/payment/amount", {
      params: {
        email: email,
      },
    });
  },

  // getPaymentTema: async (saveData) => {
  //   return await AxiosInstance.post("/paymenttema/tema", saveData);
  // },

  getTemaLoad: async (email) => {
    return await AxiosInstance.get("/paymenttema/temaload", {
      params: {
        email: email,
      },
    });
  },
};
export default AlbumAxiosApi;
