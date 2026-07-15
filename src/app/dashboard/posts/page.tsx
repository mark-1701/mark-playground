import CreatePostButton from '@/features/post/components/CreatePostButton';

const DashboardPage = () => {
  return (
    <div>
      <div className="mx-auto mt-20 w-[900px]">
        <div className="mb-8 flex justify-between">
          <h1 className="text-3xl font-bold">Gestión de posts</h1>
          <CreatePostButton />
        </div>
        <div className="pl-4">
          <ul className="list-disc">
            <li>listado de artículos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
