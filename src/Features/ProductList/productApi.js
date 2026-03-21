export async function fetchalldata() {
    const res = await fetch('http://localhost:8080/products');
    const data = await res.json();
    console.log("Api fetchalldata");
    console.log(data);
    return data;
}
export async function fetchbyfilter(filter){   
    let querystring =""  
    for(let key  in filter){
        querystring += `${key}=${filter[key]}&`
    }
    const res = await fetch(`http://localhost:8080/products?${querystring}`);
    const data = await res.json();
    console.log("Api runs" + querystring);
    console.log("Api fetchbyfilter");
    console.log(data);
    return data;
}

export async function fetchcatagories(){
    const res = await fetch('http://localhost:8080/categories');
    const data = await res.json();
    console.log("Api fetch catagories");
    console.log(data);
    return data;
}
export async function fetchbrands(){
    const res = await fetch('http://localhost:8080/brands');
    const data = await res.json();
    console.log("Api fetch brands");
    console.log(data);
    return data;
}
export async function fetchproductbyid(id){
    const res = await fetch(`http://localhost:8080/products/${id}`);
    const data = await res.json();
    console.log("Api fetch product by id");
    console.log(data);
    return data;
}



