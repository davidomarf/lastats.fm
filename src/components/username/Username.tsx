import { useAppDispatch } from "@hooks";
import { getScrobbles, getUserInfo } from "api/lastfm";
import classNames from "classnames/bind";
import { Track } from "models/ScrobblePage";
import { User } from "models/User";
import { FormEvent, useRef, useState } from "react";
import styles from './Username.module.scss';
import { setUsername as setUsernameRedux } from "./userSlice";

const cx = classNames.bind(styles);

function UsernameInput() {
  const [username, setUsername] = useState('');
  const [finished, setFinished] = useState(false);

  const setTotalCSV = (csv: Track[]) => {
    console.log('all', csv)
  }

  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    getUserInfo(username).then((info: User) => {
      dispatch(setUsernameRedux(info))
      getUserLastTracks(username, info)
    })
  }

  const getUserLastTracks = (
    async (user: string, info: User) => {
      if (finished) {
        return;
      }
      try {
        const ids = new Map();
        const pc = await getScrobbles(user, 1, 200);
        if (pc[0]["@attr"]?.nowplaying) {
          pc.shift();
        }

        const promises: Promise<Track[]>[] = [];
        const pages = Math.ceil(info!.playcount! / 200);
        console.log({ pages });
        for (let i = 0; i < pages; i++) {
          promises.push(getScrobbles(user, i + 1, 200));
        }

        Promise.all(promises).then((trackArray) => {
          const totalTracks = [];
          for (const tracks of trackArray) {
            if (tracks[0]["@attr"]?.nowplaying) {
              tracks.shift();
            }
            totalTracks.push(...tracks);
          }

          setTotalCSV(totalTracks);
          setFinished(true);
        });


      } catch (error) {
        console.error(error);
      }
    }
  );


  const usernameInputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={cx("start-action-container")}
      onClick={() => usernameInputRef.current?.focus()}>
      <div className={cx('start-action__title')}>
        Enter your username,
      </div>
      <div className={cx('start-action__description')}>
        and the website will start to update every few seconds with
        all the new data it gets from your scrobbling history
      </div>
      <form onSubmit={handleFormSubmit} action="">
        <label
          htmlFor="username"
          style={{ "display": "none" }}
        >
          Username
        </label>
        <input ref={usernameInputRef}
          type="text"
          name="username"
          id="input-username"
          placeholder="Username"
          onChange={event => setUsername(event.target.value)}
        />
        <button type="submit"> Go -> </button>
      </form>
    </div>
  );
}

export default UsernameInput;
