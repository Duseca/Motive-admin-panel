import { useState } from 'react'
import { Save } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'

export default function SettingsPage() {
  const [privacyPolicy, setPrivacyPolicy] = useState('')
  const [termsAndConditions, setTermsAndConditions] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Saved Policies:', { privacyPolicy, termsAndConditions })
    localStorage.setItem('privacyPolicy', privacyPolicy)
    localStorage.setItem('termsAndConditions', termsAndConditions)
    setLoading(false)
    toast.success('Settings saved successfully!')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Platform Policies</h3>
            <p className="text-sm text-gray-500 mt-1">Update the content for legal pages.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Privacy Policy */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Privacy Policy</h4>
            <div className="h-64 mb-12">
              <ReactQuill
                theme="snow"
                value={privacyPolicy}
                onChange={setPrivacyPolicy}
                className="h-56"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Terms and Conditions</h4>
            <div className="h-64 mb-12">
              <ReactQuill
                theme="snow"
                value={termsAndConditions}
                onChange={setTermsAndConditions}
                className="h-56"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
