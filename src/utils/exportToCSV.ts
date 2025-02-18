import { JobApplication } from '../types';

export function exportToCSV(applications: JobApplication[]) {
  // Define CSV headers
  const headers = [
    'Role',
    'Company',
    'Job Type',
    'Job Nature',
    'Location',
    'Required Skills',
    'Job Description',
    'Application Date',
    'Status'
  ];

  // Convert applications to CSV rows
  const rows = applications.map(app => [
    app.role,
    app.company,
    app.jobType,
    app.jobNature,
    app.location,
    app.skills.join('; '),
    // Replace newlines with spaces in description to maintain CSV format
    app.description.replace(/\n/g, ' '),
    app.applicationDate,
    app.status
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
