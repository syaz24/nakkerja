import React from 'react';
import { useJobStore } from '../store';
import {
  BarChart3,
  BriefcaseIcon,
  CheckCircle2,
  Clock,
  UserCheck,
} from 'lucide-react';

export function Dashboard() {
  const applications = useJobStore((state) => state.applications);

  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === 'Applied').length,
    interviewed: applications.filter((app) => app.status === 'Interviewed')
      .length,
    offered: applications.filter((app) => app.status === 'Offer Received')
      .length,
  };

  const cards = [
    {
      title: 'Total Applications',
      value: stats.total,
      icon: BriefcaseIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Applied',
      value: stats.applied,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Interviewed',
      value: stats.interviewed,
      icon: UserCheck,
      color: 'bg-orange-500',
    },
    {
      title: 'Offers Received',
      value: stats.offered,
      icon: CheckCircle2,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Application Statistics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg border p-4 flex items-center"
          >
            <div
              className={`${card.color} text-white p-3 rounded-lg mr-4`}
            >
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{card.title}</p>
              <p className="text-2xl font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}