import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import styles from "../styles/ProductPage.module.css";

function ProductPage(){
  const {id} = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect (() => {
    if(id){
      setLoading(true);
     
     fetch(`http://localhost:3000/api/products/${id}`, )
    .then(res => res.json())
    .then(data => {
      console.log(data)
        const p = data.data;
        setName(p.name);
        setPrice(p.price);
        setImage(p.image);
        setLoading(false);
    })
    .catch(err => console.log(err));
  }
  if (loading) return <p>Loading...</p>;
  

  }, [id]);

    const handleSubmit = async() => {
      if(id){
        await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            name,
            price,
            image
          })
        })

      }
      else{
        await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({
            name,
            price, 
            image
          }),
        });

      }

      navigate("/");
    }
  

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>Managing Product</h1>
      <form className={styles.form}>
        <label >Name</label>
      <input
        
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label >Price</label>
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
 
      <label >Image</label>
      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={handleSubmit} className={styles.button}>
        {id ? "Update" : "Add"}
      </button>
      </form>

      
  
    </div>
  )
}

export default ProductPage;