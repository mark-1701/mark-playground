import Link from 'next/link';

const NavMenu = () => {
  return (
    <div className="w-[380px] border-r border-gray-200 bg-gray-100 p-6 pt-12">
      <p className="mb-8 text-xl font-bold">Dashboard</p>
      <div className="flex flex-col gap-4">
        <Link href="/posts" className="hover:underline">
          Blog
        </Link>
        <Link href="/dashboard/posts" className="hover:underline">
          Gestionar posts
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;
