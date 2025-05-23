import { useState } from "react";
import { createHotel } from "../../services/api.jsx";

const useAddHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addHotel = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("addres", data.addres);
      formData.append("category", data.category);
      formData.append("price", Number(data.price));
      formData.append("description", data.description);
      formData.append("department", data.department);
      if (data.imageHotel) formData.append("imageHotel", data.imageHotel);

      const response = await createHotel(formData);
      if (response.error) throw new Error(response.message);
      return response.data;
    } catch (err) {
      setError(err.message || "Ocurrió un error al crear el hotel");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addHotel, loading, error };
};

export default useAddHotel;