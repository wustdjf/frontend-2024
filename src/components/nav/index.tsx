import styles from "./index.module.css";
import * as ICONS from "@ant-design/icons";

export function NavBar() {
  return (
    <div className={styles.nabbar}>
      <div className={styles.title}>游戏客服工单系统</div>

      <div className={styles.login}>login</div>
      <div className={styles.register}>register</div>
      <div className={styles.profile}>个人中心</div>
    </div>
  );
}
