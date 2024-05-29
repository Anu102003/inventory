import React, { useState } from 'react'
import "./PasswordPopup.scss"
import { deleteInventoryApi } from '../../service/ApiCalls'
export const PasswordPopup = ({deleteEnable,deleteId, setEditEnable, setDeleteEnable,pswDeleteEnable, setPswEditEnable, setPswDeleteEnable }) => {
    const [pwd, setPwd] = useState("")
    const [error, setError] = useState(false)
    const handlePwd = (e) => {
        setPwd(e.target.value)
    }
    const handleSubmit = async() => {
        if (pwd == "d") {
            if (pswDeleteEnable) {
                const isConfirmed = window.confirm("Are you sure you want to delete this item?");
                if (isConfirmed) {
                    const result = await deleteInventoryApi(deleteId)
                    setDeleteEnable(false)
                    window.alert("Click ok to continue")
                }
                // console.log(deleteId,pswDeleteEnable)
                setDeleteEnable(!deleteEnable)
                setPswDeleteEnable(false)
            } else {
                setEditEnable(true)
                setPswEditEnable(false)
            }
        } else {
            setError(true)
        }
    }
    return (
        <div className='pwd-popup-container'>
            <p className='h1'>Enter Correct Password :</p>
            <div className='pwd-input-container'>
                <input type="text" placeholder='Enter Password' value={pwd} onChange={handlePwd}></input>
            </div>
            <div className='submit-container'>
                <button className="btn submit" onClick={handleSubmit}>Submit</button>
            </div>
            {
                error &&
                <p className='error'>Password Incorrect</p>
            }
        </div>
    )
}
