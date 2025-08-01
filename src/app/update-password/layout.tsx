import React from 'react';

// This layout is intentionally minimal. It isolates the password update page
// from the main application's layout, which includes the AuthProvider.
// This prevents the AuthProvider from prematurely redirecting the user
// when they arrive from a password recovery link.

export default function UpdatePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="update-password-layout">
      {children}
    </div>
  );
}
