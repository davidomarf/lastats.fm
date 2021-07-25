import * as Papa from "papaparse";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCounter = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const reset = () =>
    dispatch({
      type: "RESET",
    });

  return { data, reset };
};

const CSVUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    Papa.parse(selectedFile, {
      complete: (results) => console.log(results),
      error: (error) => {
        console.error(error);
      },
      header: true,
    });
  }, [selectedFile]);

  return (
    <input type="file" onChange={(e) => setSelectedFile(e.target.files![0])} />
  );
};

export default CSVUpload;
