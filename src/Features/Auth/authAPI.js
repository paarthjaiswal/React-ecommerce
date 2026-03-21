export function creatuser(data){
    return new Promise( async (resolve)=>{
    const res = await fetch('http://localhost:8080/auth/signup',{
        method:'POST',
        body:JSON.stringify(data), 
        headers:{
            'Content-Type':'application/json'
        },
    })
    console.log("tuk tuk");
    const result = await res.json()
    //TODO : only riturn usefull info 
resolve(result)
    })
}

export function checkUser(data){
   return new Promise(async (resolve, reject) => {
  try {
    // 1. Send a POST request with the data attached to the body
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    // 2. Parse the JSON response from Express
    const responseData = await response.json();
    console.log("login api")
    console.log(responseData);

    // 3. Check the HTTP Status Code
    if (response.ok) {
      // If Express sent res.status(200), the login was successful!
      // Resolve with the user data (id, email, name, addresses)
      resolve(responseData); 
    } else {
      // If Express sent res.status(401), the login failed.
      // Reject with the error message Express sent ('invalid credentials' or 'no such user')
      reject({ message: responseData.message });
    }
    
  } catch (error) {
    // This catches network errors (like if your Express server is turned off)
    reject({ message: "Network error connecting to server" });
  }
});
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function signOutUser(data) {
    return new Promise(async (resolve) =>{
        
        ///// will to later on server side 
        resolve(data)
    })
}