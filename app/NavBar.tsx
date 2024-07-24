import Link from "next/link";
import { AiTwotoneBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b px-6 mb-5 h-14 items-center">
      <Link href="/">
        <AiTwotoneBug size={24} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-zinc-500 hover:text-zinc-900 text-lg transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
