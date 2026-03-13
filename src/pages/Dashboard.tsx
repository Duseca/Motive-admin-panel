import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, CheckCircle, TrendingUp, Clock, RefreshCw } from 'lucide-react'
import { backendService } from '../services/backendService'

export default function Dashboard() {
  const [stats, setStats] = useState([
    { name: 'Active Users', value: '0', change: '+0%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Challenges Completed', value: '0', change: '+0%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Avg. Streak', value: '0 Days', change: '+0%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Avg. Time to Win', value: '0m', change: '+0%', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  ])

  const [activityData, setActivityData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [profiles, challenges, activity, categories] = await Promise.all([
        backendService.getProfiles(),
        backendService.getChallenges(),
        backendService.getDailyActivity(),
        backendService.getCategories()
      ])

      // 1. Stats
      const totalChallenges = profiles.reduce((sum, p) => sum + (p.total_challenges_completed || 0), 0)
      const avgStreak = profiles.length ? Math.round(profiles.reduce((sum, p) => sum + (p.current_streak || 0), 0) / profiles.length) : 0
      const avgTtfw = profiles.length ? Math.round(profiles.reduce((sum, p) => sum + (p.personal_best_ttfw_seconds || 0), 0) / profiles.length / 60) : 0

      setStats([
        { name: 'Active Users', value: profiles.length.toLocaleString(), change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Challenges Completed', value: totalChallenges > 1000 ? `${(totalChallenges / 1000).toFixed(1)}k` : totalChallenges.toString(), change: '+15.1%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Avg. Streak', value: `${avgStreak} Days`, change: '+4.3%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Avg. Time to Win', value: `${avgTtfw}m`, change: '-2.1%', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
      ])

      // 2. Activity Chart (Last 7 entries)
      const mappedActivity = activity.slice(-7).map(a => ({
        name: new Date(a.activity_date).toLocaleDateString(undefined, { weekday: 'short' }),
        completed: a.challenges_completed,
        active: a.challenges_assigned
      }))
      setActivityData(mappedActivity.length ? mappedActivity : [
        { name: 'Mon', completed: 0, active: 0 }, { name: 'Tue', completed: 0, active: 0 }, { name: 'Wed', completed: 0, active: 0 },
        { name: 'Thu', completed: 0, active: 0 }, { name: 'Fri', completed: 0, active: 0 }, { name: 'Sat', completed: 0, active: 0 }, { name: 'Sun', completed: 0, active: 0 }
      ])

      // 3. Category Pie Chart
      const catCounts = categories.map(cat => ({
        name: cat.name,
        value: challenges.filter(c => c.category_id === cat.id).length,
        color: cat.color || '#3B82F6'
      }))
      setCategoryData(catCounts.filter(c => c.value > 0))

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Updating...' : 'Refresh Data'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-xl p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Activity</h3>
          <div className="h-80">
            {loading && activityData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-50 rounded-lg text-gray-400">Loading charts...</div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="active" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
                </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Categories</h3>
          <div className="h-80">
            {loading && categoryData.length === 0 ? (
               <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-50 rounded-lg text-gray-400">Loading chart...</div>
            ) : (
                <>
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                {categoryData.map((entry) => (
                    <div key={entry.name} className="flex items-center text-xs text-gray-600">
                    <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                    {entry.name}
                    </div>
                ))}
                </div>
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
