import Link from "next/link";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/blog", label: "Блог" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/">
          Personal Site
        </Link>
        <nav className="site-header__nav">
          {navLinks.map((link) => (
            <Link key={link.href} className="site-header__link" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
