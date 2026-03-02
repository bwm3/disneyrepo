import { useState } from "react";

const ATTRACTIONS = [
  { id: 1, land: "Fantasyland", name: "Pirates of the Caribbean", waitTime: 35, icon: "⚓" },
  { id: 2, land: "Tomorrowland", name: "Space Mountain", waitTime: 55, icon: "🚀" },
  { id: 3, land: "Adventureland", name: "Indiana Jones", waitTime: 45, icon: "🪨" },
  { id: 4, land: "Fantasyland", name: "Haunted Mansion", waitTime: 20, icon: "👻" },
  { id: 5, land: "Main Street", name: "Big Thunder Mountain", waitTime: 40, icon: "🏔️" },
  { id: 6, land: "Tomorrowland", name: "Star Wars: Rise of the Resistance", waitTime: 70, icon: "⚔️" },
  { id: 7, land: "Fantasyland", name: "Matterhorn Bobsleds", waitTime: 30, icon: "❄️" },
  { id: 8, land: "Adventureland", name: "Jungle Cruise", waitTime: 25, icon: "🌴" },
];

const FAMILY = [
  { id: 1, name: "Dad", emoji: "👨", location: "Fantasyland", status: "On ride" },
  { id: 2, name: "Mom", emoji: "👩", location: "Main Street", status: "Getting food" },
  { id: 3, name: "Emma", emoji: "👧", location: "Tomorrowland", status: "In line" },
  { id: 4, name: "Jake", emoji: "👦", location: "Adventureland", status: "Exploring" },
  { id: 5, name: "Grandma", emoji: "👵", location: "Main Street", status: "Resting" },
];

const MEETUP_SPOTS = ["Main Street Entrance", "Sleeping Beauty Castle", "Matterhorn Base", "Star Wars Launch Bay", "Pirates Entrance"];

const PHOTOS = [
  { id: 1, who: "Emma", emoji: "👧", caption: "Space Mountain was AMAZING! 🚀", time: "10:32 AM", color: "bg-purple-100" },
  { id: 2, who: "Jake", emoji: "👦", caption: "Just saw Mickey!! 🐭", time: "11:15 AM", color: "bg-yellow-100" },
  { id: 3, who: "Mom", emoji: "👩", caption: "Got everyone Mickey bars 🍦", time: "12:01 PM", color: "bg-pink-100" },
];

const VOTE_OPTIONS = [
  { id: 1, name: "Pirates of the Caribbean", icon: "⚓", votes: [] },
  { id: 2, name: "Haunted Mansion", icon: "👻", votes: [] },
  { id: 3, name: "Indiana Jones", icon: "🪨", votes: [] },
  { id: 4, name: "Star Wars: Rise of the Resistance", icon: "⚔️", votes: [] },
];

