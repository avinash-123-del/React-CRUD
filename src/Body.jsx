import React, { useRef, useState } from 'react'


const Body = () => {

    const [data, setData] = useState({ name: '', email: '' })
    const [tableData, settableData] = useState([])
    const [edit,setEdit] = useState(false)
    const [editindex,setEditindex] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        settableData([...tableData, data])
        if(edit){
            const tempEdit = tableData
            Object.assign(tempEdit[editindex] , data)       // to particular data ko edit krna 
            settableData([...tableData])

        setEdit(false)
        setData({name:'',email:''})

        }else{

            setData({
                    name:'',email:''
                })
                setEdit(false)
            
            }
        }

    function handleChange(e) {
        setData({
                ...data,
                [e.target.name]: e.target.value
            })}

    function handleDelete(index) {
        settableData(tableData.filter((item,id) => id !== index))
    }
 
    function handleEdit(index) {
        const temData = tableData[index]
        setData({
            name:temData.name,
            email:temData.email
        })
        setEdit(true)
        setEditindex(index)
    }

    return (
        <div className=' text-white'>

            <div className='flex items-center justify-center mt-[100px]'>
                <form action="" onSubmit={handleSubmit}>
                    <input
                        className='text-black' type="text" placeholder='Name'
                        onChange={handleChange}
                        value={data.name}
                        name='name' />

                    <input
                        className='text-black' type="text" placeholder='email'
                        onChange={handleChange}
                        value={data.email}
                        name='email' />

                    <br /><br />
                    <button className='border-2 p-2'>{edit ? 'update' : 'submit'}</button>
                </form>


            </div>
            <br /><br />
            <table className='w-[70%] text-justify  m-auto'>
                <thead>
                    <tr className=''>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        tableData.map((item,index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <button  className='mx-2' onClick={() => handleEdit(index)} >edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </tr>
                        ))
                    }

                </tbody>



            </table>
        </div>

    )
}

export default Body