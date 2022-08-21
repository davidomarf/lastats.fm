import { useAppSelector } from "@hooks";
import classNames from "classnames/bind";
import ActiveLink from "components/ActiveLink";
import { selectUsername } from "components/username/usernameSlice";
import { User } from "models/User";
import Link from "next/link";

import styles from './Layout.module.scss';

let cx = classNames.bind(styles);

function Layout({ children }: { children: JSX.Element }) {
  const username = useAppSelector(selectUsername) as User;

  return <div className={cx("layout")}>
    {username
      ? <div className={cx('progress-indicator')}>Fetching {username.name} scrobbling history... {username.playcount} total scrobbles</div>
      : <></>
    }
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

            return <ActiveLink activeClassName={cx('active')} href={slug} key={slug}>
              <li className={cx('sidebar__main-link')}>
                {title}
              </li>
            </ActiveLink>;
          })
        }
      </ul>
    </nav>
    <div className={cx("content", "content--cx")}>
      {children}
    </div>
  </div>
}


export default Layout;
