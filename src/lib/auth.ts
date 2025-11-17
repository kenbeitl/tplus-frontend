import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Session duration: 8 hours in milliseconds
const SESSION_DURATION = 8 * 60 * 60 * 1000;

// Check authentication using NextAuth
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}

// Helper to calculate session expiry
export function getSessionExpiry(): number {
  return Date.now() + SESSION_DURATION;
}

// Optional: Get current user session
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
