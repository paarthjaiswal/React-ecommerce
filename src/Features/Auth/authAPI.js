export function creatuser(data){
    return new Promise( async (resolve)=>{
    const res = await fetch('http://localhost:3000/users',{
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
    return new Promise( async (resolve,reject)=>{
        const email = data.email
        const pass = data.password
        const datas = await fetch(`http://localhost:3000/users?email=${email}`)
        const res = await datas.json()
        console.log("API res "+ res.length);
        if(res.length>0){
            if( pass === res[0].password){
                resolve(res[0])
            }
        }else(
                reject({message : "user not found"})
            )
    })
}