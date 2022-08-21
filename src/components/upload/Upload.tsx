import { useAppDispatch } from "@hooks";
import { getUserInfo } from "api/lastfm";
import classNames from "classnames/bind";
import { setUser } from "components/username/userSlice";
import { SimplifiedTrack } from "models/ScrobblePage";
import * as Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import styles from "./Upload.module.scss";
import { setSimplifiedTracks } from "./uploadSlice";

let cx = classNames.bind(styles);

const ACCEPTED_CSV_FILES = ["text/csv", ".csv"];

function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File>();

  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!uploadedFile) {
      return;
    }

    setIsProcessing(true);

    // TODO: Add modal to confirm username before actually setting it in app state
    const username = uploadedFile.name
      // Remove file extension
      .replace(/\.\w+$/, "")
      // Remove everything after first space
      .replace(/\s.*/, "");
    getUserInfo(username).then((user) => dispatch(setUser(user)));

    Papa.parse<SimplifiedTrack>(uploadedFile, {
      header: true,
      complete: ({ data }) => {
        setIsProcessing(false);
        dispatch(setSimplifiedTracks(data));
      },
    });
  }, [dispatch, uploadedFile, setIsProcessing]);

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
