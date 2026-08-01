import Link from 'next/link';

const NavMenu = () => {
  return (
    <div className="w-[380px] border-r border-gray-200 p-6 pt-12  bg-gray-100">
      <p className='font-bold text-xl mb-8'>Dashboard</p>
      <div className="flex flex-col gap-4">
        <Link href="/posts" className="hover:underline">
          Blog
        </Link>
        <Link href="/dashboard/posts" className="hover:underline">
          Gestionar posts
        </Link>
        {/* <Link
          href="/dashboard/posts/edit"
          className=" hover:underline"
        >
          Crear un nuevo post
        </Link> */}
      </div>
    </div>
  );
};

export default NavMenu;
