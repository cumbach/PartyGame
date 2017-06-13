export const colors = [
  'red',
  'orange',
  'yellow',
  'blue',
  'purple',
  'pink',
  'green',
  'black',
  'grey'
];

export const minigames = [
  {
    title: 'Categories',
    completed: 'Loser',
    directions: 'Go around the circle\nEach player has 3 seconds to name\nan item from the category',
    topics: [
      'Beer Brands',
      'Dog Breeds',
      'Country Capitals'
    ]
  },
  {
    title: 'Trivia',
    completed: 'Winner',
    directions: 'Pick up the phone to hide the answer\nRead the trivia question aloud\n The first person to shout out the answer wins',
    topics: [
      'What is the capital of New York?',
      'Who is the Prime Minister of Canada?'
    ],
    subtopics: [
      'Albany',
      'Justin Trudeau'
    ]
  },
  {
    title: 'Rhyme',
    completed: 'Loser',
    directions: 'Each player must say a word\nthat rhymes with the given word',
    topics: [
      'Ball',
      'Floor',
      'Game'
    ]
  }
]
