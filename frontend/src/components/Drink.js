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

  const editModeSelect = () => {
    setEditMode(!editMode);
    setEditName(name);
    setEditDescription(description);
  };


  return (
    <div className="drink">
      {editMode ? (
        <div className="margin-top">
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
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      )}
      {editMode ? (null):(<button onClick={() => deleteSelf(id)}>{"X"}</button>)}
      <button onClick={editModeSelect}>{
        editMode ? "Cancel" : "Edit"
        }</button>
    </div>
  );
};

export default Drink;
