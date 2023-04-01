import React from 'react'
import './PurchaseHistory.css'
export default function PurchaseHistory({ purchaseData }) {
  return (
    <div>
    <h2 className='purchaseHistoryTitle'> My Purchases</h2>
    <table className='purchaseTable'>
      <thead>
        <tr>
          <th> Image </th>
          <th>Product Name</th>
          <th>Date of Purchase</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Transaction ID*</th>
        </tr>
      </thead>
      <tbody>
        {purchaseData.map(({ date, amount, id }) => (
          <tr key={id}>
            <td></td>
            <td></td>
            <td>{date}</td>
            <td></td>
            <td></td>
            <td>${amount}</td>
            <td>{id}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className='note'> *Note: Please mention your Transaction ID when contacting us for your past orders.</p>
    </div>
  )
}
