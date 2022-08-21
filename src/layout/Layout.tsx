import { useAppSelector } from "@hooks";
import classNames from "classnames/bind";
import ActiveLink from "components/ActiveLink";
import { selectScrobbleData } from "components/upload/uploadSlice";
import { selectUsername } from "components/username/userSlice";
import Link from "next/link";
import { CSVLink } from "react-csv";

import { Track } from "models/ScrobblePage";
import styles from './Layout.module.scss';

let cx = classNames.bind(styles);

function Layout({ children }: { children: JSX.Element }) {
  const username = useAppSelector(selectUsername);
  const scrobbles = useAppSelector(selectScrobbleData);

  const cleanUserData = (userTracks: Track[]) => {
    return userTracks.map((track: Track) => {
      return {
        name: track.name,
        artist: track.artist["#text"],
        album: track.album["#text"],
        uts: track.date.uts
      };
    });
  };

  return <div className={cx("layout")}>
    {username
      ? username.playcount > scrobbles.length
        ? <div className={cx('progress-indicator')}>
          <p>
            Downloading <b>{username.name}</b> history,
            this make take a while <span className={cx('scrobble-count')}>
              ({scrobbles.length} / {username.playcount} scrobbles)
            </span>
          </p>
          <div className={cx('progress-indicator__bar')} style={{ width: `${100 * (scrobbles.length / username.playcount)}%` }}></div>
        </div>
        : <div className={cx('progress-indicator')}>
          <p>
            All your scrobbles have been fetched! To save the fetching time in future sessions, <button
              className={styles["export"]}
              type="button"
              name="Export scrobbles"
              formTarget="_blank"
            >
              <CSVLink filename={username.name} data={cleanUserData(scrobbles)}>
                Download your lastats.fm CSV
              </CSVLink>
            </button>
          </p>
        </div>
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
