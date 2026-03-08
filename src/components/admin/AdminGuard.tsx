import { useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifySession } from '@/lib/admin-auth';

const AdminGuard = ({ children }: { children: ReactNode }) => {
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    verifySession().then((valid) => {
      if (!valid) {
        navigate('/admin/login', { replace: true });
      } else {
        setVerified(true);
      }
      setChecking(false);
    });
  }, [navigate, location.pathname]);

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return verified ? <>{children}</> : null;
};

export default AdminGuard;
