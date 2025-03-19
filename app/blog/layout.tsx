export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-full max-w-[100%] px-4">{children}</div>;
}
