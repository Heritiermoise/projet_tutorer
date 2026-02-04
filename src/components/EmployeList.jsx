import React, { useEffect, useState } from "react";
import { getAllEmployes, deleteEmploye } from "../services/employeService";

const EmployeList = () => {
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const response = await getAllEmployes();
        console.log("Données récupérées :", response.data);
        // Ici on prend le tableau correct
        setEmployes(response.data.employes || []);
      } catch (error) {
        console.error("Erreur fetching employes:", error);
      }
    };

    fetchEmployes();
  }, []);

  const handleDelete = async (matricule) => {
    try {
      await deleteEmploye(matricule);
      // Recharger la liste après suppression
      const response = await getAllEmployes();
      setEmployes(response.data.employes || []);
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  return (
    <div>
      <h1>Liste des Employés</h1>
      <ul>
        {Array.isArray(employes) && employes.length > 0 ? (
          employes.map((emp) => (
            <li key={emp.matricule}>
              {emp.nom} {emp.prenom}{" "}
              <button onClick={() => handleDelete(emp.matricule)}>Supprimer</button>
            </li>
          ))
        ) : (
          <li>Aucun employé trouvé</li>
        )}
      </ul>
    </div>
  );
};

export default EmployeList;
