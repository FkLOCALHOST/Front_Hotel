import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/forms/hotelForms.css";
import useAddHotel from "../../shared/hooks/useAddHotel";
import useEditHotel from "../../shared/hooks/useEditHotel";
import useHotelById from "../../shared/hooks/useHotelById";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import { useToast } from "@chakra-ui/react";
import {
  validateHotelName,
  validateHotelNameMessage,
  validateEmail,
  validateEmailMessage,
  validatePhone,
  validatePhoneMessage,
  validateAddress,
  validateAddressMessage,
  validateCategory,
  validateCategoryMessage,
  validatePrice,
  validatePriceMessage,
  validateDescription,
  validateDescriptionMessage,
  validateDepartment,
  validateDepartmentMessage,
} from "../../shared/validators";

const HotelForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = props.editMode || location.state?.editMode || false;
  const hotelId = props.hotelId || location.state?.hotelId || null;
  const onSubmit = props.onSubmit || null;
  const onCancel = props.onCancel || null;
  const toast = useToast();

  const { hotel, loading: loadingHotel } = useHotelById(editMode ? hotelId : null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "", 
    category: "",
    price: "",
    description: "",
    department: "",
    imageHotel: null,
  });

  const [formState, setFormState] = useState({
    name: { value: "", isValid: false, showError: false },
    email: { value: "", isValid: false, showError: false },
    phone: { value: "", isValid: false, showError: false },
    address: { value: "", isValid: false, showError: false },
    category: { value: "", isValid: false, showError: false },
    price: { value: "", isValid: false, showError: false },
    description: { value: "", isValid: false, showError: false },
    department: { value: "", isValid: false, showError: false },
  });

  const [originalImage, setOriginalImage] = useState(null);
  useEffect(() => {
    if (editMode && hotel) {
      const newForm = {
        name: hotel.name || "",
        email: hotel.email || "",
        phone: hotel.phone || "",
        address: hotel.address || "", 
        category: hotel.category || "",
        price: hotel.price || "",
        description: hotel.description || "",
        department: hotel.department || "",
        imageHotel: null,
      };
      setForm(newForm);
      

      setFormState({
        name: { value: newForm.name, isValid: validateHotelName(newForm.name), showError: false },
        email: { value: newForm.email, isValid: validateEmail(newForm.email), showError: false },
        phone: { value: newForm.phone, isValid: validatePhone(newForm.phone), showError: false },
        address: { value: newForm.address, isValid: validateAddress(newForm.address), showError: false },
        category: { value: newForm.category, isValid: validateCategory(newForm.category), showError: false },
        price: { value: newForm.price, isValid: validatePrice(newForm.price), showError: false },
        description: { value: newForm.description, isValid: validateDescription(newForm.description), showError: false },
        department: { value: newForm.department, isValid: validateDepartment(newForm.department), showError: false },
      });
      
      setOriginalImage(hotel.imageHotel || null);
    }
  }, [editMode, hotel]);
  const { addHotel, loading: loadingAdd, error: errorAdd } = useAddHotel();
  const { editHotel, loading: loadingEdit, error: errorEdit } = useEditHotel();

  useEffect(() => {
    if (errorAdd) {
      toast({
        title: "Error al crear hotel",
        description: errorAdd,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [errorAdd, toast]);

  useEffect(() => {
    if (errorEdit) {
      toast({
        title: "Error al editar hotel", 
        description: errorEdit,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [errorEdit, toast]);const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (formState[name]) {
        let isValid = false;
        switch (name) {
          case "name":
            isValid = validateHotelName(value);
            break;
          case "email":
            isValid = validateEmail(value);
            break;
          case "phone":
            isValid = validatePhone(value);
            break;
          case "address":
            isValid = validateAddress(value);
            break;
          case "category":
            isValid = validateCategory(value);
            break;
          case "price":
            isValid = validatePrice(value);
            break;
          case "description":
            isValid = validateDescription(value);
            break;
          case "department":
            isValid = validateDepartment(value);
            break;
          default:
            break;
        }
        
        setFormState((prevState) => ({
          ...prevState,
          [name]: {
            ...prevState[name],
            value,
            isValid,
            showError: prevState[name].showError && !isValid,
          },
        }));
      }
    }
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "name":
        isValid = validateHotelName(value);
        break;
      case "email":
        isValid = validateEmail(value);
        break;
      case "phone":
        isValid = validatePhone(value);
        break;
      case "address":
        isValid = validateAddress(value);
        break;
      case "category":
        isValid = validateCategory(value);
        break;
      case "price":
        isValid = validatePrice(value);
        break;
      case "description":
        isValid = validateDescription(value);
        break;
      case "department":
        isValid = validateDepartment(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = 
      formState.name.isValid &&
      formState.email.isValid &&
      formState.phone.isValid &&
      formState.address.isValid &&
      formState.category.isValid &&
      formState.price.isValid &&
      formState.description.isValid &&
      formState.department.isValid;

    if (!isFormValid) {
      const newFormState = { ...formState };
      Object.keys(newFormState).forEach(field => {
        if (!newFormState[field].isValid) {
          newFormState[field].showError = true;
        }      });
      setFormState(newFormState);
      toast({
        title: "Errores en el formulario",
        description: "Por favor corrige los errores antes de continuar.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const priceValue = Number(form.price);
    let result;

    if (editMode && hotel && hotel.uid) {
      let dataToSend;
      if (form.imageHotel instanceof File) {
        dataToSend = new FormData();
        dataToSend.append("name", form.name || "");
        dataToSend.append("email", form.email || "");
        dataToSend.append("phone", form.phone || "");
        dataToSend.append("address", form.address || "");  
        dataToSend.append("category", form.category || "");
        dataToSend.append("price", priceValue);
        dataToSend.append("description", form.description || "");
        dataToSend.append("department", form.department || "");
        dataToSend.append("imageHotel", form.imageHotel);
      } else {
        dataToSend = {
          ...form,
          price: priceValue,
          imageHotel: originalImage,
        };
      }      result = await editHotel(hotel.uid, dataToSend);
      if (result) {
        if (onSubmit) onSubmit(result);
        toast({
          title: "Hotel editado exitosamente",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: { color: "#fff" },
        });
        navigate("/hoteles");
      } else {
        toast({
          title: "Error al editar hotel",
          description: "No se pudo editar el hotel. Por favor intenta de nuevo.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } else if (!editMode) {
      const dataToSend = {
        ...form,
        price: priceValue,
      };      result = await addHotel(dataToSend);
      if (result) {
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",  
          category: "",
          price: "",
          description: "",
          department: "",
          imageHotel: null,
        });
        setFormState({
          name: { value: "", isValid: false, showError: false },
          email: { value: "", isValid: false, showError: false },
          phone: { value: "", isValid: false, showError: false },
          address: { value: "", isValid: false, showError: false },
          category: { value: "", isValid: false, showError: false },
          price: { value: "", isValid: false, showError: false },
          description: { value: "", isValid: false, showError: false },
          department: { value: "", isValid: false, showError: false },        });
        if (onSubmit) onSubmit(result);
        toast({
          title: "Hotel creado exitosamente",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: { color: "#fff" },
        });
        navigate("/hoteles");
      } else {
        toast({
          title: "Error al crear hotel",
          description: "No se pudo crear el hotel. Por favor intenta de nuevo.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  if (editMode && loadingHotel) {
    return <div>Cargando datos del hotel...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="hotel-form-container" style={{ marginTop: "120px"}}>
        <h2 className="hotel-form-title">
          {editMode ? "Editar Hotel" : "Crear Hotel"}
        </h2>
        <form className="hotel-form" onSubmit={handleSubmit}>          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'name')}
              required
              disabled={editMode && loadingHotel}/>{formState.name.showError && (
              <span className="validation-error">
                {validateHotelNameMessage}
              </span>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'email')}
              required
              disabled={editMode && loadingHotel}/>{formState.email.showError && (
              <span className="validation-error">
                {validateEmailMessage}
              </span>
            )}
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'phone')}
              required
              disabled={editMode && loadingHotel}/>
            {formState.phone.showError && (
              <span className="validation-error">
                {validatePhoneMessage}
              </span>
            )}
          </div>
          <div>
            <label>Dirección:</label>
            <input
              type="text"
              name="address"  
              value={form.address}  
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'address')}
              required
              disabled={editMode && loadingHotel}/>
            {formState.address.showError && (
              <span className="validation-error">
                {validateAddressMessage}
              </span>
            )}
          </div>          <div>
            <label>Categoría:</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'category')}
              required
              disabled={editMode && loadingHotel}
            >
              <option value="">Selecciona una categoría</option>
              <option value="1 STARS">1 Estrella</option>
              <option value="2 STARS">2 Estrellas</option>
              <option value="3 STARS">3 Estrellas</option>
              <option value="4 STARS">4 Estrellas</option>
              <option value="5 STARS">5 Estrellas</option></select>{formState.category.showError && (
              <span className="validation-error">
                {validateCategoryMessage}
              </span>
            )}
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'price')}
              required
              disabled={editMode && loadingHotel}/>
            {formState.price.showError && (
              <span className="validation-error">
                {validatePriceMessage}
              </span>
            )}
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'description')}
              required
              disabled={editMode && loadingHotel}/>
            {formState.description.showError && (
              <span className="validation-error">
                {validateDescriptionMessage}
              </span>
            )}
          </div>
          <div>
            <label>Departamento:</label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'department')}
              required
              disabled={editMode && loadingHotel}/>
            {formState.department.showError && (
              <span className="validation-error">
                {validateDepartmentMessage}
              </span>
            )}
          </div>
          <div>
            <label>Imagen:</label>
            <input
              type="file"
              name="imageHotel"
              accept="image/*"
              onChange={handleChange}
              disabled={editMode && loadingHotel}
            />
            {editMode && originalImage && !form.imageHotel && (
              <img
                src={originalImage}
                alt="Imagen actual del hotel"
                style={{ width: "120px", marginTop: "8px" }}
              />
            )}
          </div>          <button
            type="submit"
            disabled={
              loadingAdd || 
              loadingEdit || 
              (editMode && loadingHotel) ||
              !(formState.name.isValid &&
                formState.email.isValid &&
                formState.phone.isValid &&
                formState.address.isValid &&
                formState.category.isValid &&
                formState.price.isValid &&
                formState.description.isValid &&
                formState.department.isValid)
            }
          >
            {editMode
              ? loadingEdit
                ? "Editando..."
                : "Editar Hotel"
              : loadingAdd
                ? "Creando..."
                : "Crear Hotel"}          </button>
          <button 
            type="button" 
            onClick={onCancel || (() => navigate("/hoteles"))} 
            style={{ marginLeft: 8 }}
          >
            Cancelar
          </button>
        </form>
      </div>
      <SimpleFooter />
    </>
  );
};

export default HotelForm;
