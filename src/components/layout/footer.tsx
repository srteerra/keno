import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content w-full p-4">
      <aside>
        <p>
          Made with ❤️ by <strong>Terra</strong>
        </p>
        <p className={"flex gap-2"}>
          <span>This is an open source project.</span>
          <Link
            className={"cursor-pointer underline"}
            target={"_blank"}
            href={"https://github.com/srteerra/keno"}
          >
            Contributions are welcome!
          </Link>
        </p>
      </aside>
    </footer>
  );
};
