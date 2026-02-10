import { useState } from 'react'
import { Plus, X, Upload, Trophy, Clock } from 'lucide-react'
import { toast } from 'react-toastify'
import { useStore } from '../store/useStore'

interface BadgeCondition {
  type: 'challenges_count' | 'time_spent'
  value: number
}

interface Badge {
  id: string
  name: string
  imageUrl: string
  condition: BadgeCondition
  categoryId?: string
}

export default function BadgesPage() {
  const { categories } = useStore()
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Early Bird',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      condition: { type: 'challenges_count', value: 5 }
    },
    {
      id: '2',
      name: 'Week Warrior',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
      condition: { type: 'challenges_count', value: 10 }
    },
    {
      id: '3',
      name: 'Month Master',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png',
      condition: { type: 'challenges_count', value: 30 }
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newBadgeName, setNewBadgeName] = useState('')
  const [newBadgeImage, setNewBadgeImage] = useState('')
  const [challengesCount, setChallengesCount] = useState<number>(1)
  const [timeSpent, setTimeSpent] = useState<number>(30)
  const [conditionType, setConditionType] = useState<'challenges_count' | 'time_spent'>('challenges_count')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  const handleAddBadge = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBadgeName || !newBadgeImage) {
      toast.error('Please fill in all fields')
      return
    }

    const newBadge: Badge = {
      id: Date.now().toString(),
      name: newBadgeName,
      imageUrl: newBadgeImage,
      condition: {
        type: conditionType,
        value: conditionType === 'challenges_count' ? challengesCount : timeSpent
      },
      categoryId: selectedCategoryId
    }

    setBadges([...badges, newBadge])
    setNewBadgeName('')
    setNewBadgeImage('')
    setChallengesCount(1)
    setTimeSpent(30)
    setConditionType('challenges_count')
    setIsModalOpen(false)
    toast.success('Badge added successfully!')
  }

  const handleDeleteBadge = (id: string) => {
    setBadges(badges.filter(badge => badge.id !== id))
    toast.success('Badge deleted successfully')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Badges Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage badges and achievements for users.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Badge
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {badges.map((badge) => (
          <div key={badge.id} className="group relative bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow">
            <button
              onClick={() => handleDeleteBadge(badge.id)}
              className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center p-2">
              <img src={badge.imageUrl} alt={badge.name} className="w-full h-full object-contain" />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-900 text-sm">{badge.name}</p>
              <div className="flex items-center justify-center gap-1 mt-1 text-xs text-gray-500">
                {badge.condition.type === 'challenges_count' ? (
                  <>
                    <Trophy className="w-3 h-3" />
                    <span>{badge.condition.value} Challenges</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3" />
                    <span>{badge.condition.value} Mins</span>
                  </>
                )}
              </div>
              {badge.categoryId && (
                <p className="text-xs text-blue-600 mt-1">
                  {categories.find(c => c.id === badge.categoryId)?.name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Badge Name
                </label>
                <input
                  type="text"
                  value={newBadgeName}
                  onChange={(e) => setNewBadgeName(e.target.value)}
                  placeholder="e.g. 7 Day Streak"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConditionType('challenges_count')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border ${conditionType === 'challenges_count'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    Challenge Count
                  </button>
                  <button
                    type="button"
                    onClick={() => setConditionType('time_spent')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border ${conditionType === 'time_spent'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    Time till completion
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category (Optional)
                </label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBadgeImage}
                    onChange={(e) => setNewBadgeImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400">
                    <Upload className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter a direct image URL for the badge icon.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {conditionType === 'challenges_count' ? 'Number of Challenges' : 'Minimum Time (Minutes)'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={conditionType === 'challenges_count' ? challengesCount : timeSpent}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0
                    if (conditionType === 'challenges_count') setChallengesCount(val)
                    else setTimeSpent(val)
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {conditionType === 'challenges_count'
                    ? 'Number of challenges a user must complete to earn this badge.'
                    : 'Total time a user must spend on challenges to earn this badge.'}
                </p>
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
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Create Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
