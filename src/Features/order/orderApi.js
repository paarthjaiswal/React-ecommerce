// ✅ Helper function to grab the token
const getToken = () => localStorage.getItem('jwt_token');

export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // ✅ Token attached
        },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

// ✅ Removed the userId argument entirely
export function fetchOrdersByUser() {
  return new Promise(async (resolve, reject) => {
    try {
      // ✅ Hit the new /own route
      const response = await fetch('http://localhost:8080/orders/own', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getToken()}` // ✅ Token attached
        },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/orders/' + order.id, {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // ✅ Token attached
        },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteOrder(orderId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/orders/' + orderId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // ✅ Token attached
        },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}