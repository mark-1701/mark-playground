import { getPostById } from '@/actions';
import PostContent from '../PostContent';

type PostIdPage = {
  params: {
    id: string;
  };
};

const PostIdPage = async ({ params }: PostIdPage) => {
  const { id } = await params;

  const resp = await getPostById(id);
  
  if (!resp.ok) return <p>No existe</p>;

  return (
    <div className="m-40">
      <PostContent content={resp.data.content} />
    </div>
  );
};

export default PostIdPage;
