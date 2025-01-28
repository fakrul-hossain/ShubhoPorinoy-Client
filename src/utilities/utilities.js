import axios from "axios";


export const SaveUser = async (userData) => {
  try {
    await axios.post(`http://localhost:5000/register?/${userData?.email}`, {
      name: userData?.displayName,
      image: userData?.photoURL,
      email: userData?.email,
    });
  } catch (error) {
    console.log(error.message);
}
};