// ✅ Tiny helper to keep the code perfectly clean
const getToken = () => localStorage.getItem('jwt_token');

export function addtoCart(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch('http://localhost:8080/cart/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // ✅ Token added!
        },
      });
      const result = await res.json();
      resolve(result);
    } catch (error) { reject(error); }
  });
}

export function getCartbyuser() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost:8080/cart/usercart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        }
      });
      if (res.ok) {
        const result = await res.json();
        resolve(result);
      } else {
        const error = await res.json();
        reject(error);
      }
    } catch (error) { reject(error); }
  });
}

export function updateCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost:8080/cart/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: item.quantity }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // ✅ Token added!
        },
      });
      const result = await res.json();
      if (res.ok) resolve(result);
      else reject(result);
    } catch (error) { reject(error); }
  });
}

export function deleteCartItem(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // ✅ Token added!
        },
      });
      const result = await res.json();
      if (res.ok) resolve({ id: itemId });
      else reject(result);
    } catch (error) { reject(error); }
  });
}

// ✅ Removed userId parameter
export function clearCart() {
  return new Promise(async (resolve, reject) => {
    try {
      // ✅ Hit the clean URL
      const res = await fetch(`http://localhost:8080/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // ✅ Token added!
        },
      });
      const result = await res.json();
      if (res.ok) resolve(result);
      else reject(result);
    } catch (error) { reject(error); }
  });
}