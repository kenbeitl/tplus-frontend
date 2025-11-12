import { redirect } from "next/navigation";

// Legacy /sign-in route now redirects to root
export default function LegacyLoginRedirect() {
  redirect('/');
}
