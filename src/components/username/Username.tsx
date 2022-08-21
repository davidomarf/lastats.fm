import { useAppDispatch } from "@hooks";
import { getUserInfo } from "api/lastfm";
import classNames from "classnames/bind";
import { User } from "models/User";
import { FormEvent, useCallback, useRef, useState } from "react";
import styles from './Username.module.scss';
import { setUsername as setUsernameRedux } from "./usernameSlice";

const cx = classNames.bind(styles);

function UsernameInput() {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();

  const handleFormSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    getUserInfo(username).then((info: User) => {
      dispatch(setUsernameRedux(info))
    })
  }, [username])

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
