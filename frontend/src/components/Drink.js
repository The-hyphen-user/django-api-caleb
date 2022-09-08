import React, { useState } from "react";
import "./Drink.css";

const Drink = ({ id, name, description, deleteSelf, updateSelf }) => {
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);

  const Submit = () => {
    updateSelf(id, editName, editDescription);
    setEditMode(false);
  };

  return (
    <div className="drink">
      {editMode ? (
        <div>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={Submit}>Submit</button>
        </div>
      ) : (
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      )}
      <button onClick={() => deleteSelf(id)}>{"X"}</button>
      <button onClick={() => setEditMode(!editMode)}>{"Edit"}</button>
    </div>
  );
};

export default Drink;
