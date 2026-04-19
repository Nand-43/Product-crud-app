import {Link} from "react-router-dom";
import styles from "../styles/Navbar.module.css";

function Navbar(){
    return (
        <div>
            <nav className={styles.navbar}>
                <h2 className={styles.logo}>My Store</h2>

                <div className={styles.links}>
                        <Link to="/" className={styles.link}>Home</Link>
                    
                        <Link to="/product" className={styles.link}>Products</Link>
                </div>     
            </nav>
        </div>
    )
}
export default Navbar;