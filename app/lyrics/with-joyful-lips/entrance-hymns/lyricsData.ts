export interface LyricSection {
  type: 'verse' | 'chorus' | 'bridge';
  content: string;
}

export interface LyricData {
  id: number;
  title: string;
  sections: LyricSection[];
  category: string;
}

export const lyrics: LyricData[] = [
  {
    id: 1,
    title: "A.1 Joy was in my heart",
    sections: [
      { type: 'chorus', content: "Make your entrance, take the stage,\nYour presence sets the world ablaze.\nEvery eye is fixed on you,\nThis is your moment, shining through." },
      { type: 'verse', content: "Lights dim, anticipation grows,\nThe crowd hushes, excitement flows.\nA silhouette behind the curtain,\nThe moment's arrival is certain." },
      { type: 'chorus', content: "Make your entrance, take the stage,\nYour presence sets the world ablaze.\nEvery eye is fixed on you,\nThis is your moment, shining through." },
    ],
    category: "Performance",
  },
  {
    id: 2,
    title: "Welcome Home",
    sections: [
      { type: 'verse', content: "Key turns in the lock, familiar sound,\nFootsteps echo, you're on known ground.\nThe scent of home fills the air,\nMemories flood, beyond compare." },
      { type: 'chorus', content: "Welcome home, where you belong,\nWhere your heart sings its own song.\nSafe haven from the world outside,\nIn these walls, your joy resides." },
    ],
    category: "Personal",
  },
  {
    id: 3,
    title: "New Beginnings",
    sections: [
      { type: 'verse', content: "First day nerves, a world unknown,\nBut potential waits, seeds unsown.\nNew faces, new places to explore,\nA chapter opens, what's in store?" },
      { type: 'chorus', content: "Step through the door, embrace the new,\nAdventures await, dreams come true.\nYour entrance marks a fresh start,\nWrite your story, follow your heart." },
      { type: 'bridge', content: "Every end is a new beginning,\nEvery entrance, a chance for winning.\nFear may linger, but courage leads,\nYour journey starts as you proceed." },
    ],
    category: "Inspirational",
  },
  {
    id: 4,
    title: "Red Carpet Moment",
    sections: [
      { type: 'verse', content: "Flashbulbs pop, the crowd goes wild,\nYour name in lights, fame reconciled.\nStrut your stuff, own the night,\nRed carpet rolled, future's bright." },
      { type: 'chorus', content: "This is your red carpet moment,\nGlamour and glitz, wholly owned.\nCameras flash, capture the scene,\nYou're the star of this dream." },
    ],
    category: "Performance",
  },
  {
    id: 5,
    title: "First Day of School",
    sections: [
      { type: 'verse', content: "Backpack ready, lunchbox packed,\nLittle steps, a world to be cracked.\nClassroom door, a portal new,\nFriends to make, knowledge to accrue." },
      { type: 'chorus', content: "First day jitters, butterflies dance,\nBut every step's a new chance.\nSchool bells ring, adventures start,\nLearning's journey captures the heart." },
    ],
    category: "Personal",
  },
  {
    id: 6,
    title: "Nature's Welcome",
    sections: [
      { type: 'verse', content: "Forest path, dappled light,\nNature's entrance, a wondrous sight.\nBirdsong greets, leaves whisper low,\nInto the wild, we quietly go." },
      { type: 'chorus', content: "Step into nature's warm embrace,\nFind your rhythm, find your place.\nEvery sense alive and free,\nWelcome to tranquility." },
    ],
    category: "Inspirational",
  },
  {
    id: 7,
    title: "Cosmic Gateway",
    sections: [
      { type: 'verse', content: "Starlight beckons, a cosmic call,\nEvent horizon, the final wall.\nGravity's embrace, time slows down,\nSingularity, where dimensions drown." },
      { type: 'chorus', content: "Step through the gateway to the stars,\nWhere space and time no longer bar.\nYour entrance to the universe vast,\nWhere future, present merge with past." },
    ],
    category: "Sci-Fi",
  },
  {
    id: 8,
    title: "Quantum Leap",
    sections: [
      { type: 'verse', content: "Particles dance, probabilities swirl,\nUncertainty's veil starts to unfurl.\nWavefunction collapses, reality shifts,\nYour presence observed, the quantum mist lifts." },
      { type: 'chorus', content: "Quantum entrance, superposition breaks,\nYour observation, new reality makes.\nSchrödinger's door both open and closed,\nUntil you step in, and truth is exposed." },
    ],
    category: "Sci-Fi",
  },
  // Add more lyrics as needed...
]