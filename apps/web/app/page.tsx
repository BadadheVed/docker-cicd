import { dbClient } from "db/client"; // adjust import path if needed
import { User } from "@prisma/client";

export default async function Home() {
  const users: User[] = await dbClient.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} - {u.password}
          </li>
        ))}
      </ul>
    </div>
  );
}
export const dynamic = "force-dynamic";
