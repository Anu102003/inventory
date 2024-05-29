import React, { useEffect, useState } from 'react'
import './listDetails.scss'
import { TableHeading } from '../../mock'
import { PasswordPopup } from '../PasswordPopup/PasswordPopup'

export const ListDetails = ({ deleteEnable,setEditEnable, list, setEditId, setDeleteEnable }) => {
    const [pswEditEnable, setPswEditEnable] = useState(false)
    const [pswDeleteEnable, setPswDeleteEnable] = useState(false)
    const[deleteId,setDeleteId]=useState("")
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "psw-popup-parent") {
                setPswEditEnable(false)
                setPswDeleteEnable(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    const handleEdit = (id) => {
        console.log("c", id)
        setEditId(id)
        setPswEditEnable(true)
    }
    const handleDelete = (id) => {
        setDeleteId(id)
        setPswDeleteEnable(true)
    }
    
    return (
        <div className='list-container'>
            <table>
                <thead>
                    {
                        TableHeading.map((list) => (
                            <td>
                                {list.type}
                            </td>
                        ))
                    }
                </thead>
                {
                    list && list.map((list, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{list.imei}</td>
                            <td>{list.deviceType}</td>
                            <td>{list.model}</td>
                            <td>{list.simType}</td>
                            <td>{list.currentHolder}</td>
                            <td>{list.previousHolder}</td>
                            <td>{new Date(list.entryCreatedDate).toLocaleString()}</td>
                            <td>{new Date(list.lastUpdatedDate).toLocaleString()}</td>
                            <td>{list.remarks}</td>
                            <td>{list.businessNeeded}</td>
                            <td>
                                <div className='actions-container'>
                                    <button className='btn edit' onClick={() => { handleEdit(list.id) }}>
                                        Edit
                                    </button>
                                    <button className='btn delete' onClick={() => { handleDelete(list.id) }}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

            </table>
            {
                (pswEditEnable || pswDeleteEnable) &&
                <div className='psw-popup-parent'>
                    <div className='psw-popup'>
                        {/* <div className='close-icon' onClick={() => { setPswEnable(false);}}>
                            <FontAwesomeIcon icon={faClose} size='2xl' />
                        </div> */}
                        <PasswordPopup deleteEnable={deleteEnable} deleteId={deleteId} setDeleteEnable={setDeleteEnable} pswDeleteEnable={pswDeleteEnable} setEditEnable={setEditEnable} setPswEditEnable={setPswEditEnable} setPswDeleteEnable={setPswDeleteEnable} />
                    </div>
                </div>
            }
        </div >
    )
}
