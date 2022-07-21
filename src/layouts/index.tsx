import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <div style={{ padding: 12 }}>
        <ul>
          <li>
            <Link to="/score">计分</Link>
          </li>
          <li>
            <a href="https://github.com/hsllee/SimpleTools.git">Github</a>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
