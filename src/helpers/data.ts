export async function getPosts() {
  const res = await fetch('https://...');
  const posts = await res.json();
  return posts;
}
