import { Elysia } from "elysia";

interface User {
  id: number;
  name: string;
  email: string;
}

const app = new Elysia();

let users: User[] = [
  { id: 1, name: "John Doe", email: "john@gmail.com" },
  { id: 2, name: "Jane Doe", email: "jane@gmail.com" },
];

app.get("/users/:id", ({ params }) => {
  const user = users.find((u) => u.id === Number(params.id));
  return user || { error: "User not found" };
});

app.post("/users", async ({ body }) => {
  const newUser: User = { id: users.length + 1, ...body };
  users.push(newUser);
  return newUser;
});

app.put("/users/:id", async ({ params, body }) => {
  const userIndex = users.findIndex((u) => u.id === Number(params.id));
  if (userIndex === -1) {
    return { error: "User not found" };
  }

  users[userIndex] = { ...users[userIndex], ...body };
  return users[userIndex];
});

app.delete("/users/:id", ({ params }) => {
  const userIndex = users.findIndex((u) => u.id === Number(params.id));
  if (userIndex === -1) {
    return { error: "User not found" };
  }
  const deletedUser = users.splice(userIndex, 1);
  return deletedUser[0];
});

app.listen(4000, () => {
  console.log("Server running on http://127.0.0.1:4000");
});
