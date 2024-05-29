import React, { useEffect, useState } from 'react'
import "./home.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ListDetails } from '../components/ListDetails/ListDetails'
import { AddEditPopup } from '../components/AddEditPopup/AddEditPopup'
import { Filters } from '../components/Filters/Filters'
import { filterInventoryApi, listApi, searchInventoryApi } from '../service/ApiCalls'
export const Home = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [addEnable, setAddEnable] = useState(false)
    const [editEnable, setEditEnable] = useState(false)
    const [deleteEnable, setDeleteEnable] = useState(false)
    const [deviceType, setDeviceType] = useState("")
    const [model, setModel] = useState("")
    const [simType, setSimType] = useState("")
    const [list, setList] = useState([])
    const [searchEnable, setSearchEnable] = useState(false)
    const [filterEnable, setFilterEnable] = useState(false)

    const [editId, setEditId] = useState(0)
    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }
    const handleSearchEnter = async () => {
        if (searchQuery.length == 15) {
            const result = await searchInventoryApi(searchQuery)
            console.log(result)
            setSearchEnable(false)
            setList(result)
        }
        else {
            alert("Please Enter IMEI characters 15")
        }
    }
    const handleFilterSearch = async () => {
        const result = await filterInventoryApi(deviceType, model, simType)
        console.log(result)
        setFilterEnable(false)
        setList(result)
    }

    useEffect(() => {
        function handle(e) {
            if (e.target.className === "addedit-popup-parent") {
                setAddEnable(false)
                setEditEnable(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    })
    useEffect(() => {
        const handle = async () => {
            try {
                const result = await listApi()
                console.log(result)
                setList(result)
            } catch (error) {
                console.error('Error in fetching list : ', error);
            }
        }
        handle()
    }, [editEnable, addEnable, deleteEnable, searchEnable,filterEnable])
    // console.log(deleteEnable)
    return (
        <div className='home-container'>
            <h1 className='heading'>Physical Device Inventory Management</h1>
            <div className='search-wrapper'>
                <div className='search-container'>
                    <input type="text" placeholder='Enter ' value={searchQuery} onChange={handleSearch} className={searchQuery.length > 0 && 'active'} />
                    <div className='search-icon'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
                    </div>
                    <div className='add-container'>
                        <button className='btn search' onClick={handleSearchEnter}>
                             Search
                        </button>
                    </div>
                    <div className='add-container'>
                        <button className='btn add' onClick={() => setAddEnable(true)}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div className='filter-search'>
                <Filters setDeviceType={setDeviceType} setModel={setModel} setSimType={setSimType} />
                <div className='add-container'>
                    <button className=' filter ' onClick={handleFilterSearch}>
                    Filter Search
                    </button>
                </div>
            </div>
            <ListDetails deleteEnable={deleteEnable} setEditEnable={setEditEnable} list={list} setEditId={setEditId} setDeleteEnable={setDeleteEnable} />
            {
                (addEnable || editEnable) &&
                <div className='addedit-popup-parent'>
                    <div className='addedit-popup'>
                        <div className='close-icon' onClick={() => { setAddEnable(false); setEditEnable(false) }}>
                            <FontAwesomeIcon icon={faClose} size='2xl' />
                        </div>
                        <AddEditPopup editId={editId} setAddEnable={setAddEnable} setEditEnable={setEditEnable} addEnable={addEnable} editEnable={editEnable} />
                    </div>
                </div>
            }
        </div>
    )
}