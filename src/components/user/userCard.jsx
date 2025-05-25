import PropTypes from "prop-types";
import React from "react";
import { Edit } from "lucide-react";
import defaultProfile from "../../assets/images/defaultProfile.jpg"; 
import { useNavigate } from "react-router-dom";
import "../../assets/styles/user/userCard.css"

const UserCard = ({ user, showEdit = true }) => {
  const navigate = useNavigate();

  const {
    name,
    surname,
    userName,
    profilePicture,
    email,
    phone
  } = user;

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate("/perfil/editar", { state: { user } });
  };

  return (
    <div className="usuario-card" style={{ position: "relative", cursor: "default" }}>
      {showEdit && (
        <div className="usuario-card-edit">
          <Edit
            size={30}
            className="usuario-card-edit-icon"
            title="Editar perfil"
            onClick={handleEdit}
          />
        </div>
      )}

      <img
        src={profilePicture || defaultProfile}
        alt={`${name} ${surname}`}
        className="usuario-profile-picture"
      />

      <div className="usuario-info">
        <h2 className="usuario-name">{name} {surname}</h2>
        <p className="usuario-detail"><strong>Usuario:</strong> {userName}</p>
        <p className="usuario-detail"><strong>Email:</strong> {email}</p>
        <p className="usuario-detail"><strong>Teléfono:</strong> {phone}</p>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }).isRequired,
  showEdit: PropTypes.bool
};

export default UserCard;
