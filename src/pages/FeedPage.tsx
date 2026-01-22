import { useStore } from '../store/useStore'
import { ThumbsUp, Medal, Clock, Trash2, ShieldAlert } from 'lucide-react'

export default function FeedPage() {
  const { posts, deletePost } = useStore()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Community Feed Moderation</h2>
        <div className="flex gap-2 text-sm text-gray-500 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
          <ShieldAlert className="w-5 h-5 text-yellow-600" />
          <span>Admins can remove inappropriate posts.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {post.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.userName}</h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                {post.badge && (
                  <div className="bg-amber-100 text-amber-900 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                    <Medal className="w-3 h-3" /> {post.badge}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm">Completed challenge:</p>
                <p className="text-gray-900 font-medium text-lg mt-1">“{post.challengeTitle}”</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-700">{post.ttfw}</span> TTFW
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                  <span>{post.likes} Likes</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => deletePost(post.id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Remove Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
