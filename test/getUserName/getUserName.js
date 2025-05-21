export function getUserName() {
  const stored = localStorage.getItem("user");
  if (!stored) return null;

  const user = JSON.parse(stored);
  return user.name || null;
}
