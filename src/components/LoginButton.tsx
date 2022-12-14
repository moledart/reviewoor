import { useRouter } from "next/router";
import { Button } from "@mantine/core";

export const LoginButton = () => {
  const router = useRouter();

  return (
    <Button
      size="md"
      className="bg-zinc-800"
      color="dark"
      fw="400"
      onClick={() => router.push("/login")}
    >
      Login
    </Button>
  );
};
