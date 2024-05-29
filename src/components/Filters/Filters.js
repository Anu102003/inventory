import React, { useEffect, useState } from 'react'
import "./filters.scss"
import { filterApi } from '../../service/ApiCalls'
export const Filters = ({ setDeviceType, setModel, setSimType }) => {
    const [deviceTypeList, setDeviceTypeList] = useState([])
    const [modelList, setModelList] = useState([])
    const [simTypeList, setSimTypeList] = useState([])

    const [deviceTypeValue, setDeviceTypeValue] = useState("")
    const [modelValue, setModelValue] = useState("")
    const [simTypeValue, setSimTypeValue] = useState("")

    const handleDeviceTypeChange = (e) => {
        setDeviceTypeValue(e.target.value)
        setDeviceType(e.target.value)
    };
    const handleModelChange = (e) => {
        setModelValue(e.target.value)
        setModel(e.target.value)
    };
    const handleSimTypeChange = (e) => {
        setSimTypeValue(e.target.value)
        setSimType(e.target.value)
    };

    useEffect(() => {
        const handle = async () => {
            try {
                const result = await filterApi("DeviceType")
                setDeviceTypeList(result)
            } catch (error) {
                console.error('Error in fetching deviceTypeValue : ', error);
            }
        }
        handle()
    }, [deviceTypeValue])

    useEffect(() => {
        const handle = async () => {
            try {
                const result = await filterApi("Model")
                setModelList(result)
            } catch (error) {
                console.error('Error in fetching modelValue : ', error);
            }
        }
        handle()
    }, [modelValue])

    useEffect(() => {
        const handle = async () => {
            try {
                const result = await filterApi("Sim")
                setSimTypeList(result)
            } catch (error) {
                console.error('Error in fetching simTypeValue : ', error);
            }
        }
        handle()
    }, [simTypeValue])

    if (!Array.isArray(deviceTypeList)) {
        console.error('deviceTypeList is not an array!');
        return null;
    }
    if (!Array.isArray(modelList)) {
        console.error('modelList is not an array!');
        return null;
    }
    if (!Array.isArray(simTypeList)) {
        console.error('simTypeList is not an array!');
        return null;
    }
    return (
        <div className='filter-container'>
            <div className='filter-items'>

                <select className="options" name="deviceType" id="deviceType" onChange={handleDeviceTypeChange}>
                    <option value="">Device Type</option>
                    {
                        deviceTypeList && deviceTypeList.map((list) => (
                            <option value={list}>{list}</option>
                        ))
                    }
                </select>
            </div>
            <div className='filter-items'>
                <select className="options" name="model" id="model" onChange={handleModelChange}>
                    <option value="">Model</option>
                    {
                        modelList.map((list) => (
                            <option value={list}>{list}</option>
                        ))
                    }
                </select>
            </div>
            <div className='filter-items'>
                <select className="options" name="model" id="model" onChange={handleSimTypeChange}>
                    <option value="">SIM Type</option>
                    {
                        simTypeList.map((list) => (
                            <option value={list}>{list}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}
