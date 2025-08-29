import Link from "next/link";

interface MenuItemProps {
  label: string;
  link: string;
  className?: string;
}

export default function MenuItem({ label, link, className }: MenuItemProps) {
  return (
    <ul className="">
      <li className={className}>
        <Link href={link} className="hover:text-white">
          {label}
        </Link>
      </li>
    </ul>
  );
}
