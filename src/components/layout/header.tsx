"use client";
import Link from "next/link";

export const Header = () => {
  return (
    <div className={"flex w-full items-center justify-between px-10 py-5"}>
      <strong className={"font-extrabold"}>keno.dev</strong>

      <div className={"flex items-center justify-end gap-6"}>
        <Link className={"text-md"} href={"/widgets"}>
          Widgets
        </Link>

        <button
          className={"btn btn-dark rounded-full px-6 py-4"}
          onClick={() => {}}
        >
          API Reference
        </button>
      </div>
    </div>
  );
};
