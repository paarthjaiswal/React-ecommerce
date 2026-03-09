export async function fetchalldata() {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    console.log("Api runs");
    return data;
}
export async function fetchbyfilter(filter){   
    let querystring =""  
    for(let key  in filter){
        querystring += `${key}=${filter[key]}&`
    }
    const res = await fetch(`http://localhost:3000/products?${querystring}`);
    const data = await res.json();
    console.log("Api runs" + querystring);
    return data;
}
export async function fetchcatagories(){
    const res = await fetch('http://localhost:3000/categorys');
    const data = await res.json();
    return data;
}
export async function fetchbrands(){
    const res = await fetch('http://localhost:3000/brands');
    const data = await res.json();
    return data;
}
export async function fetchproductbyid(id){
    const res = await fetch(`http://localhost:3000/products/${id}`);
    const data = await res.json();
    return data;
}



