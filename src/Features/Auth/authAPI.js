const getToken = () => localStorage.getItem('jwt_token');
export function creatuser(data) {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      const result = await res.json();

      if (res.ok) {
        // ✅ BUG FIXED: Store the token in the browser vault immediately!
        if (result.token) {
          localStorage.setItem('jwt_token', result.token);
          console.log("Signup token saved to vault!");
        }
        
        // Return the data so Redux can log the user in visually
        resolve(result); 
      } else {
        reject(result);
      }
    } catch (error) {
      reject(error);
    }
  })
}

export function checkUser(data) {
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
        localStorage.setItem('jwt_token', responseData.token)
        console.log("done with jwt")
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
  return new Promise(async (resolve,reject) => {
   try {
      // ✅ Hit the clean '/own' route exactly as it is!
      const response = await fetch('http://localhost:8080/users/own', {
        method: 'PATCH',
        // 'update' contains the new addresses array you dispatched
        body: JSON.stringify(update), 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOutUser(data) {
  return new Promise(async (resolve) => {
    localStorage.removeItem('jwt_token');
    ///// will to later on server side 
    resolve(data)
  })
}


export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      // If there is no token in the vault, immediately reject. They are logged out.
      if (!token) {
        return reject({ message: "No token found" });
      }

      // If there IS a token, ask the backend who it belongs to!
      const response = await fetch('http://localhost:8080/users/own', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        // The token is valid! Return the user profile data.
        resolve({ data }); 
      } else {
        // The token is expired or fake. Destroy it and reject.
        localStorage.removeItem('jwt_token');
        reject({ message: "Token invalid or expired" });
      }
    } catch (error) {
      reject(error);
    }
  });
}