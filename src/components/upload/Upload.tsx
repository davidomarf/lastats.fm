import { useAppDispatch } from "@hooks";
import { getScrobbles, getUserInfo } from "api/lastfm";
import classNames from "classnames/bind";
import { setUser } from "components/username/userSlice";
import { SimplifiedTrack } from "models/ScrobblePage";
import * as Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import styles from "./Upload.module.scss";
import { addTracks, setSimplifiedTracks } from "./uploadSlice";

let cx = classNames.bind(styles);

const ACCEPTED_CSV_FILES = ["text/csv", ".csv"];

function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!uploadedFile) {
      return;
    }

    // TODO: Add modal to confirm username before actually setting it in app state
    const username = uploadedFile.name
      // Remove file extension
      .replace(/\.\w+$/, "")
      // Remove everything after first space
      .replace(/\s.*/, "");
    const userPromise = getUserInfo(username).then((user) =>
      dispatch(setUser(user))
    );

    const parsePromise = new Promise<SimplifiedTrack[]>((resolve, reject) =>
      Papa.parse<SimplifiedTrack>(uploadedFile, {
        header: true,
        complete: ({ data }) => {
          dispatch(setSimplifiedTracks(data));
          resolve(data);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        },
      })
    );

    Promise.all([parsePromise, userPromise]).then(
      ([tracks, { payload: user }]) => {
        const playcount = +user.playcount;

        if (playcount === tracks.length) {
          return;
        }

        // TODO: Consider the case of playcount < tracks.length, which should be incorrect

        if (playcount > tracks.length) {
          console.log("File is outdated, starting to fetch last scrobbles");
        }
        const diff = user.playcount - tracks.length;

        const promises: Promise<void>[] = [];
        const pageSize = 80;
        const pages = Math.ceil(diff / pageSize);

        for (let i = 0; i < pages; i++) {
          promises.push(
            getScrobbles(user.name, i + 1, pageSize)
              .then((tracks) => {
                if (tracks[0]["@attr"]?.nowplaying) {
                  tracks.shift();
                }

                if (i * pageSize + (diff % pageSize) >= diff) {
                  tracks.splice(diff % pageSize);
                }

                dispatch(addTracks(tracks));
              })
              // TODO: Add handling for rejected requests, so they can be retried
              .catch((error) => console.error(error))
          );
        }
        console.log({ pages });
      }
    );
  }, [dispatch, uploadedFile]);

  const uploadFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={cx("start-action-container")}
        onClick={() => uploadFileRef.current?.click()}
      >
        <div className={cx("start-action__title")}>
          Upload an existing laststs.fm CSV,
        </div>
        <div className={cx("start-action__description")}>
          and it'll immediately load all the saved data, while updating the
          uploaded file with your last scrobbles
        </div>
        <p></p>
        <input
          ref={uploadFileRef}
          multiple={false}
          type="file"
          name="lastats-file"
          id="scrobble-data-upload"
          accept={ACCEPTED_CSV_FILES.join()}
          onChange={(event) => {
            setUploadedFile(event.target.files![0]);
          }}
        />
      </div>
    </>
  );
}

export default Upload;
