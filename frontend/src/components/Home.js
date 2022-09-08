import React from "react";
import { useState, useEffect } from "react";
import Drink from "./Drink";
import './Home.css';

const Home = () => {
  const [drinks, setDrinks] = useState([]);
  const [creatable, setCreatable] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchAllDrinks = () => {
      fetch("http://localhost:8000/api/drinks/") // fetch all drinks
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setDrinks(data);
        });
    };
    fetchAllDrinks();
  }, []);

  const deleteDrink = (id) => {
    console.log(id);
    fetch(`http://localhost:8000/api/drinks/${id}/`, {
      // fetch('http://localhost:8000/api/drinks/' + id + '/', {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 204) {
        console.log(res);
        const newDrinks = drinks.filter((drink) => drink.id !== id);
        setDrinks(newDrinks);
      } else if (res.status === 404) {
        alert("Drink not found");
      }
    });
  };

  const createDrink = () => {
    fetch("http://localhost:8000/api/drinks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, description: description }),
    }).then((res) => {
      if (res.status === 201) {
        setCreatable(false);
        setName("");
        setDescription("");
        fetch("http://localhost:8000/api/drinks/") // fetch all drinks
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setDrinks(data);
          });
      } else if (res.status === 400) {
        alert("Bad request");
      }
    });
  };

  const updateDrink = (id, name, description) => {
    fetch(`http://localhost:8000/api/drinks/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, description: description }),
    }).then((res) => {
      if (res.status === 200) {
        fetch("http://localhost:8000/api/drinks/") // fetch all drinks
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setDrinks(data);
          });
      } else if (res.status === 400) {
        alert("Bad request");
      }
    });
  };

  return (
    <div className="home">
      <h1>Home</h1>
      <button onClick={() => setCreatable(!creatable)}>Create Drink</button>
      {creatable ? (
        <div className="create-drink">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br/>
          <input
            type="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <br/>
          <button onClick={createDrink}>Submit</button>
        </div>
      ) : null}

      {drinks.map((drink) => (
        <Drink
          key={drink.id}
          id={drink.id}
          name={drink.name}
          description={drink.description}
          deleteSelf={deleteDrink}
          updateSelf={updateDrink}
        />
      ))}
    </div>
  );
};

export default Home;
