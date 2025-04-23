export const metadata = {
  title: "Kea Logic Studio",
  description: "Content management for Kea Logic",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
