// tutorCurriculum.js
// Carnatic Foundations Curriculum — Pre-Sarali Readiness

export const CURRICULUM = [
    {
        id: 'stage1', title: 'Orientation to Carnatic Music', symbol: '🌅',
        subtitle: 'Listen, absorb, and find your home note',
        color: '#1a0e3a', tag: 'Module 1',
        lessons: [
            {
                id: 'm1_1', title: 'What Are We Learning?', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The Voice as an Instrument', body: 'Carnatic music is a system of musical sounds organized around pitch and rhythm. Your voice becomes the instrument.\n\nWe do not begin with songs. We first train the ear and the voice. Repetition and listening are the keys to mastery.' },
                    { type: 'quiz', question: 'In Carnatic music, what do we focus on before learning songs?', choices: ['Complicated lyrics', 'Ear and voice training', 'Singing as fast as possible', 'Memorizing ragas'], correct: 'Ear and voice training', explanation: 'A strong foundation in listening (ear training) and pitch stability (voice training) is required before singing full compositions.' },
                    { type: 'free_sing', duration: 3, instruction: 'Just attempt to make a sound. Don\'t worry about being perfect. Hum "Hmmm" or sing "Aaaaa".' }
                ]
            },
            {
                id: 'm1_2', title: 'Understanding Shruti', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The Musical Home', body: 'Imagine a musical home. No matter where the music travels, it always returns home.\n\nThis home note is your base pitch. The constant drone you hear (the Tambura) plays this note constantly to anchor your ear.' },
                    { type: 'listen', swara: 'Sa', displayLabel: '♪', instruction: 'Close your eyes. Listen only. Build a familiarity with the drone.' },
                    { type: 'free_sing', duration: 4, instruction: 'Hum along with the drone. Place your voice onto the sound.' }
                ]
            }
        ]
    },
    {
        id: 'stage2', title: 'Body & Breath Foundations', symbol: '🫁',
        subtitle: 'Posture and relaxed sound production',
        color: '#0f172a', tag: 'Module 2',
        lessons: [
            {
                id: 'm2_1', title: 'Singing Posture', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Body Affects the Sound', body: 'Correct posture:\n- Straight spine\n- Relaxed shoulders\n- Open chest\n- Jaw and tongue relaxed\n\nHunched shoulders or a tight neck will squeeze your sound. Stay loose!' },
                    { type: 'free_sing', duration: 4, instruction: 'Slouch and sing "Aaaaa". Notice the tension. Now sit up straight, relax your shoulders, and sing again. Hear the difference?' }
                ]
            },
            {
                id: 'm2_2', title: 'Breath Control', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Breath is Fuel', body: 'Breath is the fuel for the voice. We never push sound from the throat.\n\nPlace your hands on your stomach. When you inhale, your belly should expand. When you exhale (or sing), it slowly contracts.' },
                    { type: 'free_sing', duration: 5, instruction: 'Take a deep belly breath and sustain "Hmmmm" for 5 seconds. Keep the airflow absolutely steady.' }
                ]
            }
        ]
    },
    {
        id: 'stage3', title: 'Shruti Alignment', symbol: '🎯',
        subtitle: 'Locking onto the pitch',
        color: '#311025', tag: 'Module 3',
        lessons: [
            {
                id: 'm3_1', title: 'Finding the Base Pitch', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Hearing the Pitch', body: 'Before singing, you must know what being "in tune" sounds like.\n\nWhen two notes are out of tune, they create a wobbling "interference" sound called beats. When they are perfectly in tune, the wobble disappears and the notes blend into one.' },
                    { type: 'tune', instruction: 'Match the slider to the drone until the wobbling stops.' },
                    { type: 'shruti_setup', instruction: "Every voice is unique. Let's calibrate your comfortable home note (Base Sa / Shruti) now!" },
                    { type: 'info', title: 'Don\'t Search Randomly', body: 'When trying to find the base pitch with your voice, do not search randomly.\n\nListen first. Hear the pitch in your head. Then, deliberately place your voice onto that exact sound.' },
                    { type: 'sing', swara: 'Sa', displayLabel: '♪', duration: 1, humanAudioUrl: '/audio/sa_human.mp3', instruction: 'Level 1: Match the base pitch for just 1 second.' },
                    { type: 'sing', swara: 'Sa', displayLabel: '♪', duration: 3, humanAudioUrl: '/audio/sa_human.mp3', instruction: 'Level 2: Match and sustain the pitch for 3 seconds.' },
                    { type: 'sing', swara: 'Sa', displayLabel: '♪', duration: 5, humanAudioUrl: '/audio/sa_human.mp3', instruction: 'Level 3: Match and sustain the pitch for 5 seconds.' }
                ]
            },
            {
                id: 'm3_2', title: 'Staying on Pitch', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Pitch Lock Game', body: 'Pitch drift happens when your voice slowly moves away from the base pitch. Vocal shake happens when you are nervous.\n\nKeep the needle in the center. Sing a straight tone with absolutely no vibrato or wobbling.' },
                    { type: 'sing', swara: 'Sa', displayLabel: '♪', duration: 6, instruction: 'Lock the pitch. Keep the indicator perfectly centered for 6 seconds.' }
                ]
            },
            {
                id: 'm3_3', title: 'Loud vs Stable', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Louder is not Better', body: 'Singing too loudly often causes pitch instability and strain. Singing too softly causes the voice to waver.\n\nA medium-soft volume is usually the most stable.' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Aa', duration: 5, instruction: 'Sing at a comfortable, medium volume. Notice how the pitch stabilizes.' }
                ]
            }
        ]
    },
    {
        id: 'stage4', title: 'Voice Production', symbol: '🗣️',
        subtitle: 'Building a healthy Carnatic tone',
        color: '#3a2b0e', tag: 'Module 4',
        lessons: [
            {
                id: 'm4_1', title: 'Open Throat Sound', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Avoid Squeezing', body: 'A healthy Carnatic tone is resonant and relaxed. If your throat feels tight or scratchy, you are squeezing the sound.\n\nSing the vowel "Aa" with a wide, relaxed jaw.' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Aa', duration: 4, instruction: 'Sing an open, relaxed "Aa".' }
                ]
            },
            {
                id: 'm4_2', title: 'Long Note Training', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Ultimate Foundation', body: 'Holding long notes is the direct preparation for musical patterns. If you can hold a note perfectly steady, moving between notes becomes much easier.' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Aa', duration: 8, instruction: 'Hold the base pitch for 8 seconds. Track your steadiness and breath.' },
                    { type: 'sing', swara: 'Pa', displayLabel: '5th', duration: 8, instruction: 'Hold the fifth note for 8 seconds.' }
                ]
            }
        ]
    },
    {
        id: 'stage5', title: 'Swara Foundations', symbol: '🪜',
        subtitle: 'Understanding pitch locations',
        color: '#1e3a29', tag: 'Module 5',
        lessons: [
            {
                id: 'm5_1', title: 'Intro to Sapta Swaras', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The Seven Notes', body: 'The Sapta Swaras (7 notes) are Sa, Ri, Ga, Ma, Pa, Da, Ni.\n\nThink of them as specific pitch locations on a staircase, not just syllables to memorize.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri', 'Ga', 'Ma', 'Pa', 'Da', 'Ni', 'Ṡ'], instruction: 'Listen to the swaras ascending the staircase.' }
                ]
            },
            {
                id: 'm5_2', title: 'Adjacent Notes', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Moving by Step', body: 'When we move from Sa to Ri, we take a small step up. Listen to how close they are.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri'], instruction: 'Listen to the small step.' },
                    { type: 'quiz', question: 'How many steps are there between Sa and Ri?', choices: ['Zero', 'One step', 'A large leap'], correct: 'One step', explanation: 'Sa and Ri are adjacent, meaning they are next to each other.' }
                ]
            },
            {
                id: 'm5_3', title: 'Ascending vs Descending', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Emotional Direction', body: 'Ascending notes (going up) create a feeling of lifting or tension. Descending notes (going down) create a feeling of settling or resolving.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri', 'Ga'], instruction: 'Listen to the upward, lifting feeling.' },
                    { type: 'listen_sequence', swaras: ['Ga', 'Ri', 'Sa'], instruction: 'Listen to the downward, settling feeling.' }
                ]
            }
        ]
    },
    {
        id: 'stage6', title: 'Ear Training', symbol: '👂',
        subtitle: 'Developing internal hearing',
        color: '#2d1b4e', tag: 'Module 6',
        lessons: [
            {
                id: 'm6_1', title: 'Same or Different?', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Internal Hearing', body: 'Before we sing patterns, we must be able to hear them in our mind. Let\'s test your ear.' },
                    { type: 'compare', note1: 'Sa', note2: 'Sa', question: 'Are these two notes the same or different?', choices: ['Same', 'Different'], correct: 'Same' },
                    { type: 'compare', note1: 'Sa', note2: 'Ri', question: 'Are these two notes the same or different?', choices: ['Same', 'Different'], correct: 'Different' }
                ]
            },
            {
                id: 'm6_2', title: 'Higher or Lower?', tag: 'Practice',
                exercises: [
                    { type: 'compare', note1: 'Sa', note2: 'Ga', question: 'Is the second note higher or lower than the first?', choices: ['Higher', 'Lower'], correct: 'Higher' },
                    { type: 'compare', note1: 'Pa', note2: 'Ma', question: 'Is the second note higher or lower than the first?', choices: ['Higher', 'Lower'], correct: 'Lower' }
                ]
            },
            {
                id: 'm6_3', title: 'Echo Patterns', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Call and Response', body: 'Now, hear a short pattern and echo it back with your voice.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri'], speed: 1, instruction: 'Echo this 2-note pattern: Sa Ri' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri', 'Ga'], speed: 1, instruction: 'Echo this 3-note pattern: Sa Ri Ga' },
                    { type: 'sing_sequence', swaras: ['Ga', 'Ri', 'Sa'], speed: 1, instruction: 'Echo the descending pattern: Ga Ri Sa' }
                ]
            }
        ]
    },
    {
        id: 'stage7', title: 'Tala Foundations', symbol: '⏱️',
        subtitle: 'Internal rhythm awareness',
        color: '#3a1313', tag: 'Module 7',
        lessons: [
            {
                id: 'm7_1', title: 'What is Adi Tala?', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The 8-Beat Cycle', body: 'The most common rhythm in Carnatic music is Adi Tala. It is an 8-beat cycle.\n\nWe keep track of the beat using specific hand gestures: Clap, Pinky finger, Ring finger, Middle finger, Clap, Wave, Clap, Wave.' },
                    { type: 'taalam', instruction: 'Follow the metronome and tap the button exactly on the beat. Watch the gestures so you learn the sequence.' }
                ]
            },
            {
                id: 'm7_2', title: 'Vocal Rhythm Coordination', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Singing on the Beat', body: 'The metronome will click. Your goal is to sing exactly on the click, not before or after.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Sa', 'Sa', 'Sa'], speed: 1, instruction: 'Say "Sa" exactly on each click.' }
                ]
            }
        ]
    },
    {
        id: 'stage8', title: 'Octaves & Movement', symbol: '🌊',
        subtitle: 'Voice sliding and jumps',
        color: '#0f293a', tag: 'Module 8',
        lessons: [
            {
                id: 'm8_1', title: 'Understanding Octaves', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The Three Registers', body: 'Your voice can sing in different ranges (sthayi):\n- Mandra (Lower)\n- Madhya (Middle - where we usually sing)\n- Tara (Higher)' },
                    { type: 'listen', swara: 'Sa', instruction: 'Listen to Middle Sa.' },
                    { type: 'listen', swara: 'Ṡ', instruction: 'Listen to Higher Sa (Tara Sthayi).' }
                ]
            },
            {
                id: 'm8_2', title: 'Jumps', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Agility Training', body: 'We will now practice jumping between distant notes to build vocal agility and confidence.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Pa'], speed: 1, instruction: 'Jump from Sa to Pa.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ṡ'], speed: 1, instruction: 'Jump from Middle Sa to Higher Sa.' }
                ]
            }
        ]
    },
    {
        id: 'stage9', title: 'Pre-Sarali Readiness', symbol: '🎓',
        subtitle: 'The final gate',
        color: '#2a2a2a', tag: 'Module 9',
        lessons: [
            {
                id: 'm9_1', title: 'Final Skill Check', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Are You Ready?', body: 'To begin Sarali Varisai, you must prove you have mastered the foundations:\n✅ 5-second pitch sustain\n✅ Swara recognition\n✅ Steady rhythm\n✅ Relaxed voice' },
                    { type: 'sing', swara: 'Sa', duration: 5, instruction: 'Final Test 1: Sustain Sa perfectly for 5 seconds.' },
                    { type: 'identify', play: 'Ga3', choices: ['Sa', 'Ri1', 'Ga3', 'Ma1'], instruction: 'Final Test 2: Identify this note.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1'], speed: 1, instruction: 'Final Test 3: Echo this 4-note pattern steadily.' },
                    { type: 'info', title: 'Congratulations!', body: 'You have completed the Pre-Sarali curriculum. You now have the ear, the breath, and the pitch stability required to truly learn Carnatic music.\n\nYou are ready for Sarali Varisai!' }
                ]
            }
        ]
    },
    {
        id: 'stage10', title: 'Graduation', symbol: '🎓',
        subtitle: 'The bridge to Sarali Varisai',
        color: '#1a3a1b', tag: 'Module 10',
        lessons: [
            {
                id: 'm10_1', title: 'You Are Ready', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'What is Sarali Varisai?', body: 'Congratulations! You have mastered breath, pitch, and pulse. You are now ready to begin the formal Carnatic curriculum starting with Sarali Varisai.\n\nSarali Varisai are fundamental sequences of notes that combine everything you just learned.' },
                    { type: 'info', title: 'Unlocking the App', body: 'Because you have completed the foundations, the advanced features of this app are now unlocked!\n\nYou can head over to "Sing & Discover" or "Raga Practice" to explore hundreds of real ragas.' },
                    { type: 'quiz', question: 'What is the most important rule when practicing Sarali Varisai?', choices: ['Sing as loud as possible', 'Always maintain perfect Shruti and Tala', 'Memorize the names quickly', 'Use an instrument'], correct: 'Always maintain perfect Shruti and Tala', explanation: 'Never sacrifice your pitch or rhythm just to finish an exercise. Accuracy is everything.' }
                ]
            }
        ]
    }
];
