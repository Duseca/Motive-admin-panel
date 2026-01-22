import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, CheckCircle, TrendingUp, Clock } from 'lucide-react'

const stats = [
  { name: 'Active Users', value: '2,543', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { name: 'Challenges Completed', value: '45.2k', change: '+15.1%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  { name: 'Avg. Streak', value: '5.2 Days', change: '+4.3%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'Avg. Time to Win', value: '42m', change: '-2.1%', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
]

const activityData = [
  { name: 'Mon', completed: 145, active: 200 },
  { name: 'Tue', completed: 230, active: 310 },
  { name: 'Wed', completed: 180, active: 250 },
  { name: 'Thu', completed: 278, active: 340 },
  { name: 'Fri', completed: 189, active: 280 },
  { name: 'Sat', completed: 239, active: 360 },
  { name: 'Sun', completed: 349, active: 450 },
]

const categoryData = [
  { name: 'Laziness', value: 400, color: '#3B82F6' },
  { name: 'Procrastination', value: 300, color: '#F59E0B' },
  { name: 'Eating Habits', value: 300, color: '#10B981' },
  { name: 'Introversion', value: 200, color: '#6366F1' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
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
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Activity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="active" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Categories</h3>
          <div className="h-80">
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
            <div className="flex flex-wrap justify-center gap-4">
              {categoryData.map((entry) => (
                <div key={entry.name} className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
