import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUpdateUser from "../../shared/hooks/user/useUpdateUser.jsx";
import useUpdatePassword from "../../shared/hooks/user/useUpdatePassword.jsx";
import useGetUserLogged from "../../shared/hooks/user/useGetUserLogged.jsx";
import "../../assets/styles/user/userForm.css";
import Navbar from "../navbar.jsx";
import SimpleFooter from "../footer.jsx";

const EditProfileForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const editMode = props.editMode ?? location.state?.editMode ?? true;
  const userData = props.user ?? location.state?.user ?? null;
  const onSubmit = props.onSubmit ?? null;
  const onCancel = props.onCancel ?? null;

  const { user: loggedUser } = useGetUserLogged();
  const { editUser, loading: loadingUpdate } = useUpdateUser();
  const { changePassword, loading: loadingPassword } = useUpdatePassword();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    userName: "",
    email: "",
    phone: "",
  })

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (editMode && userData) {
      setForm({
        name: userData.name || "",
        surname: userData.surname || "",
        userName: userData.userName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [editMode, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const updated = await editUser(userData?.uid, form);

    if (updated) {
      if (onSubmit) onSubmit(updated);
      alert("Perfil actualizado correctamente.");
      navigate("/perfil");
    } else {
      alert("Error al actualizar perfil.");
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return;

    const success = await changePassword(userData?.uid, newPassword);

    if (success) {
      alert("Contraseña actualizada correctamente.");
      setNewPassword("");
    } else {
      alert("Error al actualizar contraseña.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="hotel-form-container" style={{ marginTop: "120px" }}>
        <h2 className="hotel-form-title">Editar Perfil</h2>
        <form className="hotel-form" onSubmit={handleProfileSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loadingUpdate}>
            {loadingUpdate ? "Guardando..." : "Guardar Cambios"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
              Cancelar
            </button>
          )}
        </form>

        <h2 className="hotel-form-title" style={{ marginTop: "50px" }}>
          Cambiar Contraseña
        </h2>
        <form className="hotel-form" onSubmit={handlePasswordSubmit}>
          <div>
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loadingPassword}>
            {loadingPassword ? "Actualizando..." : "Cambiar Contraseña"}
          </button>
        </form>
      </div>
      <SimpleFooter />
    </>
  )
}

export default EditProfileForm;
