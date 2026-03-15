export function addtoCart(data){
    return new Promise( async (resolve)=>{
    const res = await fetch('http://localhost:3000/cart',{
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

export function getCartbyuser(email){
    return new Promise( async (resolve)=>{
        console.log("fetch cart by id"+email);
    const res = await fetch(`http://localhost:3000/cart?userId=${email}`);
    const result = await res.json()
    console.log("api get data");
    console.log(result);
    resolve(result)
    })
}

export function updateCart(update){
    ///// its is broken as data is broken 
    return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3000/cart?userId='+update.userId+'&title='+update.title, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    console.log("update cart with userId:" + update.userId)
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteCartItem(data){
//     it wont work we fix it later 
return data
}