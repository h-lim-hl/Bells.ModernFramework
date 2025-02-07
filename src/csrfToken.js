import axios from "axios";

export const useCsrfToken = () => {
  
  async function getCsrfToken () {
    try{
      const res = await axios.get(`${import.meta.VITE_API_URL}/csrf`,
                                    { withCredentials : true});
      return res.data.getCsrfToken;
    } catch (err) {
      console.log("Error getting CSRF Token: ", err);
    }
  }

  return {
    getCsrfToken
  };
};