import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

type User = {
  email: string;
  password: string;
};

const authenticator = new Authenticator<User | Error | null>();

authenticator.use(
  new FormStrategy(async ({ form, request }) => {
    const formData = await request.formData();

    console.log("formData", formData.entries());

    const email = form.get("email") as string;
    const password = form.get("password") as string;
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    //
    const params = {
      email: email,
      password: password,
    };

    console.log(params);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };

    console.log(options);

    fetch("localhost:8080/login", options)
      .then((response) => response.json())
      .then((data) => console.log("Res data ", data))
      .catch((error) => console.error(error));

    return null;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

export { authenticator };
