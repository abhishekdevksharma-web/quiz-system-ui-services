import React, { useState } from "react";
import { 
  X, Edit3, CheckCircle, Play, Pause, 
  BarChart2, Clock, Eye, Trash2, Save 
} from "lucide-react";

export default function QuizControlPanel({ isOpen, onClose, quiz, colorMode, onUpdateQuiz }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuiz, setEditedQuiz] = useState({ ...quiz });
  const [activeTab, setActiveTab] = useState("overview"); // overview, questions, results

  if (!isOpen || !quiz) return null;

  // Dark/Light Mode Theme Setup
  const theme = {
    bg: colorMode ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200",
    headerBg: colorMode ? "border-slate-800 bg-slate-900/90" : "border-slate-200 bg-white/90",
    cardBg: colorMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200",
    innerCard: colorMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100",
    input: colorMode ? "bg-slate-900 border-slate-700 text-white focus:border-indigo-500" : "bg-white border-slate-300 text-slate-900 focus:border-indigo-500",
    textMuted: colorMode ? "text-slate-400" : "text-slate-500",
    tabActive: "border-indigo-500 text-indigo-500",
    tabInactive: colorMode ? "border-transparent text-slate-400 hover:text-slate-200" : "border-transparent text-slate-500 hover:text-slate-800"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuiz(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleLive = () => {
    const updated = { 
      ...editedQuiz, 
      status: editedQuiz.status === "Live" ? "Draft" : "Live" 
    };
    setEditedQuiz(updated);
    if (onUpdateQuiz) onUpdateQuiz(updated);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    if (onUpdateQuiz) onUpdateQuiz(editedQuiz);
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className={`relative h-[94vh] w-full max-w-7xl overflow-hidden rounded-3xl border shadow-2xl transition-all duration-300 ${theme.bg}`}>
        
        {/* TOP BAR / HEADER */}
        <div className={`sticky top-0 z-20 flex flex-col md:flex-row md:items-center justify-between border-b gap-4 px-8 py-5 backdrop-blur-md ${theme.headerBg}`}>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={editedQuiz.title}
                    onChange={handleInputChange}
                    className={`text-xl font-bold px-2 py-1 rounded-lg border ${theme.input}`}
                  />
                ) : (
                  editedQuiz.title
                )}
              </h2>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${
                editedQuiz.status === "Live" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              }`}>
                <span className={`h-2 w-2 rounded-full ${editedQuiz.status === "Live" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                {editedQuiz.status}
              </span>
            </div>
            <p className={`mt-1 text-sm ${theme.textMuted}`}>Quiz Management & Live Analytics Console</p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleToggleLive}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition ${
                editedQuiz.status === "Live" 
                  ? "bg-amber-500 hover:bg-amber-600 text-white" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {editedQuiz.status === "Live" ? <Pause size={16} /> : <Play size={16} />}
              {editedQuiz.status === "Live" ? "Stop Live" : "Go Live Now"}
            </button>

            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                <Save size={16} /> Save Panel
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  colorMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"
                }`}
              >
                <Edit3 size={16} /> Edit Settings
              </button>
            )}

            <button
              onClick={onClose}
              className={`rounded-xl p-2 transition border ${
                colorMode ? "hover:bg-slate-800 border-slate-800 text-slate-400" : "hover:bg-slate-100 border-slate-200 text-slate-600"
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className={`flex border-b px-8 ${colorMode ? "border-slate-800" : "border-slate-200"}`}>
          {["overview", "questions", "results"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3.5 px-4 text-sm font-medium border-b-2 capitalize transition-all ${
                activeTab === tab ? theme.tabActive : theme.tabInactive
              }`}
            >
              {tab === "overview" && "Dashboard Overview"}
              {tab === "questions" && `Questions (${editedQuiz.questions?.length || 0})`}
              {tab === "results" && "Live Results & Submissions"}
            </button>
          ))}
        </div>

        {/* CONTENT BODY */}
        <div className="h-[calc(94vh-145px)] overflow-y-auto p-8 raw-scrollbar">
          
          {/* TAB 1: OVERVIEW & CONTROLS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Duration Editing Card (Highlighted area requested by you) */}
              <div className={`p-6 rounded-2xl border-2 border-dashed ${colorMode ? "border-indigo-500/30 bg-indigo-500/5" : "border-indigo-200 bg-indigo-50/40"}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-600 text-white rounded-xl">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Quiz Live Timer Configuration</h4>
                      <p className={`text-sm ${theme.textMuted}`}>Yahan se aap live chal rhe ya aane wale test ki duration dynamic change kar sakte hain.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-300 dark:border-slate-700">
                    <span className="text-sm font-medium px-2">Duration:</span>
                    <input
                      type="number"
                      name="duration"
                      value={editedQuiz.duration || 30}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-20 text-center font-bold px-2 py-1 rounded border disabled:opacity-60 ${theme.input}`}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 pr-2">Mins</span>
                  </div>
                </div>
              </div>

              {/* Status and Analytics grid */}
              <div className="grid gap-6 md:grid-cols-3">
                <StatCard title="Total Registrations" value={editedQuiz.submitted * 1.4 || 142} icon={<Eye />} colorMode={colorMode} />
                <StatCard title="Submitted Profiles" value={editedQuiz.submitted || 0} icon={<CheckCircle />} colorMode={colorMode} />
                <StatCard title="Average Processing Time" value="18 Mins" icon={<Clock />} colorMode={colorMode} />
              </div>

              {/* Main settings row */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div className={`rounded-2xl p-6 border ${theme.cardBg}`}>
                  <h3 className="mb-4 text-lg font-bold">Metadata Configurations</h3>
                  <div className="space-y-4">
                    <EditableItem label="Subject / Tech Stack" name="subject" value={editedQuiz.subject} isEditing={isEditing} onChange={handleInputChange} theme={theme} />
                    <EditableItem label="Difficulty Matrix" name="difficulty" value={editedQuiz.difficulty} isEditing={isEditing} onChange={handleInputChange} theme={theme} selectOptions={["Easy", "Medium", "Hard"]} />
                    <EditableItem label="Created At" value={new Date(editedQuiz.createdAt).toLocaleString()} isEditing={false} theme={theme} />
                  </div>
                </div>

                <div className={`rounded-2xl p-6 border ${theme.cardBg} flex flex-col justify-between`}>
                  <div>
                    <h3 className="mb-2 text-lg font-bold">Quick Actions Hazard Zone</h3>
                    <p className={`text-sm mb-6 ${theme.textMuted}`}>Careful! Actions taken here are destructive and cannot be rollbacked directly without DB queries.</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 px-4 border border-rose-500/30 text-rose-500 rounded-xl font-medium hover:bg-rose-500/10 transition flex items-center justify-center gap-2">
                      <Trash2 size={16} /> Reset All Submissions
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: QUESTIONS MANAGER */}
          {activeTab === "questions" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Questions List</h3>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
                  + Add New Question
                </button>
              </div>

              {editedQuiz.questions?.map((q, index) => (
                <div key={index} className={`rounded-xl border p-5 ${theme.innerCard}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/10 text-indigo-500 rounded-md">Question {index + 1}</span>
                      <p className="font-semibold text-lg mt-2">{q.question}</p>
                      
                      {/* Optional Option layout representation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                        {q.options?.map((opt, oIdx) => (
                          <div key={oIdx} className={`text-sm px-3 py-2 rounded-lg border ${oIdx === q.correctAnswer ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-medium" : "border-slate-200 dark:border-slate-800"}`}>
                            {opt} {oIdx === q.correctAnswer && " (Correct)"}
                          </div>
                        )) || (
                          <div className={`text-xs italic ${theme.textMuted}`}>Standard MCQ or Text Response Type</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className={`p-2 rounded-lg border ${colorMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-50"}`}>
                        <Edit3 size={14} />
                      </button>
                      <button className="p-2 rounded-lg border border-rose-500/20 text-rose-500 hover:bg-rose-500/10">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: LIVE RESULTS & SCOREBOARD */}
          {activeTab === "results" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Submissions Scoreboard</h3>
                <button className="text-xs font-semibold px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  Export Data (CSV)
                </button>
              </div>

              {/* Simulated Live Users Performance */}
              <div className={`border rounded-2xl overflow-hidden ${theme.innerCard}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b ${colorMode ? "border-slate-800 bg-slate-800/50" : "border-slate-200 bg-slate-50"}`}>
                      <th className="p-4 font-semibold text-sm">Rank/User</th>
                      <th className="p-4 font-semibold text-sm">Status</th>
                      <th className="p-4 font-semibold text-sm">Score</th>
                      <th className="p-4 font-semibold text-sm">Time Taken</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {/* Dummy Data Rows mirroring exact production structures */}
                    <ResultRow rank="1" name="Amit Kumar" email="amit@example.com" status="Completed" score="90%" time="12m 4s" colorMode={colorMode} />
                    <ResultRow rank="2" name="Priya Singh" email="priya@example.com" status="Completed" score="85%" time="15m 50s" colorMode={colorMode} />
                    <ResultRow rank="3" name="Rahul Sharma" email="rahul@example.com" status="In Progress" score="--" time="Running..." isLive colorMode={colorMode} />
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Helpers for Inline Edit Forms
function EditableItem({ label, name, value, isEditing, onChange, theme, selectOptions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-dashed border-slate-300/30 pb-3 gap-2">
      <span className={theme.textMuted}>{label}</span>
      {isEditing ? (
        selectOptions ? (
          <select name={name} value={value} onChange={onChange} className={`px-2 py-1 rounded border text-sm font-semibold ${theme.input}`}>
            {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input type="text" name={name} value={value} onChange={onChange} className={`px-2 py-1 rounded border text-sm font-semibold text-right ${theme.input}`} />
        )
      ) : (
        <span className="font-semibold">{value}</span>
      )}
    </div>
  );
}

// Simple Layout for Performance Analytics Card
function StatCard({ title, value, icon, colorMode }) {
  return (
    <div className={`p-5 rounded-2xl border flex items-center justify-between ${colorMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"}`}>
      <div>
        <span className={`text-xs font-medium tracking-wide ${colorMode ? "text-slate-400" : "text-slate-500"}`}>{title}</span>
        <h4 className="text-3xl font-bold mt-1.5">{value}</h4>
      </div>
      <div className={`p-3 rounded-xl ${colorMode ? "bg-slate-900 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>
        {icon}
      </div>
    </div>
  );
}

// Table row for Results Tab
function ResultRow({ rank, name, email, status, score, time, isLive, colorMode }) {
  return (
    <tr className="hover:bg-slate-500/5 transition">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-400 w-4">#{rank}</span>
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-slate-400">{email}</p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isLive ? "bg-indigo-500/10 text-indigo-500 animate-pulse" : "bg-emerald-500/10 text-emerald-500"}`}>
          {status}
        </span>
      </td>
      <td className="p-4 font-bold text-sm">{score}</td>
      <td className="p-4 text-sm text-slate-400">{time}</td>
    </tr>
  );
}