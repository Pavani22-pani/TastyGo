import React, { useState, useEffect } from 'react'
import { API_URL } from '../api'
import { Link } from 'react-router-dom'

const FirmCollections = () => {
    const [firmData, setFirmData] = useState([])
    const [selectedRegion, setSelectedRegion] = useState('All')
    const [active, setActive] = useState('all')


    const firmDataHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors`)
            const newFirmData = await response.json()
            setFirmData(newFirmData.vendors)

            // console.log("firmData:",newFirmData)
        } catch (error) {
            alert("Frim Data Not fetched")
            console.error("Firm data not fetched ", error)
        }
    }

    useEffect(() => {
        firmDataHandler()
    }, [])

    const filterHandler = (region, category) => {
        setSelectedRegion(region)
        setActive(category)

    }
    return (
        <>
            <h3>Restuarants with online food delvery in state</h3>
            <div className="filterButtons">
                <button onClick={() => filterHandler('All', 'all')} className={active === 'all' ? 'activeButton' : ''}>All</button>
                <button onClick={() => filterHandler('South-india', 'south-indian')} className={active === 'south-indian' ? 'activeButton' : ''}>South-Indian</button>
                <button onClick={() => filterHandler('North-india', 'north-indian')} className={active === 'north-indian' ? 'activeButton' : ''}>North-Indian</button>
                <button onClick={() => filterHandler('Chinese', 'chinese')} className={active === 'chinese' ? 'activeButton' : ''}>Chinese</button>
                <button onClick={() => filterHandler('Bakery', 'bakery')} className={active === 'bakery' ? 'activeButton' : ''}>Bakery</button>
            </div>
            <section className="firmSection">
                {firmData.map((item) => {
                    const firm = item.firm; // Access the firm object directly

                    if (!firm) return null; // Ensure firm exists before using it

                    if (selectedRegion === 'All' || firm.region.includes(selectedRegion.toLowerCase())) {
                        return (
                            <Link to={`/products/${firm._id}/${firm.firmName}`} className='link' key={firm._id}>
                                <div className="firmGroupBox">
                                    <div className='firmGroup'>
                                        <img src={`${API_URL}${firm.image}`} alt={firm.firmName} />
                                        <div className="firmOffer">{firm.offer}</div>
                                    </div>

                                    <div className="firmDetails">
                                        <strong className='firmName'>{firm.firmName}</strong>
                                        <div className='firmArea'>{firm.region.join(', ')}</div>
                                        <div className='firmArea'>{firm.area}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    }

                    return null;
                })}

            </section>
        </>

    )
}
export default FirmCollections