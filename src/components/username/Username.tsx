import { useAppDispatch } from "@hooks";
import { getScrobbles, getUserInfo } from "api/lastfm";
import classNames from "classnames/bind";
import { addScrobbles } from "components/upload/uploadSlice";
import { Track } from "models/ScrobblePage";
import { User } from "models/User";
import { FormEvent, useRef, useState } from "react";
import styles from './Username.module.scss';
import { setUsername as setUsernameRedux } from "./userSlice";

const cx = classNames.bind(styles);

function UsernameInput() {
  const [username, setUsername] = useState('');
  const [finished, setFinished] = useState(false);

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
        const pageSize = 200;

        const promises: Promise<Track[]>[] = [];
        const pages = Math.ceil(info!.playcount! / pageSize);

        for (let i = 0; i < pages; i++) {
          promises.push(getScrobbles(user, i + 1, pageSize));
        }

        promises.forEach(promise =>
          promise.then(tracks => {
            if (tracks[0]["@attr"]?.nowplaying) {
              tracks.shift();
            }
            dispatch(addScrobbles(tracks));
          }).catch(error => console.error(error))
        )

        Promise.allSettled(promises).then((results) => {
          if (results.some(result => result.status === 'rejected')) {
            console.error('Failed to fetch some pages. Please try again.');
          }
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
        <button type="submit" className="button" style={{ marginLeft: '2rem' }}> Get my scrobbles! </button>
      </form>
    </div>
  );
}

export default UsernameInput;
