import  { useEffect, useState } from "react";

export default function Desserts() {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts")
      .then(res => res.json())
      .then(data => setDesserts(data.data))
      .catch(err => console.error("Xatolik:", err));
  }, []);

  return (
    <div style={styles.container}>
      {desserts.map(dessert => (
        <div key={dessert.id} style={styles.card}>
          <img
            src={dessert.image.thumbnail.replace(
              "..",
              "https://json-api.uz/api/project/dessertss"
            )}
            alt={dessert.name}
            style={styles.image}
          />
          <h3>{dessert.name}</h3>
          <p>{dessert.category}</p>
          <strong>${dessert.price}</strong>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    background: "#fafafa",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};
