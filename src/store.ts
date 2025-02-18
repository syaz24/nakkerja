import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JobApplication, SortOption, SortDirection } from './types';

interface JobStore {
  applications: JobApplication[];
  searchQuery: string;
  statusFilter: string | null;
  sortOption: SortOption;
  sortDirection: SortDirection;
  addApplication: (application: Omit<JobApplication, 'id'>) => void;
  updateApplication: (id: string, application: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string | null) => void;
  setSortOption: (option: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
      applications: [],
      searchQuery: '',
      statusFilter: null,
      sortOption: 'date',
      sortDirection: 'desc',

      addApplication: (application) =>
        set((state) => ({
          applications: [
            ...state.applications,
            {
              ...application,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateApplication: (id, updatedApplication) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updatedApplication } : app
          ),
        })),

      deleteApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setStatusFilter: (status) => set({ statusFilter: status }),
      setSortOption: (option) => set({ sortOption: option }),
      setSortDirection: (direction) => set({ sortDirection: direction }),
    }),
    {
      name: 'job-applications',
    }
  )
);