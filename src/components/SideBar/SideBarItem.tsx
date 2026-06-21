import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";

export const SideBarItem = ({
  label,
  icon,
  link
}: {
  label: string;
  icon: IconType;
  link: string
}) => {
  const Icon = icon;
  return (
    <Link href={`/${link}`} >
      <div className="font-semibold flex gap-2 p-1 items-center cursor-pointer hover:bg-blue-400 rounded select-none">
        <Icon /> {label}
      </div>
    </Link>
  );
};
