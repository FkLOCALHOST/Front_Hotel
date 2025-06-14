import axios from "axios";

const apiHotel = axios.create({
  baseURL: "http://127.0.0.1:3005/hotelManagerSystem/v1",
  timeout: 9000,
});

apiHotel.interceptors.request.use(
  (config) => {
    if (
      !config.url.includes("/auth/login") &&
      !config.url.includes("/auth/register") &&
      !config.url.includes("/hotel/getHotels") &&
      !config.url.includes("/hotel/searchHotels") &&
      !config.url.includes("/room/getRooms") &&
      !config.url.includes("/room/searchRooms") &&
      !config.url.includes("/event/getEvents") &&
      !config.url.includes("/event/searchEvent")
    ) {
      const userStr = localStorage.getItem("User");

      if (!userStr) return Promise.reject(new Error("No autorizado"));

      try {
        const user = JSON.parse(userStr);
        const token = user.userDetails?.token;

        if (!token) return Promise.reject(new Error("No autorizado"));

        const parts = token.split(".");
        if (parts.length !== 3) throw new Error("Token inválido");

        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now) {
          localStorage.clear();
          return Promise.reject(new Error("Token expirado"));
        }

        config.headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        localStorage.clear();
        console.log(`error: ${error}`);
        return Promise.reject(new Error("Token inválido"));
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (data) => {
  try {
    // Si data es FormData, axios lo maneja automáticamente
    return await apiHotel.post("/auth/register", data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    });
  } catch (e) {
    return { error: true, e };
  }
};

export const login = async (data) => {
  try {
    const response = await apiHotel.post("/auth/login", data);
    if (response.data && response.data.token) {
      localStorage.setItem("User", JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const createAmenity = async (data) => {
  try {
    return await apiHotel.post("/amenity/createAmenity", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getAmenities = async () => {
  try {
    return await apiHotel.get("/amenity/getAmenity");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getAmenityById = async (uid) => {
  try {
    return await apiHotel.get(`/amenity/getAmenityById/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteAmenity = async (uid) => {
  try {
    return await apiHotel.patch(`/amenity/deleteAmenity/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateAmenity = async (uid, data) => {
  try {
    return await apiHotel.patch(`/amenity/updateAmenity/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const createEvent = async (data) => {
  try {
    return await apiHotel.post("/event/createEvent", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getEvents = async () => {
  try {
    return await apiHotel.get("/event/getEvents");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateEvent = async (eid, data) => {
  try {
    return await apiHotel.put(`/event/updateEvent/${eid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteEvent = async (eid) => {
  try {
    return await apiHotel.delete(`/event/deleteEvent/${eid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const searchEventByName = async (name) => {
  try {
    return await apiHotel.get(`/event/searchEvent/${name}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const searchEvent = async ({
  search = "",
  place = "",
  maxPrice = "",
  date = "",
  page = 1,
  limit = 8,
}) => {
  try {
    const desde = (page - 1) * limit;
    const params = new URLSearchParams();

    params.append("search", search);
    if (place) params.append("place", place);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (date) params.append("date", date);
    params.append("desde", desde.toString());
    params.append("limite", limit.toString());

    return await apiHotel.get(`/event/searchEvent?${params.toString()}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const createHotel = async (data) => {
  try {
    return await apiHotel.post("/hotel/createHotel", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getHotels = async () => {
  try {
    return await apiHotel.get("/hotel/getHotels");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getHotelById = async (uid) => {
  try {
    return await apiHotel.get(`/hotel/getHotelById/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateHotel = async (uid, data) => {
  try {
    return await apiHotel.patch(`/hotel/updateHotel/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteHotel = async (uid) => {
  try {
    return await apiHotel.patch(`/hotel/deleteHotel/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const searchHotelsService = async ({
  search = "",
  page = 1,
  limit = 8,
  category,
  maxPrice,
  department,
}) => {
  try {
    const desde = (page - 1) * limit;
    const params = new URLSearchParams();
    params.append("search", search);
    params.append("desde", desde.toString());
    params.append("limite", limit.toString());
    if (category) params.append("category", category);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (department) params.append("department", department);

    return await apiHotel.get(`/hotel/searchHotels?${params.toString()}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUserById = async (uid) => {
  try {
    return await apiHotel.get(`/findUser/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUsers = async () => {
  try {
    return await apiHotel.get("/findUser/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteUser = async (uid) => {
  try {
    return await apiHotel.patch(`/deleteUser/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updatePassword = async (uid, data) => {
  try {
    return await apiHotel.patch(`/user/updatePassword/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateUser = async (uid, data) => {
  try {
    return await apiHotel.put(`/user/updateUser/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updatePictureProfile = async (uid, data) => {
  try {
    return await apiHotel.patch(`/updatePictureProfile/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUserLogged = async () => {
  try {
    return await apiHotel.get("/user/getUserLog");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getRooms = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const desde = (page - 1) * limit;
    const params = new URLSearchParams();
    params.append("limite", limit);
    params.append("desde", desde);
    const response = await apiHotel.get(`/room/getRooms?${params.toString()}`);
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const searchRooms = async ({ search = "", page = 1, limit = 10 }) => {
  try {
    const desde = (page - 1) * limit;
    const params = new URLSearchParams();
    params.append("search", search);
    if (capacity) params.append("capacity", capacity);
    if (maxPrice) params.append("maxPrice", maxPrice);
    params.append("desde", desde.toString());
    params.append("limite", limit.toString());
    return await apiHotel.get(`/room/searchRooms?${params.toString()}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const createRoom = async (data) => {
  try {
    const response = await apiHotel.post("/room/createRoom", data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Error en la petición";
    return { error: true, message };
  }
};

export const getReservation = async ({ page = 1, limit = 10, search = "" } = {}) => {
  try {
    const desde = (page - 1) * limit;
    const params = new URLSearchParams();
    params.append("limite", limit);
    params.append("desde", desde);
    if (search) params.append("search", search);
    return await apiHotel.get(`/reservation/getReservations?${params.toString()}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const createReservation = async (data) => {
  try {
    const response = await apiHotel.post(
      "/reservation/createReservation",
      data
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Error en la petición";
    return { error: true, message };
  }
};

export const addFavHotel = async (uid, favHotel) => {
  try {
    return await apiHotel.patch(`/user/addFavHotel/${uid}`, { favHotel });
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const removeFavHotel = async (uid, favHotel) => {
  try {
    return await apiHotel.patch(`/user/removeFavHotel/${uid}`, { favHotel });
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getRoomById = async (uid) => {
  try {
    return await apiHotel.get(`/room/getRoomById/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUnavalilableDates = async (uid) => {
  try {
    return await apiHotel.get(`/room/getUnavalilableDates/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateRoom = async (uid, data) => {
  try {
    return await apiHotel.patch(`/room/updateRoom/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteRoom = async (uid) => {
  try {
    return await apiHotel.patch(`/room/deleteRoom/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getReports = async () => {
  try {
    return await apiHotel.get("/reservation/getStatsGenerales");
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

export const getReservationReceipt = async (uid) => {
  try {
    return await apiHotel.get(`/reservation/getReservationReceipt/${uid}`, {
      responseType: "blob",
    });
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

export const updateReservation = async (uid, data) => {
  try {
    return await apiHotel.patch(`/reservation/updateReservation/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
}

export const getReservationById = async (uid) => {
  try {
    return await apiHotel.get(`/reservation/getReservationById/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
}