import styles from "./Post.module.scss";

async function GetUsers() {
  const res = await fetch("http://localhost:3000/api/users");

  if (!res.ok) {
    const errorText = await res.text();
    console.log("Error response:", errorText);
    throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
  }
  const data = await res.json();
  return data;
}

export default async function Post({ children }) {
  let users = [];
  users = await GetUsers();
  console.log(users);
  return <div className={styles.container}>{children}</div>;
}
