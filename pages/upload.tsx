import Head from "next/head";
import Link from "next/link";
import * as Papa from "papaparse";
import { useEffect, useState } from "react";
import Counter from "../components/counter";

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
      <Link href="/user/davidomarf">
        <a>User</a>
      </Link>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files![0])}
      />
      <Counter></Counter>
    </>
  );
};

export default Post;
