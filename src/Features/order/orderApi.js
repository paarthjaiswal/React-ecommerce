export function createOrder(order) {
    console.log(order);
    console.log("order i placing ");
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}