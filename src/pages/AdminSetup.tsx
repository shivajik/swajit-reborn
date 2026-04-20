import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { adminLogin } from '@/lib/admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Mail, ShieldCheck, Loader2 } from 'lucide-react';

const AdminSetup = () => {
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc('admin_setup_needed');
      if (error || data !== true) {
        navigate('/admin/login', { replace: true });
        return;
      }
      setChecking(false);
    })();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    const { data, error: rpcErr } = await supabase.rpc('admin_create_first', {
      p_username: username,
      p_password: password,
    });

    if (rpcErr) {
      setError(rpcErr.message);
      setLoading(false);
      return;
    }

    const result = (data as any)?.[0];
    if (!result?.success) {
      setError(result?.message || 'Setup failed.');
      setLoading(false);
      return;
    }

    // Auto-login the new admin
    const login = await adminLogin(username, password);
    setLoading(false);
    if (login.success) {
      navigate('/admin', { replace: true });
    } else {
      navigate('/admin/login', { replace: true });
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Create First Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">
              No admin account exists yet. Create one to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username (min 3 chars)"
                  className="pl-10"
                  required
                  minLength={3}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="pl-10"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  className="pl-10"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-bold uppercase tracking-wider py-5"
            >
              {loading ? 'Creating...' : 'Create Admin & Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
