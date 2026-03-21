export function addtoCart(data){
    return new Promise( async (resolve)=>{
    const res = await fetch('http://localhost:8080/cart/',{
        method:'POST',
        body:JSON.stringify(data), 
        headers:{
            'Content-Type':'application/json'
        },
    })
    console.log("cart to added");
    const result = await res.json()
resolve(result)
    })
}

export function getCartbyuser(data){
    console.log(data);
    console.log("get cart by user");

    return new Promise( async (resolve)=>{
        console.log("fetch cart by id"+data);
    const res = await fetch(`http://localhost:8080/cart/Id=${data}`);
    const result = await res.json()
    console.log("api get data");
    console.log(result);
    resolve(result)
    })
}

export function updateCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost:8080/cart/${item.id}`, {
        method: 'PATCH',
        // ✅ FIX: Only send the quantity! Mongoose will happily accept this.
        body: JSON.stringify({ quantity: item.quantity }), 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      
      if (res.ok) {
        resolve(result);
      } else {
        reject(result);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function deleteCartItem(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      // ✅ FIX 1: Attach the itemId directly to the URL string
      const res = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // ✅ FIX 2: Completely remove the JSON body! 
        // DELETE requests generally do not have bodies.
      });

      const result = await res.json();
      
      if (res.ok) {
        // Redux usually needs the ID back so it knows which item to wipe off the screen
        resolve({ id: itemId }); 
      } else {
        reject(result);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function clearCart(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      // Notice we are targeting the /clear/ route we just made
      const res = await fetch(`http://localhost:8080/cart/clear/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      
      if (res.ok) {
        resolve(result);
      } else {
        reject(result);
      }
    } catch (error) {
      reject(error);
    }
  });
}