import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUpdateUser from "../../shared/hooks/user/useUpdateUser.jsx";
import useUpdatePassword from "../../shared/hooks/user/useUpdatePassword.jsx";
import useGetUserLogged from "../../shared/hooks/user/useGetUserLogged.jsx";
import "../../assets/styles/user/userForm.css";
import Navbar from "../navbar.jsx";
import SimpleFooter from "../footer.jsx";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const [pendingSubmit, setPendingSubmit] = useState(false);

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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setPendingSubmit(true);
    onOpen();
  };

  const confirmUpdate = async () => {
    const updated = await editUser(userData?.uid, form);

    if (updated) {
      if (onSubmit) onSubmit(updated);
      toast({
        title: "Perfil actualizado correctamente.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
      onClose();
      navigate("/perfil");
    } else {
      toast({
        title: "Error al actualizar perfil.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
      onClose();
    }
    setPendingSubmit(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return;

    const success = await changePassword(userData?.uid, newPassword);

    if (success) {
      toast({
        title: "Contraseña actualizada correctamente.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
      setNewPassword("");
    } else {
      toast({
        title: "Error al actualizar contraseña.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
    }
  };

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
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => {
            setPendingSubmit(false);
            onClose();
          }}
        >
          <AlertDialogOverlay>
            <AlertDialogContent bg="#232323" color="#fff">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirmar actualización
              </AlertDialogHeader>
              <AlertDialogBody>
                ¿Estás seguro de que deseas actualizar tus datos?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => { setPendingSubmit(false); onClose(); }} bg="#333" color="#fff" _hover={{ bg: "#444" }}>
                  Cancelar
                </Button>
                <Button colorScheme="teal" onClick={confirmUpdate} ml={3} isLoading={loadingUpdate}>
                  Sí, actualizar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

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
