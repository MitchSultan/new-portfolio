import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Selected Website Projects",
  description:
    "Explore selected website and digital projects built by Mitch Sultan for clients in Kenya and other markets.",
  path: "/playground",
});

export default function PlaygroundLayout({ children }) {
  return children;
}