const TABS = ["📍 Where Is Everyone", "🎢 Rides", "🗳️ Vote", "📸 Moments", "📣 Meet Up"];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [votes, setVotes] = useState(VOTE_OPTIONS);
  const [myVote, setMyVote] = useState(null);
  const [meetupSpot, setMeetupSpot] = useState(null);
  const [meetupTime, setMeetupTime] = useState("2:00 PM");
  const [meetupSent, setMeetupSent] = useState(false);
  const [photos, setPhotos] = useState(PHOTOS);
  const [newCaption, setNewCaption] = useState("");
  const [plannedRides, setPlannedRides] = useState([]);

  const handleVote = (optionId) => {
    if (myVote === optionId) return;
    setVotes(prev => prev.map(v => ({
      ...v,
      votes: v.id === optionId
        ? [...v.votes.filter(x => x !== "You"), "You"]
        : v.votes.filter(x => x !== "You")
    })));
    setMyVote(optionId);
  };

  const toggleRide = (id) => {
    setPlannedRides(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const addPhoto = () => {
    if (!newCaption.trim()) return;
    setPhotos(prev => [...prev, {
      id: Date.now(), who: "You", emoji: "😊",
      caption: newCaption, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: "bg-green-100"
    }]);
    setNewCaption("");
  };

  const sendMeetup = () => {
    if (!meetupSpot) return;
    setMeetupSent(true);
    setTimeout(() => setMeetupSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-indigo-900 flex flex-col items-center py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-1">🏰</div>
        <h1 className="text-3xl font-extrabold text-yellow-300 tracking-wide drop-shadow">Disneyland Family</h1>
        <p className="text-blue-200 text-sm mt-1">Today's adventure with 5 family members</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 px-3 py-3 text-xs font-semibold transition-all ${
                activeTab === i
                  ? "border-b-2 border-blue-600 text-blue-700 bg-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">

          {/* Tab 0: Where Is Everyone */}
          {activeTab === 0 && (
            <div>
              <h2 className="font-bold text-gray-800 text-lg mb-4">Family Locations</h2>
              <div className="space-y-3">
                {FAMILY.map(member => (
                  <div key={member.id} className="flex items-center gap-3 bg-blue-50 rounded-2xl p-3">
                    <div className="text-3xl">{member.emoji}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{member.name}</div>
                      <div className="text-xs text-blue-600 font-medium">📍 {member.location}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      member.status === "On ride" ? "bg-green-100 text-green-700" :
                      member.status === "In line" ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-3 text-sm text-yellow-800">
                💡 <strong>Tip:</strong> Update your own status by tapping "📣 Meet Up" to coordinate a check-in spot!
              </div>
            </div>
          )}

          {/* Tab 1: Rides */}
          {activeTab === 1 && (
            <div>
              <h2 className="font-bold text-gray-800 text-lg mb-1">Ride Planner</h2>
              <p className="text-xs text-gray-500 mb-4">Tap to add rides to your family plan</p>
              <div className="space-y-2">
                {ATTRACTIONS.map(ride => (
                  <div
                    key={ride.id}
                    onClick={() => toggleRide(ride.id)}
                    className={`flex items-center gap-3 rounded-2xl p-3 cursor-pointer transition-all border-2 ${
                      plannedRides.includes(ride.id)
                        ? "border-blue-400 bg-blue-50"
                        : "border-transparent bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-2xl">{ride.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">{ride.name}</div>
                      <div className="text-xs text-gray-500">{ride.land}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${ride.waitTime > 50 ? "text-red-500" : ride.waitTime > 30 ? "text-orange-500" : "text-green-600"}`}>
                        {ride.waitTime} min
                      </div>
                      <div className="text-xs text-gray-400">wait</div>
                    </div>
                    {plannedRides.includes(ride.id) && (
                      <div className="text-blue-500 text-lg">✓</div>
                    )}
                  </div>
                ))}
              </div>
              {plannedRides.length > 0 && (
                <div className="mt-4 bg-blue-600 rounded-2xl p-3 text-white text-center text-sm font-semibold">
                  🎢 {plannedRides.length} ride{plannedRides.length > 1 ? "s" : ""} in your plan!
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Vote */}
          {activeTab === 2 && (
            <div>
              <h2 className="font-bold text-gray-800 text-lg mb-1">What's Next? 🗳️</h2>
              <p className="text-xs text-gray-500 mb-4">Vote for the next family ride</p>
              <div className="space-y-3">
                {votes.map(option => {
                  const total = votes.reduce((s, v) => s + v.votes.length, 0);
                  const pct = total ? Math.round((option.votes.length / total) * 100) : 0;
                  return (
                    <div key={option.id}>
                      <button
                        onClick={() => handleVote(option.id)}
                        className={`w-full text-left rounded-2xl p-3 border-2 transition-all ${
                          myVote === option.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-sm text-gray-800">{option.icon} {option.name}</span>
                          <span className="text-sm font-bold text-blue-600">{option.votes.length} vote{option.votes.length !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
              {myVote && (
                <div className="mt-4 text-center text-sm text-green-600 font-semibold bg-green-50 rounded-2xl p-3">
                  ✅ You voted! Waiting for the rest of the family...
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Photos / Moments */}
          {activeTab === 3 && (
            <div>
              <h2 className="font-bold text-gray-800 text-lg mb-4">Family Moments 📸</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newCaption}
                  onChange={e => setNewCaption(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addPhoto()}
                  placeholder="Share a moment..."
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={addPhoto}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Post
                </button>
              </div>
              <div className="space-y-3">
                {[...photos].reverse().map(p => (
                  <div key={p.id} className={`${p.color} rounded-2xl p-4`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{p.emoji}</span>
                      <span className="font-semibold text-gray-800 text-sm">{p.who}</span>
                      <span className="text-xs text-gray-400 ml-auto">{p.time}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{p.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Meet Up */}
          {activeTab === 4 && (
            <div>
              <h2 className="font-bold text-gray-800 text-lg mb-1">Meet Up 📣</h2>
              <p className="text-xs text-gray-500 mb-4">Broadcast a meet-up spot to the whole family</p>

              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 block mb-2">📍 Choose a spot</label>
                <div className="space-y-2">
                  {MEETUP_SPOTS.map(spot => (
                    <button
                      key={spot}
                      onClick={() => setMeetupSpot(spot)}
                      className={`w-full text-left px-4 py-3 rounded-2xl border-2 text-sm transition-all ${
                        meetupSpot === spot
                          ? "border-blue-500 bg-blue-50 font-semibold text-blue-700"
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300"
                      }`}
                    >
                      {spot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 block mb-2">⏰ What time?</label>
                <input
                  type="time"
                  value={meetupTime}
                  onChange={e => setMeetupTime(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:border-blue-400"
                />
              </div>

              <button
                onClick={sendMeetup}
                disabled={!meetupSpot}
                className={`w-full py-3 rounded-2xl font-bold text-white text-sm transition-all ${
                  meetupSpot ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                📣 Alert the Family!
              </button>

              {meetupSent && (
                <div className="mt-4 bg-green-100 border border-green-300 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">🎉</div>
                  <div className="font-bold text-green-700">Alert sent!</div>
                  <div className="text-sm text-green-600">Meet at <strong>{meetupSpot}</strong> at <strong>{meetupTime}</strong></div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <p className="text-blue-300 text-xs mt-4">✨ Have a magical day!</p>
    </div>
  );
}
