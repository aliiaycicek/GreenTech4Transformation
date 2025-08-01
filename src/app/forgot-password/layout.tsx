import React from 'react';

// This layout is intentionally minimal to isolate the forgot password page
// from the main application's AuthProvider, preventing premature redirects.
export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="forgot-password-layout">
      {children}
    </div>
  );
}
