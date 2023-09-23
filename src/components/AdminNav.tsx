"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";
import {
  HiHome,
  HiUser,
  HiDocumentText,
  HiOfficeBuilding,
} from "react-icons/hi";

export function AdminNav({ lang }: { lang: string }) {
  const NavAdminItems = [
    {
      title: "Home",
      href: "/admin",
      icon: HiHome,
      disabled: false,
    },
    {
      title: "Student",
      href: "/admin/student",
      icon: PiStudentFill,
    },
    {
      title: "Teacher",
      href: "/admin/teacher",
      icon: PiChalkboardTeacherFill,
    },
    {
      title: "Course",
      href: "/admin/course",
      icon: HiDocumentText,
    },
    {
      title: "Room",
      href: "/admin/room",
      icon: HiOfficeBuilding,
    },
    {
      title: "staff",
      href: "/admin/staff",
      icon: HiUser,
    },
  ];
  const path = usePathname();

  if (!NavAdminItems?.length) {
    return null;
  }
  return (
    <div className="grid items-start gap-2 pl-4">
      {NavAdminItems.map((item, index) => {
        const Icon = item.icon || BsFillArrowRightCircleFill;
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-l-md py-2 pl-4 pr-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  (path === "/" + lang + "/admin" && item.href === "/admin") ||
                    (item.href !== "/admin" &&
                      path.startsWith("/" + lang + item.href))
                    ? "bg-white"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </div>
  );
}
