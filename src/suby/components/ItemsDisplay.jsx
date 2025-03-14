import React,{useState} from 'react'
import {itemData} from '../data'
const ItemsDisplay=()=>{
    const [displayItem,setDisplayItem]=useState(itemData)
   // console.log('this is dataa',displayItem)
    return (
       <>
        <div className="itemSection">
            {displayItem.map((item)=>{
                return (
                    <div className="gallery" key={item.item_image}>
                        <img src={item.item_image} alt={item.item_image}/>
                    </div>
                )
            })}
        </div>
       </>    
       
    )
}
 export default ItemsDisplay