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
      .select(`
        *,
        challenge_categories!main_challenge_category_id (
          name
        ),
        user_challenges (
          status,
          challenges (
            title
          )
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;

    // Process the data to set the 'challenge_category' virtual field
    // We prioritize the title of an ongoing challenge, then fall back to the category name
    const profiles = (data || []).map((p: any) => {
      const ongoing = p.user_challenges?.find((uc: any) => uc.status === 'ongoing');
      const challengeTitle = ongoing?.challenges?.title;
      const categoryName = p.challenge_categories?.name;

      return {
        ...p,
        challenge_category: challengeTitle || categoryName || 'N/A'
      };
    });

    return profiles;
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
      .select(`
        *,
        profiles (
          name
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Map the name from the join to the userName field 
    return (data || []).map((post: any) => ({
      ...post,
      userName: post.profiles?.name || 'Unknown User'
    }));
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
  },

  async createBadge(badge: Partial<Badge>): Promise<Badge> {
    const { data, error } = await supabase
      .from('badges')
      .insert([badge])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
