import {
  redirect,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";

import { LoginForm } from "~/components/login-form";

import { authenticator } from "~/utils/auth.server";
import { getSession, commitSession } from "~/utils/session.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const user = await authenticator.authenticate("user-pass", request);

    const session = await getSession(request.headers.get("cookie"));

    session.set("user", user);

    throw redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (error) {
    if (error instanceof Error) {
      // here the error related to the authentication process
      console.log(error);
    }

    throw error; // Re-throw other values or unhandled errors
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const user = session.get("user");

  if (user) throw redirect("/");
  return null;
}

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
