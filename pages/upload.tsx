import Head from "next/head";
import * as Papa from "papaparse";
import { useEffect, useState } from "react";

const Post = () => {
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
    <>
      <Head>
        <title>CSV Upload</title>
      </Head>

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files![0])}
      />
    </>
  );
};

export default Post;
