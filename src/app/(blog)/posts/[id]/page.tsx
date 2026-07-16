import { getPostById } from '@/actions';
import PostContent from '../../../../components/PostContent';

type PostIdPage = {
  params: {
    id: string;
  };
};

const PostIdPage = async ({ params }: PostIdPage) => {
  const { id } = await params;

  const resp = await getPostById(id);

  if (!resp.ok) return <p>No existe</p>;

  return <PostContent content={resp.data.content} />;
};

export default PostIdPage;
