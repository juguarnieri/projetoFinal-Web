import Link from "next/link";
import styles from "./Navbar.module.css"; 
const Navbar = () => (
  <nav className={styles.navbar}>
    <Link href="/" className={styles.link}>
      Home
    </Link>
    <span className={styles.separator}>|</span>
    <Link href="/posts" className={styles.link}>
      Posts
    </Link>
    <span className={styles.separator}>|</span>
    <Link href="/users" className={styles.link}>
      Usuários
    </Link>
  </nav>
);

export default Navbar;