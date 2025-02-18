import React, { useState } from 'react';
import { Plus, X, ChevronRight, Building2, Download } from 'lucide-react';
import { JobForm } from './components/JobForm';
import { JobCard } from './components/JobCard';
import { Dashboard } from './components/Dashboard';
import { Filters } from './components/Filters';
import { useJobStore } from './store';
import { exportToCSV } from './utils/exportToCSV';

function App() {
  const [showForm, setShowForm] = useState(false);
  const { applications, searchQuery, statusFilter, sortOption, sortDirection } =
    useJobStore();

  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOption === 'date') {
        return sortDirection === 'asc'
          ? new Date(a.applicationDate).getTime() -
              new Date(b.applicationDate).getTime()
          : new Date(b.applicationDate).getTime() -
              new Date(a.applicationDate).getTime();
      } else {
        const statusOrder = ['Applied', 'Interviewed', 'Offer Received'];
        const aIndex = statusOrder.indexOf(a.status);
        const bIndex = statusOrder.indexOf(b.status);
        return sortDirection === 'asc' ? aIndex - bIndex : bIndex - aIndex;
      }
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">NakKerja</h1>
          <div className="flex gap-4">
            <button
              onClick={() => exportToCSV(applications)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download size={20} />
              Export CSV
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Application
            </button>
          </div>
        </div>

        <Dashboard />
        <Filters />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredApplications.map((application) => (
            <JobCard key={application.id} application={application} />
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No applications found. Start by adding your first job application!
            </p>
          </div>
        )}

        {showForm && <JobForm onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
}

export default App;