import { Outlet } from "react-router-dom";
import { NavBar } from "@/components";
import styles from "./index.module.css";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
