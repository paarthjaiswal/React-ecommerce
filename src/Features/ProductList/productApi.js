export async function fetchalldata() {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    console.log("Api runs");
    return data;
}