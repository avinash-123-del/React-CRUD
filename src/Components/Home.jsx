import React, { useState } from 'react'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import EditIcon from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash';
const Home = () => {
    const [input, setInput] = useState({ name: '', email: '', contact: '' })
    const [tableData, setTableData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [search, setSearch] = useState('')
    const [searchIcon, setSearchIcon] = useState(false)

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (edit) {
            Object.assign(tableData[editIndex], input)
            setTableData([...tableData])
            setInput({
                name: '', email: '', contact: ''
            })
            setEdit(false)
        }
        else {
            setInput({
                name: '', email: '', contact: ''
            })
            setTableData([...tableData, input])
        }
    }

    function handleDelete(index) {
        setTableData(tableData.filter((item, id) => id !== index))
    }

    function handleEdit(index) {
        setInput({
            name: tableData[index].name,
            email: tableData[index].email,
            contact: tableData[index].contact
        })
        setEditIndex(index)
        setEdit(true)
    }


    return (

        <div className='text-center bg-gradient-to-b from-yellow-500 to to-stone-200 h-screen' >
            <div className='sm:w-[80%] w-[100%] m-auto p-6'>

                <div className='flex justify-end items-center relative'>
                    <input type="text"
                        className={` rounded-lg focus:outline-none fixed transition-all duration-300 ease-in bg-yellow-100 ${searchIcon ? 'w-[200px] px-2 py-1' : 'w-0'}`}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='search by name' />
                    <span className='absolute right-0 rounded-lg bg-green-500 p-2' onClick={() => setSearchIcon(!searchIcon)}><PiMagnifyingGlassBold /></span><br />
                </div>

                <form action="" onSubmit={handleSubmit}
                    className='text-center mt-[100px] flex flex-col justify-center items-center gap-4 '>
                    <input type="text"
                        name='name'
                        required
                        placeholder='Enter Name'
                        value={input.name}
                        onChange={handleChange} />

                    <input type="text"
                        name='email'
                        required
                        placeholder='Enteremail@.com'
                        value={input.email}
                        onChange={handleChange} />

                    <input type="number"
                        name='contact'
                        required
                        maxLength="5"
                        placeholder='0000000000'
                        value={input.contact}
                        onChange={handleChange} />

                    <button className='bg-gradient-to-r from-blue-500 to-blue-800 text-white px-3 py-1 rounded-lg'>{edit ? 'update' : 'submit'}</button>
                </form>
                <br /><br />

                <table className='w-full m-auto'>
                    <thead>
                        <tr className='font-bold items-start'>
                            <td>Names</td>
                            <td>Emails</td>
                            <td>Contacts</td>
                            <td>Actions</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tableData.filter((data) => (
                                search.toLowerCase() === '' ? data :
                                    data.name.toLowerCase().includes(search)
                            ))
                                .map((item, index) => (
                                       <tr key={index} className='border-2 border-x-transparent border-gray-500 '>
                                        <td >{item.name}</td>
                                        <td width={10}>{item.email}</td>
                                        <td>{item.contact}</td>
                                        <div className='flex justify-center items-center gap-1 sm:gap-3 my-1'>
                                            <button onClick={() => handleEdit(index)} className='edit'><EditIcon /></button>
                                            <button onClick={() => handleDelete(index)} className='delete'><TrashIcon /></button>
                                        </div>
                                    </tr>
                                    
                                ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Home
