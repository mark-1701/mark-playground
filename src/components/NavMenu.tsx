import Link from 'next/link';

const NavMenu = () => {
  return (
    <div className="w-[380px] border bg-gray-800 p-6 pt-12">
      <div className="flex flex-col gap-4">
        <Link href="/posts" className="text-white hover:underline">
          Blog
        </Link>
        <Link href="/dashboard/posts" className="text-white hover:underline">
          Gestionar posts
        </Link>
        <Link
          href="/dashboard/posts/new"
          className="text-white hover:underline"
        >
          Crear un nuevo post
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;
