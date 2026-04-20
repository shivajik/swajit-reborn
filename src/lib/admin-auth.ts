import { supabase } from '@/integrations/supabase/client';

const SESSION_KEY = 'admin_session_token';

export interface AdminSession {
  token: string;
  username: string;
  expires_at: string;
}

export async function adminNeedsSetup(): Promise<boolean> {
  const { data, error } = await supabase.rpc('admin_needs_setup' as never);
  if (error) {
    // RPC not deployed yet — assume setup not needed (login flow will handle)
    console.warn('admin_needs_setup RPC missing:', error.message);
    return false;
  }
  return data === true;
}

export async function adminSetup(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const { data, error } = await supabase.rpc('admin_setup' as never, {
    p_username: username,
    p_password: password,
  } as never);

  if (error) {
    return {
      success: false,
      error:
        error.message?.includes('admin_setup') || error.message?.includes('function')
          ? 'Setup function not installed. Please run docs/admin-setup.sql in your Supabase SQL editor first.'
          : error.message,
    };
  }
  if (!data || (data as any).length === 0) {
    return { success: false, error: 'Setup failed.' };
  }
  const row = (data as any)[0];
  if (!row.success) {
    return { success: false, error: row.message };
  }
  return { success: true };
}

export async function adminLogin(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  const { data, error } = await supabase.rpc('admin_login', {
    p_username: username,
    p_password: password,
  });

  if (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }

  if (!data || data.length === 0 || !data[0]?.token) {
    return { success: false, error: 'Invalid username or password.' };
  }

  const session: AdminSession = {
    token: data[0].token,
    username: data[0].username,
    expires_at: data[0].expires_at,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, session };
}

export async function verifySession(): Promise<boolean> {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return false;

  try {
    const session: AdminSession = JSON.parse(stored);

    if (new Date(session.expires_at) < new Date()) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }

    const { data, error } = await supabase.rpc('admin_verify_session', {
      p_token: session.token,
    });

    if (error || !data) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return false;
  }
}

export function getSession(): AdminSession | null {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export async function adminLogout() {
  const session = getSession();
  if (session) {
    try {
      await supabase.rpc('admin_logout', { p_token: session.token });
    } catch {}
  }
  localStorage.removeItem(SESSION_KEY);
}
