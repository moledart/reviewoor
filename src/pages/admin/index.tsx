import Navigation from "../../components/Navigation";
import {
  ActionIcon,
  Center,
  Container,
  Loader,
  Select,
  Stack,
  Table,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { LoginButton } from "../../components/LoginButton";
import { useAtom } from "jotai";
import { langSwitcherAtom } from "../../atoms/lang";
import { ReviewRow } from "../../components/ReviewRow";
import Link from "next/link";
import { Role } from "@prisma/client";
import { IoTrashOutline } from "react-icons/io5";

const Admin = () => {
  const ctx = trpc.useContext();
  const { data: session } = useSession();
  const [lang] = useAtom(langSwitcherAtom);
  const userRole = session?.user?.role;
  const {
    data: users,
    isLoading,
    isError,
  } = trpc.user.getAll.useQuery(undefined, {
    enabled: !!userRole,
  });
  const { mutate: handleChangeRole } = trpc.user.updateRole.useMutation({
    onSuccess() {
      ctx.user.getAll.invalidate();
    },
  });
  const { mutate: handleDeleteUser } = trpc.user.deleteUser.useMutation({
    onSuccess() {
      ctx.user.getAll.invalidate();
    },
  });
  const theme = useMantineColorScheme();

  if (userRole === "USER") {
    return (
      <Center className="h-screen">
        <Text>
          {lang === "ru" ? "Недостаточно прав" : "You have no access"}
        </Text>
      </Center>
    );
  }

  if (isLoading)
    return (
      <Center className="h-screen">
        <Loader color="dark" />
      </Center>
    );

  if (isError)
    return (
      <Center className="h-screen">
        <Text>Sorry, something went wrong!</Text>
      </Center>
    );

  if (!session?.user)
    return (
      <Center className="flex min-h-screen flex-col gap-4">
        <Text>You need to login first</Text>
        <LoginButton />
      </Center>
    );

  const ths = (
    <tr>
      <th>User</th>
      <th>Email</th>
      <th>Reviews</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  );

  const rows = users
    .sort((a, b) => b._count.reviews - a._count.reviews)
    .map((user) => (
      <tr key={user.id}>
        <td>
          <Link
            href={`/reviews/author?name=${user.name}&id=${user.id}`}
            className={`font-semibold no-underline decoration-zinc-500 underline-offset-4 hover:underline  ${
              theme.colorScheme === "light" ? "text-zinc-900" : "text-zinc-200"
            }`}
          >
            {user.name}
          </Link>
          {user.id === session.user?.id && (
            <span className="ml-2 text-xs text-teal-600">me</span>
          )}
        </td>
        <td className="text-zinc-500">{user.email}</td>
        <td>{user._count.reviews}</td>
        <td>
          <Select
            size="xs"
            data={[
              { value: "ADMIN", label: "ADMIN" },
              { value: "USER", label: "USER" },
            ]}
            onChange={(role: Role) => handleChangeRole({ id: user.id, role })}
            value={user.role}
          />
        </td>
        <td>
          <ActionIcon onClick={() => handleDeleteUser({ id: user.id })}>
            <IoTrashOutline size={20} className="text-pink-500" />
          </ActionIcon>
        </td>
      </tr>
    ));

  return (
    <div>
      <Navigation />
      <Container className="pb-12">
        <Title order={1} mb={24}>
          {lang === "ru" ? "Админ панель" : "Admin panel"}
        </Title>
        <Table highlightOnHover>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Admin;
