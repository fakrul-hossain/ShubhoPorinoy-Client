import axios from "axios";


export const SaveUser = async (userData) => {
  try {
    await axios.post(`https://shubho-porinoy-server.vercel.app/register?/${userData?.email}`, {
      name: userData?.displayName,
      image: userData?.photoURL,
      email: userData?.email,
    });
  } catch (error) {
    console.log(error.message);
}
};