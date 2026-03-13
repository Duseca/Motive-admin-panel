import { useState, useEffect } from 'react'
import { Plus, X, Upload, Trophy, Clock, RefreshCw } from 'lucide-react'
import { backendService } from '../services/backendService'
import { Badge } from '../types/database'

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newBadgeName, setNewBadgeName] = useState('')
  const [newBadgeImage, setNewBadgeImage] = useState('')

  const [conditionType, setConditionType] = useState<'challenges_count' | 'time'>('challenges_count')
  const [challengesCount, setChallengesCount] = useState(1)
  const [minTime, setMinTime] = useState(1)
  const [maxTime, setMaxTime] = useState(30)

  const fetchBadges = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await backendService.getBadges()
      setBadges(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBadges()
  }, [])

  const handleAddBadge = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBadgeName) return
    
    setLoading(true)
    try {
      const criteria_type = conditionType === 'challenges_count' ? 'total_challenges' : 'personal_best';
      
      await backendService.createBadge({
        name: newBadgeName,
        slug: newBadgeName.toLowerCase().replace(/\s+/g, '-'),
        icon: 'award',
        color: '#F59E0B',
        image_url: newBadgeImage || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        criteria_type: criteria_type as any,
        criteria_value: conditionType === 'challenges_count' ? challengesCount : minTime,
        is_active: true
      })
      
      await fetchBadges()
      setNewBadgeName('')
      setNewBadgeImage('')
      setIsModalOpen(false)
    } catch (err: any) {
      alert('Failed to create badge: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Badges Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage badges and achievements for users.</p>
        </div>
        <div className="flex gap-4">
            <button onClick={fetchBadges} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
            <Plus className="w-4 h-4" /> Add New Badge
            </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500 font-medium">Loading badges...</div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className="group relative bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow">
              <button
                className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                onClick={() => setBadges(prev => prev.filter(b => b.id !== badge.id))}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center p-2 overflow-hidden border border-gray-100">
                {badge.image_url ? (
                  <img src={badge.image_url} alt={badge.name} className="w-full h-full object-contain" />
                ) : (
                   <span className="text-2xl font-bold text-gray-300">{badge.name.charAt(0)}</span>
                )}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 text-sm">{badge.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-500">
                  {badge.criteria_type === 'streak' ? (
                       <>
                       <Trophy className="w-3 h-3 text-orange-400" />
                       <span>{badge.criteria_value} Day Streak</span>
                     </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>{badge.criteria_value} {badge.criteria_type === 'personal_best' ? 'Min' : 'Count'}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-auto pt-2">
                 <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {badge.is_active ? 'Active' : 'Inactive'}
                 </span>
              </div>
            </div>
          ))}
          {badges.length === 0 && <p className="col-span-full text-center text-gray-400 py-10 font-medium">No badges found in backend.</p>}
        </div>
      )}

      {/* Add Badge Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-900">Add New Badge</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBadge} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Name</label>
                <input
                  type="text"
                  value={newBadgeName}
                  onChange={(e) => setNewBadgeName(e.target.value)}
                  placeholder="e.g. 7 Day Streak"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition Type</label>
                <select 
                  value={conditionType}
                  onChange={(e) => setConditionType(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="challenges_count">Challenges Count</option>
                  <option value="time">Time Based</option>
                </select>
              </div>

              {conditionType === 'challenges_count' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Challenges</label>
                  <input
                    type="number"
                    value={challengesCount}
                    onChange={(e) => setChallengesCount(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Time (Min)</label>
                    <input
                      type="number"
                      value={minTime}
                      onChange={(e) => setMinTime(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Time (Min)</label>
                    <input
                      type="number"
                      value={maxTime}
                      onChange={(e) => setMaxTime(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBadgeImage}
                    onChange={(e) => setNewBadgeImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400">
                    <Upload className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:bg-blue-300"
                >
                  {loading ? 'Creating...' : 'Create Badge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
