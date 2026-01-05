// Default module data for fallback when Supabase data is not available
export const DEFAULT_MODULES = [
  {
    id: 1,
    title: 'Introduction to Data Science',
    description: 'Learn the fundamentals of Data Science and its applications in India',
    duration: '2 hours',
    order_index: 1,
    content: 'Module content will be loaded from Supabase or added by administrators.'
  },
  {
    id: 2,
    title: 'Python for Data Science',
    description: 'Master Python basics and data manipulation libraries',
    duration: '3 hours',
    order_index: 2,
    content: 'Module content will be loaded from Supabase or added by administrators.'
  },
  {
    id: 3,
    title: 'Statistics & Probability',
    description: 'Statistical foundations for data analysis',
    duration: '2.5 hours',
    order_index: 3,
    content: 'Module content will be loaded from Supabase or added by administrators.'
  },
  {
    id: 4,
    title: 'Machine Learning',
    description: 'ML algorithms and their practical applications',
    duration: '4 hours',
    order_index: 4,
    content: 'Module content will be loaded from Supabase or added by administrators.'
  },
  {
    id: 5,
    title: 'Deep Learning',
    description: 'Neural networks and AI for the Indian market',
    duration: '3.5 hours',
    order_index: 5,
    content: 'Module content will be loaded from Supabase or added by administrators.'
  },
  {
    id: 6,
    title: 'Career Roadmap',
    description: 'Navigate the Indian job market for Data Science careers',
    duration: '1.5 hours',
    order_index: 6,
    content: 'Module content will be loaded from Supabase or added by administrators.'
  }
];

export const TOTAL_MODULES = 6;

// Quiz passing thresholds
export const PASS_THRESHOLDS = {
  GOLD: 90,
  SILVER: 70,
  BRONZE: 50
};

export const getPassLevel = (score) => {
  if (score >= PASS_THRESHOLDS.GOLD) return 'gold';
  if (score >= PASS_THRESHOLDS.SILVER) return 'silver';
  if (score >= PASS_THRESHOLDS.BRONZE) return 'bronze';
  return null;
};
