import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { User } from "../../types";
import { getUserInfo } from "../api/lastfm";

type PostProps = {
  userInfo: User;
};

const Post = ({ userInfo }: PostProps) => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <>
      <Head>
        <title>{user}</title>
      </Head>

      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    </>
  );
};

export default Post;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ user: string }>
) {
  const userInfo = await getUserInfo(context.params!.user);

  if (!userInfo) {
    return {
      notFound: true,
    };
  }

  return {
    props: { userInfo }, // will be passed to the page component as props
  } as { props: PostProps };
}
