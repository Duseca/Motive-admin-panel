import { useState } from 'react'
import { Save, Bell, Moon, Sun, Monitor, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [theme, setTheme] = useState('system')

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Application Settings</h3>
          <p className="text-sm text-gray-500 mt-1">Manage admin preferences and system configurations.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Appearance */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 block">Appearance</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 p-3 border rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-500' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <Sun className="w-4 h-4" /> Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 p-3 border rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white ring-1 ring-gray-600' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <Moon className="w-4 h-4" /> Dark
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex items-center justify-center gap-2 p-3 border rounded-lg text-sm font-medium transition-all ${theme === 'system' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <Monitor className="w-4 h-4" /> System
              </button>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                <p className="text-xs text-gray-500">Receive alerts for critical system updates.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <hr className="border-gray-100" />

          {/* Security */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Enable</button>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
