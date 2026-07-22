import { getPosts } from '@/actions';
import Link from 'next/link';

const PotsPage = async () => {
  const resp = await getPosts();
  if (!resp.ok) return <>not found</>;

  return (
    <div>
      {resp.data.map(post => (
        <div key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="text-blue-500 hover:cursor-pointer hover:underline"
          >
            {post.title ?? 'Sin título'}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PotsPage;
