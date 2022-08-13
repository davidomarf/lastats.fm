import { useAppDispatch } from "@hooks";
import classNames from "classnames/bind";
import { Track } from "models/ScrobblePage";
import * as Papa from "papaparse";
import { useCallback, useState } from "react";
import styles from "./Upload.module.scss";
import { setScrobbles } from "./uploadSlice";

let cx = classNames.bind(styles);

const ACCEPTED_CSV_FILES = ["text/csv", ".csv"];

function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File>();

  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useAppDispatch();

  const uploadFile = useCallback(() => {
    if (!uploadedFile) {
      return;
    }

    setIsProcessing(true);

    Papa.parse<Track>(uploadedFile, {
      header: true,
      complete: ({ data }) => {
        setIsProcessing(false);
        dispatch(setScrobbles(data));
      },
    });
  }, [dispatch, uploadedFile, setIsProcessing]);

  return (
    <div className={cx("csvUpload")}>
      {uploadedFile ? (
        <p>
          Great! We will use <code>{uploadedFile.name}</code> to gather all your
          scrobbling data.
        </p>
      ) : (
        <>
          <p>
            To start exploring your music data, you need to upload a CSV file
            with your scrobble history.
            <br />
          </p>
          <a
            className="button button--as-text"
            href="https://export.lastats.fm"
            target="_blank"
            rel="noreferrer"
          >
            Get it here
          </a>
          <label
            className={cx("button", "upload")}
            htmlFor="scrobble-data-upload"
          >
            Upload your CSV file
          </label>
        </>
      )}
      {uploadedFile && (
        <>
          <button
            className={cx("button", "exploreButton")}
            onClick={uploadFile}
          >
            Start exploring
          </button>
          <label
            className={cx("button button--as-text")}
            htmlFor="scrobble-data-upload"
          >
            Use another file
          </label>
        </>
      )}
      <input
        accept={ACCEPTED_CSV_FILES.join()}
        hidden
        multiple={false}
        id="scrobble-data-upload"
        type="file"
        onChange={(event) => setUploadedFile(event.target.files![0])}
      />
    </div>
  );
}

export default Upload;
