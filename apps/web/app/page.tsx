import Image, { type ImageProps } from "next/image";
import { dbClient } from "db/client";

export default async function Home() {
  const users = await dbClient.user.findMany();

  return (
    <div>
      users are
      <ol>
        {users.map((user) => (
          <li>
            {user.username} , {user.id}
          </li>
        ))}
      </ol>
    </div>
  );
}
