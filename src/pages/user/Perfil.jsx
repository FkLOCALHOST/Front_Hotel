import React from "react";
import { Navbar } from "../../components/navbar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import UserCard from "../../components/user/userCard.jsx"; 
import useGetUserLogged from "../../shared/hooks/user/useGetUserLogged.jsx"

const Perfil = () => {
  const { user, loading, error } = useGetUserLogged();

  return (
    <>
      <Navbar />

      <section style={{ padding: "2rem", minHeight: "70vh" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Mi Perfil</h2>

        {loading && <p style={{ textAlign: "center" }}>Cargando información del usuario...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {!loading && user && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <UserCard user={user} />
          </div>
        )}
      </section>

      <SimpleFooter />
    </>
  );
};

export default Perfil;
