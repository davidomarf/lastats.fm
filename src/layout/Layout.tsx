import classNames from "classnames/bind";
import ActiveLink from "components/ActiveLink";
import Link from "next/link";

import styles from './Layout.module.scss';

let cx = classNames.bind(styles);

function Layout({ children }: { children: JSX.Element }) {
  return <div className={cx("layout")}>
    <nav className={cx("sidebar")}>
      <Link href='/'>
        <div className={cx("sidebar__logo")}>
          Home
        </div>
      </Link>
      <ul className={cx('sidebar__main-link-container')}>
        {
          ['Profile', 'Top Artists', 'Top Tracks', 'Year Review'].map(title => {
            const slug = title.toLowerCase().replace(/\s/g, '-');

            return <ActiveLink activeClassName={cx('active')} href={slug}>
              <li className={cx('sidebar__main-link')}>
                {title}
              </li>
            </ActiveLink>;
          })
        }
      </ul>
    </nav>
    <div className={cx("content")}>
      {children}
    </div>
  </div>
}


export default Layout;
