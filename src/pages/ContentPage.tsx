import { useState } from 'react'
import { useStore, Category, Challenge, Quote } from '../store/useStore'
import { Plus, Trash2, Edit2 } from 'lucide-react'

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
  const { categories, deleteCategory, addCategory } = useStore()
  const [newCat, setNewCat] = useState('')

  const handleAdd = () => {
    if (!newCat) return
    addCategory({ id: Date.now().toString(), name: newCat, color: 'bg-gray-100 text-gray-800' })
    setNewCat('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Challenge Categories</h3>
        <div className="flex gap-2">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${cat.color}`}>{cat.name}</span>
            <button onClick={() => deleteCategory(cat.id)} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChallengesManager() {
  const { challenges, categories, addChallenge, deleteChallenge } = useStore()
  const [title, setTitle] = useState('')
  const [catId, setCatId] = useState(categories[0]?.id || '')

  const handleAdd = () => {
    if (!title || !catId) return
    addChallenge({ id: Date.now().toString(), categoryId: catId, title, icon: '⭐' })
    setTitle('')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Predefined Challenges</h3>
        <div className="flex gap-2">
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
          <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {challenges.map((challenge) => {
          const cat = categories.find(c => c.id === challenge.categoryId)
          return (
            <div key={challenge.id} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-xl">{challenge.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{challenge.title}</p>
                  <p className="text-xs text-gray-500">{cat?.name}</p>
                </div>
              </div>
              <button onClick={() => deleteChallenge(challenge.id)} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function QuotesManager() {
  const { quotes, addQuote, deleteQuote } = useStore()
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')

  const handleAdd = () => {
    if (!text) return
    addQuote({ id: Date.now().toString(), text, author: author || 'Unknown' })
    setText('')
    setAuthor('')
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Motivational Quotes</h3>
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

      <div className="grid grid-cols-1 gap-4">
        {quotes.map((quote) => (
          <div key={quote.id} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow relative group">
            <p className="text-gray-800 italic mb-2">"{quote.text}"</p>
            <p className="text-sm text-gray-500 text-right">— {quote.author}</p>
            <button
              onClick={() => deleteQuote(quote.id)}
              className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
