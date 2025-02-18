import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Menu } from '@headlessui/react';
import {
  Edit2,
  Trash2,
  Building2,
  Calendar,
  MapPin,
  Briefcase,
  MoreVertical,
  ChevronRight,
  X,
} from 'lucide-react';
import { JobApplication } from '../types';
import { useJobStore } from '../store';
import { JobForm } from './JobForm';

interface JobCardProps {
  application: JobApplication;
}

const statusColors = {
  Applied: 'bg-blue-100 text-blue-800',
  Interviewed: 'bg-orange-100 text-orange-800',
  'Offer Received': 'bg-green-100 text-green-800',
};

const jobTypeColors = {
  'On-site': 'bg-purple-100 text-purple-800',
  Hybrid: 'bg-indigo-100 text-indigo-800',
  Remote: 'bg-teal-100 text-teal-800',
};

const formatDescription = (text: string) => {
  if (!text) return null;
  
  return text.split('\n\n').map((section, sectionIndex) => {
    if (section.toLowerCase().includes('required skills:') || 
        section.toLowerCase().includes('candidate requirements:')) {
      const [title, ...items] = section.split('\n•');
      return (
        <div key={sectionIndex} className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">{title.trim()}</h4>
          <ul className="list-disc pl-4 space-y-1">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-600">{item.trim()}</li>
            ))}
          </ul>
        </div>
      );
    }
    if (section.includes('\n•') || section.startsWith('•')) {
      const [title, ...items] = section.split('\n•');
      return (
        <div key={sectionIndex} className="mb-4">
          {title && <p className="mb-2">{title.trim()}</p>}
          <ul className="list-disc pl-4 space-y-1">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-600">{item.trim()}</li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <p key={sectionIndex} className="mb-4 last:mb-0 text-gray-600">
        {section.trim()}
      </p>
    );
  });
};

interface DetailViewProps {
  application: JobApplication;
  onClose: () => void;
}

function DetailView({ application, onClose }: DetailViewProps) {
  const timeAgo = formatDistanceToNow(new Date(application.applicationDate), {
    addSuffix: true,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              {application.role}
            </h2>
            <div className="flex items-center text-gray-600">
              <Building2 size={16} className="mr-1" />
              {application.company}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[application.status]
            }`}>
              {application.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              jobTypeColors[application.jobType || 'On-site']
            }`}>
              {application.jobType}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-700">
              <Briefcase size={14} className="mr-1" />
              {application.jobNature}
            </span>
            {application.location && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-700">
                <MapPin size={14} className="mr-1" />
                {application.location}
              </span>
            )}
          </div>

          {application.skills?.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {application.description && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                About the Job
              </h3>
              <div className="text-gray-600">
                {formatDescription(application.description)}
              </div>
            </div>
          )}

          {application.notes && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Notes
              </h3>
              <p className="text-gray-600">{application.notes}</p>
            </div>
          )}

          <div className="text-sm text-gray-500">
            Applied {format(new Date(application.applicationDate), 'PPP')} ({timeAgo})
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobCard({ application }: JobCardProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const deleteApplication = useJobStore((state) => state.deleteApplication);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this application?')) {
      deleteApplication(application.id);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(application.applicationDate), {
    addSuffix: true,
  });

  return (
    <>
      <div className="relative bg-white rounded-lg shadow-md h-full">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {application.role}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Building2 size={16} className="mr-1" />
                {application.company}
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {format(new Date(application.applicationDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[application.status]
                }`}
              >
                {application.status}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  jobTypeColors[application.jobType || 'On-site']
                }`}
              >
                {application.jobType || 'On-site'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-700">
              <Briefcase size={14} className="mr-1" />
              {application.jobNature || 'Full-time'}
            </span>
            {application.location && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-gray-100 text-gray-700">
                <MapPin size={14} className="mr-1" />
                {application.location}
              </span>
            )}
          </div>

          <div className="mt-auto pt-4 flex justify-between items-center">
            <button
              onClick={() => setShowDetail(true)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Show More <ChevronRight size={16} />
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <MoreVertical size={20} className="text-gray-600" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 focus:outline-none z-10">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setShowEdit(true)}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit Application
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDelete}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } flex w-full items-center px-4 py-2 text-sm text-red-600`}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Application
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {showEdit && (
          <JobForm initialData={application} onClose={() => setShowEdit(false)} />
        )}
      </div>

      {showDetail && (
        <DetailView application={application} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}