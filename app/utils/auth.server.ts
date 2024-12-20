import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

type User = {
  email: string;
  token: string;
};

const authenticator = new Authenticator<User | null>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    console.log("Email", form.get("email"));
    console.log("Password", form.get("password"));

    // const user = {
    //   email: "b.ritchwel@xyz.com",
    //   token: "AabBcCxYz",
    // };

    return null;
  }),
  "user-pass"
);

export { authenticator };
