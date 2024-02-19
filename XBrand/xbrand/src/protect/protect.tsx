import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ProtectPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = cookies().get(`Authorization`);

  if (!auth) {
    return redirect("/login");
  } else {
    return <>{children}</>;
  }
}
