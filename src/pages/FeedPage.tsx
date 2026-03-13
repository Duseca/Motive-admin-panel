import { useState, useEffect } from 'react'
import { ThumbsUp, Medal, Clock, Trash2, ShieldAlert, RefreshCw } from 'lucide-react'
import { backendService } from '../services/backendService'
import { FeedPost } from '../types/database'

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await backendService.getFeedPosts()
      setPosts(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Community Feed Moderation</h2>
        <div className="flex gap-4 items-center">
          <button onClick={fetchPosts} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="flex gap-2 text-sm text-gray-500 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
            <ShieldAlert className="w-5 h-5 text-yellow-600" />
            <span>Admins can remove inappropriate posts.</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500 font-medium">Loading feed...</div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {post.userName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{post.userName || 'Unknown User'}</h4>
                      <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {post.badge_id && (
                    <div className="bg-amber-100 text-amber-900 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                      <Medal className="w-3 h-3" /> Badge
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm">Completed challenge:</p>
                  <p className="text-gray-900 font-medium text-lg mt-1">“{post.challenge_title}”</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-700">
                        {post.ttfw_seconds ? `${Math.floor(post.ttfw_seconds / 60)}m` : 'N/A'}
                    </span> TTFW
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4 text-gray-400" />
                    <span>{post.likes_count} Likes</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
                <button
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Remove Post
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p className="col-span-full text-center text-gray-400 py-10">No feed posts found in backend.</p>}
        </div>
      )}
    </div>
  )
}
