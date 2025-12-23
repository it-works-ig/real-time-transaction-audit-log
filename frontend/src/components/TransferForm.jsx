import React, { useState } from 'react';

const TransferForm = ({ onTransferSuccess }) => {
  const [formData, setFormData] = useState({ senderId: '', receiverId: '', amount: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Transfer Successful!");
        setFormData({ ...formData, amount: '' }); // Clear amount
        onTransferSuccess(); // Trigger UI update
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Server is not running. Start the backend first.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Send Money</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input 
          type="number" placeholder="Your ID (Sender)" required
          className="border p-2 rounded"
          value={formData.senderId}
          onChange={(e) => setFormData({...formData, senderId: e.target.value})}
        />
        <input 
          type="number" placeholder="Receiver ID" required
          className="border p-2 rounded"
          value={formData.receiverId}
          onChange={(e) => setFormData({...formData, receiverId: e.target.value})}
        />
        <input 
          type="number" placeholder="Amount ($)" required
          className="border p-2 rounded"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
        />
      </div>
      <button 
        type="submit" disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Processing..." : "Transfer Now"}
      </button>
    </form>
  );
};

export default TransferForm;