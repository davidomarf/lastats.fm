import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCounter } from "../../components/counter";
import { initializeStore } from "../../store";
import { User } from "../../types";
import { getUserInfo } from "../api/lastfm";

type PostProps = {
  userInfo: User;
  initialReduxState: any;
};

const Post = ({ userInfo, initialReduxState }: PostProps) => {
  const router = useRouter();
  const { user } = router.query;
  const { count } = useCounter();
  return (
    <>
      <Head>
        <title>{user}</title>
      </Head>

      <Link href="/upload">
        <a>Upload</a>
      </Link>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      {count}
    </>
  );
};

export default Post;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ user: string }>
) {
  const reduxStore = initializeStore();

  const userInfo = await getUserInfo(context.params!.user);

  if (!userInfo) {
    return {
      notFound: true,
    };
  }

  return {
    props: { userInfo, initialReduxState: reduxStore.getState() },
  } as { props: PostProps };
}
