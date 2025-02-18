import React from 'react';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import { useJobStore } from '../store';
import type { SortOption } from '../types';

export function Filters() {
  const {
    searchQuery,
    statusFilter,
    sortOption,
    sortDirection,
    setSearchQuery,
    setStatusFilter,
    setSortOption,
    setSortDirection,
  } = useJobStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Offer Received">Offer Received</option>
          </select>
        </div>

        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        <button
          onClick={() =>
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
          }
          className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
        >
          {sortDirection === 'asc' ? (
            <SortAsc size={20} />
          ) : (
            <SortDesc size={20} />
          )}
          <span>{sortDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
        </button>
      </div>
    </div>
  );
}