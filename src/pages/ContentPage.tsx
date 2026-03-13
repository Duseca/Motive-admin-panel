import { useState, useEffect } from 'react'
import { Plus, Trash2, RefreshCw, AlertCircle } from 'lucide-react'
import { backendService } from '../services/backendService'
import { ChallengeCategory, Challenge } from '../types/database'

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'challenges' | 'quotes'>('categories')

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 bg-white p-1 rounded-xl border border-gray-200 w-fit">
        {['categories', 'challenges', 'quotes'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === 'categories' && <CategoriesManager />}
        {activeTab === 'challenges' && <ChallengesManager />}
        {activeTab === 'quotes' && <QuotesManager />}
      </div>
    </div>
  )
}

function CategoriesManager() {
  const [categories, setCategories] = useState<ChallengeCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newCat, setNewCat] = useState('')

  const fetchCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await backendService.getCategories()
      setCategories(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAdd = () => {
    if (!newCat) return
    const newItem: ChallengeCategory = {
      id: Date.now().toString(),
      name: newCat,
      slug: newCat.toLowerCase().replace(/\s+/g, '-'),
      color: '#3b82f6',
      icon: 'star',
      display_order: categories.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setCategories(prev => [newItem, ...prev])
    setNewCat('')
    console.log('Category added to local state (Frontend-only)')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Challenge Categories</h3>
        <div className="flex gap-2">
          <button onClick={fetchCategories} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="New Category Name"
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          />
          <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500 font-medium">Loading categories...</div>
      ) : error ? (
        <div className="py-10 text-center">
            <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error loading data</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button onClick={fetchCategories} className="text-blue-600 hover:underline text-sm font-medium">Try Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border font-sans`} style={{ color: cat.color, backgroundColor: `${cat.color}10`, borderColor: `${cat.color}20` }}>
                {cat.name}
              </span>
              <button className="text-red-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {categories.length === 0 && <p className="col-span-full text-center text-gray-400 py-10">No categories found in backend.</p>}
        </div>
      )}
    </div>
  )
}

function ChallengesManager() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [categories, setCategories] = useState<ChallengeCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [catId, setCatId] = useState('')
  const [minTime, setMinTime] = useState(15)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [challengesData, categoriesData] = await Promise.all([
        backendService.getChallenges(),
        backendService.getCategories()
      ])
      setChallenges(challengesData)
      setCategories(categoriesData)
      if (categoriesData.length > 0) setCatId(categoriesData[0].id)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = () => {
    if (!title || !catId) return
    const newItem: Challenge = {
      id: Date.now().toString(),
      category_id: catId,
      title,
      icon: '⭐',
      min_time: minTime,
      created_by_admin: true,
      is_global: true,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setChallenges(prev => [newItem, ...prev])
    setTitle('')
    console.log('Challenge added to local state (Frontend-only)')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Predefined Challenges</h3>
        <div className="flex gap-2">
            <button onClick={fetchData} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          <select
            value={catId}
            onChange={(e) => setCatId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          >
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Challenge Title"
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-64"
          />
          <select
            value={minTime}
            onChange={(e) => setMinTime(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          >
            <option value={0}>No Min Time</option>
            <option value={15}>15m</option>
            <option value={30}>30m</option>
            <option value={45}>45m</option>
            <option value={60}>1h</option>
            <option value={90}>1.5h</option>
            <option value={120}>2h</option>
          </select>
          <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500 font-medium">Loading challenges...</div>
      ) : error ? (
        <div className="py-10 text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="space-y-2">
          {challenges.map((challenge) => {
            const cat = categories.find(c => c.id === challenge.category_id)
            return (
              <div key={challenge.id} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 group">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{'⭐'}</span>
                  <div>
                    <p className="font-medium text-gray-900">{challenge.title}</p>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span className="text-blue-600 font-medium">{cat?.name || 'Unknown'}</span>
                      {challenge.min_time ? <span>• Min: {challenge.min_time}m</span> : null}
                    </div>
                  </div>
                </div>
                <button className="text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
          {challenges.length === 0 && <p className="text-center text-gray-400 py-10 font-medium">No challenges found in backend.</p>}
        </div>
      )}
    </div>
  )
}

function QuotesManager() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')

  const fetchQuotes = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await backendService.getQuotes()
      setQuotes(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const handleAdd = () => {
    if (!text) return
    const newItem = {
      id: Date.now().toString(),
      content: text,
      author: author || 'Anonymous',
      created_at: new Date().toISOString()
    }
    setQuotes(prev => [newItem, ...prev])
    setText('')
    setAuthor('')
    console.log('Quote added to local state (Frontend-only)')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Motivational Quotes</h3>
        <button onClick={fetchQuotes} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter quote text..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          rows={2}
        />
        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author Name"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          />
          <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add Quote
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500 font-medium">Loading quotes...</div>
      ) : error ? (
        <div className="py-10 text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {quotes.map((quote) => (
            <div key={quote.id} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow relative group">
              <p className="text-gray-800 italic mb-2">"{quote.content}"</p>
              <p className="text-sm text-gray-500 text-right">— {quote.author || 'Anonymous'}</p>
              <button
                className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {quotes.length === 0 && <p className="text-center text-gray-400 py-10 font-medium">No quotes found in backend.</p>}
        </div>
      )}
    </div>
  )
}
