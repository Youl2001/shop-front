import './Shop.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
const Item=props=>{
        return (<div onClick={e=>props.callback(props.id)}>
                <img src={props.img} width={200} height={200}/><br/>
                id: {props.id}<br/>
                Name: {props.name}<br/>
                Price: {props.price}<br/>
        </div>)
}
export default function Shop(){
        const baseURL="http://localhost:3001";
        const [cart,setCart]=useState([]);
        const [products,setProduct]=useState([]);
        useEffect(()=>{
                axios.get(baseURL+"/api/products").then((response)=>{
                        setProduct(response.data);
                })
        },[]);
        const handleClick=id=>{
                 alert("Add success")
                setCart([...cart,products[id]])
        }
const clearCart=()=>{
        setCart([]);
}
        let total=0;
        const productList = products.map(item=><Item callback={handleClick} {...item}/>);
        const cartlist = cart.map(item=><div>id{item.id}{item.name}{item.price}</div>)
        for(let i=0;i<cart.length;i++) total+=cart[i].price
        return (<><div className="grid-container">{productList}</div>
        <h1>Cart</h1>
        <button onClick={()=>clearCart()}>Clear All</button>
        {cartlist}
        <h2>Total: {total} baht</h2>
        </>)
}