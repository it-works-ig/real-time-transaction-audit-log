import React, { useState } from 'react';

const TransactionTable = ({ transactions }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  // AI-GENERATED LOGIC FOR SORTING
  const sortedTransactions = [...transactions].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortOrder === 'asc' 
      ? (aValue > bValue ? 1 : -1) 
      : (aValue < bValue ? 1 : -1);
  });

  const handleSort = (field) => {
    const order = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            {['id', 'senderId', 'receiverId', 'amount', 'timestamp'].map((header) => (
              <th 
                key={header} 
                onClick={() => handleSort(header)}
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-blue-600"
              >
                {header} {sortField === header ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedTransactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm">TXN-{tx.id}</td>
              <td className="px-6 py-4 text-sm font-semibold">User {tx.senderId}</td>
              <td className="px-6 py-4 text-sm font-semibold text-green-600">User {tx.receiverId}</td>
              <td className="px-6 py-4 text-sm font-bold">${tx.amount.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{new Date(tx.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;