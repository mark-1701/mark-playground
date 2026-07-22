import { getPosts } from '@/actions';
import CreatePostButton from '@/features/post/components/CreatePostButton';
import PostCard from '@/features/post/components/PostCard';

const DashboardPage = async () => {
  const resp = await getPosts();

  if (!resp.ok) return <div>posts no encontrados</div>;

  return (
    <div className="mx-auto flex h-full w-[700px] flex-col gap-8 pt-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Gestión de posts</h1>
        <CreatePostButton />
      </div>

      <ul className="flex-1 divide-y-1 divide-gray-200 overflow-auto">
        {resp.data.map(post => (
          <PostCard key={post.id} id={post.id} title={post.title} />
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
