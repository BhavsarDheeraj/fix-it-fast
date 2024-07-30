"use client";

import { Box, Container, Flex, Spinner } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiTwotoneBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="border-b px-6">
      <Container>
        <Flex py="4" align="center" justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiTwotoneBug size={24} />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-900": currentPath === link.href,
                      "text-zinc-500": currentPath !== link.href,
                      "hover:text-zinc-800 text-lg transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Flex>
            <Box>
              {status === "authenticated" && (
                <Link href="/api/auth/signout">Logout</Link>
              )}
              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Login</Link>
              )}
              {status === "loading" && <Spinner loading />}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
