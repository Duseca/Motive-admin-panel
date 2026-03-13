export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  is_email_verified: boolean;
  main_challenge_category_id?: string;
  improvement_timeline_days: number;
  timer_mode: 'tap_to_start' | 'fixed_time';
  fixed_start_time?: string;
  show_motivational_insights: boolean;
  onboarding_completed: boolean;
  current_streak: number;
  longest_streak: number;
  last_active_date?: string;
  total_challenges_completed: number;
  personal_best_ttfw_seconds?: number;
  created_at: string;
  updated_at: string;
  device_id?: string;
  challenge_category?: string; // Virtual field for UI
}

export interface ChallengeCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  category_id: string;
  title: string;
  description?: string;
  icon: string;
  min_time: number;
  created_by_admin: boolean;
  created_by_user_id?: string;
  is_global: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  color: string;
  image_url?: string;
  criteria_type: 'first_challenge' | 'streak' | 'total_challenges' | 'challenges_per_week' | 'challenges_per_month' | 'personal_best';
  criteria_value: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeedPost {
  id: string;
  user_id: string;
  post_type: 'challenge_completed' | string;
  user_challenge_id?: string;
  challenge_title: string;
  ttfw_seconds?: number;
  badge_id?: string;
  streak_count?: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  is_active: boolean;
  created_at: string;
  userName?: string; // Virtual field for UI
}

export interface DailyActivity {
  id: string;
  user_id: string;
  activity_date: string;
  challenges_completed: number;
  challenges_assigned: number;
  first_ttfw_seconds?: number;
  first_completed_at?: string;
  streak_maintained: boolean;
  created_at: string;
  updated_at: string;
}
