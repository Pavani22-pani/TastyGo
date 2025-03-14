import React,{useState,useEffect} from 'react'
import { API_URL } from '../api'
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { MutatingDots } from 'react-loader-spinner'

const Chains=()=>{
    const [vendorData, setVendorData] = useState({ vendors: [] });
    const [scrollPositon,setScrollPosition]=useState(0)
    const [loading,setLoading]=useState(true)

    const vendorFirmHandler=async()=>{
        try {
            const response=await fetch(`${API_URL}/vendor/all-vendors`)
            const newData=await response.json()
            setVendorData(newData)

            // console.log("this is api data",newData)
            setLoading(false)

        } catch (error) {
            alert('Failed to Fetch data')
            console.log("Failed to fetch data")
            setLoading(true)
        }
    }
    const handleScroll=(direction)=>{
        const gallery=document.getElementById("chainGallery")
        const scrollAmount=500

        if(direction==="left"){
            gallery.scrollTo({
                left:gallery.scrollLeft-scrollAmount,
                behavior:"smooth"
            })
        }
        else if(direction==="right"){
            gallery.scrollTo({
                left:gallery.scrollLeft+scrollAmount,
                behavior:"smooth"
            })
        }
    }
    useEffect(()=>{
        vendorFirmHandler()
    },[])

    return (
    <div className='mediaChainSection'>
        <div className="loaderSection">
            
        {loading && <>
            <div className='loader'>
            Your 🍔 is Loading....
            </div>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="orangered"
                secondaryColor="orangered"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
       
        </>
        }
        </div>
        <div className="btnSection">
            <button onClick={()=>handleScroll("left")}><FaRegArrowAltCircleLeft className='btnIcon'/></button>
            <button onClick={()=>handleScroll("right")}><FaRegArrowAltCircleRight className='btnIcon'/></button>
        </div>
        <h3>Top Restaurants Chains in State</h3>
        <section className="chainSection" id="chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollLeft)}>
            {vendorData.vendors && vendorData.vendors.map((vendor, index) => (
               <div className="vendorBox" key={vendor.id || index}>
               {vendor.firm && ( // Ensure vendor.firm exists before accessing it
                   <>
                       <div>
                           {/* {vendor.firm.firmName} */}
                       </div>
                       <div className="firmImage" key={vendor.firm.id || index}>
                           <img src={`${API_URL}${vendor.firm.image}`} alt="Restaurant" />
                       </div>
                   </>
               )}
           </div>
           
            ))}
        </section>
    </div>
)
}
 export default Chains




 