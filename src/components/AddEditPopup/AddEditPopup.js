import React, { useEffect, useState } from 'react'
import "./addEditPopup.scss"
import { InputContainer } from '../InputContainer/InputContainer'
import { createInventoryApi, editInventoryApi, particularInventoryApi } from '../../service/ApiCalls'
export const AddEditPopup = ({ addEnable, editId,editEnable, setAddEnable, setEditEnable }) => {
    const initialState = {
        imei: "",
        deviceType: "",
        model: "",
        simType: "",
        currentHolder: "",
        previousHolder: "",
        remarks: "",
        businessNeeded: "",
        entryCreatedDate: "",
    }
    const [formData, setFormData] = useState(initialState)
    useEffect(() => {
        if (editEnable) {
            const handle = async () => {
                try {
                    const result = await particularInventoryApi(editId)
                    setFormData(result)
                } catch (error) {
                    console.error('Error in fetching particular list : ', error);
                }
            }
            handle()
        }
    }, [editEnable])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    // const handleDateChange = (e) => {
    //     const { name, value } = e.target;
    //     const date = new Date(value);
    //     const formatDate = (date) => {
    //         const year = date.getFullYear();
    //         const month = String(date.getMonth() + 1).padStart(2, '0');
    //         const day = String(date.getDate()).padStart(2, '0');
    //         const hours = String(date.getHours()).padStart(2, '0');
    //         const minutes = String(date.getMinutes()).padStart(2, '0');
    //         const seconds = String(date.getSeconds()).padStart(2, '0');

    //         return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    //     };
    //     const formattedDate = formatDate(date);
    //     setFormData(prevState => ({ ...prevState, [name]: formattedDate }));
    // };
    const input = [
        {
            type: "text",
            name: "imei",
            placeholder: "Enter IMEI",
            value: formData.imei,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "deviceType",
            placeholder: "Enter Device Type",
            value: formData.deviceType,
            handleChange: handleChange
        }, {
            type: "text",
            name: "model",
            placeholder: "Enter Model",
            value: formData.model,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "simType",
            placeholder: "Enter Sim Type",
            value: formData.simType,
            handleChange: handleChange
        }, {
            type: "text",
            name: "currentHolder",
            placeholder: "Enter Current Holder",
            value: formData.currentHolder,
            handleChange: handleChange
        }, {
            type: "text",
            name: "previousHolder",
            placeholder: "Enter Previous Holder",
            value: formData.previousHolder,
            handleChange: handleChange
        }, {
            type: "datetime-local",
            name: "entryCreatedDate",
            placeholder: "Enter Entry Created Date",
            value: formData.entryCreatedDate,
            handleChange: handleChange
        }, {
            type: "datetime-local",
            name: "lastUpdatedDate",
            placeholder: "Enter Last Updated Date",
            value: formData.lastUpdatedDate,
            handleChange: handleChange
        }, {
            type: "text",
            name: "remarks",
            placeholder: "Enter Remarks",
            value: formData.remarks,
            handleChange: handleChange
        }, {
            type: "text",
            name: "businessNeeded",
            placeholder: "Enter Business Needed",
            value: formData.businessNeeded,
            handleChange: handleChange
        },
    ]
    const validation = (
        formData?.imei !== '')
    // console.log(formData, editEnable, addEnable)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation) {
            try {
                if (editEnable) {
                    const result=await editInventoryApi(editId,formData)
                    // console.log(result)
                    window.alert(result.data.message)
                    setEditEnable(false)
                } else {
                    const result = await createInventoryApi(formData)
                    // console.log(result.data)
                    alert(result.data.message)
                    setAddEnable(false)
                }
                setFormData(initialState);

            } catch (error) {
                console.error('Error adding document: ', error);
                alert(error?.response?.data);
            }
        } else {
            alert('Fill form fields');
        }
    }
    return (
        <div className='addedit-popup-container'>

            <p className='h1'>
                {editEnable && "Edit Inventory"}
                {addEnable && "Add Inventory"}</p>
            {
                input.map((input, index) => (
                    <InputContainer type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                ))
            }
            {/* <div className='form-fields'>
                <p className='label'>Enter Entry Created Date :</p>
                <input type="datetime-local"
                    name="entryCreatedDate"
                    placeholder="Enter Entry Created Date"
                    value={formData.entryCreatedDate === "" ? "" : formData.entryCreatedDate}
                    onChange={handleDateChange}
                    autoComplete='off' />
            </div> */}
            <div className="submit-container">
                <button type="submit" className="btn submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
