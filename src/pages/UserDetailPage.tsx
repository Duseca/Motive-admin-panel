import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Trophy, Activity, Mail } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function UserDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { users } = useStore()

  const user = users.find(u => u.id === id)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold text-gray-900">User not found</h2>
        <button
          onClick={() => navigate('/users')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Users
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/users')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Users
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border-4 border-white/30">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-blue-100">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat Cards */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Trophy className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Current Goal</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{user.challengeCategory}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Activity className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">Current Streak</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{user.streak} Days</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Last Active</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{user.lastActive}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium text-gray-900">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="font-medium text-gray-900">Jan 12, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
