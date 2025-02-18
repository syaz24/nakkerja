export type ApplicationStatus = 'Applied' | 'Interviewed' | 'Offer Received';
export type JobType = 'On-site' | 'Hybrid' | 'Remote';
export type JobNature = 'Full-time' | 'Contract';

export interface JobApplication {
  id: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  applicationDate: string;
  status: ApplicationStatus;
  notes?: string;
  jobType: JobType;
  jobNature: JobNature;
  location: string;
  createdAt: string;
}