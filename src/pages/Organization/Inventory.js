import React from 'react'
import moment from 'moment'
import '../../styles/Analytics.css'
import '../../styles/Admin.css'


const Inventory = (props) => {
    let arr = props.data;
    console.log(arr);

    return (
        <>
            <div className='mb-2'>
                <div className='table-responsive-md mt-2' >
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">Blood Group</th>
                                <th scope="col">InventoryType</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">{props.name} Email</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arr.map((res) => {
                                    return (
                                        <tr key={res.id}>
                                            <td>{res.bloodGroup}</td>
                                            <td>{res.inventoryType}</td>
                                            <td>{res.quantity} (ML)</td>
                                            <td>{res.donarEmail}  </td>
                                            <td>{res.date}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>


    )
}

export default Inventory
