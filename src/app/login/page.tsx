import { redirect } from "next/navigation";

// Legacy /login route now redirects to root
export default function LegacyLoginRedirect() {
  redirect('/');
}
