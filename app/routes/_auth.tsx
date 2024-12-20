import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <>
      <main className="my-main">
        <Outlet />
      </main>
    </>
  );
}
