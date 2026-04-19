import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/products`);
    const data = await res.json();
    setProducts(data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

   const updateProduct = async(id) => {
      await fetch(`http://localhost:3000/api/products/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          image
        }),
      });
      setEditId(null);
       setName("");
       setPrice("");
       setImage("");
      fetchProducts();

    }
    if(products.length === 0){
      return <p>No products</p>
    }

   

  return (
    <div className={styles.container}>
      <h1>All Products</h1>

      <button onClick={() => navigate("/product")}>
        Add New Product
      </button>

    <div className={styles.card}>
      {products.map((p) => (
        <div key={p.id}>
          <img src={p.image} width="100" />
          <h3>{p.name}</h3>
          <p>{p.price}</p>

          <button onClick={() => deleteProduct(p.id)}>Delete</button>
          <button onClick={() => navigate(`/product/${p.id}`)}>
            Edit
          </button>
        </div>

      ))}
      </div>
    </div>
  );
}

export default HomePage;