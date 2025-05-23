import { useState } from "react";
import { createHotel } from "../../services/api.jsx";

const useAddHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const addHotel = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("category", data.category);
      formData.append("price", Number(data.price));
      formData.append("description", data.description);
      formData.append("department", data.department);
      if (data.imageHotel) formData.append("imageHotel", data.imageHotel);

      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await createHotel(formData);

      if (!response.data?.hotel) {
        throw new Error(response.data.message || "Error No se pudo crear el hotel");
      }else{
         return response.data.message;
      }

    } catch (err) {
      setError(err.message || "Ocurrió un error al crear el hotel");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addHotel, loading, error, successMessage };
};

export default useAddHotel;