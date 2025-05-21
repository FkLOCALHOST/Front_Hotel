import axios from "axios";

const apiHotel = axios.create({
  baseURL: "http://localhost:3005/hotelManagerSystem/v1",
  timeout: 3000,
});

apiHotel.interceptors.request.use(
  (config) => {
    // Excluir login y registro
    if (
      !config.url.includes("/auth/login") &&
      !config.url.includes("/auth/register") &&
      !config.url.includes("/hotel/getHotels") &&
      !config.url.includes("/hotel/searchHotels")
    ) {
      const userDetails = localStorage.getItem("User");

      if (userDetails) {
        const token = JSON.parse(userDetails).token;

        if (token) {
          // Verificamos si está expirado
          const [, payloadBase64] = token.split(".");
          if (payloadBase64) {
            try {
              const payload = JSON.parse(atob(payloadBase64));
              const now = Math.floor(Date.now() / 1000);
              if (payload.exp < now) {
                localStorage.clear();
                // window.location.href = "/auth/login";
                return Promise.reject(new Error("Token expirado"));
              }
            } catch (e) {
              localStorage.clear();
              //   window.location.href = "/auth/login";
              return Promise.reject(new Error("Token inválido"));
            }
          }
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        // window.location.href = "/auth/login";
        return Promise.reject(new Error("No autorizado"));
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const register = async (data) => {
  try {
    return await apiHotel.post("/auth/register", data);
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

// Amenity
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

// Event
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

// Hotel
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
}) => {
  try {
    const desde = (page - 1) * limit;
    const params = new URLSearchParams();
    params.append("search", search);
    params.append("desde", desde.toString());
    params.append("limite", limit.toString());
    return await apiHotel.get(`/hotel/searchHotels?${params.toString()}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// User
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
    return await apiHotel.patch(`/updatePassword/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateUser = async (uid, data) => {
  try {
    return await apiHotel.put(`/updateUser/${uid}`, data);
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

export const getRooms = async () => {
  try {
    return await apiHotel.get("/room/getRooms");
  } catch (error) {
    return { error: true, message: error.message };
  }
};
