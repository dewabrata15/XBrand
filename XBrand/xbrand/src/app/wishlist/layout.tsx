import ProtectPage from "@/protect/protect";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProtectPage>{children}</ProtectPage>
    </section>
  );
}
