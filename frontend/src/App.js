import React, { useState, useEffect, useCallback } from 'react';
import TransferForm from './components/TransferForm';
import TransactionTable from './components/TransactionTable';

function App() {
  const [history, setHistory] = useState([]);
  const [currentViewId, setCurrentViewId] = useState(1); // Default view User 1

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/history/${currentViewId}`);
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [currentViewId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Tailwind CDN Injection */}
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">P2P Fund Transfer System</h1>
        
        <TransferForm onTransferSuccess={fetchHistory} />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Audit Log (Immutable History)</h2>
          <div className="flex items-center gap-2">
            <span>Viewing ID:</span>
            <input 
              type="number" value={currentViewId}
              onChange={(e) => setCurrentViewId(e.target.value)}
              className="w-16 p-1 border rounded"
            />
          </div>
        </div>

        <TransactionTable transactions={history} />
      </div>
    </div>
  );
}

export default App;