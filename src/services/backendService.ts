import { supabase } from '../lib/supabaseClient';
import { 
  Profile, 
  Challenge, 
  ChallengeCategory, 
  Badge, 
  FeedPost, 
  DailyActivity 
} from '../types/database';

export const backendService = {
  async getProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getCategories(): Promise<ChallengeCategory[]> {
    const { data, error } = await supabase
      .from('challenge_categories')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getChallenges(): Promise<Challenge[]> {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getBadges(): Promise<Badge[]> {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getFeedPosts(): Promise<FeedPost[]> {
    const { data, error } = await supabase
      .from('feed_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getDailyActivity(): Promise<DailyActivity[]> {
    const { data, error } = await supabase
      .from('daily_activity')
      .select('*')
      .order('activity_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getQuotes(): Promise<any[]> {
    const { data, error } = await supabase
      .from('motivational_quotes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};
