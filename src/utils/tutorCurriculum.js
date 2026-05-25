// tutorCurriculum.js
// Carnatic Foundations Curriculum — Pre-Sarali Readiness

export const CURRICULUM = [
    // ─── STAGE 1: ORIENTATION ──────────────────────────────────────────
    {
        id: 'stage1', title: 'Orientation to Carnatic Music', symbol: '🌅',
        subtitle: 'Listen, absorb, and find your home note',
        color: '#1a0e3a', tag: 'Module 1',
        lessons: [
            {
                id: 'm1_1', title: 'The Vocal Instrument', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The Voice as an Instrument', body: 'Welcome to your Carnatic vocal journey! Carnatic music is an ancient classical art form centered on two pillars: Raga (melodic framework) and Tala (rhythmic cycle).\n\nWe do not begin with songs. We first train the ear and the voice to hold pure pitches. Repetition and active listening are the keys to vocal mastery.' },
                    { type: 'quiz', question: 'In Carnatic music, what do we focus on before learning full compositions?', choices: ['Complicated lyrics', 'Ear and voice training', 'Singing as fast as possible', 'Memorizing ragas'], correct: 'Ear and voice training', explanation: 'A strong foundation in listening (ear training) and pitch stability (voice training) is required before singing full compositions.' },
                    { type: 'free_sing', duration: 3, instruction: 'Just attempt to make a sound. Don\'t worry about being perfect. Hum "Hmmm" or sing "Aaaaa".' }
                ]
            },
            {
                id: 'm1_2', title: 'Understanding Shruti', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The Musical Home', body: 'Imagine a musical home. No matter where the music travels, it always returns home.\n\nThis home note is called your Shruti (base pitch). In Carnatic music, all singers have their own unique Shruti that matches their voice. A constant drone instrument (the Tambura) plays this note constantly to anchor your ears.' },
                    { type: 'listen', swara: 'Sa', displayLabel: '♪', instruction: 'Close your eyes. Listen to the Tambura drone. Let your ears settle into the base note.' },
                    { type: 'free_sing', duration: 4, instruction: 'Hum along with the drone. Place your voice onto the sound.' }
                ]
            }
        ]
    },

    // ─── STAGE 2: POSTURE & BREATH ─────────────────────────────────────
    {
        id: 'stage2', title: 'Body & Breath Foundations', symbol: '🫁',
        subtitle: 'Posture and relaxed sound production',
        color: '#0f172a', tag: 'Module 2',
        lessons: [
            {
                id: 'm2_1', title: 'Singing Posture', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Body Affects the Sound', body: 'Correct singing posture:\n- Sit with a straight, vertical spine.\n- Relax your shoulders (no shrugging).\n- Keep your chest naturally open.\n- Relax your jaw and tongue completely.\n\nHunched shoulders or a tight neck will compress your vocal cords. Stay loose!' },
                    { type: 'free_sing', duration: 4, instruction: 'Slouch and sing "Aaaaa". Notice the tension. Now sit up straight, relax your shoulders, and sing again. Hear the resonance?' }
                ]
            },
            {
                id: 'm2_2', title: 'Breath Control', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Breath is Fuel', body: 'Your breath is the physical fuel for your voice. We never squeeze sound from the throat.\n\nPlace a hand on your lower belly. When you inhale, your belly should expand outward. As you sing or hum, the belly slowly and smoothly draws inward.' },
                    { type: 'free_sing', duration: 5, instruction: 'Take a deep belly breath and sustain "Hmmmm" for 5 seconds. Keep the airflow absolutely steady.' }
                ]
            }
        ]
    },

    // ─── STAGE 3: TALA & PULSE FOUNDATIONS ─────────────────────────────
    {
        id: 'stage3', title: 'Tala & Pulse Foundations', symbol: '⏱️',
        subtitle: 'Internal rhythm awareness and physical hand gestures',
        color: '#3a1313', tag: 'Module 3',
        lessons: [
            {
                id: 'm3_1', title: 'What is Adi Tala?', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'Keeping the Pulse', body: 'Rhythm in Carnatic music is kept manually by the hand using a cycle called Tala. This is taught FIRST because a strong internal clock is required to align your pitch.\n\nThe most popular rhythm is Adi Tala (8 beats). The physical gestures use your RIGHT hand on your RIGHT thigh:\n- Beat 1: Pat your right thigh (Thattu)\n- Beats 2, 3, 4: Tap fingers one by one onto thigh (Pinky → Ring → Middle)\n- Beat 5: Pat your right thigh\n- Beat 6: Wave — flip hand over, show back of hand (Visarjitam)\n- Beat 7: Pat your right thigh\n- Beat 8: Wave again\n\nThis is much easier to learn by watching. Search "Adi Tala hand gestures" on YouTube before practicing here.' },
                    { type: 'taalam', instruction: 'Follow the metronome and tap on each beat. Learn the hand gesture flow.' }
                ]
            },
            {
                id: 'm3_2', title: 'Rhythm Keepers', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Vocal Tap Alignment', body: 'Before we learn different pitch positions, let\'s practice aligning our vocal onset to the pulse clicks. You will hear snappy woodblock counts first.\n\nSing "Sa" (at any pitch that feels comfortable) exactly on the click. Do not drag or rush.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Sa', 'Sa', 'Sa'], speed: 1, instruction: 'Sing "Sa" exactly on each beat click.' }
                ]
            },
            {
                id: 'm3_3', title: 'Module 3 Review: Pulse Master', tag: 'Review',
                exercises: [
                    { type: 'info', title: 'Consolidating Rhythm', body: 'Before we calibrate your vocal range, let\'s verify your internal rhythm and understanding of the Adi Tala structure.' },
                    { type: 'quiz', question: 'How many beats are in one full cycle of Adi Tala?', choices: ['4 beats', '6 beats', '8 beats', '12 beats'], correct: '8 beats', explanation: 'Adi Tala consists of exactly 8 beats in one complete loop, subdivided as 4 beats (Laghu) and 2 + 2 beats (two Drutams).' },
                    { type: 'quiz', question: 'On which beats do you perform a thigh pat (Thattu) in Adi Tala?', choices: ['Beats 1, 5, and 7', 'Only on Beat 1', 'Beats 2, 4, 6, and 8', 'Beats 3, 4, and 5'], correct: 'Beats 1, 5, and 7', explanation: 'In Adi Tala, thigh pats (Thattu) are the starting markers for the three sections, occurring exactly on Beat 1, Beat 5, and Beat 7.' },
                    { type: 'quiz', question: 'What physical gesture corresponds to beats 6 and 8 in Adi Tala?', choices: ['Tapping finger (Pinky or Ring)', 'Clapping both hands', 'Wave — flipping the hand to show its back (Visarjitam)', 'Tapping the thumb'], correct: 'Wave — flipping the hand to show its back (Visarjitam)', explanation: 'Beats 6 and 8 are the waving gestures (Visarjitam), where you flip your hand over to show the back of the hand on the thigh.' }
                ]
            }
        ]
    },

    // ─── STAGE 4: SHRUTI ALIGNMENT & CALIBRATION ───────────────────────
    {
        id: 'stage4', title: 'Shruti Alignment & Calibration', symbol: '🎯',
        subtitle: 'Locking onto your unique base pitch',
        color: '#311025', tag: 'Module 4',
        lessons: [
            {
                id: 'm4_1', title: 'Finding the Base Pitch', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Hearing the Wobble', body: 'Now that you have a solid rhythmic pulse, let\'s find your pitch anchor.\n\nWhen two notes are out of tune, they create a wobbling volume fluctuation called acoustic beats. When they are perfectly in tune, the wobble disappears, creating a stable, resonant blend.' },
                    { type: 'tune', instruction: 'Match the slider to the drone until the wobbling beats stop completely.' },
                    { type: 'shruti_setup', instruction: "Every voice is unique. Let's calibrate your comfortable home note (Base Sa / Shruti) now!" }
                ]
            },
            {
                id: 'm4_2', title: 'Sustaining Base Sa', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Active Vocal Placement', body: 'When singing the base note (Sa), do not search for it randomly. Hear the pitch in your head first, then place your voice directly onto the Tambura drone.' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Sa', duration: 2, instruction: 'Match the base pitch (Sa) for just 2 seconds.' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Sa', duration: 5, instruction: 'Sustain the base pitch (Sa) steadily for 5 seconds.' }
                ]
            },
            {
                id: 'm4_3', title: 'Staying on Pitch', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Avoiding Pitch Drift', body: 'Pitch drift happens when your voice slowly sags or rises. Vocal shake happens when your breath is unstable.\n\nTo lock in the pitch, keep your voice steady and direct, without adding any decorative wobble (vibrato).' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Sa', duration: 8, instruction: 'Lock the pitch. Sustain Sa steadily for 8 seconds without drifting!' }
                ]
            },
            {
                id: 'm4_4', title: 'Module 4 Review: Shruti Master', tag: 'Review',
                exercises: [
                    { type: 'info', title: 'Module 4 Consolidation', body: 'Let\'s check your base pitch stability before moving forward. You must sustain your calibrated Sa perfectly.' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Sa', duration: 6, instruction: 'Sustain Sa for 6 seconds to unlock the next module.' }
                ]
            }
        ]
    },

    // ─── STAGE 5: THE PERFECT FIFTH ────────────────────────────────────
    {
        id: 'stage5', title: 'The Perfect Fifth (Sa-Pa)', symbol: '🌊',
        subtitle: 'The fundamental acoustic interval',
        color: '#3a2b0e', tag: 'Module 5',
        lessons: [
            {
                id: 'm5_1', title: 'The Power of Pa', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'Why Sa and Pa Matter', body: 'In Carnatic music, the relationship between Sa (1st) and Pa (5th) is the most fundamental interval in all of music, known as the Perfect Fifth (Panchama Bhava).\n\nThese two notes are acoustic anchors. The Tambura drone plays both Sa and Pa constantly because they blend in perfect harmony.' },
                    { type: 'listen', swara: 'Sa', displayLabel: 'Sa', instruction: 'Listen to Sa, the starting root note.' },
                    { type: 'listen', swara: 'Pa', displayLabel: 'Pa', instruction: 'Listen to Pa. Feel how it blends perfectly with the drone.' }
                ]
            },
            {
                id: 'm5_2', title: 'Matching the Fifth', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Finding Pa with your Voice', body: 'Now, let\'s practice singing Pa. It is located exactly a fifth above Sa. Imagine it as a clean leap upward.' },
                    { type: 'sing', swara: 'Pa', displayLabel: 'Pa', duration: 4, instruction: 'Sing and sustain Pa for 4 seconds.' },
                    { type: 'sing', swara: 'Pa', displayLabel: 'Pa', duration: 8, instruction: 'Sustain the perfect fifth (Pa) for 8 seconds.' }
                ]
            },
            {
                id: 'm5_3', title: 'Module 5 Review: Sa-Pa Leap', tag: 'Review',
                exercises: [
                    { type: 'info', title: 'Interval Check', body: 'To finish this module, you must leap from Sa to Pa in sequence.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Pa'], speed: 1.5, instruction: 'Sing Sa, then leap directly to Pa.' }
                ]
            }
        ]
    },

    // ─── STAGE 6: SYSTEMATIC SWARA FOUNDATIONS ────────────────────────
    {
        id: 'stage6', title: 'Systematic Swara Foundations', symbol: '🪜',
        subtitle: 'Step-by-step introduction of the scale',
        color: '#1e3a29', tag: 'Module 6',
        lessons: [
            {
                id: 'm6_1', title: 'Understanding Swara Numbers', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The 16 Swarasthanas', body: 'In Carnatic music, there are 7 basic swara names: Sa, Ri, Ga, Ma, Pa, Da, Ni.\n\nHowever, some swaras have multiple variants (frequencies) called Swarasthanas. That is why you see numbers:\n- Ri1 (Suddha Rishabham): Low Ri\n- Ga3 (Antara Gandharam): High Ga\n- Ma1 (Suddha Madhyamam): Low Ma\n- Da1 (Suddha Dhaivatham): Low Da\n- Ni3 (Kakali Nishadham): High Ni\n\nThese numbers represent the precise frequency step on our Mayamalavagowla octave staircase!' },
                    { type: 'quiz', question: 'What do the numbers on swaras like Ri1 and Ga3 represent?', choices: ['How loud to sing them', 'The exact frequency variants (swarasthanas)', 'Arbitrary label names', 'The octave level'], correct: 'The exact frequency variants (swarasthanas)', explanation: 'Numbers indicate which specific frequency variation of the swara is used in the scale.' }
                ]
            },
            {
                id: 'm6_2', title: 'The Anchors: Sa, Pa, High Sa', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Scale Pillars', body: 'Let\'s start with the three pillars of the Carnatic octave:\n1. Sa (Root)\n2. Pa (Perfect Fifth)\n3. Ṡ (High Sa - Tara Sthayi Sa)\n\nLet\'s hear and practice them!' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Pa', 'Ṡ'], instruction: 'Listen to the pillars: Sa, Pa, Ṡ' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Sa', duration: 3, instruction: 'Sing the root note Sa.' },
                    { type: 'sing', swara: 'Pa', displayLabel: 'Pa', duration: 3, instruction: 'Sing the perfect fifth Pa.' },
                    { type: 'sing', swara: 'Ṡ', displayLabel: 'Ṡ (High)', duration: 3, instruction: 'Sing the upper-octave Sa (Ṡ).' }
                ]
            },
            {
                id: 'm6_3', title: 'The Lower Steps: Ri, Ga, Ma', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Meeting Ri1, Ga3, Ma1', body: 'Now, let\'s explore the notes in the lower half of the scale (Purvanga):\n- Ri1: A small, low step above Sa.\n- Ga3: A high, bright Gandharam note.\n- Ma1: The middle bridge note (Madhyamam).\n\nLet\'s learn them individually!' },
                    { type: 'listen', swara: 'Ri1', displayLabel: 'Ri1', instruction: 'Listen to Suddha Rishabham (Ri1).' },
                    { type: 'sing', swara: 'Ri1', displayLabel: 'Ri1', duration: 3, instruction: 'Match the pitch of Ri1.' },
                    { type: 'listen', swara: 'Ga3', displayLabel: 'Ga3', instruction: 'Listen to Antara Gandharam (Ga3).' },
                    { type: 'sing', swara: 'Ga3', displayLabel: 'Ga3', duration: 3, instruction: 'Match the pitch of Ga3.' },
                    { type: 'listen', swara: 'Ma1', displayLabel: 'Ma1', instruction: 'Listen to Suddha Madhyamam (Ma1).' },
                    { type: 'sing', swara: 'Ma1', displayLabel: 'Ma1', duration: 3, instruction: 'Match the pitch of Ma1.' }
                ]
            },
            {
                id: 'm6_4', title: 'The Upper Steps: Da, Ni', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Meeting Da1, Ni3', body: 'Finally, let\'s explore the notes above Pa (Uttaranga) in the Mayamalavagowla scale:\n- Da1 (Suddha Dhaivatham): A small step above Pa.\n- Ni3 (Kakali Nishadham): A high, bright seventh step located just a semi-tone below Ṡ.\n\nLet\'s hear and match them!' },
                    { type: 'listen', swara: 'Da1', displayLabel: 'Da1', instruction: 'Listen to Suddha Dhaivatham (Da1).' },
                    { type: 'sing', swara: 'Da1', displayLabel: 'Da1', duration: 3, instruction: 'Match the pitch of Da1.' },
                    { type: 'listen', swara: 'Ni3', displayLabel: 'Ni3', instruction: 'Listen to Kakali Nishadham (Ni3).' },
                    { type: 'sing', swara: 'Ni3', displayLabel: 'Ni3', duration: 3, instruction: 'Match the pitch of Ni3.' }
                ]
            },
            {
                id: 'm6_5', title: 'Ascending vs Descending (Avarohanam)', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Going Up and Coming Down', body: 'In Carnatic music, scales are practiced in two directions:\n- Arohanam: Ascending sequence (climbing up the stairs).\n- Avarohanam: Descending sequence (walking back down).\n\nDescending is historically harder for beginners because you must relax your throat tension systematically to land on each lower step.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa', 'Da1', 'Ni3', 'Ṡ'], instruction: 'Arohanam: Listen to the scale climb UP.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni3', 'Da1', 'Pa', 'Ma1', 'Ga3', 'Ri1', 'Sa'], instruction: 'Avarohanam: Listen to the scale walk DOWN.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Pa', 'Da1', 'Ni3', 'Ṡ'], speed: 1.2, instruction: 'Practice ascending (Arohanam): Sing Sa up to Ṡ.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Ni3', 'Da1', 'Pa'], speed: 1.2, instruction: 'Practice descending (upper half): Sing Ṡ down to Pa.' },
                    { type: 'sing_sequence', swaras: ['Ma1', 'Ga3', 'Ri1', 'Sa'], speed: 1.2, instruction: 'Practice descending (lower half): Sing Ma down to Sa.' }
                ]
            },
            {
                id: 'm6_6', title: 'Module 6 Review: Full Scale Check', tag: 'Review',
                exercises: [
                    { type: 'info', title: 'Module 6 Ascent & Descent Check', body: 'To unlock the next module, you must sing both a three-note climb (Arohanam) and a three-note descent (Avarohanam).' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3'], speed: 1, instruction: 'Ascending: Sa Ri Ga' },
                    { type: 'sing_sequence', swaras: ['Ga3', 'Ri1', 'Sa'], speed: 1, instruction: 'Descending: Ga Ri Sa' }
                ]
            }
        ]
    },

    // ─── STAGE 7: SOLFEGE & EAR TRAINING ────────────────────────────────
    {
        id: 'stage7', title: 'Ear Training & Syllables', symbol: '👂',
        subtitle: 'Syllables, intervals, and echo patterns',
        color: '#2d1b4e', tag: 'Module 7',
        lessons: [
            {
                id: 'm7_1', title: 'Syllable Singing (Swaram vs Akaram)', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'Sing the Names Out Loud!', body: 'Up until now, you have mostly hummed or held an open "Aaaa" vowel. This is called Akaram.\n\nIn Carnatic music, we must also sing the actual swara syllable names: "Sa", "Ri", "Ga", "Ma", "Pa", "Da", "Ni" out loud! This is called Swaram singing. Saying the names builds muscle memory and rhythm coordination.' },
                    { type: 'quiz', question: 'What is the difference between Akaram and Swaram singing?', choices: ['Swaram is louder than Akaram', 'Akaram is singing on vowels (Aa); Swaram is singing the syllable names (Sa, Ri, Ga)', 'Swaram is only played on instruments', 'Akaram is for experts only'], correct: 'Akaram is singing on vowels (Aa); Swaram is singing the syllable names (Sa, Ri, Ga)', explanation: 'Akaram uses pure vowel sounds, while Swaram uses the actual names of the notes.' },
                    { type: 'sing', swara: 'Sa', displayLabel: 'Say "Sa!"', duration: 3, instruction: 'Sustain the pitch while clearly singing the syllable "Sa".' },
                    { type: 'sing', swara: 'Ri1', displayLabel: 'Say "Ri!"', duration: 3, instruction: 'Sustain the pitch while clearly singing the syllable "Ri".' }
                ]
            },
            {
                id: 'm7_2', title: 'Same or Different?', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Internal Hearing Test', body: 'Let\'s test your ear accuracy. Listen closely and identify whether the pitches are identical.' },
                    { type: 'compare', note1: 'Sa', note2: 'Sa', question: 'Are these two notes the same or different?', choices: ['Same', 'Different'], correct: 'Same' },
                    { type: 'compare', note1: 'Sa', note2: 'Ri1', question: 'Are these two notes the same or different?', choices: ['Same', 'Different'], correct: 'Different' }
                ]
            },
            {
                id: 'm7_3', title: 'Higher or Lower?', tag: 'Practice',
                exercises: [
                    { type: 'compare', note1: 'Sa', note2: 'Ga3', question: 'Is the second note higher or lower than the first?', choices: ['Higher', 'Lower'], correct: 'Higher' },
                    { type: 'compare', note1: 'Pa', note2: 'Ma1', question: 'Is the second note higher or lower than the first?', choices: ['Higher', 'Lower'], correct: 'Lower' }
                ]
            },
            {
                id: 'm7_4', title: 'Echo Patterns', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Echoing Swaras', body: 'Listen to a pattern, then sing it back using the actual swara syllable names.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1'], speed: 1, instruction: 'Echo back: Sa Ri' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3'], speed: 1, instruction: 'Echo back: Sa Ri Ga' },
                    { type: 'sing_sequence', swaras: ['Ga3', 'Ri1', 'Sa'], speed: 1, instruction: 'Echo the descending pattern: Ga Ri Sa' }
                ]
            },
            {
                id: 'm7_5', title: 'Module 7 Review: Ear & Solfege', tag: 'Review',
                exercises: [
                    { type: 'info', title: 'Module 7 Gatekeeper', body: 'Prove you can hear the difference and echo a 4-note sequence using swaras.' },
                    { type: 'compare', note1: 'Ma1', note2: 'Ga3', question: 'Is the second note higher or lower than the first?', choices: ['Higher', 'Lower'], correct: 'Lower' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1'], speed: 1, instruction: 'Echo: Sa Ri Ga Ma' }
                ]
            }
        ]
    },

    // ─── STAGE 8: THE SARALI BRIDGE ───────────────────────────────────
    {
        id: 'stage8', title: 'The Sarali Bridge', symbol: '🎹',
        subtitle: 'Combining pitch patterns and rhythm',
        color: '#0f293a', tag: 'Module 8',
        lessons: [
            {
                id: 'm8_1', title: 'Pitch Patterns on the Beat', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Swaras on the Pulse', body: 'This is the ultimate bridge to Sarali Varisai! We are going to change pitches (Swaras) exactly in sync with the rhythmic metronome clicks.\n\nSing the actual syllable names ("Sa", "Ri", "Ga", "Ma") exactly on the woodblock clicks!' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1'], speed: 1, instruction: 'Sing "Sa Ri Ga Ma" in perfect rhythm!' },
                    { type: 'sing_sequence', swaras: ['Ma1', 'Ga3', 'Ri1', 'Sa'], speed: 1, instruction: 'Sing descending "Ma Ga Ri Sa" in rhythm!' }
                ]
            },
            {
                id: 'm8_2', title: 'Module 8 Review: Rhythmic Mastery', tag: 'Review',
                exercises: [
                    { type: 'info', title: 'The Rhythmic Bridge Gate', body: 'Combine ascending and descending swaras in a single continuous rhythmic phrase.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', 'Ma1', 'Ga3', 'Ri1', 'Sa'], speed: 1, instruction: 'Sing Sa Ri Ga Ma Ma Ga Ri Sa on the beats!' }
                ]
            }
        ]
    },

    // ─── STAGE 9: PRE-SARALI FINAL GATE ────────────────────────────────
    {
        id: 'stage9', title: 'Pre-Sarali Readiness Gate', symbol: '🎓',
        subtitle: 'The absolute foundation checklist',
        color: '#2a2a2a', tag: 'Module 9',
        lessons: [
            {
                id: 'm9_1', title: 'The Comprehensive Exam', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Are You Ready?', body: 'To qualify for Sarali Varisai and graduate from foundations, you must pass four specific checkmarks:\n✅ Perfect Shruti Stability (6s sustain)\n✅ Swara Identification\n✅ Avarohanam (Descending pitch accuracy)\n✅ Rhythmic Solfege Coordination' },
                    { type: 'sing', swara: 'Sa', duration: 6, instruction: 'Test 1: Sustain Sa perfectly for 6 seconds.' },
                    { type: 'identify', play: 'Ga3', choices: ['Sa', 'Ri1', 'Ga3', 'Ma1'], instruction: 'Test 2: Identify this swarasthana.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Ni3', 'Da1', 'Pa'], speed: 1.2, instruction: 'Test 3: Descend correctly from Ṡ to Pa.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1'], speed: 1, instruction: 'Test 4: Sing Sa Ri Ga Ma on the beat clicks.' },
                    { type: 'info', title: 'Foundations Verified!', body: 'Splendid! You have successfully passed the Pre-Sarali Readiness checklist.\n\nYou have built the ear, locked the breath, learned your unique Shruti, and established a solid pulse coordinate.\n\nYou are ready for Raga graduation!' }
                ]
            }
        ]
    },

    // ─── STAGE 10: GRADUATION ──────────────────────────────────────────
    {
        id: 'stage10', title: 'Graduation', symbol: '🏆',
        subtitle: 'Entering the universe of Ragas',
        color: '#1a3a1b', tag: 'Module 10',
        lessons: [
            {
                id: 'm10_1', title: 'Unlocking Raga Practice', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'The World of Carnatic Music', body: 'Congratulations! You have completed the Foundations curriculum. You are no longer just guessing pitch—you are a trained classical student.\n\nYou have fully unlocked the advanced Raga Practice mode! You can now explore, hear, sing, and master the full scale structures of Carnatic Ragas.' },
                    { type: 'quiz', question: 'What is the most critical asset for a Carnatic student as they begin Sarali Varisai?', choices: ['Singing as fast as possible', 'Memorizing a song blindly', 'Always maintain perfect Shruti (pitch) and Tala (rhythm)', 'Singing without a drone'], correct: 'Always maintain perfect Shruti (pitch) and Tala (rhythm)', explanation: 'Accuracy of pitch and rhythm (Shruti and Tala) is the bedrock of classical Carnatic music. speed will follow naturally.' }
                ]
            }
        ]
    }
];

// parseBeatGroups — converts beat-group arrays into a flat swaras array with fractional durations.
// Each element of `groups` is either:
//   '|' or '||'  → bar marker, passed through as-is
//   [note, ...]  → all notes split equally within one beat
//                  use ',' or ';' or '-' for rests within the group
// swaraMap maps single characters to app note names (e.g. { S:'Sa', g:'Ga2.', N:'Ni3', n:'Ni2.' })
// Example:
//   parseBeatGroups([[',',',','g'], [',','m'], ['P'], ['m','g','G',',',',','r'], [',','N'], '|', ['S']], KAPI_SWARAS)
export function parseBeatGroups(groups, swaraMap) {
    const REST = new Set([',', ';', '-']);
    const result = [];
    for (const group of groups) {
        if (group === '|' || group === '||') { result.push(group); continue; }
        const n = group.length;
        const dur = 1 / n;
        for (const ch of group) {
            if (REST.has(ch)) {
                result.push(n === 1 ? ',' : { swara: ',', duration: dur });
            } else {
                const note = swaraMap ? (swaraMap[ch] ?? ch) : ch;
                result.push(n === 1 ? note : { swara: note, duration: dur });
            }
        }
    }
    return result;
}

// parseMmgMandhra: same as parseMmg but also handles the `.` suffix for lower-octave (Mandhra) notes.
// e.g. `n.` → 'Ni.'  `d.` → 'Da.'  `p.` → 'Pa.'  `m.` → 'Ma.'
// Uppercase S → 'Ṡ' (upper Sa), plain lowercase → middle-octave names, as in parseMmg.
export function parseMmgMandhra(str) {
    const loMap = { 's': 'Sa.', 'r': 'Ri.', 'g': 'Ga.', 'm': 'Ma.', 'p': 'Pa.', 'd': 'Da.', 'n': 'Ni.' };
    const midMap = { 's': 'Sa', 'r': 'Ri', 'g': 'Ga', 'm': 'Ma', 'p': 'Pa', 'd': 'Da', 'n': 'Ni', 'S': 'Ṡ' };
    const tokens = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '|') {
            if (str[i + 1] === '|') { tokens.push('||'); i++; }
            else tokens.push('|');
        } else if (char === ',') {
            // In mandhra notation commas mean "hold the previous note", not silence
            tokens.push('-');
        } else if (loMap[char] && str[i + 1] === '.') {
            tokens.push(loMap[char]);
            i++;
        } else if (midMap[char]) {
            tokens.push(midMap[char]);
        }
    }
    return tokens;
}

export function parseMmg(str) {
    const map = {
        's': 'Sa', 'r': 'Ri', 'g': 'Ga', 'm': 'Ma', 'p': 'Pa', 'd': 'Da', 'n': 'Ni', 'S': 'Ṡ', ',': ','
    };
    const tokens = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (map[char]) {
            tokens.push(map[char]);
        } else if (char === '|') {
            if (str[i+1] === '|') {
                tokens.push('||');
                i++;
            } else {
                tokens.push('|');
            }
        }
    }
    return tokens;
}

const cloneTokenWithDuration = (token, duration, notationSuffix = []) => ({
    swara: typeof token === 'string' ? token : token.swara,
    duration,
    notationSuffix: [
        ...(typeof token === 'string' ? [] : token.notationSuffix || []),
        ...notationSuffix
    ]
});

const sustainNotation = (tokens) => {
    const rhythmic = [];
    let lastPlayableIdx = -1;

    tokens.forEach(token => {
        const swara = typeof token === 'string' ? token : token?.swara;
        if (swara === '|' || swara === '||') {
            rhythmic.push(token);
            return;
        }

        if (swara === ',' || swara === ';' || swara === '-') {
            if (lastPlayableIdx >= 0) {
                const prev = rhythmic[lastPlayableIdx];
                rhythmic[lastPlayableIdx] = cloneTokenWithDuration(
                    prev,
                    (typeof prev === 'string' ? 1 : prev.duration || 1) + (typeof token === 'string' ? 1 : token.duration || 1),
                    [swara]
                );
            } else {
                rhythmic.push(cloneTokenWithDuration(',', typeof token === 'string' ? 1 : token.duration || 1));
            }
            return;
        }

        rhythmic.push(token);
        lastPlayableIdx = rhythmic.length - 1;
    });

    return rhythmic;
};

const inferTala = (body = '') => {
    if (body.includes('Khaṇḍa') || body.includes('khaṇḍa')) {
        return { name: 'Khaṇḍa gati', groups: [5], unitLabel: '5 inner pulses per beat' };
    }
    if (body.includes('Miśra Chāpu') || body.includes('Misra Chapu')) {
        return { name: 'Miśra Chāpu', groups: [3, 2, 2], unitLabel: '7-count cycle' };
    }
    if (body.includes('Ādi') || body.includes('Adi')) {
        return { name: 'Ādi', groups: [4, 2, 2], unitLabel: '8-beat cycle' };
    }
    if (body.includes('Tisra Jāti Triputa')) {
        return { name: 'Tisra Jāti Triputa', groups: [3, 2, 2], unitLabel: '7-beat cycle' };
    }
    if (body.includes('Chatusra Jāti Triputa')) {
        return { name: 'Chatusra Jāti Triputa', groups: [4, 2, 2], unitLabel: '8-beat cycle' };
    }
    if (body.includes('Chatusra Jāti Rūpaka')) {
        return { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' };
    }
    return null;
};

const withCompositionRhythm = (curriculum) => curriculum.map(stage => ({
    ...stage,
    lessons: stage.lessons.map(lesson => {
        let currentTala = null;
        const exercises = lesson.exercises.map(exercise => {
            if (exercise.type === 'info') {
                currentTala = inferTala(exercise.body) || currentTala;
                return exercise;
            }
            if ((exercise.type === 'listen_sequence' || exercise.type === 'sing_sequence') && Array.isArray(exercise.swaras)) {
                return {
                    ...exercise,
                    tala: exercise.tala || currentTala || null,
                };
            }
            return exercise;
        });
        return { ...lesson, exercises };
    })
}));

export const SARALI_CURRICULUM = [
    {
        id: 'sarali_stage1', title: 'Elementary Foundations', symbol: '🌱',
        subtitle: 'The first steps in single-beat rhythm',
        color: '#0f172a', tag: 'Stage 1',
        lessons: [
            {
                id: 's_1', title: 'Varisai 1: The Ascent and Descent', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'Namaste, my student. Welcome to the first Sarali Varisai. We walk straight up the scale (Arohanam) and walk straight back down (Avarohanam) in single-beat measures.\n\nFocus on maintaining an open throat, standard Akaram resonance, and a steady pitch.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p d | n S || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen closely to the ascending and descending notes.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p d | n S || S n d p | m g | r s ||'), speed: 1, instruction: 'Now sing it back in perfect sync with the beat clicks.' }
                ]
            },
            {
                id: 's_2', title: 'Varisai 2: The Staggered Steps', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'In this second lesson, we introduce staggered steps: "Sa-Ri-Sa-Ri" and then rise. This pattern tests your pitch recall and stability.\n\nSing each swara clearly, ensuring your Ri is stable and Sa is grounded.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r s r | s r | g m || s r g m | p d | n S || S n S n | S n | d p || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the staggered movement.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r s r | s r | g m || s r g m | p d | n S || S n S n | S n | d p || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing the staggered steps back with absolute focus.' }
                ]
            },
            {
                id: 's_3', title: 'Varisai 3: The Zig-Zag Leap', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'Now, we skip! We sing "Sa-Ri-Ga-Sa" and "Ri-Ga-Sa-Ri". Skipping back to the home note requires you to coordinate your breath without sliding.\n\nKeep the notes separated and crisp.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g s | r g | s r || s r g m | p d | n S || S n d S | n d | S n || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the leaps.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g s | r g | s r || s r g m | p d | n S || S n d S | n d | S n || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing the zig-zag leaps on the beats.' }
                ]
            },
            {
                id: 's_4', title: 'Varisai 4: Double Steps', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'In this fourth pattern, we repeat the first tetrachord ("Sa-Ri-Ga-Ma") twice before rising to the upper octave. This reinforces the core notes.\n\nLet the pulse click guide your tempo perfectly.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | s r | g m || s r g m | p d | n S || S n d p | S n | d p || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the doubled tetrachords.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | s r | g m || s r g m | p d | n S || S n d p | S n | d p || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing it back in sync.' }
                ]
            }
        ]
    },
    {
        id: 'sarali_stage2', title: 'The Art of Pauses', symbol: '🍃',
        subtitle: 'Introducing silence and timing control',
        color: '#1e293b', tag: 'Stage 2',
        lessons: [
            {
                id: 's_5', title: 'Varisai 5: The Silent Pulse', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'Silence is as beautiful as sound. We introduce a one-beat pause (represented by the comma ,) after Pa.\n\nDo not sing during the pause—hold your breath in absolute, restful stillness before re-entering on Sa.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p , | s r || s r g m | p d | n S || S n d p | m , | S n || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the silent pause after Pa.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p , | s r || s r g m | p d | n S || S n d p | m , | S n || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing the sequence, maintaining perfect silence on the pause.' }
                ]
            },
            {
                id: 's_6', title: 'Varisai 6: High and Low Octaves', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'We return to the lower octave "Sa-Ri" after rising to Pa and Da. This shifts your vocal posture back and forth, training octave agility.\n\nMaintain a light, floating voice in both registers.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p d | s r || s r g m | p d | n S || S n d p | m g | S n || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the octave changes.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p d | s r || s r g m | p d | n S || S n d p | m g | S n || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing the octave shifts cleanly.' }
                ]
            },
            {
                id: 's_7', title: 'Varisai 7: The Final Silent Step', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'We place a pause right before the high Ṡ note. This tests your rhythmic control: do not rush into the high note. Honor the silence first!\n\nKeep your high Ṡ soft and resonant.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p d | n , || s r g m | p d | n S || S n d p | m g | r , || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the pause before the high Sa.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p d | n , || s r g m | p d | n S || S n d p | m g | r , || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing it back with the final pause.' }
                ]
            }
        ]
    },
    {
        id: 'sarali_stage3', title: 'Pivots and Octaves', symbol: '⛰️',
        subtitle: 'Agility through retrograde turns and high bounds',
        color: '#334155', tag: 'Stage 3',
        lessons: [
            {
                id: 's_8', title: 'Varisai 8: The Retrograde Turn', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'A retrograde turn! Singing "Pa-Ma-Ga-Ri" inside the ascent teaches the vocal cords to pivot backward gracefully before resuming the climb.\n\nKeep the notes flowing smoothly like river water.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p m | g r || s r g m | p d | n S || S n d p | m p | d n || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the retrograde turn.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p m | g r || s r g m | p d | n S || S n d p | m p | d n || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing the retrograde turn.' }
                ]
            },
            {
                id: 's_9', title: 'Varisai 9: The Double Turn', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'This is a complex double turn: "Pa-Ma-Da-Pa" in ascent, and "Ma-Pa-Ga-Ma" in descent.\n\nObserve how the melody doubles back twice. Relax your neck and let your core support the breath.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p m | d p || s r g m | p d | n S || S n d p | m p | g m || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the double turn.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p m | d p || s r g m | p d | n S || S n d p | m p | g m || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing the double turn sequence.' }
                ]
            },
            {
                id: 's_10', title: 'Varisai 10: The Triple Pause', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'A magnificent test of timing! We sing "Pa", then pause for three entire beats: "p , , ,".\n\nYour mind must hold the inner metronome steady during this long silence.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p , | g m || p , , , | p , | , , || g m p d | n d | p m || g m p , | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the long triple pause.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p , | g m || p , , , | p , | , , || g m p d | n d | p m || g m p , | m g | r s ||'), speed: 1, instruction: 'Sing the triple pause sequence.' }
                ]
            },
            {
                id: 's_11', title: 'Varisai 11: The Upper Octave Anchor', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'We turn the scale upside down! We begin directly in the high octave on Ṡ and anchor our descent from above.\n\nKeep your voice light, float on the notes, and let the high Sa ring pure.' },
                    { type: 'listen_sequence', swaras: parseMmg('S , n d | n , | d p || d , p m | p , | p , || g m p d | n d | p m || g m p g | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the high octave descent.' },
                    { type: 'sing_sequence', swaras: parseMmg('S , n d | n , | d p || d , p m | p , | p , || g m p d | n d | p m || g m p g | m g | r s ||'), speed: 1, instruction: 'Sing the high octave sequence.' }
                ]
            }
        ]
    },
    {
        id: 'sarali_stage4', title: 'Foundational Mastery', symbol: '🎓',
        subtitle: 'The ultimate review and graduation',
        color: '#1e293b', tag: 'Stage 4',
        lessons: [
            {
                id: 's_12', title: 'Varisai 12: High Double Beats', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'A beautiful challenge! We combine high-register double strikes with sudden single-beat pauses.\n\nKeep your notes crystalline, sharp, and focused.' },
                    { type: 'listen_sequence', swaras: parseMmg('S S n d | n n | d p || d d p m | p , | p , || g m p d | n d | p m || g m p g | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the high double beats.' },
                    { type: 'sing_sequence', swaras: parseMmg('S S n d | n n | d p || d d p m | p , | p , || g m p d | n d | p m || g m p g | m g | r s ||'), speed: 1, instruction: 'Sing the high double beats.' }
                ]
            },
            {
                id: 's_13', title: 'Varisai 13: Staggered Ascent & Descent', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'This staggered, swinging pattern walks back and forth like a pendulum. It tests your breath capacity and your alignment with the Tambura drone.\n\nAnchor your ears to the drone constantly.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g r | g , | g m || p m p , | d p | d , || m p d p | d n | d p || m p d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the swinging pattern.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g r | g , | g m || p m p , | d p | d , || m p d p | d n | d p || m p d p | m g | r s ||'), speed: 1, instruction: 'Sing the staggered swinging pattern.' }
                ]
            },
            {
                id: 's_14', title: 'Varisai 14: The Grand Review', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'My dear student, you have reached the summit of Sarali Varisai. This grand review combines all patterns: doubled notes, silent beats, and leaps.\n\nBring all your training to this final sequence. Keep your posture upright, breathe deeply, and sing with joy!' },
                    { type: 'listen_sequence', swaras: parseMmg('s r g m | p , | p , || d d p , | m m | p , || d n S , | S n | d p || S n d p | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the grand review.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r g m | p , | p , || d d p , | m m | p , || d n S , | S n | d p || S n d p | m g | r s ||'), speed: 1, instruction: 'Sing the grand review sequence.' }
                ]
            }
        ]
    }
];

export const JANTA_CURRICULUM = [
    {
        id: 'janta_stage1', title: 'Basic Sphuritha Twins', symbol: '⚡',
        subtitle: 'Singing double notes with nabhi power',
        color: '#2d0f0f', tag: 'Stage 1',
        lessons: [
            {
                id: 'j_1', title: 'Varisai 1: The Steady Twins', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Sphuritha Gamakam', body: 'Welcome to Janta Varisai—the twin-note exercises.\n\nHere, we sing each note twice. But do not just slide or sing a single long note! Use a gentle, active contraction of your solar plexus (nabhi) to accent the second strike clearly. This sacred ornament is called "Sphuritha".' },
                    { type: 'listen_sequence', swaras: parseMmg('s s r r | g g | m m || p p d d | n n | S S || S S n n | d d | p p || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the crisp twin-note strikes.' },
                    { type: 'sing_sequence', swaras: parseMmg('s s r r | g g | m m || p p d d | n n | S S || S S n n | d d | p p || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the twins, accenting the second strike of each pair.' }
                ]
            },
            {
                id: 'j_2', title: 'Varisai 2: Climbing the Twin Mountain', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'We climb staggered twins! Each melodic phrase walks up a note and repeats the twin sequence.\n\nKeep your core engaged, relax your shoulders, and ensure every note strike is clean.' },
                    { type: 'listen_sequence', swaras: parseMmg('s s r r | g g | m m || r r g g | m m | p p || g g m m | p p | d d || m m p p | d d | n n || p p d d | n n | S S || S S n n | d d | p p || n n d d | p p | m m || d d p p | m m | g g || p p m m | g g | r r || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the mountain climb.' },
                    { type: 'sing_sequence', swaras: parseMmg('s s r r | g g | m m || r r g g | m m | p p || g g m m | p p | d d || m m p p | d d | n n || p p d d | n n | S S || S S n n | d d | p p || n n d d | p p | m m || d d p p | m m | g g || p p m m | g g | r r || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the twin mountain climb.' }
                ]
            },
            {
                id: 'j_3', title: 'Varisai 3: The Returning Twins', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'A long, zig-zag pattern of twin notes. This is an exceptional exercise for developing vocal stamina, keeping pitch accuracy high, and staying locked to the Tambura drone.' },
                    { type: 'listen_sequence', swaras: parseMmg('s s r r | g g | r r || s s r r | g g | m m || r r g g | m m | g g || r r g g | m m | p p || g g m m | p p | m m || g g m m | p p | d d || m m p p | d d | p p || m m p p | d d | n n || p p d d | n n | d d || p p d d | n n | S S || S S n n | d d | n n || S S n n | d d | p p || n n d d | p p | d d || n n d d | p p | m m || d d p p | m m | p p || d d p p | m m | g g || p p m m | g g | m m || p p m m | g g | r r || m m g g | r r | g g || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the long returning twins.' },
                    { type: 'sing_sequence', swaras: parseMmg('s s r r | g g | r r || s s r r | g g | m m || r r g g | m m | g g || r r g g | m m | p p || g g m m | p p | m m || g g m m | p p | d d || m m p p | d d | p p || m m p p | d d | n n || p p d d | n n | d d || p p d d | n n | S S || S S n n | d d | n n || S S n n | d d | p p || n n d d | p p | d d || n n d d | p p | m m || d d p p | m m | p p || d d p p | m m | g g || p p m m | g g | m m || p p m m | g g | r r || m m g g | r r | g g || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the returning twins sequence.' }
                ]
            }
        ]
    },
    {
        id: 'janta_stage2', title: 'Syncopation & Pauses', symbol: '🍃',
        subtitle: 'Introducing rhythmic gaps within double strikes',
        color: '#3d1616', tag: 'Stage 2',
        lessons: [
            {
                id: 'j_4', title: 'Varisai 4: Syncopated Twin Pause', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'A beautiful challenge! We introduce a syncopated pause right in the middle of a twin strike: "Sa Sa Ri [pause] Sa".\n\nThis trains rapid note re-striking and strict rhythmic discipline.' },
                    { type: 'listen_sequence', swaras: parseMmg('s s r , s | s r | s r || s s r r | g g | m m || r r g , r | r g | r g || r r g g | m m | p p || g g m , g | g m | g m || g g m m | p p | d d || m m p , m | m p | m p || m m p p | d d | n n || p p d , p | p d | p d || p p d d | n n | S S || S S n , S | S n | S n || S S n n | d d | p p || n n d , n | n d | n d || n n d d | p p | m m || d d p , d | d p | d p || d d p p | m m | g g || p p m , p | p m | p m || p p m m | g g | r r || m m g , m | m g | m g || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the syncopated pauses.' },
                    { type: 'sing_sequence', swaras: parseMmg('s s r , s | s r | s r || s s r r | g g | m m || r r g , r | r g | r g || r r g g | m m | p p || g g m , g | g m | g m || g g m m | p p | d d || m m p , m | m p | m p || m m p p | d d | n n || p p d , p | p d | p d || p p d d | n n | S S || S S n , S | S n | S n || S S n n | d d | p p || n n d , n | n d | n d || n n d d | p p | m m || d d p , d | d p | d p || d d p p | m m | g g || p p m , p | p m | p m || p p m m | g g | r r || m m g , m | m g | m g || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the syncopated pauses sequence.' }
                ]
            },
            {
                id: 'j_5', title: 'Varisai 5: Staggered Twin Pause', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'A variation of syncopated twin pauses where the gap shifts: "Sa Sa Ri Ri | Ga , Sa | Ri Ga".\n\nEnsure each restrike is crisp, soft, and driven by abdominal breathing.' },
                    { type: 'listen_sequence', swaras: parseMmg('s s r r | g , s | r g || s s r r | g g | m m || r r g g | m , r | g m || r r g g | m m | p p || g g m m | p , g | m p || g g m m | p p | d d || m m p p | d , m | p d || m m p p | d d | n n || p p d d | n , p | d n || p p d d | n n | S S || S S n n | d , S | n d || S S n n | d d | p p || n n d d | p , n | d p || n n d d | p p | m m || d d p p | m , d | p m || d d p p | m m | g g || p p m m | g , p | m g || p p m m | g g | r r || m m g g | r , m | g r || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the staggered twin pauses.' },
                    { type: 'sing_sequence', swaras: parseMmg('s s r r | g , s | r g || s s r r | g g | m m || r r g g | m , r | g m || r r g g | m m | p p || g g m m | p , g | m p || g g m m | p p | d d || m m p p | d , m | p d || m m p p | d d | n n || p p d d | n , p | d n || p p d d | n n | S S || S S n n | d , S | n d || S S n n | d d | p p || n n d d | p , n | d p || n n d d | p p | m m || d d p p | m , d | p m || d d p p | m m | g g || p p m m | g , p | m g || p p m m | g g | r r || m m g g | r , m | g r || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the staggered pauses back.' }
                ]
            },
            {
                id: 'j_6', title: 'Varisai 6: The Silent Heart Twin', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'A silent pause placed directly between the twin strikes: "Sa Sa , Ri | Ri , | Ga Ga".\n\nThis tests your ability to feel the silent pulse inside your heart before striking the second note.' },
                    { type: 'listen_sequence', swaras: parseMmg('s s , r | r , | g g || s s r r | g g | m m || r r , g | g , | m m || r r g g | m m | p p || g g , m | m , | p p || g g m m | p p | d d || m m , p | p , | d d || m m p p | d d | n n || p p , d | d , | n n || p p d d | n n | S S || S S , n | n , | d d || S S n n | d d | p p || n n , d | d , | p p || n n d d | p p | m m || d d , p | p , | m m || d d p p | m m | g g || p p , m | m , | g g || p p m m | g g | r r || m m , g | g , | r r || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the silent heart twins.' },
                    { type: 'sing_sequence', swaras: parseMmg('s s , r | r , | g g || s s r r | g g | m m || r r , g | g , | m m || r r g g | m m | p p || g g , m | m , | p p || g g m m | p p | d d || m m , p | p , | d d || m m p p | d d | n n || p p , d | d , | n n || p p d d | n n | S S || S S , n | n , | d d || S S n n | d d | p p || n n , d | d , | p p || n n d d | p p | m m || d d , p | p , | m m || d d p p | m m | g g || p p , m | m , | g g || p p m m | g g | r r || m m , g | g , | r r || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the silent heart twins sequence.' }
                ]
            }
        ]
    },
    {
        id: 'janta_stage3', title: 'Advanced Twin Mastery', symbol: '👑',
        subtitle: 'Preceding pauses and power triple strikes',
        color: '#2d0f0f', tag: 'Stage 3',
        lessons: [
            {
                id: 'j_7', title: 'Varisai 7: Syncopated Single Twin', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'Here, the pause precedes the strike: "Sa , Sa Ri | , Ri | Ga Ga".\n\nThis syncopated alignment tests your core sense of timing. Keep your foot tap or hand clap perfectly aligned with the beat click.' },
                    { type: 'listen_sequence', swaras: parseMmg('s , s r | , r | g g || s s r r | g g | m m || r , r g | , g | m m || r r g g | m m | p p || g , g m | , m | p p || g g m m | p p | d d || m , m p | , p | d d || m m p p | d d | n n || p , p d | , d | n n || p p d d | n n | S S || S , S n | , n | d d || S S n n | d d | p p || n , n d | , d | p p || n n d d | p p | m m || d , d p | , p | m m || d d p p | m m | g g || p , p m | , m | g g || p p m m | g g | r r || m , m g | , g | r r || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the syncopated single twins.' },
                    { type: 'sing_sequence', swaras: parseMmg('s , s r | , r | g g || s s r r | g g | m m || r , r g | , g | m m || r r g g | m m | p p || g , g m | , m | p p || g g m m | p p | d d || m , m p | , p | d d || m m p p | d d | n n || p , p d | , d | n n || p p d d | n n | S S || S , S n | , n | d d || S S n n | d d | p p || n , n d | , d | p p || n n d d | p p | m m || d , d p | , p | m m || d d p p | m m | g g || p , p m | , m | g g || p p m m | g g | r r || m , m g | , g | r r || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the syncopated single twins.' }
                ]
            },
            {
                id: 'j_8', title: 'Varisai 8: The Triple Strike', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Pedagogy from the Guru', body: 'The absolute summit of Janta Varisai: triple note strikes!\n\n"Sa Sa Sa" followed by "Ri Ri Ri". Strike each of the three notes with crisp, solar plexus clarity from your core. Keep the notes in perfect alignment with the beat.' },
                    { type: 'listen_sequence', swaras: parseMmg('s s s r | r r | g g || s s r r | g g | m m || r r r g | g g | m m || r r g g | m m | p p || g g g m | m m | p p || g g m m | p p | d d || m m m p | p p | d d || m m p p | d d | n n || p p p d | d d | n n || p p d d | n n | S S || S S S n | n n | d d || S S n n | d d | p p || n n n d | d d | p p || n n d d | p p | m m || d d d p | p p | m m || d d p p | m m | g g || p p p m | m m | g g || p p m m | g g | r r || m m m g | g g | r r || m m g g | r r | s s ||'), displayLabel: '♪', instruction: 'Listen to the triple strikes.' },
                    { type: 'sing_sequence', swaras: parseMmg('s s s r | r r | g g || s s r r | g g | m m || r r r g | g g | m m || r r g g | m m | p p || g g g m | m m | p p || g g m m | p p | d d || m m m p | p p | d d || m m p p | d d | n n || p p p d | d d | n n || p p d d | n n | S S || S S S n | n n | d d || S S n n | d d | p p || n n n d | d d | p p || n n d d | p p | m m || d d d p | p p | m m || d d p p | m m | g g || p p p m | m m | g g || p p m m | g g | r r || m m m g | g g | r r || m m g g | r r | s s ||'), speed: 1, instruction: 'Sing the triple strikes sequence.' }
                ]
            }
        ]
    }
];

export const DAATU_CURRICULUM = [
    {
        id: 'daatu_stage1', title: 'The First Daatu Varisai (Ascent)', symbol: '🌱',
        subtitle: 'Leaping note patterns climbing up the scale',
        color: '#311025', tag: 'Stage 1',
        lessons: [
            {
                id: 'd_1_1', title: 'Varisai 1: Introduction to Leaps', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Introduction', body: 'Namaste, my dear student. Welcome to Daatu Varisai, the "kangaroo leaps" of Carnatic music. Unlike Sarali (straight steps) or Janta (double steps), Daatu introduces interval leaps. We skip notes to build high-level pitch agility.\n\nLet\'s start with the first four ascending phrases of the first Varisai. Maintain stable, pure notes.' },
                    { type: 'listen_sequence', swaras: parseMmg('s r s g | r g | r m || s m g r | s r | g m || r g r m | g m | g p || r p m g | r g | m p ||'), displayLabel: '♪', instruction: 'Listen to the first 4 ascending phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('s r s g | r g | r m || s m g r | s r | g m || r g r m | g m | g p || r p m g | r g | m p ||'), speed: 1, instruction: 'Sing the first 4 ascending phrases.' }
                ]
            },
            {
                id: 'd_1_2', title: 'Varisai 1: Mid-Range Ascent', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'Very good! Now we move up the scale into the middle octaves. Notice the leap from G to P (Ga to Pa), which requires an exact interval of a major third.\n\nKeep your posture relaxed and lean on the Tambura drone.' },
                    { type: 'listen_sequence', swaras: parseMmg('g m g p | m p | m d || g d p m | g m | p d || m p m d | p d | p n || m n d p | m p | d n ||'), displayLabel: '♪', instruction: 'Listen to the middle ascending phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('g m g p | m p | m d || g d p m | g m | p d || m p m d | p d | p n || m n d p | m p | d n ||'), speed: 1, instruction: 'Sing the middle ascending phrases.' }
                ]
            },
            {
                id: 'd_1_3', title: 'Varisai 1: High Octave Ascent Peak', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'We now reach the peak of the ascent! These phrases leap into the high octave: p d p n (Pa to Ni) and p Ṡ n d (Pa to High Sa).\n\nLet your voice open naturally, without squeezing your throat.' },
                    { type: 'listen_sequence', swaras: parseMmg('p d p n | d n | d S || p S n d | p d | n S ||'), displayLabel: '♪', instruction: 'Listen to the ascending peak.' },
                    { type: 'sing_sequence', swaras: parseMmg('p d p n | d n | d S || p S n d | p d | n S ||'), speed: 1, instruction: 'Sing the peak ascending phrases.' }
                ]
            }
        ]
    },
    {
        id: 'daatu_stage2', title: 'The First Daatu Varisai (Descent)', symbol: '🍃',
        subtitle: 'Leaping down from the high octave',
        color: '#2a0a22', tag: 'Stage 2',
        lessons: [
            {
                id: 'd_1_4', title: 'Varisai 1: Upper-Range Descent', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'We begin our descent from the high octave. Descending with leaps is highly challenging, as we must drop pitches without losing pitch centering.\n\nFocus on dropping your jaw relaxed as you descend.' },
                    { type: 'listen_sequence', swaras: parseMmg('S n S d | n d | n p || S p d n | S n | d p || n d n p | d p | d m || n m p d | n d | p m ||'), displayLabel: '♪', instruction: 'Listen to the first 4 descending phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('S n S d | n d | n p || S p d n | S n | d p || n d n p | d p | d m || n m p d | n d | p m ||'), speed: 1, instruction: 'Sing the first 4 descending phrases.' }
                ]
            },
            {
                id: 'd_1_5', title: 'Varisai 1: Mid to Low-Range Descent', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'We conclude the first Daatu Varisai descending back to the root Sa. These final phrases feature the wide leap from Pa to Ri (p r g m).\n\nAlign your voice carefully with the Tambura drone.' },
                    { type: 'listen_sequence', swaras: parseMmg('d p d m | p m | p g || d g m p | d p | m g || p m p g | m g | m r || p r g m | p m | g r || m g m r | g r | g s || m s r g | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the remaining descending phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('d p d m | p m | p g || d g m p | d p | m g || p m p g | m g | m r || p r g m | p m | g r || m g m r | g r | g s || m s r g | m g | r s ||'), speed: 1, instruction: 'Sing the remaining descending phrases.' }
                ]
            }
        ]
    },
    {
        id: 'daatu_stage3', title: 'The Second Daatu Varisai (Ascent)', symbol: '🔥',
        subtitle: 'Cross-leaping alternating swara patterns',
        color: '#42142d', tag: 'Stage 3',
        lessons: [
            {
                id: 'd_2_1', title: 'Varisai 2: Intro to Cross-Leaps', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'Excellent progress, my student. The second Daatu Varisai is even more beautiful! It uses alternate leap structures (Sa to Ma: s m g m).\n\nKeep the notes crisp and precise in time.' },
                    { type: 'listen_sequence', swaras: parseMmg('s m g m | r g | s r || s g r g | s r | g m || r p m p | g m | r g || r m g m | r g | m p ||'), displayLabel: '♪', instruction: 'Listen to the first 4 phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('s m g m | r g | s r || s g r g | s r | g m || r p m p | g m | r g || r m g m | r g | m p ||'), speed: 1, instruction: 'Sing the first 4 phrases.' }
                ]
            },
            {
                id: 'd_2_2', title: 'Varisai 2: Mid-Range Leaps', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'Moving further up! We transition from middle to high register, leaping to Da and Ni. Let your breath expand naturally to support the higher range.' },
                    { type: 'listen_sequence', swaras: parseMmg('g d p d | m p | g m || g p m p | g m | p d || m n d n | p d | m p || m d p d | m p | d n ||'), displayLabel: '♪', instruction: 'Listen to these phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('g d p d | m p | g m || g p m p | g m | p d || m n d n | p d | m p || m d p d | m p | d n ||'), speed: 1, instruction: 'Sing the phrases.' }
                ]
            },
            {
                id: 'd_2_3', title: 'Varisai 2: Peak Ascent to High Sa', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'Here is the peak of the second ascent. A majestic cross-leap to high Sa (p Ṡ n Ṡ) and (p n d n).\n\nLet the notes be light and clear.' },
                    { type: 'listen_sequence', swaras: parseMmg('p S n S | d n | p d || p n d n | p d | n S ||'), displayLabel: '♪', instruction: 'Listen to the peak ascending phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('p S n S | d n | p d || p n d n | p d | n S ||'), speed: 1, instruction: 'Sing the peak ascending phrases.' }
                ]
            }
        ]
    },
    {
        id: 'daatu_stage4', title: 'The Second Daatu Varisai (Descent)', symbol: '🎓',
        subtitle: 'Advanced descent and course graduation',
        color: '#1a0512', tag: 'Stage 4',
        lessons: [
            {
                id: 'd_2_4', title: 'Varisai 2: Descending Cross-Leaps', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'We begin the final descent of the second Varisai. The leap from high Sa to Pa (Ṡ p d p) requires extremely quick vocal adjustment.\n\nSing with focus and inner calm.' },
                    { type: 'listen_sequence', swaras: parseMmg('S p d p | n d | S n || S d n d | S n | d p || n m p m | d p | n d || n p d p | n d | p m ||'), displayLabel: '♪', instruction: 'Listen to the first 4 descending phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('S p d p | n d | S n || S d n d | S n | d p || n m p m | d p | n d || n p d p | n d | p m ||'), speed: 1, instruction: 'Sing the first 4 descending phrases.' }
                ]
            },
            {
                id: 'd_2_5', title: 'Varisai 2: Complete Mastery & Graduation', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Guru Pedagogy', body: 'The absolute final stretch! Descending back to our root Sa with the ultimate cross-leap patterns. Once completed, you will have fully mastered the Daatu Varisais.\n\nKeep your focus, and graduate with pure grace.' },
                    { type: 'listen_sequence', swaras: parseMmg('d g m g | p m | d p || d m p m | d p | m g || p r g r | m g | p m || p g m g | p m | g r || m s r s | g r | m g || m r g r | m g | r s ||'), displayLabel: '♪', instruction: 'Listen to the final descending phrases.' },
                    { type: 'sing_sequence', swaras: parseMmg('d g m g | p m | d p || d m p m | d p | m g || p r g r | m g | p m || p g m g | p m | g r || m s r s | g r | m g || m r g r | m g | r s ||'), speed: 1, instruction: 'Sing the final descending phrases and graduate!' }
                ]
            }
        ]
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// MANDHRA STHAYI (Lower Octave) VARISAI CURRICULUM
// Lower-octave notes are written with a trailing dot: Ni. Da. Pa. Ma. etc.
// ─────────────────────────────────────────────────────────────────────────────
export const MANDHRA_CURRICULUM = [
    {
        id: 'mandhra_stage1', title: 'Touching the Lower Octave', symbol: '🌊',
        subtitle: 'Introducing Ni. — the first step below Sa',
        color: '#0d1f0d', tag: 'Stage 1',
        lessons: [
            {
                id: 'mnd_1', title: 'Varisai 1: First Touch of Mandhra Ni', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Welcome to Mandhra Sthayi',
                        body: 'In Carnatic music the octave below your Sa is called Mandhra Sthayi (lower register). Notes here are written with a dot: Ni. Da. Pa. Ma.\n\nIn this first exercise the melody descends from upper Sa (Ṡ) through the middle octave and dips one step below Sa to touch lower Ni (Ni.). Hear how that single lower-octave note gives the phrase a grounded, deep feeling.\n\nDot notation: lower octave  ·  Capital S = Ṡ (upper Sa)  ·  Plain letters = middle octave'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | s r | g m || s r g m | p d | n S ||'),
                        instruction: 'Listen to the descent through middle octave and the touch of lower Ni. (the dot note).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | s r | g m || s r g m | p d | n S ||'),
                        speed: 1,
                        instruction: 'Sing it back. Let your voice dip naturally below Sa for Ni. — no strain, just ease.'
                    }
                ]
            },
            {
                id: 'mnd_2', title: 'Varisai 2: Ni. as a Pivot', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Lower Ni as a Melodic Pivot',
                        body: 'Now Ni. becomes an active pivot — the melody bounces off it repeatedly:\n\ng r s n. | s s Ni. s\nand\ns Ni. s r | g m p m\n\nSing Sa, dip to Ni., return to Sa. Feel the magnetic pull of the lower octave note. The voice should descend softly without reaching — Ni. lives just one half-step below your Sa.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmgMandhra('S n d p | m g | r s || s , , , | s , , , || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        instruction: 'Listen to how Ni. pivots the phrase back toward Sa each time.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmgMandhra('S n d p | m g | r s || s , , , | s , , , || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        speed: 1,
                        instruction: 'Sing. Focus on the s Ni. s r motif — down one step and right back up.'
                    }
                ]
            }
        ]
    },
    {
        id: 'mandhra_stage2', title: 'Diving Deeper — Da. and Pa.', symbol: '🌑',
        subtitle: 'Expanding the lower range to Da. and Pa.',
        color: '#12101e', tag: 'Stage 2',
        lessons: [
            {
                id: 'mnd_3', title: 'Varisai 3: Adding Lower Da.', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Lower Da. — Two Steps Below Sa',
                        body: 'We now reach a note two semitones further into the lower octave: Da. (lower Dha).\n\nThe new phrase is:  g r s n. | d. n. s n.\n\nNotice the double descent: Ni. then Da., then back to Ni., then Sa. The movement d. n. s n. has a characteristic wavy, searching quality — explore it slowly before singing at full tempo.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. n. s n. || s n. s r | g m p m || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        instruction: 'Listen to the new deeper dip: Da. (d.) then Ni. (n.) before returning to Sa.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. n. s n. || s n. s r | g m p m || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        speed: 1,
                        instruction: 'Sing Varisai 3. Let the d. n. phrase feel naturally low — do not push.'
                    }
                ]
            },
            {
                id: 'mnd_4', title: 'Varisai 4: Lower Pa. Enters', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Lower Pa. — Four Steps Below Sa',
                        body: 'We now reach lower Pa. — four semitones below Sa, the mirror of the perfect fifth above.\n\nThe new phrase:  g r s n. | d. p. d n.\n\nThis leaps to Pa., rises back to Da., and then resolves through Ni. — a descending triad in the lower octave. Keep your throat relaxed and your breath support steady as you navigate this lower range.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. p. d n. || s n. s r | g m p m || g r s n. | d. n. s n. || s n. s r | g m p m || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        instruction: 'Listen to the new d. p. d n. phrase — the lowest point reached so far.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. p. d n. || s n. s r | g m p m || g r s n. | d. n. s n. || s n. s r | g m p m || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        speed: 1,
                        instruction: 'Sing Varisai 4. The cumulative length builds stamina — maintain your Sa anchor throughout.'
                    }
                ]
            }
        ]
    },
    {
        id: 'mandhra_stage3', title: 'Full Lower Range Mastery', symbol: '🏔️',
        subtitle: 'Descending to Ma. — the complete Mandhra tetrachord',
        color: '#1e140a', tag: 'Stage 3',
        lessons: [
            {
                id: 'mnd_5a', title: 'Varisai 5: Lower Ma. — New Depth', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'The Crown of Mandhra Sthayi: Ma.',
                        body: 'We reach the deepest note in this series: Ma. — seven semitones below Sa, the mirror of Ma above.\n\nThe new phrase:  g r s n. | d. p. m. p.\n\nThis descends through Da., Pa., and all the way to lower Ma. — the core tetrachord of the Mandhra octave. After touching Ma. the melody rises back through Pa., establishing a full lower-octave arc.\n\nThis is the most physically demanding phrase. Sing from the chest, relax the jaw, and let the Tambura drone anchor you.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. p. m. p. || d n. s r | g m p m ||'),
                        instruction: 'Listen to the new phrase: d. p. m. p. — four steps deep into Mandhra Sthayi.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. p. m. p. || d n. s r | g m p m ||'),
                        speed: 1,
                        instruction: 'Sing the new phrase section at full tempo. Use the slow setting (0.5×) if needed.'
                    }
                ]
            },
            {
                id: 'mnd_5b', title: 'Varisai 5: Complete Mandhra Mastery', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'The Full Varisai 5 — Cumulative Mastery',
                        body: 'Varisai 5 is the crowning cumulative exercise of Mandhra Sthayi. It includes every pattern from Varisais 1–4 in reverse order, each preceded by the full g r s n. opening, and all wrapped by the standard descent and ascent.\n\nThe complete pattern arc from top to bottom:\n  d. p. m. p. → d. p. d n. → d. n. s n. → s s n. s\n\nSing each section with care. Maintain your breath support and your connection to the Tambura drone. When complete, you will have command of the full Mandhra Sthayi tetrachord.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. p. m. p. || d n. s r | g m p m || g r s n. | d. p. d n. || s n. s r | g m p m || g r s n. | d. n. s n. || s n. s r | g m p m || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        instruction: 'Listen to the complete Varisai 5 from start to finish — the full Mandhra journey.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmgMandhra('S n d p | m g r s || s , , , | s , , , || g r s n. | d. p. m. p. || d n. s r | g m p m || g r s n. | d. p. d n. || s n. s r | g m p m || g r s n. | d. n. s n. || s n. s r | g m p m || g r s n. | s s n. s || s n. s r | g m p m || g r s n. | s r g m || s r g m | p d n S ||'),
                        speed: 1,
                        instruction: 'Sing the complete Varisai 5. This is your Mandhra Sthayi graduation piece — sing it with pride.'
                    }
                ]
            }
        ]
    }
];

export const ALANKARAM_CURRICULUM = [
    {
        id: 'alankaram_stage1', title: 'Chatushra Jaati Talas', symbol: '🥁',
        subtitle: 'The four-beat unit: Druva, Matya, Rupaka & Eka',
        color: '#1e3a1f', tag: 'Stage 1',
        lessons: [
            {
                id: 'al_intro', title: 'Introduction to Alankarams', tag: 'Concept',
                exercises: [
                    {
                        type: 'info', title: 'What Are Alankarams?',
                        body: 'Alankarams are exercises in Mayamalavagowla (15th Melakarta Raga) set to different rhythmic cycles called Talas.\n\nThe Saptha Tala system has 35 talas in total, but 7 are traditionally taught — Druva, Matya, Rupaka, Jhampa, Triputa, Ata, and Eka — each with a unique beat structure.\n\nPractice each Alankaram in at least 3–4 speeds. Render each exercise twice: once with swaras, and again on Akaram (Aaaa).'
                    },
                    {
                        type: 'info', title: 'Speeds in Carnatic Music',
                        body: 'Speed in Carnatic music is relative to the Tala beat — not seconds or minutes.\n\n• 1st speed: 1 note per beat\n• 2nd speed: 2 notes per beat (exactly double)\n• 3rd speed: 4 notes per beat\n• 4th speed: 8 notes per beat\n\nOnly the speed of the music changes. The Tala tempo stays fixed. Each speed is always an exact multiple of the previous one — there is mathematical precision to it.'
                    },
                    {
                        type: 'info', title: 'Tala Components',
                        body: 'Every Tala is built from three components:\n\n• Laghu (I) — A finger-counted group of beats. The Jaati name tells you how many: Thrisra=3, Chatushra=4, Khanda=5, Mishra=7, Sankeerna=9.\n\n• Drutam (0) — Always 2 beats: one clap and one wave.\n\n• Anudhrutam (U) — Always 1 beat: a single downward tap.\n\nFor each Alankaram, you will practice all 10 starting notes: Sa, Ri, Ga, Ma, Pa (ascending), then Ṡa, Ni, Da, Pa, Ma (descending).'
                    }
                ]
            },
            {
                id: 'al_1', title: 'Alankaram 1: Chatushra Jaati Druva Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Druva Talam — 14 Beats',
                        body: 'Structure: I₄ | 0 | I₄ | I₄ = 4 + 2 + 4 + 4 = 14 beats\n\n"Druva" (fixed/steady) is the most majestic of the seven talas. Its pattern: Laghu (4) → Drutam (2) → Laghu (4) → Laghu (4).\n\nEach row starts one note higher and explores a different melodic pattern across the 14-beat cycle. Practice your hand gestures for all three Laghus and the Drutam before singing.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r g m | g r | s r g r | s r g m || r g m p | m g | r g m g | r g m p || g m p d | p m | g m p m | g m p d || m p d n | d p | m p d p | m p d n || p d n S | n d | p d n d | p d n S || S n d p | d n | S n d n | S n d p || n d p m | p d | n d p d | n d p m || d p m g | m p | d p m p | d p m g || p m g r | g m | p m g m | p m g r || m g r s | r g | m g r g | m g r s ||'),
                        displayLabel: '♪',
                        instruction: 'Listen to all 10 rows of Druva Talam. Notice the 4+2+4+4 beat groupings within each cycle.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r g m | g r | s r g r | s r g m || r g m p | m g | r g m g | r g m p || g m p d | p m | g m p m | g m p d || m p d n | d p | m p d p | m p d n || p d n S | n d | p d n d | p d n S || S n d p | d n | S n d n | S n d p || n d p m | p d | n d p d | n d p m || d p m g | m p | d p m p | d p m g || p m g r | g m | p m g m | p m g r || m g r s | r g | m g r g | m g r s ||'),
                        speed: 1,
                        instruction: 'Sing all 10 rows in sync with the beat clicks. Keep each group of 4, 2, 4, and 4 beats distinct.'
                    }
                ]
            },
            {
                id: 'al_2', title: 'Alankaram 2: Chatushra Jaati Matya Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Matya Talam — 10 Beats',
                        body: 'Structure: I₄ | 0 | I₄ = 4 + 2 + 4 = 10 beats\n\nMatya is a balanced tala — two equal Laghus sandwiching a Drutam. It has a symmetrical, even feel.\n\nHere the first 4-beat Laghu echoes the starting note (e.g. "Sa Ri Ga Ri"), while the last 4 beats ascend (e.g. "Sa Ri Ga Ma"). Notice how the two Laghus have different melodic characters.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r g r | s r | s r g m || r g m g | r g | r g m p || g m p m | g m | g m p d || m p d p | m p | m p d n || p d n d | p d | p d n S || S n d n | S n | S n d p || n d p d | n d | n d p m || d p m p | d p | d p m g || p m g m | p m | p m g r || m g r g | m g | m g r s ||'),
                        displayLabel: '♪',
                        instruction: 'Listen to all 10 rows of Matya Talam. Notice the 4+2+4 structure in each cycle.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r g r | s r | s r g m || r g m g | r g | r g m p || g m p m | g m | g m p d || m p d p | m p | m p d n || p d n d | p d | p d n S || S n d n | S n | S n d p || n d p d | n d | n d p m || d p m p | d p | d p m g || p m g m | p m | p m g r || m g r g | m g | m g r s ||'),
                        speed: 1,
                        instruction: 'Sing Matya Talam with a steady beat. Keep the two Laghus and the central Drutam clearly defined.'
                    }
                ]
            },
            {
                id: 'al_3', title: 'Alankaram 3: Chatushra Jati Rupaka Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Rupaka Talam — 6 Beats',
                        body: 'Structure: 0 | I₄ = 2 + 4 = 6 beats\n\nRupaka Talam begins with a Drutam (2 beats) and ends with a Laghu (4 beats). It is one of the most common talas in Carnatic music — many kritis and devotional songs are set in this cycle.\n\nListen for the short-long feel: 2 quick beats, then 4 steady beats.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r | s r g m || r g | r g m p || g m | g m p d || m p | m p d n || p d | p d n S || S n | S n d p || n d | n d p m || d p | d p m g || p m | p m g r || m g | m g r s ||'),
                        displayLabel: '♪',
                        instruction: 'Listen to all 10 rows of Rupaka Talam. Feel the 2+4 grouping in each cycle.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r | s r g m || r g | r g m p || g m | g m p d || m p | m p d n || p d | p d n S || S n | S n d p || n d | n d p m || d p | d p m g || p m | p m g r || m g | m g r s ||'),
                        speed: 1,
                        instruction: 'Sing Rupaka Talam. Begin with the 2-beat Drutam, then settle into the 4-beat Laghu.'
                    }
                ]
            },
            {
                id: 'al_7', title: 'Alankaram 7: Chatushra Jati Eka Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Eka Talam — 4 Beats',
                        body: 'Structure: I₄ = 4 beats\n\n"Eka" means one — a single Laghu of 4 beats is the entire cycle. The simplest of the seven talas, and an excellent vehicle for speed practice.\n\nMaster this first before exploring longer cycles. Once comfortable, practice in 2nd speed (2 notes per beat) and 3rd speed (4 notes per beat).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r g m || r g m p || g m p d || m p d n || p d n S || S n d p || n d p m || d p m g || p m g r || m g r s ||'),
                        displayLabel: '♪',
                        instruction: 'Listen to all 10 rows of Eka Talam — pure, clean 4-beat cycles.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r g m || r g m p || g m p d || m p d n || p d n S || S n d p || n d p m || d p m g || p m g r || m g r s ||'),
                        speed: 1,
                        instruction: 'Sing Eka Talam clearly. Once comfortable at 1st speed, try 2nd speed (two notes per beat).'
                    }
                ]
            }
        ]
    },
    {
        id: 'alankaram_stage2', title: 'Mishra, Thrisra & Khanda Talas', symbol: '🎼',
        subtitle: 'Seven, three, and five-beat Laghu structures',
        color: '#1a2a3a', tag: 'Stage 2',
        lessons: [
            {
                id: 'al_4', title: 'Alankaram 4: Mishra Jati Jhampa Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Jhampa Talam — 10 Beats',
                        body: 'Structure: I₇ | U | 0 = 7 + 1 + 2 = 10 beats\n\n"Mishra" means the Laghu has 7 beats. Jhampa Talam has three components: a 7-beat Laghu, a 1-beat Anudhrutam, and a 2-beat Drutam.\n\nThe melodic pattern in each row mirrors the 7-beat structure: "Sa Ri Ga Sa Ri Sa Ri" — the first three notes, then a reversal pattern. The single Anudhrutam and Drutam-with-pause complete the cycle.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r g s r s r | g | m , || r g m r g r g | m | p , || g m p g m g m | p | d , || m p d m p m p | d | n , || p d n p d p d | n | S , || S n d S n S n | d | p , || n d p n d n d | p | m , || d p m d p d p | m | g , || p m g p m p m | g | r , || m g r m g m g | r | s , ||'),
                        displayLabel: '♪',
                        instruction: 'Listen to Jhampa Talam. Note the 7-beat Laghu phrase, the single pivot note, then the 2-beat Drutam with a pause.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r g s r s r | g | m , || r g m r g r g | m | p , || g m p g m g m | p | d , || m p d m p m p | d | n , || p d n p d p d | n | S , || S n d S n S n | d | p , || n d p n d n d | p | m , || d p m d p d p | m | g , || p m g p m p m | g | r , || m g r m g m g | r | s , ||'),
                        speed: 1,
                        instruction: 'Sing Jhampa Talam. Give the 7-beat Laghu your full attention before settling into the pivot and Drutam.'
                    }
                ]
            },
            {
                id: 'al_5', title: 'Alankaram 5: Thrisra Jati Triputa Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Triputa Talam — 7 Beats',
                        body: 'Structure: I₃ | 0 | 0 = 3 + 2 + 2 = 7 beats\n\n"Thrisra" means the Laghu has 3 beats. Triputa has one 3-beat Laghu followed by two Drutams. Adi Talam — the most common Carnatic tala — is the Chatushra Jati version (4+2+2=8 beats). This is its Thrisra cousin.\n\nFeel the lopsided, lilting quality of 3+2+2 as you sing each row.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r g | s r | g m || r g m | r g | m p || g m p | g m | p d || m p d | m p | d n || p d n | p d | n S || S n d | S n | d p || n d p | n d | p m || d p m | d p | m g || p m g | p m | g r || m g r | m g | r s ||'),
                        displayLabel: '♪',
                        instruction: 'Listen to Triputa Talam. Feel the 3+2+2 grouping as the melody moves through each cycle.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r g | s r | g m || r g m | r g | m p || g m p | g m | p d || m p d | m p | d n || p d n | p d | n S || S n d | S n | d p || n d p | n d | p m || d p m | d p | m g || p m g | p m | g r || m g r | m g | r s ||'),
                        speed: 1,
                        instruction: 'Sing Triputa Talam. Let the beat clicks clearly mark your 3-beat Laghu before the two Drutams.'
                    }
                ]
            },
            {
                id: 'al_6', title: 'Alankaram 6: Khanda Jati Ata Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Ata Talam — 14 Beats',
                        body: 'Structure: I₅ | I₅ | 0 | 0 = 5 + 5 + 2 + 2 = 14 beats\n\n"Khanda" means the Laghu has 5 beats. Ata Talam has two 5-beat Laghus followed by two Drutams — a grand, expansive 14-beat cycle.\n\nThe pauses within the 5-beat Laghus are crucial to the pattern: "Sa Ri [pause] Ga [pause]" in the first Laghu, and "Sa [pause] Ri Ga [pause]" in the second. Honor each silence.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r , g , | s , r g , | m , | m , || r g , m , | r , g m , | p , | p , || g m , p , | g , m p , | d , | d , || m p , d , | m , p d , | n , | n , || p d , n , | p , d n , | S , | S , || S n , d , | S , n d , | p , | p , || n d , p , | n , d p , | m , | m , || d p , m , | d , p m , | g , | g , || p m , g , | p , m g , | r , | r , || m g , r , | m , g r , | s , | s , ||'),
                        displayLabel: '♪',
                        instruction: 'Listen to Ata Talam. Pay close attention to the pauses within each 5-beat Laghu.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r , g , | s , r g , | m , | m , || r g , m , | r , g m , | p , | p , || g m , p , | g , m p , | d , | d , || m p , d , | m , p d , | n , | n , || p d , n , | p , d n , | S , | S , || S n , d , | S , n d , | p , | p , || n d , p , | n , d p , | m , | m , || d p , m , | d , p m , | g , | g , || p m , g , | p , m g , | r , | r , || m g , r , | m , g r , | s , | s , ||'),
                        speed: 1,
                        instruction: 'Sing Ata Talam in full. Sustain silence on pause beats — do not fill them with sound.'
                    }
                ]
            }
        ]
    },
    {
        id: 'alankaram_stage3', title: 'Sankeerna Jaati', symbol: '✨',
        subtitle: 'Nine-beat Laghu patterns in Eka Talam',
        color: '#2a1a3a', tag: 'Stage 3',
        lessons: [
            {
                id: 'al_8', title: 'Alankaram 8: Sankeerna Jati Eka Talam', tag: 'Practice',
                exercises: [
                    {
                        type: 'info', title: 'Sankeerna Eka Talam — 9 Beats',
                        body: 'Structure: I₉ = 9 beats\n\n"Sankeerna" means the Laghu has 9 beats — the largest Jaati. Combined with Eka Talam (a single Laghu), this gives a continuous 9-beat cycle.\n\nTwo versions are practiced:\n• Version 1: Alternating notes and pauses — "Sa [pause] Ri [pause] Ga [pause] Ma Pa Da"\n• Version 2: Notes in pairs — "Sa Ri [pause] Ga Ma [pause] Pa Da Ni"\n\nBoth versions ascend then descend through the scale.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s , r , g , m p d || r , g , m , p d n || g , m , p , d n S || S , n , d , p m g || n , d , p , m g r || d , p , m , g r s ||'),
                        displayLabel: '♪ Version 1',
                        instruction: 'Listen to Sankeerna Eka Talam — Version 1. Each note is followed by a pause beat.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s , r , g , m p d || r , g , m , p d n || g , m , p , d n S || S , n , d , p m g || n , d , p , m g r || d , p , m , g r s ||'),
                        speed: 1,
                        instruction: 'Sing Version 1. Hold silence on the pause beats — let each note ring clear before the next.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: parseMmg('s r , g m , p d n || r g , m p , d n S || S n , d p , m g r || n d , p m , g r s ||'),
                        displayLabel: '♪ Version 2',
                        instruction: 'Listen to Version 2. Notes now come in pairs, with a pause on every third beat.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: parseMmg('s r , g m , p d n || r g , m p , d n S || S n , d p , m g r || n d , p m , g r s ||'),
                        speed: 1,
                        instruction: 'Sing Version 2. Keep the two-note groups crisp, then honor the silence before the next group.'
                    }
                ]
            }
        ]
    }
];

const SG_PALLAVI_L1 = ['Ma1','Pa','|','Da1','Ṡ','Ṡ','Ṙ','||','Ṙ','Ṡ','|','Da1','Pa','Ma1','Pa','||'];
const SG_PALLAVI_L2 = ['Ri1','Ma1','|','Pa','Da1','Ma1','Pa','||','Da1','Pa','|','Ma1','Ga3','Ri1','Sa','||'];
const SG_PALLAVI_L3 = ['Sa',',','|','Ri1','Ma1','Ga3','Ri1','||','Sa','Ri1','|','Ga3','Ri1','Sa',',','||'];
const SG_PALLAVI_L4 = ['Ri1','Ma1','|','Pa','Da1','Ma1','Pa','||','Da1','Pa','|','Ma1','Ga3','Ri1','Sa','||'];
const SG_PALLAVI_L5 = ['Sa',',','|','Ri1','Ma1','Ga3','Ri1','||','Sa','Ri1','|','Ga3','Ri1','Sa',',','||'];
const SG_PALLAVI_FULL = [...SG_PALLAVI_L1, ...SG_PALLAVI_L2, ...SG_PALLAVI_L3, ...SG_PALLAVI_L4, ...SG_PALLAVI_L5];

const SG_PALLAVI_L1_BEATS = ['Śrī -', 'Ga na na tha', 'sin dhu', '- ra var na'];
const SG_PALLAVI_L2_BEATS = ['Ka ru', 'na Sā ga ra', 'ka ri', 'va dha - na'];
const SG_PALLAVI_L3_BEATS = ['Lam -', 'bo - dha ra', 'la ku', 'mi ka ra -'];
const SG_PALLAVI_L4_BEATS = ['Am -', 'bā - su tha', 'a ma', 'ra vi nu tha'];
const SG_PALLAVI_L5_BEATS = ['Lam -', 'bo - dha ra', 'la ku', 'mi ka ra -'];

const SG_CHAR1_L1 = SG_PALLAVI_L1;
const SG_CHAR1_L2 = SG_PALLAVI_L2;
const SG_CHAR1_L1_BEATS = ['Sid dha', 'chā - ra ṇa', 'ga ṇa', 'sē - vi tha'];
const SG_CHAR1_L2_BEATS = ['Sid dhi', 'vi nā ya ka', 'tē -', 'na mō na mō'];

const SG_CHAR2_L1 = SG_PALLAVI_L1;
const SG_CHAR2_L2 = SG_PALLAVI_L2;
const SG_CHAR2_L1_BEATS = ['Sa ka', 'la vid yā -', '- dhi', 'pū - ji tha'];
const SG_CHAR2_L2_BEATS = ['Sa -', 'rvō - tta ma', 'tē -', 'na mō na mō'];

const GEETHAM_CURRICULUM_RAW = [
    // ─── STAGE 1: MALAHARI ────────────────────────────────────────────────
    {
        id: 'geetham_stage1', title: 'Malahari Rāgam', symbol: '🌿',
        subtitle: 'Four geethams in the graceful pentatonic raga',
        color: '#1a2d1a', tag: 'Rāga 1',
        lessons: [
            {
                id: 'gm_malahari_intro', title: 'Introduction to Malahari', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Malahari Rāgam', body: 'Malahari is a janya (derived) raga of the 15th mela, Māyāmāḷavagowḷa. It has a pentatonic ascending scale and 6 notes descending.\n\nArohanam (ascending): Sa Ri₁ Ma₁ Pa Da₁ Ṡ\nAvarohanam (descending): Ṡ Da₁ Pa Ma₁ Ga₃ Ri₁ Sa\n\nNote that Ga₃ appears only in the descent — it adds a characteristic color to the downward movement. Malahari has a calm, meditative quality and is traditionally sung in the morning.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ma1', 'Pa', 'Da1', 'Ṡ'], displayLabel: '♪', instruction: 'Arohanam: listen to the Malahari scale ascend.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Da1', 'Pa', 'Ma1', 'Ga3', 'Ri1', 'Sa'], displayLabel: '♪', instruction: 'Avarohanam: listen to the Malahari scale descend — hear Ga₃ appear on the way down.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ma1', 'Pa', 'Da1', 'Ṡ'], speed: 1, instruction: 'Sing the Malahari Arohanam.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Da1', 'Pa', 'Ma1', 'Ga3', 'Ri1', 'Sa'], speed: 1, instruction: 'Sing the Malahari Avarohanam.' },
                ]
            },
            {
                id: 'gm1', title: 'Geetham 1: Śrī Gaṇanātha', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Śrī Gaṇanātha', body: 'Rāga: Malahari · Tāḷam: Chatusra Jāti Rūpaka (2+4 per cycle)\n\nThis geetham is a devotional invocation to Lord Ganesha, the remover of obstacles. "Śrī Gaṇanātha" means "the auspicious lord of the Ganas (celestial beings)."\n\nLook for the characteristic ascending phrase Ma–Pa–Da–Ṡ, followed by the tara Ṙ (high Ri) and the beautiful descent through the full Malahari Avarohanam.' },
                    { type: 'lyrics_practice', title: 'Pallavi Meaning', lyrics: [
                        'Śrī Gaṇanātha Sindhūra Varṇa',
                        'Karuṇā Sāgara Kari Vadana',
                        'Lambōdhara Lakumi-kara',
                        'Ambā Suta Amara Vinuta'
                    ], instruction: 'Read the meaning first, then notice how the pallavi naturally falls into four short lyrical gestures.', meaning: 'O auspicious lord of the ganas, vermilion-hued one, ocean of compassion, elephant-faced one, pot-bellied one, bearer of Lakshmi, son of Amba, praised by the devas.' },
                    { type: 'lyrics_listen', title: 'Pallavi Lyrics Guide', lyrics: [
                        'Śrī Gaṇanātha Sindhūra Varṇa',
                        'Karuṇā Sāgara Kari Vadana',
                        'Lambōdhara Lakumi-kara',
                        'Ambā Suta Amara Vinuta'
                    ], instruction: 'Listen to the words alone first. No swara accuracy yet, just pronunciation, stress, and phrase shape.' },
                    { type: 'lyrics_repeat', title: 'Pallavi Word Repetition', lyrics: [
                        'Śrī Gaṇanātha Sindhūra Varṇa',
                        'Karuṇā Sāgara Kari Vadana',
                        'Lambōdhara Lakumi-kara',
                        'Ambā Suta Amara Vinuta'
                    ], instruction: 'Repeat each fragment clearly in speech. Keep the syllables even and avoid swallowing the consonants.' },
                    { type: 'sahitya_swara_map', title: 'Pallavi Line 1 Map', swaras: SG_PALLAVI_L1, lyricsBeats: SG_PALLAVI_L1_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'See how the words sit inside the beat-groups. One beat can hold multiple swaras and one lyric syllable can stretch across a full beat.' },
                    { type: 'sahitya_rhythm', title: 'Pallavi Line 1 in Rhythm', swaras: SG_PALLAVI_L1, lyricsBeats: SG_PALLAVI_L1_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Clap the Rūpaka tala and recite line 1 in rhythm only.' },
                    { type: 'listen_sequence', swaras: SG_PALLAVI_L1, displayLabel: '♪', instruction: 'Listen to Pallavi line 1: “Śrī Gaṇanātha Sindhūra Varṇa.” Hear how the phrase climbs to tara Ri before descending.' },
                    { type: 'sing_sequence', swaras: SG_PALLAVI_L1, speed: 0.9, instruction: 'Sing the swaras only for Pallavi line 1 before adding the words.' },
                    { type: 'sing_sahitya_chunk', title: 'Sing Pallavi Line 1 With Words', swaras: SG_PALLAVI_L1, lyrics: ['Śrī Gaṇanātha Sindhūra Varṇa'], lyricsBeats: SG_PALLAVI_L1_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.85, instruction: 'Now sing the words on the melody. Focus on tala alignment, long syllables, and the overall rise-and-fall contour.' },
                    { type: 'sahitya_swara_map', title: 'Pallavi Line 2 Map', swaras: SG_PALLAVI_L2, lyricsBeats: SG_PALLAVI_L2_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Map line 2 beat by beat before you sing it. Watch how “Karuṇā Sāgara” spreads across the larger 4-beat half.' },
                    { type: 'sahitya_rhythm', title: 'Pallavi Line 2 in Rhythm', swaras: SG_PALLAVI_L2, lyricsBeats: SG_PALLAVI_L2_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Speak line 2 in tala. Let “vadana” settle instead of rushing the ending.' },
                    { type: 'listen_sequence', swaras: SG_PALLAVI_L2, displayLabel: '♪', instruction: 'Listen to Pallavi line 2: “Karuṇā Sāgara Kari Vadana.” Notice the graceful descent back toward Sa.' },
                    { type: 'sing_sequence', swaras: SG_PALLAVI_L2, speed: 0.9, instruction: 'Sing the swaras only for Pallavi line 2.' },
                    { type: 'sing_sahitya_chunk', title: 'Sing Pallavi Line 2 With Words', swaras: SG_PALLAVI_L2, lyrics: ['Karuṇā Sāgara Kari Vadana'], lyricsBeats: SG_PALLAVI_L2_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.84, instruction: 'Sing line 2 with sahityam. Keep the lyric chunk full and connected all the way into the cadence.' },
                    { type: 'sahitya_swara_map', title: 'Pallavi Line 3 Map', swaras: SG_PALLAVI_L3, lyricsBeats: SG_PALLAVI_L3_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Notice the held opening Sa and the compact close in this shorter line.' },
                    { type: 'listen_sequence', swaras: SG_PALLAVI_L3, displayLabel: '♪', instruction: 'Listen to Pallavi line 3: “Lambōdhara Lakumi-kara.” Feel the held Sa and the compact ending.' },
                    { type: 'sing_sahitya_chunk', title: 'Sing Pallavi Line 3 With Words', swaras: SG_PALLAVI_L3, lyrics: ['Lambōdhara Lakumi-kara'], lyricsBeats: SG_PALLAVI_L3_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.84, instruction: 'Sing line 3 with the words. This line is a good test of sustained syllables at the opening.' },
                    { type: 'listen_sequence', swaras: [...SG_PALLAVI_L4, ...SG_PALLAVI_L5], displayLabel: '♪', instruction: 'Listen to Pallavi lines 4–5 together: “Ambā Suta Amara Vinuta | Lambōdhara Lakumi-kara.” The fourth line returns to the line-2 melody, then the fifth line repeats the closing cadence.' },
                    { type: 'sing_with_words', title: 'Join Pallavi Lines 4–5', swaras: [...SG_PALLAVI_L4, ...SG_PALLAVI_L5], lyrics: ['Ambā Suta Amara Vinuta', 'Lambōdhara Lakumi-kara'], lyricsBeats: [...SG_PALLAVI_L4_BEATS, ...SG_PALLAVI_L5_BEATS], tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.82, instruction: 'Join the last two pallavi lines. Treat them as one flowing response rather than two isolated drills.' },
                    { type: 'listen_sequence', swaras: SG_PALLAVI_FULL, displayLabel: '♪', instruction: 'Listen to the full pallavi from start to finish in notation order.' },
                    { type: 'sing_with_words', title: 'Sing the Full Pallavi', swaras: SG_PALLAVI_FULL, lyrics: [
                        'Śrī Gaṇanātha Sindhūra Varṇa',
                        'Karuṇā Sāgara Kari Vadana',
                        'Lambōdhara Lakumi-kara',
                        'Ambā Suta Amara Vinuta',
                        'Lambōdhara Lakumi-kara'
                    ], lyricsBeats: [...SG_PALLAVI_L1_BEATS, ...SG_PALLAVI_L2_BEATS, ...SG_PALLAVI_L3_BEATS, ...SG_PALLAVI_L4_BEATS, ...SG_PALLAVI_L5_BEATS], tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.8, instruction: 'Now sing the full pallavi with words. Think in phrase chunks, not isolated notes.' },
                    { type: 'lyrics_listen', title: 'Charanam 1 Lyrics Guide', lyrics: [
                        'Siddha Chāraṇa Gaṇa Sēvita',
                        'Siddhi Vināyaka Tē Namo Namo'
                    ], instruction: 'Listen to the charanam words first. Hear the difference between the descriptive first line and the salutation line.', meaning: 'Holy beings and the gana followers worship you; O Siddhi Vinayaka, salutations again and again.' },
                    { type: 'sahitya_swara_map', title: 'Charanam 1 Line 1 Map', swaras: SG_CHAR1_L1, lyricsBeats: SG_CHAR1_L1_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Read line 1 beat by beat before singing it.' },
                    { type: 'sing_sahitya_chunk', title: 'Sing Charanam 1 Line 1', swaras: SG_CHAR1_L1, lyrics: ['Siddha Chāraṇa Gaṇa Sēvita'], lyricsBeats: SG_CHAR1_L1_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.84, instruction: 'Sing Charanam 1 line 1 with sahityam.' },
                    { type: 'sahitya_swara_map', title: 'Charanam 1 Line 2 Map', swaras: SG_CHAR1_L2, lyricsBeats: SG_CHAR1_L2_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Now map the salutation line and notice how the final “namo namo” sits inside the closing descent.' },
                    { type: 'sing_with_words', title: 'Sing Charanam 1', swaras: [...SG_CHAR1_L1, ...SG_CHAR1_L2], lyrics: ['Siddha Chāraṇa Gaṇa Sēvita', 'Siddhi Vināyaka Tē Namo Namo'], lyricsBeats: [...SG_CHAR1_L1_BEATS, ...SG_CHAR1_L2_BEATS], tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.82, instruction: 'Join both lines of Charanam 1. Keep the return to the salutation calm and well-timed.' },
                    { type: 'lyrics_listen', title: 'Charanam 2 Lyrics Guide', lyrics: [
                        'Sakala Vidyādi Poojitha',
                        'Sarvōttama Tē Namo Namo'
                    ], instruction: 'Listen to Charanam 2 and prepare for the longer stretched syllables in “vidyādi” and “sarvōttama.”', meaning: 'You are the one first worshipped in all learning; O supreme one, salutations again and again.' },
                    { type: 'sahitya_swara_map', title: 'Charanam 2 Line 1 Map', swaras: SG_CHAR2_L1, lyricsBeats: SG_CHAR2_L1_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Watch how the stretched “vidyādi” crosses the middle of the line.' },
                    { type: 'sing_sahitya_chunk', title: 'Sing Charanam 2 Line 1', swaras: SG_CHAR2_L1, lyrics: ['Sakala Vidyādi Poojitha'], lyricsBeats: SG_CHAR2_L1_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.82, instruction: 'Sing Charanam 2 line 1, keeping the long syllables supported and even.' },
                    { type: 'sahitya_swara_map', title: 'Charanam 2 Line 2 Map', swaras: SG_CHAR2_L2, lyricsBeats: SG_CHAR2_L2_BEATS, tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, instruction: 'Map the closing salutation before singing the full charanam.' },
                    { type: 'sing_with_words', title: 'Sing Charanam 2', swaras: [...SG_CHAR2_L1, ...SG_CHAR2_L2], lyrics: ['Sakala Vidyādi Poojitha', 'Sarvōttama Tē Namo Namo'], lyricsBeats: [...SG_CHAR2_L1_BEATS, ...SG_CHAR2_L2_BEATS], tala: { name: 'Chatusra Jāti Rūpaka', groups: [2, 4], unitLabel: '6-beat cycle' }, speed: 0.8, instruction: 'Sing both lines of Charanam 2 with words and pulse. Focus on phrase completion and stable landings.' },
                ]
            },
            {
                id: 'gm2', title: 'Geetham 2: Kuṇḍha Gowra', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Kuṇḍha Gowra', body: 'Rāga: Malahari · Tāḷam: Chatusra Jāti Rūpaka (2+4 per cycle)\n\n"Kuṇḍha Gowra" praises Shiva, who is white as the jasmine flower (kuṇḍha) and the Himalayan snow (gowra). This geetham opens with a striking descent from Da through the full Malahari avarohanam, then ascends — a beautiful rocking motion that captures Shiva\'s serene nature.\n\nLook for the characteristic Ṙ (tara Ri) leap in the second line.' },
                    { type: 'listen_sequence', swaras: ['Da1','Pa','|','Ma1','Ga3','Ri1','Sa','||','Ri1','Ma1','|','Pa','Da1','Ma1','Pa','||','Da1','Ṙ','|','Ṙ','Ṡ','Da1','Pa','||','Da1','Pa','|','Ma1','Ga3','Ri1','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — the opening descent and the Ṙ (tara Ri) leap: D P | M G R S || R M | P D M P || D Ṙ | Ṙ Ṡ D P || D P | M G R S ||' },
                    { type: 'listen_sequence', swaras: ['Sa',',','|','Ri1',',','Ri1',',','||','Da1','Pa','|','Ma1','Ga3','Ri1','Sa','||','Sa','Ri1','|','Ma1',',','Ga3','Ri1','||','Sa','Ri1','|','Ga3','Ri1','Sa',',','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — the gentle Malahari closing cadence: S , | R , R , || D P | M G R S || S R | M , G R || S R | G R S , ||' },
                    { type: 'sing_sequence', swaras: ['Da1','Pa','|','Ma1','Ga3','Ri1','Sa','||'], speed: 1, instruction: 'Sing the opening descent: Da Pa | Ma Ga Ri Sa ||' },
                    { type: 'sing_sequence', swaras: ['Sa','Ri1','|','Ma1',',','Ga3','Ri1','||','Sa','Ri1','|','Ga3','Ri1','Sa',',','||'], speed: 1, instruction: 'Sing the closing cadence of Kuṇḍha Gowra: S R | M , G R || S R | G R S , ||' },
                ]
            },
            {
                id: 'gm3', title: 'Geetham 3: Kereya Nīranu', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Kereya Nīranu', body: 'Rāga: Malahari · Tāḷam: Tisra Jāti Triputa (3+2+2 per cycle)\n\n"Kereya Nīranu" is a Kannada devotional geetham about giving back what you receive — "return the water of the tank to the tank." It is a philosophical song about gratitude and service.\n\nThe Tisra Triputa tāḷam gives this geetham a flowing, triple-grouped pulse.' },
                    { type: 'listen_sequence', swaras: ['Da1','Ṡ','Ṡ','|','Da1','Pa','|','Ma1','Pa','||','Da1','Da1','Pa','|','Ma1','Ma1','|','Pa',',','||','Da1','Da1','Ṡ','|','Da1','Pa','|','Ma1','Pa','||','Da1','Da1','Pa','|','Ma1','Ga3','|','Ri1','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — D Ṡ Ṡ | D P | M P || D D P | M M | P , || D D Ṡ | D P | M P || D D P | M G | R S ||' },
                    { type: 'listen_sequence', swaras: ['Sa','Ri1','Ri1','|','Sa','Ri1','|','Sa','Ri1','||','Da1','Da1','Pa','|','Ma1','Ga3','|','Ri1','Sa','||','Da1','Pa','Da1','|','Ṡ',',','|','Da1','Pa','||','Da1','Da1','Pa','|','Ma1','Ga3','|','Ri1','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — S R R | S R | S R || D D P | M G | R S || and the leaping D P D | Ṡ , | D P ||' },
                    { type: 'sing_sequence', swaras: ['Da1','Ṡ','Ṡ','|','Da1','Pa','|','Ma1','Pa','||'], speed: 1, instruction: 'Sing the opening Da–Ṡ ascent: D Ṡ Ṡ | D P | M P ||' },
                    { type: 'sing_sequence', swaras: ['Da1','Da1','Pa','|','Ma1','Ga3','|','Ri1','Sa','||'], speed: 1, instruction: 'Sing the signature Malahari descent of Kereya Nīranu: D D P | M G | R S ||' },
                ]
            },
            {
                id: 'gm4', title: 'Geetham 4: Padhumanābha', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Padhumanābha', body: 'Rāga: Malahari · Tāḷam: Tisra Jāti Triputa (3+2+2 per cycle)\n\n"Padhumanābha" is a prayer to Vishnu, "the one with a lotus navel" (paduma = lotus, nābha = navel), from whose navel the universe and Brahma were born.\n\nThis is one of the more complex Malahari geethams, featuring a distinctive R S D opening and longer phrases that weave between the middle and upper octave regions, including a soaring Ṙ (tara Ri) passage.' },
                    { type: 'listen_sequence', swaras: ['Ri1','Sa','Da1','|','Sa',',','|','Sa',',','||','Ma1','Ga3','Ri1','|','Ma1','Ma1','|','Pa',',','||','Sa','Da1',',','|','Da1','Pa','|','Ma1','Pa','||','Da1','Da1','Pa','|','Ma1','Ga3','|','Ri1','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — the distinctive R S D | S , | S , || opening and descent.' },
                    { type: 'listen_sequence', swaras: ['Pa','Ma1','Pa','|','Da1','Ṡ','|','Da1','Ṡ','||','Ṙ','Ṡ','Da1','|','Da1','Ṡ','|','Da1','Pa','||','Da1','Da1','Pa','|','Pa',',','|','Pa','Ma1','||','Ri1','Ma1','Ma1','|','Pa',',','|','Pa',',','||'], displayLabel: '♪', instruction: 'Listen to lines 5–6 — the soaring Ṡ phrase with tara Ṙ: P M P | D Ṡ | D Ṡ || Ṙ Ṡ D | D Ṡ | D P ||' },
                    { type: 'sing_sequence', swaras: ['Ri1','Sa','Da1','|','Sa',',','|','Sa',',','||','Ma1','Ga3','Ri1','|','Ma1','Ma1','|','Pa',',','||'], speed: 1, instruction: 'Sing the opening phrase: R S D | S , | S , || M G R | M M | P , ||' },
                    { type: 'sing_sequence', swaras: ['Da1','Da1','Pa','|','Pa',',','|','Pa','Ma1','||','Ri1',',','Ma1','|','Ma1','Ga3','|','Ri1','Sa','||'], speed: 1, instruction: 'Sing the closing descent of Padhumanābha: D D P | P , | P M || R , M | M G | R S ||' },
                ]
            },
        ]
    },

    // ─── STAGE 2: SUDDHA SAVERI ───────────────────────────────────────────
    {
        id: 'geetham_stage2', title: 'Suddha Sāveri Rāgam', symbol: '💧',
        subtitle: 'One geetham in the pure, open pentatonic raga',
        color: '#0f2030', tag: 'Rāga 2',
        lessons: [
            {
                id: 'gm_sudhasaveri_intro', title: 'Introduction to Suddha Sāveri', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Suddha Sāveri Rāgam', body: 'Suddha Sāveri is a janya of the 29th mela, Dhīrasankarābharaṇam. It is a pentatonic raga with no Ga or Ni — giving it a clean, open sound.\n\nArohanam: Sa Ri₂ Ma₁ Pa Da₂ Ṡ\nAvarohanam: Da₂ Pa Ma₁ Ri₂ Sa\n\nNote the vakra (curved) avarohanam — it skips Sa at the top and goes directly from Da₂ downward. This is what gives Suddha Sāveri its distinctive character.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ma1', 'Pa', 'Da2', 'Ṡ'], displayLabel: '♪', instruction: 'Arohanam: listen to the open, bright ascent.' },
                    { type: 'listen_sequence', swaras: ['Da2', 'Pa', 'Ma1', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Avarohanam: listen to the characteristic descent (no Ṡ at the top).' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri2', 'Ma1', 'Pa', 'Da2', 'Ṡ'], speed: 1, instruction: 'Sing the Suddha Sāveri arohanam.' },
                    { type: 'sing_sequence', swaras: ['Da2', 'Pa', 'Ma1', 'Ri2', 'Sa'], speed: 1, instruction: 'Sing the Suddha Sāveri avarohanam.' },
                ]
            },
            {
                id: 'gm5', title: 'Geetham 5: Aṇalēkāra', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Aṇalēkāra', body: 'Rāga: Suddha Sāveri · Tāḷam: Tisra Jāti Triputa (3+2+2 per cycle)\n\n"Aṇalēkāra" praises Goddess Lakshmi, whose compassion has no measure or boundary (aṇalēkāra = immeasurable). The open, sunlit quality of Suddha Sāveri perfectly suits this song about the infinite grace of the goddess of wealth.\n\nNotice how the geetham hovers around Pa and Da before sweeping up to tara Sa (Ṡ).' },
                    { type: 'listen_sequence', swaras: ['Da2','Da2','Ṡ','|','Da2',',','|','Da2','Pa','||','Pa','Ma1','Ri2','|','Da2','Da2','|','Da2','Pa','||'], displayLabel: '♪', instruction: 'Listen to line 2 — D D Ṡ | D , | D P || P M R | D D | D P ||' },
                    { type: 'listen_sequence', swaras: ['Pa',',','Pa','|','Da2','Da2','|','Da2','Pa','||','Pa',',','Pa','|','Ma1','Pa','|','Da2','Pa','||','Pa','Ma1','Ri2','|','Sa','Ri2','|','Sa','Ri2','||','Pa','Ma1','Ri2','|','Sa','Ri2','|','Sa','Ri2','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — the bouncing P , P | D D | D P || phrase and the Sa–Ri repeating cadence.' },
                    { type: 'listen_sequence', swaras: ['Pa','Pa','Da2','|','Pa','Pa','|','Ma1','Ri2','||','Ri2','Sa','Ri2','|','Ma1',',','|','Ma1',',','||'], displayLabel: '♪', instruction: 'Listen to line 5 — P P D | P P | M R || R S R | M , | M , ||' },
                    { type: 'sing_sequence', swaras: ['Da2','Da2','Ṡ','|','Da2',',','|','Da2','Pa','||'], speed: 1, instruction: 'Sing the Da–Ṡ phrase: D D Ṡ | D , | D P ||' },
                    { type: 'sing_sequence', swaras: ['Pa','Ma1','Ri2','|','Sa','Ri2','|','Sa','Ri2','||','Pa','Pa','Da2','|','Pa','Pa','|','Ma1','Ri2','||'], speed: 1, instruction: 'Sing the Sa–Ri cadence and P–P–D ascent of Aṇalēkāra.' },
                ]
            },
        ]
    },

    // ─── STAGE 3: MOHANAM ─────────────────────────────────────────────────
    {
        id: 'geetham_stage3', title: 'Mohana Rāgam', symbol: '✨',
        subtitle: 'One geetham in the captivating pentatonic raga',
        color: '#2a1a30', tag: 'Rāga 3',
        lessons: [
            {
                id: 'gm_mohanam_intro', title: 'Introduction to Mohanam', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Mohana Rāgam', body: 'Mohanam is a janya of the 28th mela, Harikambhoji. It is a symmetric pentatonic raga — the same 5 notes ascending and descending, with no Ma or Ni.\n\nArohanam: Sa Ri₂ Ga₂ Pa Da₂ Ṡ\nAvarohanam: Ṡ Da₂ Pa Ga₂ Ri₂ Sa\n\nMohanam means "that which captivates." It has a bright, joyful, and enlivening quality. You may recognize it from many popular Indian film melodies — it is one of the most commonly used ragas in all of Indian music.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Pa', 'Da2', 'Ṡ'], displayLabel: '♪', instruction: 'Arohanam: listen to the bright, captivating ascent.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Da2', 'Pa', 'Ga2', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Avarohanam: listen to the symmetric descent.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Pa', 'Da2', 'Ṡ'], speed: 1, instruction: 'Sing the Mohanam arohanam.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Da2', 'Pa', 'Ga2', 'Ri2', 'Sa'], speed: 1, instruction: 'Sing the Mohanam avarohanam.' },
                ]
            },
            {
                id: 'gm6', title: 'Geetham 6: Vāra Vīṇā', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Vāra Vīṇā', body: 'Rāga: Mohanam · Tāḷam: Chatusra Jāti Rūpaka (2+4 per cycle)\n\n"Vāra Vīṇā" ("the auspicious vīṇā") is a praise of Goddess Saraswati, the goddess of learning and music, who carries the divine vīṇā instrument. The bright, captivating Mohanam raga perfectly suits a tribute to the muse of music.\n\nThe geetham features elegant leaps up to Da₂ and Ṡ, with Ga₂ creating beautiful Mohanam color.' },
                    { type: 'listen_sequence', swaras: ['Ga2','Ga2','|','Pa',',','Pa',',','||','Da2','Pa','|','Ṡ',',','Ṡ',',','||','Ri2','Ṡ','|','Da2','Da2','Pa',',','||','Da2','Pa','|','Ga2','Ga2','Ri2',',','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — G G | P , P , || D P | Ṡ , Ṡ , || then Ṙ Ṡ | D D P , || D P | G G R , ||' },
                    { type: 'listen_sequence', swaras: ['Ga2','Pa','|','Da2','Ṡ','Da2',',','||','Da2','Pa','|','Ga2','Ga2','Ri2',',','||','Ga2','Ga2','|','Ga2','Ga2','Da2','Pa','||','Ga2',',','|','Ga2','Ga2','Ri2','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — G P | D Ṡ D , || D P | G G R , || and G G | G G D P || G , | G G R S ||' },
                    { type: 'listen_sequence', swaras: ['Sa','Ga2','|','Ga2',',','Ga2',',','||','Ga2','Ri2','|','Pa','Ga2','Ri2','Sa','||'], displayLabel: '♪', instruction: 'Listen to the cadential phrase returning to Sa: S G | G , G , || G R | P G R S ||' },
                    { type: 'sing_sequence', swaras: ['Ga2','Pa','|','Da2','Ṡ','Da2',',','||','Da2','Pa','|','Ga2','Ga2','Ri2',',','||'], speed: 1, instruction: 'Sing line 3: G P | D Ṡ D , || D P | G G R , ||' },
                    { type: 'sing_sequence', swaras: ['Sa','Ga2','|','Ga2',',','Ga2',',','||','Ga2','Ri2','|','Pa','Ga2','Ri2','Sa','||'], speed: 1, instruction: 'Sing the closing cadence of Vāra Vīṇā: S G | G , G , || G R | P G R S ||' },
                ]
            },
        ]
    },

    // ─── STAGE 4: KALYANI ─────────────────────────────────────────────────
    {
        id: 'geetham_stage4', title: 'Kalyāṇī Rāgam', symbol: '🌺',
        subtitle: 'One geetham in the auspicious raga of all seven notes',
        color: '#1a1230', tag: 'Rāga 4',
        lessons: [
            {
                id: 'gm_kalyani_intro', title: 'Introduction to Kalyāṇī', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Kalyāṇī Rāgam', body: 'Kalyāṇī is the 65th mela (Mechakalyāṇī) — a complete raga with all 7 notes, and the distinctive raised 4th (Ma₂, called Pratimadhyamam or sharp Madhyamam).\n\nArohanam: Sa Ri₂ Ga₂ Ma₂ Pa Da₂ Ni₂ Ṡ\nAvarohanam: Ṡ Ni₂ Da₂ Pa Ma₂ Ga₂ Ri₂ Sa\n\nKalyāṇī means "auspicious." It is a grand, expansive raga associated with morning, celebration, and divine grace. The raised Ma₂ gives it a bright, uplifting, almost Western major-key quality — yet uniquely Carnatic.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Ma2', 'Pa', 'Da2', 'Ni2', 'Ṡ'], displayLabel: '♪', instruction: 'Arohanam: listen to all 7 notes of Kalyāṇī ascending — hear the raised Ma₂.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni2', 'Da2', 'Pa', 'Ma2', 'Ga2', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Avarohanam: the full descent of Kalyāṇī.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Ma2', 'Pa', 'Da2', 'Ni2', 'Ṡ'], speed: 1, instruction: 'Sing the Kalyāṇī arohanam — feel the brightness of Ma₂.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Ni2', 'Da2', 'Pa', 'Ma2', 'Ga2', 'Ri2', 'Sa'], speed: 1, instruction: 'Sing the Kalyāṇī avarohanam.' },
                ]
            },
            {
                id: 'gm7', title: 'Geetham 7: Kamala Jādhalā', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Kamala Jādhalā', body: 'Rāga: Kalyāṇī · Tāḷam: Tisra Jāti Triputa (3+2+2 per cycle)\n\n"Kamala Jādhalā" is a praise of Goddess Lakshmi — "she who sports in the lotus." The grandeur of Kalyāṇī suits the majesty of Lakshmi, the goddess of prosperity.\n\nThis is one of the most challenging geethams in this set, opening with three tara Ṡ beats and weaving all 7 Kalyāṇī notes through a long, sweeping pallavi.' },
                    { type: 'listen_sequence', swaras: ['Ṡ','Ṡ','Ṡ','|','Ni2','Da2','|','Ni2','Ṡ','||','Ni2','Da2','Pa','|','Da2','Pa','|','Ma2','Pa','||','Ga2','Ma2','Pa','|','Pa','Da2','|','Da2','Ni2','||','Da2','Pa','Ma2','|','Pa','Ga2','|','Ri2','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — Ṡ Ṡ Ṡ | N D | N Ṡ || N D P | D P | M P || and the full 7-note descent.' },
                    { type: 'listen_sequence', swaras: ['Da2','Da2','Da2','|','Ga2','Ga2','|','Ga2',',','||','Ma2','Pa',',','|','Ma2','Ga2','|','Ri2','Sa','||','Ri2',',',',','|','Sa',',','|',',',',','||','Ga2','Ma2','Pa','|','Ma2','Pa','|','Da2','Pa','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — D D D | G G | G , || M P , | M G | R S || and the ascending return.' },
                    { type: 'listen_sequence', swaras: ['Ni2','Da2','Pa','|','Da2','Pa','|','Ma2','Pa','||','Ga2','Ma2','Pa','|','Pa','Da2','|','Da2','Ni2','||','Da2','Pa','Ma2','|','Pa','Ga2','|','Ri2','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 5–6 — full characteristic Kalyāṇī phrases N D P | D P | M P || G M P | P D | D N || D P M | P G | R S ||' },
                    { type: 'sing_sequence', swaras: ['Ṡ','Ṡ','Ṡ','|','Ni2','Da2','|','Ni2','Ṡ','||','Ni2','Da2','Pa','|','Da2','Pa','|','Ma2','Pa','||'], speed: 1, instruction: 'Sing the opening upper-register phrase: Ṡ Ṡ Ṡ | N D | N Ṡ || N D P | D P | M P ||' },
                    { type: 'sing_sequence', swaras: ['Da2','Pa','Ma2','|','Pa','Ga2','|','Ri2','Sa','||'], speed: 1, instruction: 'Sing the closing descent through all 7 Kalyāṇī notes: D P M | P G | R S ||' },
                ]
            },
        ]
    },

    // ─── STAGE 5: SAVERI ──────────────────────────────────────────────────
    {
        id: 'geetham_stage5', title: 'Sāveri Rāgam', symbol: '🌸',
        subtitle: 'One geetham in the tender, devotional raga',
        color: '#301520', tag: 'Rāga 5',
        lessons: [
            {
                id: 'gm_saveri_intro', title: 'Introduction to Sāveri', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Sāveri Rāgam', body: 'Sāveri is a janya of the 15th mela, Māyāmāḷavagowḷa (same parent as Malahari). It has an asymmetric structure — more notes descend than ascend.\n\nArohanam: Sa Ri₁ Ma₁ Pa Da₁ Ṡ (5 notes, no Ga, no Ni)\nAvarohanam: Ṡ Ni₂ Da₁ Pa Ma₁ Ga₃ Ri₁ Sa (7 notes)\n\nSāveri has a plaintive, tender, and mildly melancholic quality. Ni₂ and Ga₃ only appear in the descent, giving the avarohanam a characteristic ornamented quality. Sāveri is often sung in the morning.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ma1', 'Pa', 'Da1', 'Ṡ'], displayLabel: '♪', instruction: 'Arohanam: listen to the clean 5-note ascent.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni2', 'Da1', 'Pa', 'Ma1', 'Ga3', 'Ri1', 'Sa'], displayLabel: '♪', instruction: 'Avarohanam: listen to all 7 notes in the descent — hear Ni₂ and Ga₃ appearing.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ma1', 'Pa', 'Da1', 'Ṡ'], speed: 1, instruction: 'Sing the Sāveri arohanam.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Ni2', 'Da1', 'Pa', 'Ma1', 'Ga3', 'Ri1', 'Sa'], speed: 1, instruction: 'Sing the Sāveri avarohanam with Ni₂ and Ga₃.' },
                ]
            },
            {
                id: 'gm8', title: 'Geetham 8: Janaka Sutha', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Janaka Sutha', body: 'Rāga: Sāveri · Tāḷam: Chatusra Jāti Rūpaka (2+4 per cycle)\n\n"Janaka Sutha" means "the daughter of Janaka" — a name for Goddess Sītā, the daughter of King Janaka. This geetham is a prayer to Sītā, the consort of Rāma.\n\nThe tender, devotional quality of Sāveri suits this intimate prayer beautifully. Notice how the geetham weaves between Ri₁ and Ga₃, and how Ni₂ appears as a characteristic color in the descent.' },
                    { type: 'listen_sequence', swaras: ['Da1','Sa','|','Ri1','Ma1','Ma1',',','||','Ma1','Ga3','|',',','Ga3','Ri1','Sa','||','Ga3',',','|','Ri1','Ri1','Ga3',',','||','Ri1','Ri1','|','Sa','Da1','Sa',',','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — D S | R M M , || M G | , G R S || G , | R R G , || R R | S D S , ||' },
                    { type: 'listen_sequence', swaras: ['Da1','Da1','|','Pa','Ma1','Pa',',','||','Pa','Ma1','|','Ga3','Ri1','Sa','Ri1','||','Pa','Ma1','|','Ga3','Ri1','Ri1','Ma1','||','Ga3','Ri1','|','Sa',',','Sa',',','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — the broad mid-section: D D | P M P , || P M | G R S R || P M | G R R M || G R | S , S , ||' },
                    { type: 'listen_sequence', swaras: ['Sa','Ri1','|','Sa',',','Ni2','Da1','||','Sa','Ri1','|','Ma1',',','Ga3','Ri1','||'], displayLabel: '♪', instruction: 'Listen to line 5 — S R | S , N D || S R | M , G R || — hear Ni₂ and Ga₃ in characteristic Sāveri.' },
                    { type: 'sing_sequence', swaras: ['Da1','Sa','|','Ri1','Ma1','Ma1',',','||','Ma1','Ga3','|',',','Ga3','Ri1','Sa','||'], speed: 1, instruction: 'Sing the opening phrase: D S | R M M , || M G | , G R S ||' },
                    { type: 'sing_sequence', swaras: ['Sa','Ri1','|','Sa',',','Ni2','Da1','||','Sa','Ri1','|','Ma1',',','Ga3','Ri1','||'], speed: 1, instruction: 'Sing the characteristic Sāveri descent with Ni₂ and Ga₃: S R | S , N D || S R | M , G R ||' },
                ]
            },
        ]
    },

    // ─── STAGE 6: KAMBHOJI ────────────────────────────────────────────────
    {
        id: 'geetham_stage6', title: 'Kāmbhoji Rāgam', symbol: '🌙',
        subtitle: 'One geetham in the majestic raga of the evening',
        color: '#1a1a2e', tag: 'Rāga 6',
        lessons: [
            {
                id: 'gm_kambhoji_intro', title: 'Introduction to Kāmbhoji', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Kāmbhoji Rāgam', body: 'Kāmbhoji is a janya of the 28th mela, Harikambhoji. It is a rich raga with 6 notes ascending and 7 descending.\n\nArohanam: Sa Ri₂ Ga₂ Ma₁ Pa Da₂ Ṡ (no Ni ascending)\nAvarohanam: Ṡ Ni₁ Da₂ Pa Ma₁ Ga₂ Ri₂ Sa\n\nKāmbhoji is a majestic raga traditionally associated with the evening. The absence of Ni in the ascent followed by its appearance (as Ni₁) in the descent creates a distinctive, sweeping character. It is widely used in classical compositions, folk music, and film songs.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Ma1', 'Pa', 'Da2', 'Ṡ'], displayLabel: '♪', instruction: 'Arohanam: listen to Kāmbhoji ascending — notice no Ni.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni1', 'Da2', 'Pa', 'Ma1', 'Ga2', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Avarohanam: listen to Ni₁ appear in the descent.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Ma1', 'Pa', 'Da2', 'Ṡ'], speed: 1, instruction: 'Sing the Kāmbhoji arohanam.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Ni1', 'Da2', 'Pa', 'Ma1', 'Ga2', 'Ri2', 'Sa'], speed: 1, instruction: 'Sing the Kāmbhoji avarohanam with Ni₁.' },
                ]
            },
            {
                id: 'gm9', title: 'Geetham 9: Mandhara Dhārarē', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Mandhara Dhārarē', body: 'Rāga: Kāmbhoji · Tāḷam: Chatusra Jāti Triputa (Ādi, 4+2+2 per cycle)\n\n"Mandhara Dhārarē" praises Vishnu who holds Mount Mandara — a reference to the divine churning of the cosmic ocean. The majestic Kāmbhoji raga suits this grand mythological theme perfectly.\n\nSet in Ādi Tāḷam, this geetham features sweeping phrases from Sa up through Ṡ and into the tara register, with the characteristic Kāmbhoji Ni₁ in the descent.' },
                    { type: 'listen_sequence', swaras: ['Ṡ',',','Ni1','Pa','|','Da2','Da2','|','Ṡ',',','||','Da2','Ṡ','Ri2','Ga2','|','Ma1','Ga2','|','Ga2','Ri2','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — Ṡ , N P | D D | Ṡ , || and the tara ascent through Ṙ and Ġ.' },
                    { type: 'listen_sequence', swaras: ['Ṡ','Ri2','Ṡ','Ṡ','|','Ni1','Ni1','|','Da2','Pa','||','Da2','Da2','Pa','Ma1','|','Ga2','Ma1','|','Pa',',','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — Ṡ Ṙ Ṡ Ṡ | N N | D P || and Pā-va-na descent D D P M | G M | P , ||' },
                    { type: 'listen_sequence', swaras: ['Ga2','Pa','Da2','Ṡ','|','Ni1','Ni1','|','Da2','Pa','||','Da2','Da2','Pa','Pa','|','Ma1','Ga2','|','Ri2','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 5–6 — the characteristic sweep G P D Ṡ | N N | D P || and descent D D P P | M G | R S ||' },
                    { type: 'sing_sequence', swaras: ['Ṡ',',','Ni1','Pa','|','Da2','Da2','|','Ṡ',',','||'], speed: 1, instruction: 'Sing line 1 of Mandhara Dhārarē: Ṡ , N P | D D | Ṡ , ||' },
                    { type: 'sing_sequence', swaras: ['Ga2','Pa','Da2','Ṡ','|','Ni1','Ni1','|','Da2','Pa','||','Da2','Da2','Pa','Pa','|','Ma1','Ga2','|','Ri2','Sa','||'], speed: 1, instruction: 'Sing the characteristic sweep and descent: G P D Ṡ | N N | D P || D D P P | M G | R S ||' },
                ]
            },
        ]
    },

    // ─── STAGE 7: ARABHI ──────────────────────────────────────────────────
    {
        id: 'geetham_stage7', title: 'Ārābhi Rāgam', symbol: '🏔️',
        subtitle: 'One geetham in the expansive pentatonic raga',
        color: '#2a1800', tag: 'Rāga 7',
        lessons: [
            {
                id: 'gm_arabhi_intro', title: 'Introduction to Ārābhi', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Ārābhi Rāgam', body: 'Ārābhi is a janya of the 29th mela, Dhīrasankarābharaṇam (same parent as Suddha Sāveri). It has a pentatonic ascending scale and a richer 7-note descent.\n\nArohanam: Sa Ri₂ Ma₁ Pa Da₂ Ṡ (5 notes — no Ga or Ni ascending)\nAvarohanam: Ṡ Ni₂ Da₂ Pa Ma₁ Ga₂ Ri₂ Sa\n\nĀrābhi has a bold, expansive, heroic quality. The large leaps in its characteristic phrases (especially Sa–Da₂ and Pa–Ṡ) give it a grand, sweeping feel. It is associated with valor and devotion.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ma1', 'Pa', 'Da2', 'Ṡ'], displayLabel: '♪', instruction: 'Arohanam: listen to the bold, open ascent.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni2', 'Da2', 'Pa', 'Ma1', 'Ga2', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Avarohanam: listen to Ni₂ and Ga₂ appear in the descent.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri2', 'Ma1', 'Pa', 'Da2', 'Ṡ'], speed: 1, instruction: 'Sing the Ārābhi arohanam.' },
                    { type: 'sing_sequence', swaras: ['Ṡ', 'Ni2', 'Da2', 'Pa', 'Ma1', 'Ga2', 'Ri2', 'Sa'], speed: 1, instruction: 'Sing the Ārābhi avarohanam.' },
                ]
            },
            {
                id: 'gm10', title: 'Geetham 10: Rē Rē Śrī Rāma Chandra', tag: 'Geetham',
                exercises: [
                    { type: 'info', title: 'Rē Rē Śrī Rāma Chandra', body: 'Rāga: Ārābhi · Tāḷam: Tisra Jāti Triputa (3+2+2 per cycle)\n\n"Rē Rē Śrī Rāma Chandra" is a fervent prayer to Lord Rāma. "Rē Rē" is a respectful exclamation calling out to the Lord. The bold Ārābhi raga perfectly captures the heroic and devotional spirit of a prayer to Rāma, the warrior king.\n\nThis geetham is the culmination of this collection — it uses all the techniques and raga awareness you have built through the previous nine geethams.' },
                    { type: 'listen_sequence', swaras: ['Pa',',','Pa','|','Ma1','Ma1','|','Pa',',','||','Ma1','Ga2','Ri2','|','Sa','Ri2','|','Ma1','Ga2','||','Ri2','Ri2','Sa','|','Sa','Da2','|','Ri2','Sa','||','Ri2',',',',','|','Ri2',',','|','Sa','Ri2','||'], displayLabel: '♪', instruction: 'Listen to lines 1–2 — P , P | M M | P , || M G R | S R | M G || R R S | S D | R S ||' },
                    { type: 'listen_sequence', swaras: ['Ma1','Ga2','Ri2','|','Ri2','Sa','|','Sa',',','||','Pa','Ma1','Ma1','|','Pa',',','|','Pa',',','||','Pa','Ma1','Pa','|','Ma1','Ga2','|','Ri2','Ri2','||','Ma1','Ga2','Ri2','|','Sa','Ri2','|','Sa','Sa','||'], displayLabel: '♪', instruction: 'Listen to lines 3–4 — M G R | R S | S , || P M M | P , | P , || P M P | M G | R R ||' },
                    { type: 'listen_sequence', swaras: ['Pa','Ma1','Pa','|','Da2','Ṡ','|','Ṡ','Ri2','||','Ma1','Ga2','Ri2','|','Ṡ','Ri2','|','Ṡ','Ṡ','||'], displayLabel: '♪', instruction: 'Listen to the soaring tara section — P M P | D Ṡ | Ṡ Ṙ || M Ġ Ṙ | Ṡ Ṙ | Ṡ Ṡ ||' },
                    { type: 'sing_sequence', swaras: ['Pa',',','Pa','|','Ma1','Ma1','|','Pa',',','||','Ma1','Ga2','Ri2','|','Sa','Ri2','|','Ma1','Ga2','||'], speed: 1, instruction: 'Sing the opening phrase: P , P | M M | P , || M G R | S R | M G ||' },
                    { type: 'sing_sequence', swaras: ['Pa','Ma1','Pa','|','Ma1','Ga2','|','Ri2','Ri2','||','Ma1','Ga2','Ri2','|','Sa','Ri2','|','Sa','Sa','||'], speed: 1, instruction: 'Sing the bold Ārābhi descent: P M P | M G | R R || M G R | S R | S S ||' },
                ]
            },
        ]
    },
];

const parseSwarajathi = (str, swaraMap) => {
    const tokens = [];
    let lastPlayableIdx = -1;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '|') {
            if (str[i + 1] === '|') { tokens.push('||'); i++; }
            else tokens.push('|');
        } else if (char === ',' || char === ';' || char === '-') {
            if (lastPlayableIdx >= 0) {
                const prev = tokens[lastPlayableIdx];
                tokens[lastPlayableIdx] = {
                    swara: typeof prev === 'string' ? prev : prev.swara,
                    duration: (typeof prev === 'string' ? 1 : prev.duration || 1) + 1,
                    notationSuffix: [
                        ...(typeof prev === 'string' ? [] : prev.notationSuffix || []),
                        char
                    ]
                };
            } else {
                tokens.push({ swara: ',', duration: 1 });
            }
        } else if (swaraMap[char]) {
            if (str[i + 1] === '.') {
                tokens.push(`${swaraMap[char]}.`);
                i++;
            } else {
                tokens.push(swaraMap[char]);
            }
            lastPlayableIdx = tokens.length - 1;
        }
    }
    return tokens;
};

const parseAuditedSwarajathi = (lines, swaraMap) => lines.flatMap((line, idx) => {
    const parsedLine = parseSwarajathi(line, swaraMap);
    return idx === lines.length - 1 ? parsedLine : [...parsedLine, '||'];
});

const BILAHARI_SWARAS = {
    s: 'Sa', r: 'Ri2', g: 'Ga3', m: 'Ma1', p: 'Pa', d: 'Da2', n: 'Ni3',
    S: 'Ṡ', R: 'Ri2', G: 'Ga3', M: 'Ma1', P: 'Pa', D: 'Da2', N: 'Ni3'
};

const KHAMAS_SWARAS = {
    s: 'Sa', r: 'Ri2', g: 'Ga3', m: 'Ma1', p: 'Pa', d: 'Da2', n: 'Ni2',
    S: 'Ṡ', R: 'Ri2', G: 'Ga3', M: 'Ma1', P: 'Pa', D: 'Da2', N: 'Ni2'
};

const BHAIRAVI_SWARAS = {
    s: 'Sa', r: 'Ri2', g: 'Ga2', m: 'Ma1', p: 'Pa', d: 'Da1', n: 'Ni2',
    S: 'Ṡ', R: 'Ri2', G: 'Ga2', M: 'Ma1', P: 'Pa', D: 'Da1', N: 'Ni2'
};

const SWARAJATHI_CURRICULUM_RAW = [
    {
        id: 'swarajathi_stage1',
        title: 'Bilahari: Rāravēṇu',
        symbol: '🎻',
        subtitle: 'First swarajathi in Ādi tāḷam',
        color: '#1f2a12',
        tag: 'Swarajathi 1',
        lessons: [
            {
                id: 'sj_form_intro', title: 'What Is a Swarajathi?', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'From Geetham to Swarajathi', body: 'Swarajathis are more sophisticated than geethams in both size and musical detail. They usually have a pallavi and charanams, and some include an anupallavi.\n\nA key practice method: sing each charanam first as swaras, then again with sahityam. This makes the form a bridge between simple songs and larger concert pieces.' },
                    { type: 'quiz', question: 'How are swarajathi charanams commonly practiced?', choices: ['Only as lyrics', 'First as swaras, then as lyrics', 'Only as fast kalpana swaras', 'Without tāḷam'], correct: 'First as swaras, then as lyrics', explanation: 'The charanam is often rendered once with swaras and then repeated with the corresponding sahityam.' },
                ]
            },
            {
                id: 'sj_raaravenu_raga', title: 'Bilahari Rāgam', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Bilahari Rāgam', body: 'Rāravēṇu is set in Bilahari, a janya of the 29th mela, Dhīrasankarābharaṇam.\n\nArohanam: Sa Ri₂ Ga₃ Pa Da₂ Ṡ\nAvarohanam: Ṡ Ni₃ Da₂ Pa Ma₁ Ga₃ Ri₂ Sa\n\nThe ascent skips Ma and Ni, giving Bilahari a bright, direct lift. The descent restores Ni₃ and Ma₁, creating the characteristic rounded return.' },
                    { type: 'listen_sequence', swaras: ['Sa','Ri2','Ga3','Pa','Da2','Ṡ'], displayLabel: '♪', instruction: 'Listen to the Bilahari arohanam: S R₂ G₃ P D₂ Ṡ.' },
                    { type: 'listen_sequence', swaras: ['Ṡ','Ni3','Da2','Pa','Ma1','Ga3','Ri2','Sa'], displayLabel: '♪', instruction: 'Listen to the Bilahari avarohanam: Ṡ N₃ D₂ P M₁ G₃ R₂ S.' },
                    { type: 'sing_sequence', swaras: ['Sa','Ri2','Ga3','Pa','Da2','Ṡ'], speed: 1, instruction: 'Sing the Bilahari ascent cleanly, without Ma or Ni.' },
                    { type: 'sing_sequence', swaras: ['Ṡ','Ni3','Da2','Pa','Ma1','Ga3','Ri2','Sa'], speed: 1, instruction: 'Sing the descent and notice where Ni₃ and Ma₁ return.' },
                ]
            },
            {
                id: 'sj_raaravenu_pallavi', title: 'Rāravēṇu Pallavi', tag: 'Pallavi',
                exercises: [
                    { type: 'info', title: 'Rāravēṇu', body: 'Rāga: Bilahari · Tāḷam: Ādi\n\nPallavi: Rārā Vēṇugōpa Bāla Rājita Sadguṇa Jaya Śīla\n\nMeaning: Please come, Lord Vēṇugōpāla, embodiment of adorable and victorious qualities.' },
                    { type: 'listen_sequence', swaras: parseAuditedSwarajathi([
                        's , , r g , p , d , S , n , d , |',
                        'p , d p m g r s | r s n. d. s , , ,'
                    ], BILAHARI_SWARAS), displayLabel: '♪', instruction: 'Listen to the audited pallavi in two Ādi āvartanams. Read the commas as sustained units: Rārā Vēṇugōpa Bāla | Rājita Sadguṇa Jaya Śīla.' },
                    { type: 'sing_sequence', swaras: parseAuditedSwarajathi([
                        's , , r g , p , d , S , n , d , |',
                        'p , d p m g r s | r s n. d. s , , ,'
                    ], BILAHARI_SWARAS), speed: 0.75, instruction: 'Sing the complete pallavi with the written comma holds.' },
                    { type: 'lyrics_practice', title: 'Pallavi Words', lyrics: [
                        'Rārā Vēṇugōpa Bāla',
                        'Rājita Sadguṇa Jaya Śīla'
                    ], instruction: 'Speak the words in the same two-line tāḷam shape, then sing them on the swaras you just practiced.', meaning: 'Please come, Lord Vēṇugōpāla, embodiment of adorable and victorious qualities.' },
                ]
            },
            {
                id: 'sj_raaravenu_anupallavi', title: 'Anupallavi', tag: 'Anupallavi',
                exercises: [
                    { type: 'info', title: 'Sārasākṣa', body: 'Anupallavi: Sārasākṣa Nēra Mēmi Mārubāri Korvalērā\n\nMeaning: O lotus-eyed one, what wrong have I done? I cannot bear the onslaught of love.' },
                    { type: 'listen_sequence', swaras: parseAuditedSwarajathi([
                        's , , r g , p , m , , g p , d , |',
                        'R , , S n , , d | p , , m g , , r'
                    ], BILAHARI_SWARAS), displayLabel: '♪', instruction: 'Listen to the audited anupallavi: Sārasākṣa Nēra Mēmi | Mārubāri Korvalērā.' },
                    { type: 'sing_sequence', swaras: parseAuditedSwarajathi([
                        's , , r g , p , m , , g p , d , |',
                        'R , , S n , , d | p , , m g , , r'
                    ], BILAHARI_SWARAS), speed: 0.75, instruction: 'Sing the complete anupallavi, keeping every comma-count steady against Ādi tāḷam.' },
                    { type: 'lyrics_practice', title: 'Anupallavi Words', lyrics: [
                        'Sārasākṣa Nēra Mēmi',
                        'Mārubāri Korvalērā'
                    ], instruction: 'First speak the sahityam clearly. Then sing it slowly, keeping the longer syllables where the commas appear in notation.', meaning: 'O lotus-eyed one, what wrong have I done? I cannot bear the onslaught of love.' },
                ]
            },
            {
                id: 'sj_raaravenu_charanam1', title: 'Charanam 1', tag: 'Charanam',
                exercises: [
                    { type: 'info', title: 'Nandagōpālā', body: 'Charanam 1: Nandagōpālā Ne Nendu Pōjālā Nee / Vindu Rārā Sadamalamadito Mudamala Raganā Keduruga Gadiyara\n\nMeaning: O Nandagōpālā, I have nowhere else to go. Come here with a free mind and spread cheer.' },
                    { type: 'listen_sequence', swaras: parseAuditedSwarajathi([
                        's , , r g , g , g , , , g , r g |',
                        'p , , p p , p , | p , , , p , d p',
                        'S , , S S , S , G R S n n d p , |',
                        'p d p m g g r , | g p m g r s r g'
                    ], BILAHARI_SWARAS), displayLabel: '♪', instruction: 'Listen to audited Charanam 1 across four Ādi lines. Notice the long openings and the faster closing run.' },
                    { type: 'sing_sequence', swaras: parseAuditedSwarajathi([
                        's , , r g , g , g , , , g , r g |',
                        'p , , p p , p , | p , , , p , d p',
                        'S , , S S , S , G R S n n d p , |',
                        'p d p m g g r , | g p m g r s r g'
                    ], BILAHARI_SWARAS), speed: 0.7, instruction: 'Sing Charanam 1 with exact comma holds, then return to the pallavi.' },
                    { type: 'lyrics_practice', title: 'Charanam 1 Words', lyrics: [
                        'Nandagōpālā Ne Nendu Pōjālā Nee',
                        'Vindu Rārā Sadamalamadito',
                        'Mudamala Raganā Keduruga Gadiyara'
                    ], instruction: 'Practice the words slowly in chunks. The last line moves faster, so speak it rhythmically before singing.', meaning: 'O Nandagōpālā, I have nowhere else to go. Come here with a free mind and spread cheer.' },
                ]
            },
            {
                id: 'sj_raaravenu_charanam2', title: 'Charanam 2', tag: 'Charanam',
                exercises: [
                    { type: 'info', title: 'Palumārunugā', body: 'Charanam 2 asks why Krishna, who responds to other devotees, does not respond to these repeated calls. It recalls Gajendra and asks for quick protection.' },
                    { type: 'listen_sequence', swaras: parseAuditedSwarajathi([
                        'p p p , r r r , g p m g g , , , |',
                        'g p m g m g r s | r g r s s , , ,',
                        'r s n. d. s , , , m g r g p , , , |',
                        'd p d R S , , , | R S n d p m g r'
                    ], BILAHARI_SWARAS), displayLabel: '♪', instruction: 'Listen to audited Charanam 2. Track the repeated-note calls and the lower n.d. descent.' },
                    { type: 'sing_sequence', swaras: parseAuditedSwarajathi([
                        'p p p , r r r , g p m g g , , , |',
                        'g p m g m g r s | r g r s s , , ,',
                        'r s n. d. s , , , m g r g p , , , |',
                        'd p d R S , , , | R S n d p m g r'
                    ], BILAHARI_SWARAS), speed: 0.7, instruction: 'Sing Charanam 2, keeping the long held endings steady before the faster answers.' },
                    { type: 'lyrics_practice', title: 'Charanam 2 Words', lyrics: [
                        'Palumārunugā Ravamuna Nin Pilachina',
                        'Palukavu Nalugakurā',
                        'Karivarada Marimarina Adharamugrō',
                        'Larakani Karamuga'
                    ], instruction: 'Speak each line with the same long-and-short shape as the swaras. Then sing the words without losing the tāḷam.', meaning: 'The devotee asks why Krishna does not respond, recalls Gajendra, and asks for quick protection.' },
                ]
            },
            {
                id: 'sj_raaravenu_charanam3', title: 'Charanam 3', tag: 'Charanam',
                exercises: [
                    { type: 'info', title: 'Rā Nagadara', body: 'Charanam 3 is the full surrender: Come, lifter of Govardhana; destroyer of Mura; remover of worldly sorrow. Do not leave this devotee alone. I seek refuge again and again.' },
                    { type: 'listen_sequence', swaras: parseAuditedSwarajathi([
                        'p , , , m g r g d , , , m g r g |',
                        'p , , , m g r g p , p , p , , ,',
                        'G , , , R S n d R , , , R S n d |',
                        'S , , , R S n d S , S , S , , ,',
                        'G , R S R , R , R , , , R , S n |',
                        'd , d , d , , , p , m g g , g ,',
                        'g , , , s r g d p , , , R S R G |',
                        'S , , , G R S N d p m g r s r g'
                    ], BILAHARI_SWARAS), displayLabel: '♪', instruction: 'Listen to audited Charanam 3. This is the longest section: slow invocations, then surrender phrases with faster cadences.' },
                    { type: 'sing_sequence', swaras: parseAuditedSwarajathi([
                        'p , , , m g r g d , , , m g r g |',
                        'p , , , m g r g p , p , p , , ,',
                        'G , , , R S n d R , , , R S n d |',
                        'S , , , R S n d S , S , S , , ,',
                        'G , R S R , R , R , , , R , S n |',
                        'd , d , d , , , p , m g g , g ,',
                        'g , , , s r g d p , , , R S R G |',
                        'S , , , G R S N d p m g r s r g'
                    ], BILAHARI_SWARAS), speed: 0.65, instruction: 'Sing Charanam 3 slowly first. Keep the comma notation visible in your mind as the tāḷam grid.' },
                    { type: 'lyrics_practice', title: 'Charanam 3 Words', lyrics: [
                        'Rā Nagadara Rā Murahara Rā Bhavahara Rāverā',
                        'Ee Maguvanu Ee Lalalanu Ee Sogasini Chēkorā',
                        'Kōrikalim Pondā Dendamu Neeyanda Chērenu Neechenta',
                        'Maruvakurā Karamulachē Marimari Ninu Sharaṇanē Dara'
                    ], instruction: 'This is the longest word section. Speak one line per breath first, then sing it slowly with the same held syllables as the notation.', meaning: 'The devotee calls Krishna by many names and seeks refuge again and again.' },
                ]
            },
        ]
    },
    {
        id: 'swarajathi_stage2',
        title: 'Khamās: Sāmba Śivāyanavē',
        symbol: '🕉️',
        subtitle: 'Ādi tāḷam swarajathi with a khaṇḍa-gati ending',
        color: '#2a1730',
        tag: 'Swarajathi 2',
        lessons: [
            {
                id: 'sj_samba_raga', title: 'Khamās Rāgam', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Khamās Rāgam', body: 'Sāmba Śivāyanavē is set in Khamās, a janya of the 28th mela, Harikambhoji.\n\nArohanam: Sa Ma₁ Ga₃ Ma₁ Pa Da₂ Ni₂ Ṡ\nAvarohanam: Ṡ Ni₂ Da₂ Pa Ma₁ Ga₃ Ri₂ Sa\n\nThe vakra opening Sa-Ma-Ga-Ma gives Khamās a graceful, curved identity. This swarajathi praises Lord Shiva as guru, deity, protector, and compassionate refuge.' },
                    { type: 'listen_sequence', swaras: ['Sa','Ma1','Ga3','Ma1','Pa','Da2','Ni2','Ṡ'], displayLabel: '♪', instruction: 'Listen to Khamās arohanam with the vakra S-M-G-M opening.' },
                    { type: 'listen_sequence', swaras: ['Ṡ','Ni2','Da2','Pa','Ma1','Ga3','Ri2','Sa'], displayLabel: '♪', instruction: 'Listen to the Khamās descent.' },
                    { type: 'sing_sequence', swaras: ['Sa','Ma1','Ga3','Ma1','Pa','Da2','Ni2','Ṡ'], speed: 0.9, instruction: 'Sing the Khamās arohanam, gently curving through M-G-M.' },
                ]
            },
            {
                id: 'sj_samba_pallavi_anupallavi', title: 'Pallavi and Anupallavi', tag: 'Core',
                exercises: [
                    { type: 'info', title: 'Sāmba Śivāyanavē', body: 'Pallavi: Sāmba Śivāyanavē Rājitagiri\nAnupallavi: Sāmbhavī Manōharā Parātparā Krpākarā Śrī\n\nMeaning: Pray to Shiva, who resides in the silver, snow-clad mountain. He is the beloved of Sāmbhavī, the supreme one, and the giver of grace.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('S , , , S , N , D , P , , M G , M , , , , , G , M , P , D , N ,', KHAMAS_SWARAS), displayLabel: '♪', instruction: 'Listen to the spacious pallavi line.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('S , , , S , N , D , P , , M G , M , , ,', KHAMAS_SWARAS), speed: 0.75, instruction: 'Sing the opening slowly, sustaining the long Sāmba call.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('S , , R N , , S D , , N P , , D M , , P M , , G M , , P D , , N', KHAMAS_SWARAS), displayLabel: '♪', instruction: 'Listen to the anupallavi and its stepped descent.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('M , , P M , , G M , , P D , , N', KHAMAS_SWARAS), speed: 0.8, instruction: 'Sing the Krpākarā Śrī ending phrase.' },
                ]
            },
            {
                id: 'sj_samba_charanams', title: 'Charanams 1-4', tag: 'Charanam',
                exercises: [
                    { type: 'info', title: 'Devotional Charanams', body: 'The first four charanams say: You alone are my guru and God; I always meditate on you; you are the treasure of compassion; you grant boons, remove fear, and protect devotees.\n\nPractice each section first as swaras. Then speak the sahityam rhythmically before singing it.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('S , R , S N - N , S , N D D , N , D P - P , D , M G S M , - G M P D N', KHAMAS_SWARAS), displayLabel: '♪', instruction: 'Listen to Charanam 1: Nīvē guru daivambaniyē.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('S , R , S N - N , S , N D D , N , D P', KHAMAS_SWARAS), speed: 0.75, instruction: 'Sing the first half of Charanam 1.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('S S S S M M M M P P P P D D D D N S N S N , D P D P M G M P D N', KHAMAS_SWARAS), displayLabel: '♪', instruction: 'Listen to the Mahādēva line with repeated-note strength.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('S M G S S , S , S R S S N , N , N S N D D , D , P D P M P , P ,', KHAMAS_SWARAS), speed: 0.8, instruction: 'Sing the Śritajana lōla phrase from Charanam 4.' },
                ]
            },
            {
                id: 'sj_samba_khanda', title: 'Khaṇḍa-Gati Ending', tag: 'Rhythm',
                exercises: [
                    { type: 'info', title: 'Charanam 5: Khaṇḍa Gati', body: 'The final charanam shifts to khaṇḍa gati: 5 units per beat. Keep the same Ādi tāḷam cycle in the hand, but feel five inner pulses inside each beat.\n\nText: Sāresāregu nī nāma mantram... Dāsuḍau Cinni Krishnuni ki dikku nīvēyani Śokkanāthuni nammukoni.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('S , R S , N , D N , S , N D , P , , , , P , D N , D , P M , P , M G , M , , , ,', KHAMAS_SWARAS), displayLabel: '♪', instruction: 'Listen to the first khaṇḍa-gati phrase in five-unit motion.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('S , R S , N , D N , S , N D , P , , , ,', KHAMAS_SWARAS), speed: 0.7, instruction: 'Sing the opening khaṇḍa-gati phrase slowly.' },
                    { type: 'quiz', question: 'What changes in the final charanam of Sāmba Śivāyanavē?', choices: ['The raga changes', 'The gati changes to khaṇḍa', 'The tāḷam becomes Misra Chapu', 'It becomes a geetham'], correct: 'The gati changes to khaṇḍa', explanation: 'The final charanam keeps the composition in the same overall setting but moves into khaṇḍa gati, with five units per beat.' },
                ]
            },
        ]
    },
    {
        id: 'swarajathi_stage3',
        title: 'Bhairavi: Kāmākṣi',
        symbol: '🌺',
        subtitle: 'Śyāma Śāstri swarajathi in Miśra Chāpu',
        color: '#301520',
        tag: 'Swarajathi 3',
        lessons: [
            {
                id: 'sj_kamakshi_intro', title: 'Bhairavi and Miśra Chāpu', tag: 'Rāga',
                exercises: [
                    { type: 'info', title: 'Kāmākṣi', body: 'Rāga: Bhairavi · Tāḷam: Miśra Chāpu · Composer: Śyāma Śāstri\n\nThis is a major concert-worthy swarajathi. The pallavi says: O Goddess Kāmākṣi of Kanchi, I have placed my faith in your lotus feet as my only refuge.\n\nThe swara-sahityas expand the prayer through eight increasingly rich sections.' },
                    { type: 'listen_sequence', swaras: ['Sa','Ri2','Ga2','Ma1','Pa','Da1','Ni2','Ṡ'], displayLabel: '♪', instruction: 'Listen to a simplified Bhairavi scale palette for pitch practice.' },
                    { type: 'listen_sequence', swaras: ['Ṡ','Ni2','Da1','Pa','Ma1','Ga2','Ri2','Sa'], displayLabel: '♪', instruction: 'Listen to the descending Bhairavi palette.' },
                    { type: 'quiz', question: 'Who composed the Kāmākṣi swarajathi?', choices: ['Śyāma Śāstri', 'Tyāgarāja', 'Muthuswami Dikshitar', 'Cinnakrishna Dāsar'], correct: 'Śyāma Śāstri', explanation: 'Kāmākṣi is one of Śyāma Śāstri\'s celebrated swarajathis.' },
                ]
            },
            {
                id: 'sj_kamakshi_pallavi', title: 'Pallavi', tag: 'Pallavi',
                exercises: [
                    { type: 'info', title: 'Kāmākṣi Pallavi', body: 'Pallavi: Kāmākṣi Anudinamu Maravakanē Nī Pādamula Dikkanuchi Nammitin Śrī Kanchi\n\nMeaning: Goddess Kāmākṣi, ever remembering that your lotus feet are my only refuge, I place my faith in you, O goddess of Kanchi.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('N , | ; ; || D , | ; ; || P , | ; d n || S , | ; s r ||', BHAIRAVI_SWARAS), displayLabel: '♪', instruction: 'Listen to the opening Kāmākṣi call.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('N , | ; ; || D , | ; ; || P , | ; d n ||', BHAIRAVI_SWARAS), speed: 0.7, instruction: 'Sing the spacious opening N-D-P phrase.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('s r g | m p m g || R , | ; N || S r | g m P || d n s | N d p || m G | R g r ||', BHAIRAVI_SWARAS), displayLabel: '♪', instruction: 'Listen to the later pallavi movement into Nammitin Śrī Kanchi.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('S r | g m P || d n s | N d p || m G | R g r ||', BHAIRAVI_SWARAS), speed: 0.75, instruction: 'Sing the closing pallavi phrase.' },
                ]
            },
            {
                id: 'sj_kamakshi_swara_sahitya_1_4', title: 'Swara-Sahityas 1-4', tag: 'Swara Sahitya',
                exercises: [
                    { type: 'info', title: 'First Four Swara-Sahityas', body: '1. Mother, your teeth are like jasmine and your eyes are like lotuses. Protect me.\n2. You have a conch-like neck, rain-cloud dark tresses, and moon-like face.\n3. Your feet are adored by Brahma, Vishnu, and Shiva. Solve my troubles quickly.\n4. Wish-yielding creeper for devotees, ocean of compassion, daughter of the mountain: protect this surrendered one without delay.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('S r | n s R || , n r | s n d p || M , | ; P || D n | , S r ||', BHAIRAVI_SWARAS), displayLabel: '♪', instruction: 'Listen to Swara-Sahitya 1: Kundaradana.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('R g | r g S || , n g | r s R || , n r | s n D || , N | , G r ||', BHAIRAVI_SWARAS), speed: 0.75, instruction: 'Sing Swara-Sahitya 2: Kambugala.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('G m | g r s r || N s | n s r g || M p | g r g m || P d | m g r s ||', BHAIRAVI_SWARAS), displayLabel: '♪', instruction: 'Listen to the opening of Swara-Sahitya 3.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('M p | n d M || p d p | M g r || G m | P g m || P - g | p m g r ||', BHAIRAVI_SWARAS), speed: 0.75, instruction: 'Sing the opening of Swara-Sahitya 4.' },
                ]
            },
            {
                id: 'sj_kamakshi_swara_sahitya_5_8', title: 'Swara-Sahityas 5-8', tag: 'Swara Sahitya',
                exercises: [
                    { type: 'info', title: 'Final Four Swara-Sahityas', body: '5. Remove my sins and grant steady devotion to your feet.\n6. You are known in the world as the giver of boons to those who bow to you.\n7. You reside in the sacred forest, hold a lotus, destroy afflictions, and grant abundance to those who remember you.\n8. Sister of Śyāmakrishna, Śivaśankari, Parameśwari: I am your child. Please protect me now, Śrī Bhairavi.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('P d | p m g r || G m | P m g || R g | M g r || N s | R ; ||', BHAIRAVI_SWARAS), displayLabel: '♪', instruction: 'Listen to Swara-Sahitya 5: Pātakamulanu.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('d p n | D p m || g R | g m p d || P , | ; m g ||', BHAIRAVI_SWARAS), speed: 0.75, instruction: 'Sing Swara-Sahitya 6: Kalushahārini.' },
                    { type: 'listen_sequence', swaras: parseSwarajathi('N r | s r - n r || N d | p d m p || G r | s r n s || r g m | P m p ||', BHAIRAVI_SWARAS), displayLabel: '♪', instruction: 'Listen to Swara-Sahitya 7 opening: Nī pāvana nilayā.' },
                    { type: 'sing_sequence', swaras: parseSwarajathi('S g | R s r || S r | N d m || P d | N d n || S , | ; g r ||', BHAIRAVI_SWARAS), speed: 0.75, instruction: 'Sing Swara-Sahitya 8 opening: Śyāmakrishna sahōdhari.' },
                    { type: 'quiz', question: 'What is the emotional center of Kāmākṣi?', choices: ['Surrender to the goddess as refuge', 'A playful dance song', 'A raga scale drill only', 'A praise of Krishna as cowherd'], correct: 'Surrender to the goddess as refuge', explanation: 'The repeated meaning is supplication to Kāmākṣi: protect me, hear me, remove my troubles, and accept my surrender.' },
                ]
            },
        ]
    },
];

export const GEETHAM_CURRICULUM = withCompositionRhythm(GEETHAM_CURRICULUM_RAW);
export const SWARAJATHI_CURRICULUM = withCompositionRhythm(SWARAJATHI_CURRICULUM_RAW);
export const VARNAM_CURRICULUM_RAW = [
    {
        id: 'varnam_stage1', title: 'Devar Munivar (Pada Varnam)', symbol: '🛕',
        subtitle: 'Shanmukhapriya · Adi · Lalgudi Jayaraman',
        color: '#2a1220', tag: 'Varnam 1',
        lessons: [
            {
                id: 'v1_intro', title: 'Raga and Sahitya Orientation', tag: 'Orientation',
                exercises: [
                    {
                        type: 'info',
                        title: 'Devar Munivar — Overview',
                        body: 'Raga: Shanmukhapriya (57th Melakarta)\nTala: Adi\nComposer: Lalgudi Jayaraman\n\nArohanam: Sa Ri2 Ga2 Ma2 Pa Da1 Ni2 Ṡ\nAvarohanam: Ṡ Ni2 Da1 Pa Ma2 Ga2 Ri2 Sa\n\nThis pada varnam praises Lord Srinivasa of Tirumala. Focus first on bhava-rich sahityam delivery, then on clean handling of Ma2 and Da1 color.'
                    },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Ma2', 'Pa', 'Da1', 'Ni2', 'Ṡ'], displayLabel: '♪', instruction: 'Listen to the Shanmukhapriya arohanam.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni2', 'Da1', 'Pa', 'Ma2', 'Ga2', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Listen to the Shanmukhapriya avarohanam.' },
                ]
            },
            {
                id: 'v1_order', title: 'Traditional Singing Order', tag: 'Flow',
                exercises: [
                    {
                        type: 'info',
                        title: 'Performance Sequence (Purvangam → Uttarangam)',
                        body: 'Follow this exact order:\n\nPurvangam:\n1) Pallavi — first speed, then second speed.\n2) Anupallavi — first speed, then second speed.\n3) Muktaayi swaram — first speed, then second speed.\n\nUttarangam:\n4) Charanam — first speed.\n5) Chittaswaram 1 — first speed.\n6) Repeat Charanam + Chittaswaram 1 in second speed.\n7) Charanam — first speed.\n8) Chittaswaram 2 — first speed.\n9) Repeat Charanam + Chittaswaram 2 in second speed.\n10) Continue the same pattern for Chittaswarams 3 and 4.'
                    }
                ]
            },
            {
                id: 'v1_pallavi_anupallavi', title: 'Pallavi and Anupallavi', tag: 'Sahityam',
                exercises: [
                    {
                        type: 'lyrics_practice',
                        title: 'Pallavi',
                        lyrics: ['dEvar munivar tozhum jagannAthan dIna dayALan tirumaghaLurai mArban'],
                        meaning: 'O Lord of the world, revered by gods and sages, compassionate to the humble, with Lakshmi on your chest.'
                    },
                    {
                        type: 'lyrics_practice',
                        title: 'Anupallavi',
                        lyrics: ['mAvali valimaiyait-tALAl aLanda tirumAl shrI vEnkaTagiri cenkamalak-kaNNa perumAn'],
                        meaning: 'The Lord who measured the worlds (Vamana), the lotus-eyed one of Venkatagiri.'
                    }
                ]
            },
            {
                id: 'v1_charanam', title: 'Charanam and Chittaswaram Themes', tag: 'Meaning',
                exercises: [
                    {
                        type: 'lyrics_practice',
                        title: 'Charanam',
                        lyrics: ['shrInivAsan perumai collat-taramA'],
                        meaning: 'Can one truly describe the full glory of Srinivasa?'
                    },
                    {
                        type: 'info',
                        title: 'Chittaswaram Bhava Anchors',
                        body: 'Use these emotional anchors while practicing the four chittaswaram sahityas:\n1) All devas worship him.\n2) Conch and discus-bearing protector.\n3) Kali-yuga karuna murti in jewel-like splendor.\n4) Gita-upadesha giver, beloved Venkataramana, eternal auspicious one.'
                    }
                ]
            },
            {
                id: 'v1_swaram_talam', title: 'Swaram Practice with Adi Tala', tag: 'Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Devar Munivar — Full Swaram Alignment',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nThese are section-wise notation-aligned practice lines from your provided version. Commas are sustained holds (karvai). Practice in first speed first, then second speed.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa',',',',','Ni2',',',',','Pa','Da1','Ni2','Ṡ','Ni2','Ṡ','Ni2','Da1','Pa','Ma2','|','Ga2',',',',','Ri2',',',',','Sa','Ri2','Ga2',',',',','Ma2',',','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi line 1 (notation-aligned).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa',',',',','Ni2',',',',','Pa','Da1','Ni2','Ṡ','Ni2','Ṡ','Ni2','Da1','Pa','Ma2','|','Ga2',',',',','Ri2',',',',','Sa','Ri2','Ga2',',',',','Ma2',',','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.8,
                        instruction: 'Sing: Pallavi line 1.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa','Ri2','Ga2','Sa',',','Ga2','Ri2','Ni2',',','Ri2','Sa','Ni2','Da1','Pa','Da1','Ni2','|','Sa','Ni2',',','Da1','Pa','Ma2','Ga2','Ri2',',','Sa','Ri2','Ga2','Ma2','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi line 2 and closing.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa','Ri2','Ga2','Sa',',','Ga2','Ri2','Ni2',',','Ri2','Sa','Ni2','Da1','Pa','Da1','Ni2','|','Sa','Ni2',',','Da1','Pa','Ma2','Ga2','Ri2',',','Sa','Ri2','Ga2','Ma2','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.75,
                        instruction: 'Sing: Pallavi line 2 and closing.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ni2','Pa',',','Da1','Ni2','Da1','Pa','Ma2','Ga2','Ma2','Da1','Ma2','Ga2','Ri2','Sa','Ni2','|','Sa',',','Ri2','Ga2',',','Ma2','Pa',',','Da1',',','Da1','Ni2',',','Sa',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Anupallavi line 1.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ni2','Pa',',','Da1','Ni2','Da1','Pa','Ma2','Ga2','Ma2','Da1','Ma2','Ga2','Ri2','Sa','Ni2','|','Sa',',','Ri2','Ga2',',','Ma2','Pa',',','Da1',',','Da1','Ni2',',','Sa',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.75,
                        instruction: 'Sing: Anupallavi line 1.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ri2','Ni2','Sa','Ri2',',','Sa','Ri2','Ga2',',','Pa','Ma2','Ga2',',','Ga2','Ri2','Ni2','|','Sa','Ri2',',','Ga2',',','Ga2','Ri2','Sa','Da1',',','Pa','Da1','Ma2','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Anupallavi line 2.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ri2','Ni2','Sa','Ri2',',','Sa','Ri2','Ga2',',','Pa','Ma2','Ga2',',','Ga2','Ri2','Ni2','|','Sa','Ri2',',','Ga2',',','Ga2','Ri2','Sa','Da1',',','Pa','Da1','Ma2','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Anupallavi line 2.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa','Ri2','Sa','Da1',',','Ri2','Sa','Da1',',','Sa','Da1',',','Pa','Ma2','Ga2','Ma2','|','Pa',',',',',',',',',',',',',',',',','Ma2',',','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram opening cycle.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa','Ri2','Sa','Da1',',','Ri2','Sa','Da1',',','Sa','Da1',',','Pa','Ma2','Ga2','Ma2','|','Pa',',',',',',',',',',',',',',',',','Ma2',',','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Muktayi swaram opening cycle.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ni2',',',',','Da1','Pa','Da1','Ni2','Sa','Ni2','Da1','Pa','Ma2','Pa','Ga2','Ma2',',','|','Pa',',',',','Da1','Pa','Ga2',',',',','Ri2','Ga2','Ma2','Pa','Da1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Charanam base swaram.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ni2',',',',','Da1','Pa','Da1','Ni2','Sa','Ni2','Da1','Pa','Ma2','Pa','Ga2','Ma2',',','|','Pa',',',',','Da1','Pa','Ga2',',',',','Ri2','Ga2','Ma2','Pa','Da1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Charanam base swaram.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ni2',',',',','Pa',',',',','Da1',',',',','Ma2',',',',','Pa',',',',','Ri2','|','Ga2',',',',','Ma2',',',',','Ga2',',',',','Da1',',',',',',','Ga2',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram (1) opening.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ni2',',',',','Pa',',',',','Da1',',',',','Ma2',',',',','Pa',',',',','Ri2','|','Ga2',',',',','Ma2',',',',','Ga2',',',',','Da1',',',',',',','Ga2',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Chittaswaram (1) opening.'
                    }
                ]
            },
            {
                id: 'v1_chittaswaram_full', title: 'Chittaswaram 1-4 Full Practice', tag: 'Advanced Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Full Chittaswaram Expansion',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nThis lesson expands Devar Munivar chittaswarams 1-4 in longer notation-aligned chunks. Keep all karvais steady and land every avartanam cleanly.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ni2',',',',','Pa',',',',','Da1',',',',','Ma2',',',',','Pa',',',',','Ri2','|',',','Ga2',',',',','Ma2',',',',','Ga2',',',',','Da1',',',',',',','Ga2',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 1 (complete phrase).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ni2',',',',','Pa',',',',','Da1',',',',','Ma2',',',',','Pa',',',',','Ri2','|',',','Ga2',',',',','Ma2',',',',','Ga2',',',',','Da1',',',',',',','Ga2',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.68,
                        instruction: 'Sing: Chittaswaram 1.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ni2',',','Da1','Pa',',','Ma2','Pa','Da1','Ni2',',','Sa','Ri2','Ga2','Ma2','Pa','Da1','|','Ni2',',','Da1','Pa','Da1','Ni2','Ri2','Sa','Ni2',',','Da1','Ni2','Ga2','Ga2','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 2.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ni2',',','Da1','Pa',',','Ma2','Pa','Da1','Ni2',',','Sa','Ri2','Ga2','Ma2','Pa','Da1','|','Ni2',',','Da1','Pa','Da1','Ni2','Ri2','Sa','Ni2',',','Da1','Ni2','Ga2','Ga2','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.66,
                        instruction: 'Sing: Chittaswaram 2.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ni2','Da1','Ni2','Pa','Da1','Ma2','Pa','Ga2','Ni2','Ni2','Da1','Pa','Ma2','Ga2','Ri2','Sa','|','Ga2','Ri2','Ga2','Sa','Ri2','Pa','Da1','Ni2','Ga2','Ri2','Sa','Ri2','Ga2','Ni2','Da1','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3 (part A).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ni2','Da1','Ni2','Pa','Da1','Ma2','Pa','Ga2','Ni2','Ni2','Da1','Pa','Ma2','Ga2','Ri2','Sa','|','Ga2','Ri2','Ga2','Sa','Ri2','Pa','Da1','Ni2','Ga2','Ri2','Sa','Ri2','Ga2','Ni2','Da1','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.64,
                        instruction: 'Sing: Chittaswaram 3 (part A).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Da1','Ni2','Ga2','Ri2','Ga2','Pa','Ma2','Ga2','Ri2','Sa','Sa','Ri2','Ga2','Ni2','Da1','Ni2','|','Ri2','Sa','Ni2','Da1','Pa','Ma2','Pa','Ni2','Ga2','Ri2','Ga2','Ni2','Da1','Ni2','Ga2','Ri2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3 (part B).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Da1','Ni2','Ga2','Ri2','Ga2','Pa','Ma2','Ga2','Ri2','Sa','Sa','Ri2','Ga2','Ni2','Da1','Ni2','|','Ri2','Sa','Ni2','Da1','Pa','Ma2','Pa','Ni2','Ga2','Ri2','Ga2','Ni2','Da1','Ni2','Ga2','Ri2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.62,
                        instruction: 'Sing: Chittaswaram 3 (part B).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa',',',',','Pa',',','Sa',',','Ga2','Ri2','Sa','Ni2','Da1','Pa','Ma2','Ga2','Ri2','|','Sa',',',',','Sa','Ri2','Ga2',',','Ri2','Ga2','Ma2',',','Ga2','Ma2','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa',',',',','Pa',',','Sa',',','Ga2','Ri2','Sa','Ni2','Da1','Pa','Ma2','Ga2','Ri2','|','Sa',',',',','Sa','Ri2','Ga2',',','Ri2','Ga2','Ma2',',','Ga2','Ma2','Pa','Da1','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.6,
                        instruction: 'Sing: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa','Ri2',',','Ga2','Ri2','Sa','Ni2','Da1','Ni2','Sa',',','Ri2','Sa','Ni2','Da1','Pa','|','Da1','Ni2',',','Sa','Ni2','Da1','Pa','Ma2','Sa','Ri2',',','Ga2',',','Ma2',',',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part B).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa','Ri2',',','Ga2','Ri2','Sa','Ni2','Da1','Ni2','Sa',',','Ri2','Sa','Ni2','Da1','Pa','|','Da1','Ni2',',','Sa','Ni2','Da1','Pa','Ma2','Sa','Ri2',',','Ga2',',','Ma2',',',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.58,
                        instruction: 'Sing: Chittaswaram 4 (part B).'
                    }
                ]
            }
        ]
    },
    {
        id: 'varnam_stage2', title: 'Evvari Bodhana', symbol: '🏔️',
        subtitle: 'Abhogi · Adi · Patnam Subramania Iyer',
        color: '#1d2338', tag: 'Varnam 2',
        lessons: [
            {
                id: 'v2_intro', title: 'Raga and Theme', tag: 'Orientation',
                exercises: [
                    {
                        type: 'info',
                        title: 'Evvari Bodhana — Overview',
                        body: 'Raga: Abhogi (Janya of 22nd mela)\nTala: Adi\nComposer: Patnam Subramania Iyer\n\nArohanam: Sa Ri2 Ga1 Ma1 Da2 Ṡ\nAvarohanam: Ṡ Da2 Ma1 Ga1 Ri2 Sa\n\nThis varnam voices longing and questioning: "By whose counsel do you behave this way?" Keep the delivery pleading yet dignified.'
                    },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ga1', 'Ma1', 'Da2', 'Ṡ'], displayLabel: '♪', instruction: 'Listen to Abhogi arohanam.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Da2', 'Ma1', 'Ga1', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Listen to Abhogi avarohanam.' },
                ]
            },
            {
                id: 'v2_order', title: 'Traditional Singing Order', tag: 'Flow',
                exercises: [
                    {
                        type: 'info',
                        title: 'Performance Sequence (Purvangam → Uttarangam)',
                        body: 'Follow this exact order:\n\nPurvangam:\n1) Pallavi — first speed, then second speed.\n2) Anupallavi — first speed, then second speed.\n3) Muktaayi swaram — first speed, then second speed.\n\nUttarangam:\n4) Charanam — first speed.\n5) Chittaswaram 1 — first speed.\n6) Repeat Charanam + Chittaswaram 1 in second speed.\n7) Charanam — first speed.\n8) Chittaswaram 2 — first speed.\n9) Repeat Charanam + Chittaswaram 2 in second speed.\n10) Continue the same pattern for Chittaswarams 3 and 4.'
                    }
                ]
            },
            {
                id: 'v2_core_lyrics', title: 'Pallavi, Anupallavi, Charanam', tag: 'Sahityam',
                exercises: [
                    { type: 'lyrics_practice', title: 'Pallavi', lyrics: ['Evvari bodhanavini eelagu jesevura'], meaning: 'By hearing whose words are you behaving like this?' },
                    { type: 'lyrics_practice', title: 'Anupallavi', lyrics: ['Javamuga nannelara Seshachalendra Sree Venkatesa'], meaning: 'O Venkatesa, lord of Seshachala, come swiftly and rule/protect me.' },
                    { type: 'lyrics_practice', title: 'Charanam', lyrics: ['Marubari korvajalanura'], meaning: 'I cannot endure the torment caused by Cupid any longer.' }
                ]
            },
            {
                id: 'v2_practice_focus', title: 'Practice Focus for Abhogi', tag: 'Technique',
                exercises: [
                    {
                        type: 'info',
                        title: 'Voice and Bhava Checklist',
                        body: '1) Keep Ga1 and Ma1 transitions clean (no over-sliding).\n2) In Madhyama kala passages, keep sahitya consonants crisp.\n3) Preserve the pleading tone in pallavi/anupallavi and emotional fragility in charanam.'
                    }
                ]
            },
            {
                id: 'v2_swaram_talam', title: 'Swaram Practice with Adi Tala', tag: 'Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Evvari Bodhana — Notation Aligned Core',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nSection-wise notation-aligned swara practice from pallavi, anupallavi, muktayi, and charanam.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ri2',',','Ga1',',','Ga1','Ri2','Sa',',','Sa','Ri2','Sa','Sa','Da2','Ma1','Da2',',','|','Ma1','Da2','Ṡ','Da2',',','Ṡ','Da2','Sa','Ri2','Ga1',',','Ma1','Ga1','Ga1','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi complete swara flow.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ri2',',','Ga1',',','Ga1','Ri2','Sa',',','Sa','Ri2','Sa','Sa','Da2','Ma1','Da2',',','|','Ma1','Da2','Ṡ','Da2',',','Ṡ','Da2','Sa','Ri2','Ga1',',','Ma1','Ga1','Ga1','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.8,
                        instruction: 'Sing: Pallavi complete swara flow.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa','Sa','Da2','Da2',',','Ma1','Da2','Da2','Ma1','Ga1',',','Ri2','Ga1','Ma1','Ri2','Ga1','|','Sa','Ri2','Ga1','Ma1',',','Ma1','Da2','Ma1','Ga1','Ri2','Ga1','Ma1','Da2','Da2','Sa',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Anupallavi complete swara flow.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa','Sa','Da2','Da2',',','Ma1','Da2','Da2','Ma1','Ga1',',','Ri2','Ga1','Ma1','Ri2','Ga1','|','Sa','Ri2','Ga1','Ma1',',','Ma1','Da2','Ma1','Ga1','Ri2','Ga1','Ma1','Da2','Da2','Sa',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.8,
                        instruction: 'Sing: Anupallavi complete swara flow.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ri2','Ga1','Ma1','Ri2',',','Ga1','Sa','Ri2','Ga1',',','Sa',',','Ri2','Sa','Da2','Ma1','Da2','|','Sa','Da2','Sa','Ri2',',','Ri2','Ga1','Sa','Ri2','Ma1',',','Da2','Ma1','Ga1','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram full phrase.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ri2','Ga1','Ma1','Ri2',',','Ga1','Sa','Ri2','Ga1',',','Sa',',','Ri2','Sa','Da2','Ma1','Da2','|','Sa','Da2','Sa','Ri2',',','Ri2','Ga1','Sa','Ri2','Ma1',',','Da2','Ma1','Ga1','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.76,
                        instruction: 'Sing: Muktayi swaram full phrase.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ma1',',','Da2','Ma1','Da2',',',',',',','Da2','Sa','Da2','Ma1','Da2','Da2','Sa',',','|','Da2','Sa','Da2','Da2','Ma1','Ga1','Ma1','Ga1','Ri2','Sa','Ri2','Ga1','Sa','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Charanam swara flow.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ma1',',','Da2','Ma1','Da2',',',',',',','Da2','Sa','Da2','Ma1','Da2','Da2','Sa',',','|','Da2','Sa','Da2','Da2','Ma1','Ga1','Ma1','Ga1','Ri2','Sa','Ri2','Ga1','Sa','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.74,
                        instruction: 'Sing: Charanam swara flow.'
                    }
                ]
            },
            {
                id: 'v2_chittaswaram_full', title: 'Chittaswaram 1-4 Full Practice', tag: 'Advanced Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Evvari Chittaswaram Expansion',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nFull chittaswaram practice in notation-aligned chunks. Keep the Abhogi identity stable in every descent.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ma1',',',',',',','Da2',',','Ma1',',','Da2',',',',','Sa',',','|','Da2',',','Ma1',',',',','Ga1',',','Ri2',',','Sa',',',',','Ri2',',','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 1.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ma1',',',',',',','Da2',',','Ma1',',','Da2',',',',','Sa',',','|','Da2',',','Ma1',',',',','Ga1',',','Ri2',',','Sa',',',',','Ri2',',','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Chittaswaram 1.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ma1','Da2','Sa','Da2',',','Ma1','Da2','Ma1','Ga1','Ri2',',','Ga1','Ma1','Ga1','Ri2','Sa','|','Da2','Sa',',','Ri2','Ga1','Ma1','Da2','Sa',',','Da2','Ma1','Ga1','Ri2','Sa','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 2.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ma1','Da2','Sa','Da2',',','Ma1','Da2','Ma1','Ga1','Ri2',',','Ga1','Ma1','Ga1','Ri2','Sa','|','Da2','Sa',',','Ri2','Ga1','Ma1','Da2','Sa',',','Da2','Ma1','Ga1','Ri2','Sa','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.68,
                        instruction: 'Sing: Chittaswaram 2.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Da2','Sa','Da2','Ma1','Ga1','Ri2','Ga1','Ma1','Da2','Ma1','Ga1','Ri2','Ga1','Sa','Ri2','Sa','|','Ri2','Ga1','Ma1','Da2','Sa','Ri2','Ga1','Ri2','Sa','Da2','Ma1','Ga1','Ri2','Sa','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Da2','Sa','Da2','Ma1','Ga1','Ri2','Ga1','Ma1','Da2','Ma1','Ga1','Ri2','Ga1','Sa','Ri2','Sa','|','Ri2','Ga1','Ma1','Da2','Sa','Ri2','Ga1','Ri2','Sa','Da2','Ma1','Ga1','Ri2','Sa','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.66,
                        instruction: 'Sing: Chittaswaram 3.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa',',',',','Sa',',','Sa','Ri2','Ga1','Sa','Ri2',',','Ri2','Sa','Da2','Ma1','Da2','|','Sa',',',',','Sa','Da2','Ri2','Sa','Da2',',','Sa','Da2','Ma1',',','Ga1','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa',',',',','Sa',',','Sa','Ri2','Ga1','Sa','Ri2',',','Ri2','Sa','Da2','Ma1','Da2','|','Sa',',',',','Sa','Da2','Ri2','Sa','Da2',',','Sa','Da2','Ma1',',','Ga1','Ri2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.64,
                        instruction: 'Sing: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ri2','Ga1','Ma1','Da2',',','Sa','Ri2','Ga1','Ma1','Ri2',',','Ga1','Ri2','Sa','Da2','Sa','|','Ri2','Sa',',','Da2','Ma1','Da2','Sa','Da2',',','Ma1','Ga1','Ri2','Sa',',','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part B).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ri2','Ga1','Ma1','Da2',',','Sa','Ri2','Ga1','Ma1','Ri2',',','Ga1','Ri2','Sa','Da2','Sa','|','Ri2','Sa',',','Da2','Ma1','Da2','Sa','Da2',',','Ma1','Ga1','Ri2','Sa',',','Ri2','Ga1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.62,
                        instruction: 'Sing: Chittaswaram 4 (part B).'
                    }
                ]
            }
        ]
    },
    {
        id: 'varnam_stage3', title: 'Sami Ninne', symbol: '🪷',
        subtitle: 'Sankarabharanam · Adi · Veenai Kuppaiyer',
        color: '#223019', tag: 'Varnam 3',
        lessons: [
            {
                id: 'v3_intro', title: 'Raga and Structure', tag: 'Orientation',
                exercises: [
                    {
                        type: 'info',
                        title: 'Sami Ninne — Overview',
                        body: 'Raga: Sankarabharanam (29th Melakarta)\nTala: Adi\nComposer: Veenai Kuppaiyer\n\nArohanam: Sa Ri2 Ga2 Ma1 Pa Da2 Ni2 Ṡ\nAvarohanam: Ṡ Ni2 Da2 Pa Ma1 Ga2 Ri2 Sa\n\nA classic varnam balancing rakti and clarity. Build evenness across all speeds before adding heavier gamaka weight.'
                    },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ga2', 'Ma1', 'Pa', 'Da2', 'Ni2', 'Ṡ'], displayLabel: '♪', instruction: 'Listen to Sankarabharanam arohanam.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni2', 'Da2', 'Pa', 'Ma1', 'Ga2', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Listen to Sankarabharanam avarohanam.' },
                ]
            },
            {
                id: 'v3_order', title: 'Traditional Singing Order', tag: 'Flow',
                exercises: [
                    {
                        type: 'info',
                        title: 'Performance Sequence (Purvangam → Uttarangam)',
                        body: 'Follow this exact order:\n\nPurvangam:\n1) Pallavi — first speed, then second speed.\n2) Anupallavi — first speed, then second speed.\n3) Muktaayi swaram — first speed, then second speed.\n\nUttarangam:\n4) Charanam — first speed.\n5) Chittaswaram 1 — first speed.\n6) Repeat Charanam + Chittaswaram 1 in second speed.\n7) Charanam — first speed.\n8) Chittaswaram 2 — first speed.\n9) Repeat Charanam + Chittaswaram 2 in second speed.\n10) Continue the same pattern for Chittaswarams 3 and 4.'
                    }
                ]
            },
            {
                id: 'v3_core_lyrics', title: 'Sahityam Core', tag: 'Sahityam',
                exercises: [
                    { type: 'lyrics_practice', title: 'Pallavi', lyrics: ['Sami nine kori chala marulu konnadira'], meaning: 'O Lord, she is deeply agitated due to longing for you.' },
                    { type: 'lyrics_practice', title: 'Anupallavi', lyrics: ['Thamasamu seyaka dayajudara kumara'], meaning: 'O divine son, do not delay further; please show compassion.' },
                    { type: 'lyrics_practice', title: 'Charanam', lyrics: ['Neerajakshi neepai'], meaning: 'The lotus-eyed one longs for you.' }
                ]
            },
            {
                id: 'v3_practice_focus', title: 'Speed and Articulation Focus', tag: 'Technique',
                exercises: [
                    {
                        type: 'info',
                        title: 'How to Practice This Varnam',
                        body: '1) First speed: perfect sruti and sahitya clarity.\n2) Second speed: maintain vowel length balance.\n3) Chittaswaram: no swallowed notes at phrase turns.\n4) Keep Sankarabharanam bright and open, never nasal.'
                    }
                ]
            },
            {
                id: 'v3_swaram_talam', title: 'Swaram Practice with Adi Tala', tag: 'Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Sami Ninne — Notation Aligned Core',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nSection-wise notation-aligned swara practice from pallavi, anupallavi, muktayi, and charanam.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa',',',',',',','Ni2','Ṡ','Da2','Ni2','Pa',',','Ma1','Pa','Ga2',',','Ma1',',','|','Pa',',','Da2','Ni2','Pa',',','Da2','Ni2','Sa','Ri2','Sa','Ni2','Da2','Pa','Da2','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi complete swara flow.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa',',',',',',','Ni2','Ṡ','Da2','Ni2','Pa',',','Ma1','Pa','Ga2',',','Ma1',',','|','Pa',',','Da2','Ni2','Pa',',','Da2','Ni2','Sa','Ri2','Sa','Ni2','Da2','Pa','Da2','Ni2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.8,
                        instruction: 'Sing: Pallavi complete swara flow.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa',',','Da2','Da2','Pa','Ma1','Da2','Pa',',','Ma1','Ga2','Ma1','Pa','Ga2','Ma1','Ri2','|','Ga2','Ma1','Pa','Da2','Da2','Pa','Ma1','Pa','Da2','Ni2','Sa','Ni2','Sa',',','Ri2','Ga2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Anupallavi complete swara flow.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa',',','Da2','Da2','Pa','Ma1','Da2','Pa',',','Ma1','Ga2','Ma1','Pa','Ga2','Ma1','Ri2','|','Ga2','Ma1','Pa','Da2','Da2','Pa','Ma1','Pa','Da2','Ni2','Sa','Ni2','Sa',',','Ri2','Ga2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.78,
                        instruction: 'Sing: Anupallavi complete swara flow.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa','Ri2','Ni2','Sa','Da2','Ni2','Sa','Pa','Da2','Ni2','Sa','Da2','Pa','Ma1','Pa','Da2','|','Ma1','Pa','Ga2','Ma1','Pa','Ri2','Ga2','Ma1','Sa','Ri2','Ga2','Ma1','Pa','Da2','Ni2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram full phrase.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa','Ri2','Ni2','Sa','Da2','Ni2','Sa','Pa','Da2','Ni2','Sa','Da2','Pa','Ma1','Pa','Da2','|','Ma1','Pa','Ga2','Ma1','Pa','Ri2','Ga2','Ma1','Sa','Ri2','Ga2','Ma1','Pa','Da2','Ni2','Sa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.75,
                        instruction: 'Sing: Muktayi swaram full phrase.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Pa',',','Da2','Ni2','Sa','Sa','Ni2','Da2','Pa','Ma1','Ga2','Ri2','Ga2',',','Ma1',',','|','Pa',',','Ma1','Da2',',','Pa','Sa','Ni2','Da2','Pa','Ma1','Ga2','Ma1','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Charanam swara flow.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Pa',',','Da2','Ni2','Sa','Sa','Ni2','Da2','Pa','Ma1','Ga2','Ri2','Ga2',',','Ma1',',','|','Pa',',','Ma1','Da2',',','Pa','Sa','Ni2','Da2','Pa','Ma1','Ga2','Ma1','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.74,
                        instruction: 'Sing: Charanam swara flow.'
                    }
                ]
            },
            {
                id: 'v3_chittaswaram_full', title: 'Chittaswaram 1-4 Full Practice', tag: 'Advanced Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Sami Ninne Chittaswaram Expansion',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nFull chittaswaram practice in notation-aligned chunks. Keep Sankarabharanam bright and balanced.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Pa',',',',','Ma1',',',',','Pa',',',',','Ga2',',','Ma1',',',',','Ri2',',','Ga2','|','Sa',',',',','Ri2',',',',','Ni2',',','Sa',',','Ri2',',','Ga2',',','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 1.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Pa',',',',','Ma1',',',',','Pa',',',',','Ga2',',','Ma1',',',',','Ri2',',','Ga2','|','Sa',',',',','Ri2',',',',','Ni2',',','Sa',',','Ri2',',','Ga2',',','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Chittaswaram 1.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Pa','Da2',',','Pa','Ma1','Ga2','Ma1','Pa',',','Ma1','Ga2','Ma1','Ri2','Ga2',',','Ri2','|','Sa','Ni2','Da2','Ni2',',','Pa','Da2','Ni2','Sa','Ri2',',','Ni2','Sa','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 2.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Pa','Da2',',','Pa','Ma1','Ga2','Ma1','Pa',',','Ma1','Ga2','Ma1','Ri2','Ga2',',','Ri2','|','Sa','Ni2','Da2','Ni2',',','Pa','Da2','Ni2','Sa','Ri2',',','Ni2','Sa','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.68,
                        instruction: 'Sing: Chittaswaram 2.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ma1',',','Da2','Pa','Ma1','Ga2','Ma1',',','Pa','Ga2','Ma1','Ri2','Ga2','Sa',',','Ni2','|','Sa','Ma1','Ga2','Ri2','Sa','Ni2','Da2','Ni2','Sa','Ri2','Ga2','Ma1','Pa',',','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3 (part A).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ma1',',','Da2','Pa','Ma1','Ga2','Ma1',',','Pa','Ga2','Ma1','Ri2','Ga2','Sa',',','Ni2','|','Sa','Ma1','Ga2','Ri2','Sa','Ni2','Da2','Ni2','Sa','Ri2','Ga2','Ma1','Pa',',','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.66,
                        instruction: 'Sing: Chittaswaram 3 (part A).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Pa','Da2','Ni2','Pa','Da2','Ni2','Sa','Ri2','Sa','Ga2','Ri2',',','Sa','Ni2','Da2','Ni2','|','Sa',',','Ri2','Ni2','Da2','Pa',',','Da2','Ma1','Ga2','Ri2','Sa',',','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3 (part B).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Pa','Da2','Ni2','Pa','Da2','Ni2','Sa','Ri2','Sa','Ga2','Ri2',',','Sa','Ni2','Da2','Ni2','|','Sa',',','Ri2','Ni2','Da2','Pa',',','Da2','Ma1','Ga2','Ri2','Sa',',','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.64,
                        instruction: 'Sing: Chittaswaram 3 (part B).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Pa',',','Ma1','Pa','Ga2','Ma1','Ri2','Ga2','Sa',',','Ma1','Ga2','Ri2','Sa','Ni2','Pa','|','Da2',',','Ni2','Sa','Ri2','Sa','Ni2',',','Sa','Ri2','Ga2','Ma1','Pa',',','Da2','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Pa',',','Ma1','Pa','Ga2','Ma1','Ri2','Ga2','Sa',',','Ma1','Ga2','Ri2','Sa','Ni2','Pa','|','Da2',',','Ni2','Sa','Ri2','Sa','Ni2',',','Sa','Ri2','Ga2','Ma1','Pa',',','Da2','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.62,
                        instruction: 'Sing: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa',',','Ni2','Ri2',',','Sa','Ma1','Ga2','Ri2','Ga2','Sa',',','Ni2','Pa','Da2','Ni2','|','Sa',',','Sa',',','Ni2','Da2','Pa',',','Ma1','Ga2','Ri2','Sa',',','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part B).'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa',',','Ni2','Ri2',',','Sa','Ma1','Ga2','Ri2','Ga2','Sa',',','Ni2','Pa','Da2','Ni2','|','Sa',',','Sa',',','Ni2','Da2','Pa',',','Ma1','Ga2','Ri2','Sa',',','Ri2','Ga2','Ma1','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.6,
                        instruction: 'Sing: Chittaswaram 4 (part B).'
                    }
                ]
            }
        ]
    },
    {
        id: 'varnam_stage4', title: 'Vanajaksha', symbol: '🌺',
        subtitle: 'Kalyani · Khanda Jathi Ata · Pallavi Gopaliyer',
        color: '#3a1f13', tag: 'Varnam 4',
        lessons: [
            {
                id: 'v4_intro', title: 'Raga and Tala Orientation', tag: 'Orientation',
                exercises: [
                    {
                        type: 'info',
                        title: 'Vanajaksha — Overview',
                        body: 'Raga: Kalyani (65th Melakarta)\nTala: Khanda Jathi Ata Tala (5 + 5 + 2 + 2)\nComposer: Pallavi Gopaliyer\n\nArohanam: Sa Ri2 Ga3 Ma2 Pa Da2 Ni3 Ṡ\nAvarohanam: Ṡ Ni3 Da2 Pa Ma2 Ga3 Ri2 Sa\n\nThis is an Ata tala varnam: your laya steadiness is as important as swara precision. Count internally without rushing the long khanda laghu spans.'
                    },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri2', 'Ga3', 'Ma2', 'Pa', 'Da2', 'Ni3', 'Ṡ'], displayLabel: '♪', instruction: 'Listen to Kalyani arohanam.' },
                    { type: 'listen_sequence', swaras: ['Ṡ', 'Ni3', 'Da2', 'Pa', 'Ma2', 'Ga3', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Listen to Kalyani avarohanam.' },
                ]
            },
            {
                id: 'v4_order', title: 'Traditional Singing Order', tag: 'Flow',
                exercises: [
                    {
                        type: 'info',
                        title: 'Performance Sequence (Purvangam → Uttarangam)',
                        body: 'Follow this exact order:\n\nPurvangam:\n1) Pallavi — first speed, then second speed.\n2) Anupallavi — first speed, then second speed.\n3) Muktaayi swaram — first speed, then second speed.\n\nUttarangam:\n4) Charanam — first speed.\n5) Chittaswaram 1 — first speed.\n6) Repeat Charanam + Chittaswaram 1 in second speed.\n7) Charanam — first speed.\n8) Chittaswaram 2 — first speed.\n9) Repeat Charanam + Chittaswaram 2 in second speed.\n10) Continue the same pattern for Chittaswarams 3 and 4.'
                    }
                ]
            },
            {
                id: 'v4_core_lyrics', title: 'Main Sahityam', tag: 'Sahityam',
                exercises: [
                    { type: 'lyrics_practice', title: 'Pallavi', lyrics: ['Vanajakshi Ninne Kori yunnadira'], meaning: 'O lotus-eyed one, I am longing for you.' },
                    { type: 'lyrics_practice', title: 'Anupallavi', lyrics: ['Manasijuni kanna chakkani Sree Ma Kasturi Rangasami'], meaning: 'O beautiful one, more charming than Cupid, O Sri Kasturi Rangasami.' },
                    { type: 'lyrics_practice', title: 'Charanam', lyrics: ['Chiru Navvu momuna'], meaning: 'The one with the gently smiling face.' }
                ]
            },
            {
                id: 'v4_tala_focus', title: 'Ata Tala Internalization', tag: 'Laya',
                exercises: [
                    {
                        type: 'info',
                        title: 'Khanda Jathi Ata Practice Plan',
                        body: 'Use this progression daily:\n1) Recite tala counts (5+5+2+2) without singing.\n2) Sing only pallavi in first speed with strict eduppu alignment.\n3) Add muktayi swaram in chunks, always landing samam accurately.\n4) Only then increase speed.'
                    }
                ]
            },
            {
                id: 'v4_swaram_talam', title: 'Swaram Practice with Ata Tala', tag: 'Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Vanajaksha — Notation Aligned Core',
                        body: 'Tala: Khanda Jathi Ata (5 + 5 + 2 + 2)\n\nSection-wise notation-aligned swara practice from pallavi, anupallavi, muktayi, and charanam.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa',',','Ni3','Da2','Ni3','Sa','Ri2','Ga3','Pa',',','Ma2',',','Ga3',',',',','Ri2','Ri2',',',',',',','|','Ga3','Ma2','Pa','Ga3','Ri2','Sa','Ni3','Da2','Ri2','Sa','Sa',',','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi line 1.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa',',','Ni3','Da2','Ni3','Sa','Ri2','Ga3','Pa',',','Ma2',',','Ga3',',',',','Ri2','Ri2',',',',',',','|','Ga3','Ma2','Pa','Ga3','Ri2','Sa','Ni3','Da2','Ri2','Sa','Sa',',','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Pallavi line 1.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ga3','Ma2','Pa','Ga3','Ri2','Sa','Ni3','Da2','Ri2','Sa','Sa',',','Ri2','Da2','Ga3','Ri2','|','Ga3','Pa','Ma2','Ri2','Ga3','Ma2','Pa','Da2','Pa','Ma2','Ni3','Da2','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi line 2 and close.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ga3','Ma2','Pa','Ga3','Ri2','Sa','Ni3','Da2','Ri2','Sa','Sa',',','Ri2','Da2','Ga3','Ri2','|','Ga3','Pa','Ma2','Ri2','Ga3','Ma2','Pa','Da2','Pa','Ma2','Ni3','Da2','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Pallavi line 2 and close.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ri2',',',',','Da2','Ni3','Sa','Ri2','Ga3','Ma2','Pa','Da2','Ni3','Pa','Ma2','Da2','Pa','|','Pa','Ma2','Ma2','Ga3','Ni3','Da2','Ma2','Ga3','Pa','Ga3','Ri2','Sa','Ni3','Da2','Ma2','Ga3','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Anupallavi core phrase.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ri2',',',',','Da2','Ni3','Sa','Ri2','Ga3','Ma2','Pa','Da2','Ni3','Pa','Ma2','Da2','Pa','|','Pa','Ma2','Ma2','Ga3','Ni3','Da2','Ma2','Ga3','Pa','Ga3','Ri2','Sa','Ni3','Da2','Ma2','Ga3','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.68,
                        instruction: 'Sing: Anupallavi core phrase.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ma2',',',',','Ga3','Pa','Ma2',',','Pa','Da2','Ga3','Ma2','Pa','|','Ni3','Da2','Pa','Ni3','Da2',',','Pa','Ma2','Da2','Ma2','Ga3','Ri2',',','Pa','Ma2','Ga3','Ri2','Sa','Ni3','Da2','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram phrase.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ma2',',',',','Ga3','Pa','Ma2',',','Pa','Da2','Ga3','Ma2','Pa','|','Ni3','Da2','Pa','Ni3','Da2',',','Pa','Ma2','Da2','Ma2','Ga3','Ri2',',','Pa','Ma2','Ga3','Ri2','Sa','Ni3','Da2','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.66,
                        instruction: 'Sing: Muktayi swaram phrase.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Sa','Ni3','Da2','Pa','Ma2','Ga3','Ma2','Ri2','Ga3','Ma2','Pa','Da2','|','Pa',',',',','Ga3','Ma2','Pa','Da2','Pa','Ma2','Pa','Da2','Da2','Ni3','Ni3','Sa','Sa','Ni3','Ni3','Da2','Pa','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Charanam opening.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Sa','Ni3','Da2','Pa','Ma2','Ga3','Ma2','Ri2','Ga3','Ma2','Pa','Da2','|','Pa',',',',','Ga3','Ma2','Pa','Da2','Pa','Ma2','Pa','Da2','Da2','Ni3','Ni3','Sa','Sa','Ni3','Ni3','Da2','Pa','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.64,
                        instruction: 'Sing: Charanam opening.'
                    }
                ]
            },
            {
                id: 'v4_chittaswaram_full', title: 'Chittaswaram 1-4 Full Practice', tag: 'Advanced Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Vanajaksha Chittaswaram Expansion',
                        body: 'Tala: Khanda Jathi Ata (5 + 5 + 2 + 2)\n\nFull chittaswaram practice in notation-aligned chunks. Keep Ma2 and Ni3 intonation exact across long karvais.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ri2',',',',',',',',','Sa',',',',',',',',','Ri2',',','Sa',',','Ni3',',','Da2',',','|','Ni3',',','Pa',',',',',',','Ma2',',','Da2',',','Ma2',',','Ga3',',','Ri2',',','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 1.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ri2',',',',',',',',','Sa',',',',',',',',','Ri2',',','Sa',',','Ni3',',','Da2',',','|','Ni3',',','Pa',',',',',',','Ma2',',','Da2',',','Ma2',',','Ga3',',','Ri2',',','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.62,
                        instruction: 'Sing: Chittaswaram 1.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Da2',',','Pa','Ma2','Pa','Ga3','Ma2',',','Pa','Ga3','Da2','Ma2','Ga3','Ri2','Pa','Ma2','|',',','Ga3','Ri2','Ni3','Sa','Ri2','Ga3','Pa','Ma2','Ga3','Ri2','Ni3','Da2','Da2','Ga3','Ri2','Ni3','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 2.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Da2',',','Pa','Ma2','Pa','Ga3','Ma2',',','Pa','Ga3','Da2','Ma2','Ga3','Ri2','Pa','Ma2','|',',','Ga3','Ri2','Ni3','Sa','Ri2','Ga3','Pa','Ma2','Ga3','Ri2','Ni3','Da2','Da2','Ga3','Ri2','Ni3','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.6,
                        instruction: 'Sing: Chittaswaram 2.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Ma2','Ni3','Da2','Ma2','Pa','Ga3','Pa','Ma2','Pa',',',',','Ma2','Ga3','Da2','Ma2','Ga3','|','Ri2','Sa','Ni3','Ri2',',','Ri2','Da2','Ni3','Sa','Ri2',',','Ri2','Da2','Pa','Ma2','Ga3','Ma2','Pa','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Ma2','Ni3','Da2','Ma2','Pa','Ga3','Pa','Ma2','Pa',',',',','Ma2','Ga3','Da2','Ma2','Ga3','|','Ri2','Sa','Ni3','Ri2',',','Ri2','Da2','Ni3','Sa','Ri2',',','Ri2','Da2','Pa','Ma2','Ga3','Ma2','Pa','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.58,
                        instruction: 'Sing: Chittaswaram 3.'
                    },
                    {
                        type: 'listen_sequence',
                        swaras: ['Da2',',','Ni3','Da2','Ma2','Ga3','Da2','Ma2','Ga3','Ri2',',','Ma2','Ga3','Ri2','Ni3','Da2',',','|','Ga3','Ri2','Ma2','Ga3','Ni3','Da2','Ga3','Ma2','Pa','Da2','Ni3','Pa','Da2','Ma2','Ga3','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4.'
                    },
                    {
                        type: 'sing_sequence',
                        swaras: ['Da2',',','Ni3','Da2','Ma2','Ga3','Da2','Ma2','Ga3','Ri2',',','Ma2','Ga3','Ri2','Ni3','Da2',',','|','Ga3','Ri2','Ma2','Ga3','Ni3','Da2','Ga3','Ma2','Pa','Da2','Ni3','Pa','Da2','Ma2','Ga3','||'],
                        tala: { name: 'Khanda Jathi Ata', groups: [5, 5, 2, 2], unitLabel: '14-beat cycle' },
                        speed: 0.56,
                        instruction: 'Sing: Chittaswaram 4.'
                    }
                ]
            }
        ]
    },
    {
        id: 'varnam_stage5', title: 'Jalajakshi', symbol: '💧',
        subtitle: 'Hamsadhwani · Adi · Maanambuchaavadi Venkatasubbaiyer',
        color: '#183042', tag: 'Varnam 5',
        lessons: [
            {
                id: 'v5_intro', title: 'Raga and Tala Orientation', tag: 'Orientation',
                exercises: [
                    {
                        type: 'info',
                        title: 'Jalajakshi — Overview',
                        body: 'Raga: Hamsadhwani (29th mela janyam)\nTala: Adi\nComposer: Maanambuchaavadi Venkatasubbaiyer\n\nArohanam: Sa Ri2 Ga3 Pa Ni3 Ṡ\nAvarohanam: Ṡ Ni3 Pa Ga3 Ri2 Sa\n\nA brisk rakti varnam with clear pentatonic geometry. Keep phrase endings crisp and avoid over-gliding in fast passages.'
                    },
                    { type: 'listen_sequence',
                        octaveMode: 'strict', swaras: ['Sa', 'Ri2', 'Ga3', 'Pa', 'Ni3', 'Ṡ'], displayLabel: '♪', instruction: 'Listen to Hamsadhwani arohanam.' },
                    { type: 'listen_sequence',
                        octaveMode: 'strict', swaras: ['Ṡ', 'Ni3', 'Pa', 'Ga3', 'Ri2', 'Sa'], displayLabel: '♪', instruction: 'Listen to Hamsadhwani avarohanam.' },
                ]
            },
            {
                id: 'v5_order', title: 'Traditional Singing Order', tag: 'Flow',
                exercises: [
                    {
                        type: 'info',
                        title: 'Performance Sequence (Purvangam → Uttarangam)',
                        body: 'Follow this exact order:\n\nPurvangam:\n1) Pallavi — first speed, then second speed.\n2) Anupallavi — first speed, then second speed.\n3) Muktaayi swaram — first speed, then second speed.\n\nUttarangam:\n4) Charanam — first speed.\n5) Chittaswaram 1 — first speed.\n6) Repeat Charanam + Chittaswaram 1 in second speed.\n7) Charanam — first speed.\n8) Chittaswaram 2 — first speed.\n9) Repeat Charanam + Chittaswaram 2 in second speed.\n10) Continue the same pattern for Chittaswarams 3 and 4.'
                    }
                ]
            },
            {
                id: 'v5_core_lyrics', title: 'Main Sahityam', tag: 'Sahityam',
                exercises: [
                    { type: 'lyrics_practice', title: 'Pallavi', lyrics: ['Jalajakshi ninnedabasi chala marulu konnadira'], meaning: 'The lotus-eyed one is deeply distressed in separation from you.' },
                    { type: 'lyrics_practice', title: 'Anupallavi', lyrics: ['Chelia nela ravademira cheluvudaina Sree Venkatesa'], meaning: 'O Venkatesa, why do you not come to your beloved?' },
                    { type: 'lyrics_practice', title: 'Charanam', lyrics: ['Nee sati doranegana'], meaning: 'I have seen no other lord equal to you.' }
                ]
            },
            {
                id: 'v5_swaram_talam', title: 'Swaram Practice with Adi Tala', tag: 'Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Jalajakshi — Notation Aligned Core',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nSection-wise notation-aligned swara practice from pallavi, anupallavi, muktayi, and charanam.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3',',','Ri2',',','Sa',',',',',',', '|', 'Ni3.','Sa','Ri2','Ga3','Ri2','Ri2','Sa','Ni3.','|','Sa','Ri2','Sa','Sa','Ni3.','Pa.','Ni3.','Sa', '|','Ri2','Pa.',',','Ni3.',',','Sa',',','Ri2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi line 1.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3',',','Ri2',',','Sa',',',',',',', '|', 'Ni3.','Sa','Ri2','Ga3','Ri2','Ri2','Sa','Ni3.','|','Sa','Ri2','Sa','Sa','Ni3.','Pa.','Ni3.','Sa', '|','Ri2','Pa.',',','Ni3.',',','Sa',',','Ri2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.78,
                        instruction: 'Sing: Pallavi line 1.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3','Ri2','Sa','Ni3.','Sa','Ri2','Pa.','Ni3.','|','Sa','Ri2','Ga3','Pa','Ga3','Ni3','Pa',',','|','Sa^','Ni3','Sa^','Ri2^',',','Sa^','Ni3','Pa', '|','Pa','Ga3',',','Ri2',',','Sa',',','Ri2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Pallavi line 2 and close.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3','Ri2','Sa','Ni3.','Sa','Ri2','Pa.','Ni3.','|','Sa','Ri2','Ga3','Pa','Ga3','Ni3','Pa',',','|','Sa^','Ni3','Sa^','Ri2^',',','Sa^','Ni3','Pa', '|','Pa','Ga3',',','Ri2',',','Sa',',','Ri2','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.76,
                        instruction: 'Sing: Pallavi line 2 and close.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Pa','Ga3','Ri2','Sa','Ni3.','Sa','Ri2',',','|','Ga3',',','Ri2','Ri2','Sa','Sa','Ni3.','Pa.','|','Ni3.','Sa','Ri2','Ga3',',','Sa','Ga3','Ri2','|','Ga3','Pa',',','Ni3','Sa^',',',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Anupallavi phrase set.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Pa','Ga3','Ri2','Sa','Ni3.','Sa','Ri2',',','|','Ga3',',','Ri2','Ri2','Sa','Sa','Ni3.','Pa.','|','Ni3.','Sa','Ri2','Ga3',',','Sa','Ga3','Ri2','|','Ga3','Pa',',','Ni3','Sa^',',',',',',','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.74,
                        instruction: 'Sing: Anupallavi phrase set.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ri2^','Sa^','Ni3','Pa','Ni3','Sa^','Ri2^','Ga3^','|','Sa^','Ri2^','Ga3^','Pa^','Ga3^','Ri2^','Sa^','Ni3','|', 'Ri2^', 'Ri2^', ',', 'Sa^', 'Ni3', 'Pa', 'Pa', 'Ga3', '|', ',', 'Ri2', 'Sa', 'Ni3.', 'Pa.', 'Ni3.','Sa', 'Ri2', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Anupallavi line 2.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ri2^','Sa^','Ni3','Pa','Ni3','Sa^','Ri2^','Ga3^','|','Sa^','Ri2^','Ga3^','Pa^','Ga3^','Ri2^','Sa^','Ni3','|', 'Ri2^', 'Ri2^', ',', 'Sa^', 'Ni3', 'Pa', 'Pa', 'Ga3', '|', ',', 'Ri2', 'Sa', 'Ni3.', 'Pa.', 'Ni3.','Sa', 'Ri2', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.74,
                        instruction: 'Sing: Anupallavi line 2.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3',',','Ri2','Ga3','Ri2','Sa','Ri2',',','|','Ni3.','Sa','Ri2','Ga3','Ri2','Ri2','Sa','Ni3.','|','Ri2',',','Ni3.','Ga3','Ri2','Ni3.','Sa','Ri2', '|','Pa.','Ni3.','Sa','Ri2','Ga3',',',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram opening.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3',',','Ri2','Ga3','Ri2','Sa','Ri2',',','|','Ni3.','Sa','Ri2','Ga3','Ri2','Ri2','Sa','Ni3.','|','Ri2',',','Ni3.','Ga3','Ri2','Ni3.','Sa','Ri2', '|','Pa.','Ni3.','Sa','Ri2','Ga3',',',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.72,
                        instruction: 'Sing: Muktayi swaram opening.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3','Ri2', 'Sa', 'Ri2', ',', 'Ga3', 'Pa', 'Ni3', '|', 'Ri2', 'Ga3', 'Pa', 'Ni3.', 'Sa', 'Ri2', 'Ga3', 'Pa', '|', 'Pa.', 'Ni.', 'Sa', 'Ri2', ',', 'Ga3', 'Pa', 'Ni3', '|', 'Ri2', 'Ga3', 'Pa', 'Ni3', 'Sa^', ',', ',', 'Ri2^', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram line 2.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3','Ri2', 'Sa', 'Ri2', ',', 'Ga3', 'Pa', 'Ni3', '|', 'Ri2', 'Ga3', 'Pa', 'Ni3.', 'Sa', 'Ri2', 'Ga3', 'Pa', '|', 'Pa.', 'Ni.', 'Sa', 'Ri2', ',', 'Ga3', 'Pa', 'Ni3', '|', 'Ri2', 'Ga3', 'Pa', 'Ni3', 'Sa^', ',', ',', 'Ri2^', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.72,
                        instruction: 'Sing: Muktayi swaram line 2.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ri2^', 'Sa^', 'Ni3', 'Pa', ',', 'Ni3', 'Ga3^', 'Ri2^', '|', 'Sa^', 'Ni3', ',', 'Pa', 'Ni3', 'Sa^', 'Ri2^', 'Ga3^', '|', 'Pa', ',', 'Ni3', 'Sa^', ',', 'Ri2^', 'Ga3^', 'Ri2^', '|', 'Pa', 'Ni3', 'Sa^', 'Ri2^', 'Ga3^', 'Ri2^', 'Ni3', 'Ri2^', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram line 3.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ri2^', 'Sa^', 'Ni3', 'Pa', ',', 'Ni3', 'Ga3^', 'Ri2^', '|', 'Sa^', 'Ni3', ',', 'Pa', 'Ni3', 'Sa^', 'Ri2^', 'Ga3^', '|', 'Pa', ',', 'Ni3', 'Sa^', ',', 'Ri2^', 'Ga3^', 'Ri2^', '|', 'Pa', 'Ni3', 'Sa^', 'Ri2^', 'Ga3^', 'Ri2^', 'Ni3', 'Ri2^', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.72,
                        instruction: 'Sing: Muktayi swaram line 3.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3^', 'Pa^', 'Ga3^', 'Ri2^', 'Sa^', 'Ni3', 'Sa^', 'Ri2^', '|', 'Sa^', 'Ni3', 'Pa', 'Ga3', 'Ri2', 'Ga3', 'Pa', 'Ni3', '|', 'Ga3^', 'Ri2^', ',', 'Sa^', 'Ni3', 'Pa', 'Ri2^', 'Sa^', '|', ',', 'Ni3', 'Pa', 'Ga3', ',', 'Ri2', 'Sa', 'Ri2', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Muktayi swaram line 4.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3^', 'Pa^', 'Ga3^', 'Ri2^', 'Sa^', 'Ni3', 'Sa^', 'Ri2^', '|', 'Sa^', 'Ni3', 'Pa', 'Ga3', 'Ri2', 'Ga3', 'Pa', 'Ni3', '|', 'Ga3^', 'Ri2^', ',', 'Sa^', 'Ni3', 'Pa', 'Ri2^', 'Sa^', '|', ',', 'Ni3', 'Pa', 'Ga3', ',', 'Ri2', 'Sa', 'Ri2', '||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.72,
                        instruction: 'Sing: Muktayi swaram line 4.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3',',',',',',',',','Sa',',','Ri2',',','Sa','Ni3','Pa','Pa','Ga3','Ri2','|','Ga3',',',',','Ga3','Ri2','Sa','Ri2',',','Ri2','Sa','Ni3','Sa','Ri2','Ga3',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Charanam swara flow.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3',',',',',',',',','Sa',',','Ri2',',','Sa','Ni3','Pa','Pa','Ga3','Ri2','|','Ga3',',',',','Ga3','Ri2','Sa','Ri2',',','Ri2','Sa','Ni3','Sa','Ri2','Ga3',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.7,
                        instruction: 'Sing: Charanam swara flow.'
                    }
                ]
            },
            {
                id: 'v5_chittaswaram_full', title: 'Chittaswaram 1-4 Full Practice', tag: 'Advanced Swaram',
                exercises: [
                    {
                        type: 'info',
                        title: 'Jalajakshi Chittaswaram Expansion',
                        body: 'Tala: Adi (4 + 2 + 2)\n\nFull chittaswaram practice in notation-aligned chunks. Keep swara attacks crisp and karvais steady.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3',',',',','Pa',',',',','Ga3',',',',','Ri2',',',',','Sa',',','Ni3',',','|','Pa',',',',','Ri2',',',',','Ni3',',','Sa',',','Ri2',',','Ga3',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 1.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3',',',',','Pa',',',',','Ga3',',',',','Ri2',',',',','Sa',',','Ni3',',','|','Pa',',',',','Ri2',',',',','Ni3',',','Sa',',','Ri2',',','Ga3',',','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.68,
                        instruction: 'Sing: Chittaswaram 1.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3',',','Pa','Ga3','Ri2','Sa','Ri2',',','Ga3','Ri2','Sa','Ni3','Pa',',','Ri2','Ni3','|',',','Ga3','Ri2','Ni3','Pa','Ni3','Sa','Ri2',',','Ri2','Ga3','Ni3','Sa','Ri2','Ga3','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 2.'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3',',','Pa','Ga3','Ri2','Sa','Ri2',',','Ga3','Ri2','Sa','Ni3','Pa',',','Ri2','Ni3','|',',','Ga3','Ri2','Ni3','Pa','Ni3','Sa','Ri2',',','Ri2','Ga3','Ni3','Sa','Ri2','Ga3','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.66,
                        instruction: 'Sing: Chittaswaram 2.'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3','Pa','Ga3','Ri2','Ni3','Ga3','Ri2','Ni3','Pa','Ni3','Pa','Sa','Ni3','Ri2','Sa','Ga3','|','Ri2','Pa','Ga3','Ni3','Pa','Sa','Ni3','Ri2','Ni3','Ga3','Ri2','Ni3','Ri2','Ni3','Pa','Ga3','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3 (part A).'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ni3','Pa','Ga3','Ri2','Ni3','Ga3','Ri2','Ni3','Pa','Ni3','Pa','Sa','Ni3','Ri2','Sa','Ga3','|','Ri2','Pa','Ga3','Ni3','Pa','Sa','Ni3','Ri2','Ni3','Ga3','Ri2','Ni3','Ri2','Ni3','Pa','Ga3','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.64,
                        instruction: 'Sing: Chittaswaram 3 (part A).'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Pa','Ni3','Sa','Ri2','Ga3','Ga3','Pa','Ni3','Sa','Ri2','Ri2','Ga3','Pa','Ni3','Sa','Ni3','|','Ga3','Ri2','Sa','Ni3','Pa','Ri2','Sa','Ni3','Pa','Ga3','Ri2','Ni3','Sa','Ri2','Ga3','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 3 (part B).'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Pa','Ni3','Sa','Ri2','Ga3','Ga3','Pa','Ni3','Sa','Ri2','Ri2','Ga3','Pa','Ni3','Sa','Ni3','|','Ga3','Ri2','Sa','Ni3','Pa','Ri2','Sa','Ni3','Pa','Ga3','Ri2','Ni3','Sa','Ri2','Ga3','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.62,
                        instruction: 'Sing: Chittaswaram 3 (part B).'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Sa',',',',',',',',','Ni3','Ri2','Sa','Ni3','Pa','Ga3','Ri2','Sa','Ri2','Ga3','|','Pa',',',',',',',',','Sa','Ni3','Pa','Ga3','Ri2','Sa','Ri2','Ga3','Pa','Ni3','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Sa',',',',',',',',','Ni3','Ri2','Sa','Ni3','Pa','Ga3','Ri2','Sa','Ri2','Ga3','|','Pa',',',',',',',',','Sa','Ni3','Pa','Ga3','Ri2','Sa','Ri2','Ga3','Pa','Ni3','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.6,
                        instruction: 'Sing: Chittaswaram 4 (part A).'
                    },
                    {
                        type: 'listen_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3','Ri2',',','Ni3','Sa','Ri2','Pa','Ga3',',','Ri2','Sa','Ni3','Pa','Ni3','Sa','Ri2','|','Sa',',',',','Pa',',',',','Ni3','Pa','Ga3','Ri2','Sa','Ni3','Sa','Ri2','Ga3','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        displayLabel: '♪',
                        instruction: 'Listen: Chittaswaram 4 (part B).'
                    },
                    {
                        type: 'sing_sequence',
                        octaveMode: 'strict',
                        swaras: ['Ga3','Ri2',',','Ni3','Sa','Ri2','Pa','Ga3',',','Ri2','Sa','Ni3','Pa','Ni3','Sa','Ri2','|','Sa',',',',','Pa',',',',','Ni3','Pa','Ga3','Ri2','Sa','Ni3','Sa','Ri2','Ga3','Pa','||'],
                        tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' },
                        speed: 0.58,
                        instruction: 'Sing: Chittaswaram 4 (part B).'
                    }
                ]
            }
        ]
    }
];

export const VARNAM_CURRICULUM = withCompositionRhythm(VARNAM_CURRICULUM_RAW);

// ─── Kritis Curriculum ────────────────────────────────────────────────────────

const KAPI_SWARAS = {
    S:'Sa', s:'Sa.', R:'Ri2', r:'Ri2.', G:'Ga2', g:'Ga2.',
    M:'Ma1', m:'Ma1.', P:'Pa', p:'Pa.', D:'Da2', d:'Da2.',
    N:'Ni3', n:'Ni2.', nn:'Ni3.'
};

// Beat-group arrays for Enna Thavam Seidhanai pallavi part 1 (enna tavam sheidanai)
const ET_P1_S1 = parseBeatGroups([
    [';',',','g'],              // beat 1
    [',','m','P'],              // beat 2: ,m P
    ['m','g','G',',','-','r'], // beat 3: mgG,-r
    [';','nn'],                  // beat 4
    '|',
    ['S',';'],                  // beat 5
    [';','n','S'],              // beat 6
    '|',
    ['R',',','g'],              // beat 7
    ['R',';'],                  // beat 8
    '||'
], KAPI_SWARAS);

const ET_P1_S2 = parseBeatGroups([
    [';',',','g'],
    [',','m','n','p'],          // beat 2: ,m np (fills in lower Ni before Pa)
    ['m','g','G',',','-','r'],
    [';','nn'],
    '|',
    ['S',';'],
    [';','n','S'],
    '|',
    ['R',',','g'],
    ['g','s','R',';'],          // beat 8: gsR; (lower turn)
    '||'
], KAPI_SWARAS);

const ET_P1_S3 = parseBeatGroups([
    [';',',','g'],
    [',','m','n','p'],
    ['m','g','G',',','-','r'],
    [';','nn'],
    '|',
    ['S',';'],
    [';','D'],                  // beat 6: ;D (middle Da)
    '|',
    ['n','n','d','p'],          // beat 7: nndp
    ['m','g','g','r',';'],      // beat 8: mggr;
    '||'
], KAPI_SWARAS);

const ET_P1_S4 = parseBeatGroups([
    [';',',','g'],
    [',','m','n','p'],
    ['m','g','G',',','-','r'],
    [';','nn'],
    '|',
    ['S',';'],
    [';','n','d'],              // beat 6: ;nd
    '|',
    ['n','n','d','p'],          // beat 7: nndp
    ['m','g','g','r','R'],      // beat 8: mggr R (lands on middle Ri)
    '||'
], KAPI_SWARAS);

// Beat-group arrays for Enna Thavam Seidhanai pallavi part 2
// ("engum nirai parabhrammam ammAvenrazhaikka / enna tavam sheidanai yasOdA")
const ET_P2_S1A = parseBeatGroups([
    [';',',','r'],              // beat 1: ;,r
    [',','m','-','M'],          // beat 2: ,m-M
    ['P',';'],                  // beat 3: P;
    [',','n','N'],              // beat 4: ,nN
    '|',
    ['S',',','s'],              // beat 5: S,s
    [';','-','p','d'],          // beat 6: ; - pd
    '|',
    ['n','r','s','-','m','n'],  // beat 7: nrs-mn
    [',','d','M'],              // beat 8: ,dM
    '||'
], KAPI_SWARAS);

const ET_P2_S1B = parseBeatGroups([
    ['P',','],                  // beat 1: P,
    ['n'],                      // beat 2: n
    ['s','n','P'],              // beat 3: snP
    ['m','g','G',',','-','r'],  // beat 4: mgG,-r
    '|',
    [';','N'],                  // beat 5: ;N
    ['S',';',';','r','s'],      // beat 6: S;;rs
    '|',
    ['m','r','p','m'],          // beat 7: mrpm
    ['n','d','p','m'],          // beat 8: ndpm
    '||'
], KAPI_SWARAS);

const ET_P2_S2A = parseBeatGroups([
    ['g','r','s','-','r'],      // beat 1: grs-r
    [',','m','-','P'],          // beat 2: ,m-P
    ['N',';'],                  // beat 3: N;
    [',','s','R'],              // beat 4: ,sR
    '|',
    ['s','r','M'],              // beat 5: srM
    ['g','r','-','s','n','-','p','d'], // beat 6: gr-sn-pd
    '|',
    ['n','r','s','-','m','n'],  // beat 7: nrs-mn
    [',','d','M'],              // beat 8: ,dM
    '||'
], KAPI_SWARAS);

const ET_P2_S2B = parseBeatGroups([
    ['P',','],
    ['n'],
    ['s','n','P'],
    ['m','g','G',',','-','r'],
    '|',
    [';','N'],
    ['S',';',';','r','s'],
    '|',
    ['m','r','p','m'],
    ['n','d','p','m'],
    '||'
], KAPI_SWARAS);

const ET_P2_S3A = parseBeatGroups([
    ['g','r','s','-','r'],
    [',','m','-','P'],
    ['N',';'],
    [',','s','R'],
    '|',
    ['s','r','M'],
    ['g','r','-','s','n','-','p','d'],
    '|',
    ['n','r','s','-','m','n'],
    [',','d','M'],
    '||'
], KAPI_SWARAS);

const ET_P2_S3B = parseBeatGroups([
    ['P',','],                  // beat 1: P,
    ['p','n'],                  // beat 2: pn
    ['S','-','n','P'],          // beat 3: S-nP
    ['m','g','G',',','-','r'],  // beat 4: mgG,-r
    '|',
    [';','N'],                  // beat 5: ;N
    ['G',';',';',';'],          // beat 6: G;;;
    '|',
    [';',';',';'],              // beat 7: ;;;
    [';',';'],                  // beat 8: ;;
    '||'
], KAPI_SWARAS);

const ET_P2_S1 = [...ET_P2_S1A, ...ET_P2_S1B];
const ET_P2_S2 = [...ET_P2_S2A, ...ET_P2_S2B];
const ET_P2_S3 = [...ET_P2_S3A, ...ET_P2_S3B];

const KRITIS_CURRICULUM_RAW = [
    {
        id: 'kriti_ennathavam',
        title: 'Enna Thavam Seidhanai',
        symbol: '🪔',
        subtitle: 'Kapi · Adi · Papanasam Sivan',
        color: '#1a1025',
        tag: 'Kriti 1',
        lessons: [
            {
                id: 'et_intro', title: 'About the Kriti', tag: 'Intro',
                exercises: [
                    { type: 'info', title: 'Enna Thavam Seidhanai', body: 'Rāga: Kapi (22nd mela janyam)\nTāḷam: Ādi\nComposer: Pāpanāsam Sivan · Language: Tamil\n\nArohanam: S R₂ M₁ P N₃ Ṡ\nAvarohanam: Ṡ N₂ D₂ N₂ P M₁ P G₂ R₂ S\n\nA beloved Tamil devotional kriti asking Yashoda what great tapas she performed to earn the grace of raising Krishna as her own child. Kapi\'s characteristic vakra (zigzag) phrases and its mix of N₃ in ascent and N₂/D₂ in descent give it a deeply expressive, bittersweet quality.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ['Sa','Ri2','Ma1','Pa','Ni3','Ṡ'], displayLabel: '♪', instruction: 'Listen to the Kapi arohanam: S R₂ M₁ P N₃ Ṡ.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ['Ṡ','Ni2','Da2','Ni2','Pa','Ma1','Pa','Ga2','Ri2','Sa'], displayLabel: '♪', instruction: 'Listen to the Kapi avarohanam: Ṡ N₂ D₂ N₂ P M₁ P G₂ R₂ S.' },
                    { type: 'lyrics_practice', title: 'Pallavi', lyrics: ['enna tavam sheidanai yasOdA engum nirai parabhrammam ammAvenr-azhaikka'], meaning: 'Yashoda, what great tapas did you perform, that the all-pervading Supreme Being himself calls you "ammā" (mother)?' },
                    { type: 'lyrics_practice', title: 'Anupallavi', lyrics: ['IrEzu bhuvanangaL paDaittavanai-kaiyil Endi shIrATTi pAlUTi tAlATTa nI'], meaning: 'You lifted in your arms the one who created the fourteen worlds, rocked him to sleep, and fed him milk.' },
                ]
            },
            {
                id: 'et_pallavi_p1', title: 'Pallavi — Enna Tavam Sheidanai', tag: 'Pallavi',
                exercises: [
                    { type: 'info', title: 'Pallavi Part 1', body: 'Tāḷam: Ādi (4 + 2 + 2)\n\n4 sangatis (elaborations) of the opening phrase. Each sangati adds more notes to the same beat skeleton — listen to how the phrase grows richer each time.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P1_S1, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: Sangati 1 — the simplest form.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: ET_P1_S1, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.75, instruction: 'Sing: Sangati 1.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P1_S2, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: Sangati 2 — beat 2 fills in n-p, beat 8 adds a lower turn.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: ET_P1_S2, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.75, instruction: 'Sing: Sangati 2.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P1_S3, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: Sangati 3 — beat 6 rises to D, beats 7–8 descend through n-n-d-p.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: ET_P1_S3, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.73, instruction: 'Sing: Sangati 3.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P1_S4, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: Sangati 4 — beat 6 adds n before d, beat 8 lands on middle R.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: ET_P1_S4, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.73, instruction: 'Sing: Sangati 4.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: [...ET_P1_S1, ...ET_P1_S2, ...ET_P1_S3, ...ET_P1_S4], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: All 4 sangatis back to back.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: [...ET_P1_S1, ...ET_P1_S2, ...ET_P1_S3, ...ET_P1_S4], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.73, instruction: 'Sing: All 4 sangatis back to back.' },
                ]
            },
            {
                id: 'et_pallavi_p2', title: 'Pallavi — Engum Nirai Parabhrammam', tag: 'Pallavi',
                exercises: [
                    { type: 'info', title: 'Pallavi Part 2', body: 'Tāḷam: Ādi (4 + 2 + 2)\n\nThis is the second half of the pallavi phrase, continuing from “engum nirai parabhrammam…” back into “enna tavam sheidanai yasOdA.” As in Part 1, several beats contain multiple swaras packed into a single beat-group — keep the tala steady and let each sangati preserve the same lyric placement while the melody becomes richer.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P2_S1, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: Sangati 1 — the plain continuation into the return phrase.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: ET_P2_S1, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.72, instruction: 'Sing: Sangati 1.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P2_S2, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: Sangati 2 — the opening becomes denser and the middle phrase grows more active.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: ET_P2_S2, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.7, instruction: 'Sing: Sangati 2.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P2_S3, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: Sangati 3 — a broader close with a more elaborate return and final repose.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: ET_P2_S3, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.68, instruction: 'Sing: Sangati 3.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: [...ET_P2_S1, ...ET_P2_S2, ...ET_P2_S3], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, displayLabel: '♪', instruction: 'Listen: All 3 sangatis back to back.' },
                    { type: 'sing_sequence',   octaveMode: 'strict', swaras: [...ET_P2_S1, ...ET_P2_S2, ...ET_P2_S3], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, speed: 0.68, instruction: 'Sing: All 3 sangatis back to back.' },
                ]
            }
        ]
    }
];

export const KRITIS_CURRICULUM = KRITIS_CURRICULUM_RAW.map(stage => ({
    ...stage,
    lessons: stage.lessons.map(lesson => ({
        ...lesson,
        exercises: lesson.exercises.map((ex, i) => ({ ...ex, id: ex.id ?? `ex_${i}` }))
    }))
}));

// ─── Manodharma Basics Curriculum ─────────────────────────────────────────────

const MANODHARMA_CURRICULUM_RAW = [
    // ── Stage 1: Sangati Foundations ───────────────────────────────────────────
    {
        id: 'mano_stage1', title: 'Stage 1: Sangati Foundations',
        symbol: '🎭',
        subtitle: 'Learn to vary a line without breaking its shape',
        color: '#2a1a08',
        tag: 'Stage 1',
        lessons: [
            {
                id: 'mano_1_1', title: 'The Four Pillars of Manodharma', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'What is Manodharma?', body: 'Manodharma Sangeetam (மனோதர்ம சங்கீதம்) means creative musicianship shaped in real time. It is not random singing. It is disciplined imagination inside a raga and, when required, inside a tala.\n\nFor a learner, it is easiest to enter Manodharma through four doors:\n\n1. Sangati — vary an existing composed line\n2. Kalpanaswaram — improvise swara phrases that still land correctly in tala\n3. Raga Alapana — explore the raga freely without beat\n4. Neraval / Tanam — more advanced expansion, usually learned later\n\nThe key idea is this: Manodharma is not \"anything you feel like singing.\" It is freedom with memory, grammar, and musical responsibility.' },
                    { type: 'info', title: 'Three Questions Before You Improvise', body: 'Before changing even one phrase, ask:\n\n1. Am I still inside the raga?\n2. If tala is present, am I still inside the tala?\n3. Can I still hear the original line or destination clearly?\n\nIf the answer to all three is yes, you are usually safe. Beginners do not fail because they are \"not creative.\" They fail because they lose one of these anchors.' },
                    { type: 'quiz', question: 'Which form of Manodharma strips away the beat (tala) entirely?', choices: ['Kalpanaswaram', 'Sangati', 'Raga Alapana', 'Neraval'], correct: 'Raga Alapana', explanation: 'Raga Alapana is completely freeform — sung without any rhythmic cycle. The singer explores the raga\'s character and emotion at any tempo, guided only by the raga\'s phrases.' },
                    { type: 'quiz', question: 'What is the strict creative boundary that all Manodharma must respect?', choices: ['The exact tempo of the tambura drone', 'The lyrics of the krithi being performed', 'The rules of the raga (allowed notes and phrases)', 'The singer\'s personal vocal comfort range'], correct: 'The rules of the raga (allowed notes and phrases)', explanation: 'Every improvised phrase — whether a sangati, kalpanaswaram, or alapana — must obey the raga\'s ascending and descending rules. Violating this is the most fundamental mistake in Manodharma.' }
                ]
            },
            {
                id: 'mano_1_2', title: 'Understanding Sangatis', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'What is a Sangati?', body: 'A sangati (சங்கதி) is a melodic variation of a composed line. The sahityam stays the same. The tala stays the same. The emotional meaning stays the same. Only the melodic treatment becomes richer.\n\nA healthy sangati progression usually follows this path:\n\n1. State the plain version clearly\n2. Repeat it with one small melodic expansion\n3. Add density only where the phrase can support it\n4. Preserve the identity of the original line\n\nIf listeners cannot recognise the base line anymore, the sangati has gone too far.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P1_S1, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Listen to Sangati 1 from Enna Thavam. This is the plain skeleton. Hear where the phrase rests and how clearly the line speaks.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ET_P1_S2, tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Now listen to Sangati 2. The tala is unchanged, the lyric placement is unchanged, but the melody becomes slightly more active.' },
                    { type: 'info', title: 'The Safe Levers of Variation', body: 'To create a beginner-friendly sangati, pull only one of these levers at a time:\n\n→ Duration: hold a note longer\n→ Density: fit more notes inside one beat\n→ Approach: come into a note from below or above\n→ Ornament: add a small gamaka or glide\n→ Register: touch the neighboring octave briefly, then return\n\nThis is the safest way to improvise. Change one lever. Keep everything else steady. That is how confidence is built.' },
                    { type: 'quiz', question: 'What stays exactly the same when you create a new sangati?', choices: ['The melody — only the words change', 'The lyrics and the tala cycle — only the melody elaborates', 'The notes — only the speed changes', 'The raga changes to a related one'], correct: 'The lyrics and the tala cycle — only the melody elaborates', explanation: 'In a sangati, the words (sahityam) and the rhythmic cycle (tala) remain completely fixed. Only the melodic content is elaborated or varied, while still arriving at the correct lyric on the correct beat.' },
                    { type: 'quiz', question: 'Which of these is NOT a sangati technique?', choices: ['Extending a note\'s duration', 'Adding a gamakam glide', 'Changing the words of the krithi', 'Subdividing a beat with more notes'], correct: 'Changing the words of the krithi', explanation: 'The lyrics (sahityam) of a krithi are never changed. A sangati only varies the melodic content within each beat — the words remain sacred and fixed.' }
                ]
            },
            {
                id: 'mano_1_3', title: 'Build Your First Safe Variation', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Change Only One Thing', body: 'The biggest beginner mistake is trying to become creative too suddenly. Do not rewrite the phrase. Do not decorate every beat. Instead, choose one controlled change.\n\nPractice ladder:\n1. Sing the original line plainly\n2. Repeat it, changing only the last note\n3. Repeat again, changing one interior beat\n4. Stop before the phrase loses its identity\n\nThis is real Manodharma: measured, musical change.' },
                    { type: 'free_sing', duration: 8, instruction: 'Sing a familiar line from Enna Thavam in your head, then aloud. On the final note only, hold it longer than usual. Keep everything else unchanged.' },
                    { type: 'free_sing', duration: 10, instruction: 'Sing the same line again, but this time add a tiny glide into the final note instead of changing the duration. Compare how this feels different from the previous variation.' },
                    { type: 'free_sing', duration: 12, instruction: 'Now try one interior change: pick just one beat in the line and fit two notes there instead of one. Do not alter the rest of the phrase. The goal is control, not complexity.' },
                    { type: 'quiz', question: 'What is the simplest way to create your own sangati from an existing line?', choices: ['Replace all the notes with new ones', 'Change just one note\'s duration or add a small glide', 'Sing the line in a completely different raga', 'Remove some of the tala beats'], correct: 'Change just one note\'s duration or add a small glide', explanation: 'Starting small is correct. A sangati does not require reinventing the phrase — extending one note or adding one glide is a legitimate technique used by concert artists. Build from small changes, not large ones.' }
                ]
            }
        ]
    },

    // ── Stage 2: Kalpanaswaram Level 1 ─────────────────────────────────────────
    {
        id: 'mano_stage2', title: 'Stage 2: Kalpanaswaram — Level 1',
        symbol: '🔢',
        subtitle: 'Improvised swara phrases that land back on the lyric',
        color: '#0e2a2a',
        tag: 'Stage 2',
        lessons: [
            {
                id: 'mano_2_1', title: 'What is Kalpanaswaram?', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'Improvised Swaras', body: 'Kalpanaswaram (கல்பனாஸ்வரம்) means swaras imagined and shaped in real time, but still disciplined by raga and tala.\n\nThe structure is:\n[Composed line] → [Improvised swaras] → [Return to the composed line]\n\nFor a beginner, the priority order is:\n1. Land correctly\n2. Stay in raga\n3. Sound clear\n4. Only then chase beauty and complexity\n\nIf the landing is wrong, the whole phrase feels wrong no matter how clever the notes were.' },
                    { type: 'quiz', question: 'What is the "Idam" in Kalpanaswaram?', choices: ['The loudest note in the improvisation', 'The exact beat where the krithi lyric must restart after the swara phrases', 'A type of gamakam ornament', 'The name of the opening note of the raga'], correct: 'The exact beat where the krithi lyric must restart after the swara phrases', explanation: 'The Idam is the landing point — the specific beat where you return to the krithi lyric after improvising. Missing the Idam is the most common beginner error in Kalpanaswaram.' },
                    { type: 'info', title: 'Choose a Krithi That Starts on Samam', body: 'For Level 1 Kalpanaswaram, you must practice with a krithi where the first lyric falls exactly on Beat 1 (Samam) of Adi Tala.\n\nWhy? Because your improvised swaras fill the remaining beats and must land cleanly back on Beat 1. This is the simplest version of the exercise.\n\nImportant: Enna Thavam Seidhanai does NOT start on Beat 1. Its lyric falls on Beat 2 — so it cannot be used for Level 1 Kalpanaswaram practice.\n\nKrithis that start on Samam (Beat 1):\n• Vatapi Ganapathim — Hamsadhwani, Adi\n• Endaro Mahanubhavulu — Sri, Adi\n• Kurai Ondrum Illai — Madhyamavati, Adi\n\nFor now, we practice the landing skill using Mayamalavagowla (your training raga), treating Sa as the "lyric home."' },
                    { type: 'quiz', question: 'Why must you choose a krithi starting on Beat 1 (Samam) for basic Kalpanaswaram?', choices: ['Because Beat 1 is louder', 'Because your improvised swaras can then fill a predictable number of beats and land cleanly back on Beat 1', 'Because only Beat 1 songs are taught to beginners', 'Because other beat positions violate raga rules'], correct: 'Because your improvised swaras can then fill a predictable number of beats and land cleanly back on Beat 1', explanation: 'When the Idam is on Beat 1 (Samam), you always know exactly how many beats you have for improvisation. This predictability makes counting and landing manageable for beginners.' }
                ]
            },
            {
                id: 'mano_2_2', title: 'The Internal Clock', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Counting While Singing', body: 'The secret to Kalpanaswaram is doing two jobs at once without panic:\n\n1. Your voice sings notes\n2. Your body continues tala steadily\n\nWhen beginners lose tala, they usually lose confidence in the next phrase too. So the hand is non-negotiable. Even if the swara phrase collapses, the tala must continue.\n\nUse this staircase:\n• 2 beats: sing only two notes and stop\n• 4 beats: sing a short phrase and stop\n• 8 beats: complete one full cycle and land\n\nDo not start with long phrases. Start with phrases you can count comfortably.' },
                    { type: 'taalam', instruction: 'Keep the Adi Tala going. Do not let your hand stop. Practice the full 8-beat cycle until it feels completely automatic — your hand should move without thinking.' },
                    { type: 'info', title: 'A Simple Landing Frame', body: 'Start with a tiny frame, not a grand improvisation.\n\nUsing Mayamalavagowla:\n\n2-beat idea:\n• Sa · Ri1 → land\n\n4-beat idea:\n• Sa · Ri1 · Ga3 · Ma1 → land\n\n8-beat idea:\n• Sa · Ri1 · Ga3 · Ma1 · Pa · Ga3 · Ri1 · Sa\n\nThe first victory is not originality. It is predictability: you should know exactly when the landing comes.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', '|', 'Pa', 'Ga3', '|', 'Ri1', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Listen: 4 beats ascending, then 4 beats descending back to Sa. Count the beats with your hand as it plays. Feel the final Sa as the landing.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', '|', 'Pa', 'Ga3', '|', 'Ri1', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Sing this phrase while keeping tala. It takes exactly one Adi Tala cycle (8 beats). The final Sa is your Idam — your landing note.' },
                    { type: 'free_sing', duration: 12, instruction: 'Keep Adi Tala going with your hand. Improvise any notes from Mayamalavagowla for 8 beats, then land on Sa. Repeat this loop 3–4 times. Keep the phrases simple. Focus only on landing cleanly.' }
                ]
            },
            {
                id: 'mano_2_3', title: 'Patterns That Return Home', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Golden Rule: Landing First, Beauty Second', body: 'In your first Kalpanaswaram attempts, beauty is a bonus — not the goal. Landing on the Idam IS the goal.\n\nMany students try to sing complex, ornate phrases and then miss the landing beat. A simple "Sa Ri Ga Sa" that lands perfectly on Beat 1 is better than a beautiful 10-note phrase that arrives on Beat 3.\n\nWork up to complexity only after your body automatically counts and lands. The music becomes beautiful on its own once the rhythm is solid.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', '|', 'Sa', 'Sa', '|', 'Ga3', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Listen: 4 ascending notes, hold Sa for 2 beats (beats 5–6), then a quick descent to land on Sa. One complete Adi Tala cycle ending cleanly at home.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', '|', 'Sa', 'Sa', '|', 'Ga3', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Sing this Kalpanaswaram phrase. Feel the final Sa as the Idam — the moment the "lyric" restarts.' },
                    { type: 'free_sing', duration: 15, instruction: 'Improvise your own Kalpanaswaram. Keep Adi Tala going with your hand. After every 8 beats, land on Sa. Use Mayamalavagowla notes. Keep phrases simple — landing on time is the entire goal right now.' },
                    { type: 'quiz', question: 'In beginner Kalpanaswaram practice, what takes priority over musical beauty?', choices: ['Singing the highest possible notes in the raga', 'Landing on the Idam (correct beat) accurately', 'Using as many different notes as possible', 'Singing very quickly to impress'], correct: 'Landing on the Idam (correct beat) accurately', explanation: 'Landing on the Idam is the foundational skill of Kalpanaswaram. A simple phrase that arrives on time is more musical than a complex phrase that misses the landing. Beauty and complexity are built on top of rhythmic accuracy — never before it.' }
                ]
            }
        ]
    },

    // ── Stage 3: Kalpanaswaram Level 2 ─────────────────────────────────────────
    {
        id: 'mano_stage3', title: 'Stage 3: Kalpanaswaram — Level 2',
        symbol: '🌀',
        subtitle: 'Leaping patterns, strategic holds, and grand finales',
        color: '#1a0a2a',
        tag: 'Stage 3',
        lessons: [
            {
                id: 'mano_3_1', title: 'Dhaatu — Leaping Patterns', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Moving Beyond Straight Scales', body: 'Level 1 Kalpanaswaram uses straight ascending or descending patterns: S R G M P D N.\n\nLevel 2 introduces Dhaatu — phrases that deliberately skip over notes, creating melodic leaps that give the music angular energy and interest.\n\nInstead of Sa Ri Ga Ma (straight), try:\n→ Sa Ga Ri Ma Ga Pa (leap up, step back, leap up again)\n→ Pa Ma Ga Ri Ga Ma (a wave pattern)\n→ Ni Pa Ga Ma Pa Ni (jumping toward the peak)\n\nThe key constraint: Dhaatu patterns must use only the raga\'s permitted notes. You cannot leap to a note that the raga excludes.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ga3', 'Ri1', 'Ma1', '|', 'Ga3', 'Pa', '|', 'Da1', 'Ni3'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Listen to an ascending Dhaatu (leaping) pattern in Mayamalavagowla: Sa Ga Ri Ma · Ga Pa · Da Ni. It leaps over the neighboring note at each step.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ga3', 'Ri1', 'Ma1', '|', 'Ga3', 'Pa', '|', 'Da1', 'Ni3'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Sing the ascending Dhaatu pattern. Feel how it sounds more angular and interesting than a straight scale.' },
                    { type: 'listen_sequence', swaras: ['Ni3', 'Da1', 'Pa', 'Ga3', '|', 'Ma1', 'Ri1', '|', 'Ga3', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Listen to a descending Dhaatu pattern that lands on Sa — the Idam: Ni Da Pa Ga · Ma Ri · Ga Sa.' },
                    { type: 'sing_sequence', swaras: ['Ni3', 'Da1', 'Pa', 'Ga3', '|', 'Ma1', 'Ri1', '|', 'Ga3', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Sing the descending Dhaatu phrase and land on Sa. The leap from Ga3 to Sa at the end is your Idam.' },
                    { type: 'free_sing', duration: 12, instruction: 'Improvise your own Dhaatu patterns in Mayamalavagowla. Deliberately skip over one note at a time. Keep tala going with your hand. Land on Sa after 8 beats.' }
                ]
            },
            {
                id: 'mano_3_2', title: 'Karvai — The Thinking Note', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Holds as Strategy', body: 'Advanced Kalpanaswaram singers do not fill every beat with rapid notes. They use Karvai (கர்வை) — holding a single note for 2 or 3 beats — as a strategic pause.\n\nTwo reasons:\n1. Musical: A sustained note creates tension and anticipation, making the next phrase more impactful.\n2. Practical: It gives your brain time to plan the next phrase without panicking.\n\nThe best note to hold is Pa (the 5th). Pa is stable in almost every raga — holding it never sounds wrong and always sounds intentional.\n\nStructure example:\nSa · Ri · Ga · [Pa — hold 2 beats] · Ga · Ri · Sa\n(1)  (2)  (3)   (4)       (5)       (6)  (7)  (8)' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Pa', '|', 'Pa', 'Ga3', '|', 'Ri1', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Listen to a Karvai pattern: Sa Ri Ga — hold Pa across beats 4 and 5 — Ga Ri Sa. Notice the breathing space the hold creates before the descent.' },
                    { type: 'sing_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Pa', '|', 'Pa', 'Ga3', '|', 'Ri1', 'Sa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Sing the Karvai phrase. Use the 2-beat hold on Pa to mentally plan the descent before you sing it. The hold is intentional — not a mistake.' },
                    { type: 'free_sing', duration: 12, instruction: 'Improvise in Adi Tala. When you feel stuck or need time to think, hold Pa for 2 full beats. Let the hold be deliberate. Then find your way home to Sa.' },
                    { type: 'quiz', question: 'What is the practical benefit of using a Karvai (note hold) during Kalpanaswaram?', choices: ['It impresses the audience with vibrato technique', 'It gives the brain time to plan the next phrase while still sounding musical', 'It signals a change of raga', 'It eliminates the need to keep tala'], correct: 'It gives the brain time to plan the next phrase while still sounding musical', explanation: 'A Karvai is both musically expressive AND strategically useful. Holding a stable note buys the singer thinking time — turning moments of uncertainty into deliberate, musical pauses.' }
                ]
            },
            {
                id: 'mano_3_3', title: 'The Teermanam — Your Grand Finale', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'The Three-Times Resolution', body: 'A Teermanam (தீர்மானம்) is a short rhythmic phrase repeated exactly 3 times that resolves powerfully onto the Idam.\n\nThe repetition × 3 structure creates strong rhythmic anticipation:\n• First time: the audience hears the pattern\n• Second time: they recognise it\n• Third time: they feel the inevitable resolution\n\nSimple Teermanam structure using Pa Ma Ga:\nP M G (rest) · P M G (rest) · P M G → Sa\n\nMathematically: each group is 4 beats → 3 × 4 = 12 beats. This means your Teermanam starts 12 beats before the Idam — so you plan accordingly.\n\nFor now, focus on the feel: sing the phrase 3 times, then resolve to Sa.' },
                    { type: 'listen_sequence', swaras: ['Pa', 'Ma1', 'Ga3', ',', 'Pa', 'Ma1', 'Ga3', ',', 'Pa', 'Ma1', 'Ga3', 'Sa'], instruction: 'Listen: P M G (rest) · P M G (rest) · P M G Sa — a simple Teermanam. The phrase repeats 3 times and resolves to Sa. Count each group as 4 beats.' },
                    { type: 'sing_sequence', swaras: ['Pa', 'Ma1', 'Ga3', ',', 'Pa', 'Ma1', 'Ga3', ',', 'Pa', 'Ma1', 'Ga3', 'Sa'], instruction: 'Sing the Teermanam. Mentally say "P M G / P M G / P M G Sa" as you go. Feel the pull of the resolution onto Sa at the end.' },
                    { type: 'free_sing', duration: 15, instruction: 'Improvise a complete Kalpanaswaram using all three tools: (1) Begin with a Dhaatu leaping phrase, (2) Hold a note (Karvai) in the middle, (3) End with a 3-time Teermanam that resolves to Sa. Keep tala the entire time.' },
                    { type: 'quiz', question: 'How many times is a Teermanam phrase repeated?', choices: ['Twice', 'Three times', 'Four times', 'As many times as the singer likes'], correct: 'Three times', explanation: 'A Teermanam is always repeated exactly 3 times. This triple repetition creates a sense of rhythmic inevitability — the audience hears, recognises, and then feels the resolution. Three is the fundamental number of Carnatic rhythmic closure.' }
                ]
            }
        ]
    },

    // ── Stage 4: Raga Alapana ───────────────────────────────────────────────────
    {
        id: 'mano_stage4', title: 'Stage 4: Raga Alapana',
        symbol: '🌊',
        subtitle: 'Freeform melody — no beat, only the raga\'s emotion',
        color: '#0a1a2a',
        tag: 'Stage 4',
        lessons: [
            {
                id: 'mano_4_1', title: 'What is Raga Alapana?', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'Singing the Raga\'s Soul', body: 'Raga Alapana (ராக ஆலாபனை) is melody without lyric or tala. Its purpose is not to show speed. Its purpose is to reveal identity, mood, and grammar.\n\nYou sing on neutral syllables:\n• "Aaaa" — the clearest and most open\n• "Naa" or "Ni" — adds focus and resonance\n• "Tha-na-na" — helps connect moving phrases\n• "Ri-ee" — brightens upper phrases\n\nA good alapana answers three questions for the listener:\n1. What raga is this?\n2. What mood does it carry?\n3. Which phrases make it unmistakable?\n\nThat is why alapana is often called the soul-introduction to a raga.' },
                    { type: 'quiz', question: 'What is the primary role of Raga Alapana in a Carnatic performance?', choices: ['To warm up the voice before the krithi', 'To introduce the raga\'s character and emotional identity to the audience', 'To demonstrate tala-keeping skill', 'To practice gamakam ornaments in isolation'], correct: 'To introduce the raga\'s character and emotional identity to the audience', explanation: 'Raga Alapana is a living introduction to the raga — the singer explores its special phrases, its characteristic note-holding patterns, and its emotional texture before any composed piece begins.' },
                    { type: 'info', title: 'No Rules on Syllables — Only on Notes', body: 'In an alapana you can mix syllables freely. Sing "Aa" for a long phrase, switch to "Naa" for a cascading descent, use "tha-na" for a fast passage.\n\nThe only rules are:\n1. Stay within the raga\'s permitted notes\n2. Respect the raga\'s characteristic phrases (how notes approach each other)\n3. Build from slow and quiet to more energetic — this arc is the classic alapana shape\n\nSpeed of the notes is completely free. You may hold any note for as long as you feel — a single note can be held for several seconds. This freedom is the beauty of alapana.' },
                    { type: 'quiz', question: 'Which of these is NOT a rule in Raga Alapana?', choices: ['Stay within the raga\'s permitted notes', 'Keep a steady tala cycle with hand gestures', 'Respect the raga\'s characteristic phrases', 'Build naturally from slow and quiet to more energetic'], correct: 'Keep a steady tala with hand gestures', explanation: 'Raga Alapana is completely free of rhythmic cycle. There is no tala, no hand gestures, no beat counting — the singer is entirely liberated from rhythm and focuses purely on melodic phrases and the emotional quality of the raga.' }
                ]
            },
            {
                id: 'mano_4_2', title: 'The Three Zones', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Structure Through Zones', body: 'A full Raga Alapana is divided into three zones, each progressively expanding the pitch range:\n\nZone A — The Foundation:\nBegin around the lower Pa (Pa below middle Sa) and explore up to middle Sa. Slow, meditative phrases. Establish the raga\'s identity in the low register.\n\nZone B — The Heart:\nFrom middle Sa, explore all the raga\'s notes through to Pa. This is the richest zone — the raga\'s personality lives here. Spend the most time here.\n\nZone C — The Peak:\nFrom Pa, ascend to the high Sa (Sa^). Arrive at it clearly, hold it, then cascade all the way back down through the full scale.\n\nBeginners: start with Zone B only. Once Zone B feels natural, add Zone A before it and Zone C after.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ['Pa.', 'Ri1.', 'Sa', ',', '|', ',', 'Ri1', '|', 'Ga3', 'Ma1'], instruction: 'Zone A: Starting from lower Pa (Pa.), through lower Ri (Ri1.), landing on middle Sa, then rising gently to Ga3 and Ma1. This is the grounding phase.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ri1', 'Ga3', 'Ma1', '|', 'Pa', 'Da1', '|', 'Ni3', 'Pa'], tala: { name: 'Adi', groups: [4, 2, 2], unitLabel: '8-beat cycle' }, instruction: 'Zone B: The full middle register of Mayamalavagowla — Sa up to Ni3, resting on Pa. This is the heart of the raga, where its character is clearest.' },
                    { type: 'listen_sequence', octaveMode: 'strict', swaras: ['Pa', 'Ni3', 'Sa^', ',', '|', 'Ni3', 'Pa', '|', 'Ga3', 'Sa'], instruction: 'Zone C: Ascending from Pa to high Sa (Sa^), holding it, then cascading down through Ni3, Pa, Ga3 back to middle Sa. This is the climax and resolution.' },
                    { type: 'free_sing', duration: 12, instruction: 'Zone B practice: Using Mayamalavagowla (Sa Ri1 Ga3 Ma1 Pa Da1 Ni3), explore the middle register freely. No tala. Sing "Aaa" or "Naa." Move slowly. Let notes breathe. Return often to Ga3.' },
                    { type: 'free_sing', duration: 15, instruction: 'Zone C practice: From Pa, rise to high Sa. Hold it clearly. Then slowly cascade all the way down to middle Sa. Repeat this arc 2–3 times, each time slightly different. No tala — just the arc.' }
                ]
            },
            {
                id: 'mano_4_3', title: 'Jiva Swaras — Soul Notes', tag: 'Concept',
                exercises: [
                    { type: 'info', title: 'Every Raga Has Anchor Notes', body: 'Every raga has 1 or 2 Jiva Swaras (ஜீவ ஸ்வரங்கள்) — "living notes" — that define its personality. Returning to these notes frequently gives the alapana its raga identity.\n\nExamples of Jiva Swaras:\n• Mayamalavagowla: Ga3 (Antara Gandhara) — its haunting, ancient quality\n• Bhairavi: Ga2 (lowered Ga) — gives the raga its sorrowful depth\n• Kalyani: Ma2 (raised Ma) — the immediately recognisable "Kalyani note"\n• Hamsadhwani: Pa and Ni3 — its bright, auspicious character\n• Kapi: Ga2 in descent — creates the emotional tension that defines the raga\n\nIn an alapana: keep returning to the Jiva Swara as an anchor. Let other notes decorate around it, but always come home to it.' },
                    { type: 'quiz', question: 'What is the function of the Jiva Swara in a Raga Alapana?', choices: ['It is always the highest note in the raga', 'It is the anchor note that most clearly signals the raga\'s identity, returned to frequently', 'It is always the note Sa', 'It is only sung once, at the very end'], correct: 'It is the anchor note that most clearly signals the raga\'s identity, returned to frequently', explanation: 'The Jiva Swara is the characteristic note of the raga — the one that most immediately signals to a listener which raga is being sung. Ornamenting it, resting on it, and returning to it repeatedly gives the alapana its coherent identity.' },
                    { type: 'quiz', question: 'Which note is the Jiva Swara of Mayamalavagowla, giving it its ancient and haunting quality?', choices: ['Sa', 'Ri1 (Shuddha Rishabha)', 'Ga3 (Antara Gandhara)', 'Pa'], correct: 'Ga3 (Antara Gandhara)', explanation: 'Ga3 (Antara Gandhara — the high natural third) is the defining note of Mayamalavagowla. Its contrast with the low Ri1 (Shuddha Rishabha) creates the raga\'s distinctive ancient, meditative quality that no other raga shares.' },
                    { type: 'listen_sequence', swaras: ['Sa', 'Ga3', 'Ga3', 'Ri1', '|', 'Ga3', ',', '|', 'Ri1', 'Sa'], instruction: 'Listen to Ga3 as an anchor: approached from Sa, held, approached again from Ri1, held again, then resolved. The phrase keeps returning to Ga3 — this is Jiva Swara practice.' },
                    { type: 'free_sing', duration: 12, instruction: 'Sing freely in Mayamalavagowla. Keep returning to Ga3 as your anchor. Approach it from Sa below, from Pa above, from Ri1. Rest on it. Ornament it slightly. Then depart. This is Jiva Swara practice.' }
                ]
            },
            {
                id: 'mano_4_4', title: 'Your First Alapana', tag: 'Practice',
                exercises: [
                    { type: 'info', title: 'Putting It Together', body: 'You now have all the tools for a complete alapana:\n\n✓ Zone A: Begin in the lower octave\n✓ Zone B: Explore the heart of the raga in the middle register\n✓ Zone C: Ascend to the peak and cascade back down\n✓ Jiva Swara: Keep returning to Ga3 as your anchor\n✓ Syllables: Sing "Aa," "Naa," or "Tha-na-na"\n✓ No tala: Let the phrases breathe at your natural pace\n\nFor your first alapana, do only Zone B. Start slowly. Move from note to note without rushing. Hold any note that feels right. Return to Ga3 often. Build intensity gradually. There is no wrong note as long as it belongs to Mayamalavagowla.' },
                    { type: 'free_sing', duration: 8, instruction: 'Mini-alapana: Slowly sing Sa, then rise to Ga3. Hold Ga3 for several counts. Move to Ma1 then return to Ga3. That arc — approach, hold, depart — is a complete alapana phrase. Repeat it.' },
                    { type: 'free_sing', duration: 20, instruction: 'Your First Alapana: Sing freely in Mayamalavagowla for 20 seconds. Start near Sa, build upward, return to Ga3 often, aim for Sa^ at the peak, then slowly cascade back down. No tala. No lyrics. Only the raga.' },
                    { type: 'quiz', question: 'In what order are the three zones of a Raga Alapana explored?', choices: ['Peak (Zone C) → Heart (Zone B) → Foundation (Zone A)', 'Heart (Zone B) → Foundation (Zone A) → Peak (Zone C)', 'Foundation (Zone A) → Heart (Zone B) → Peak (Zone C)', 'Any order works equally well'], correct: 'Foundation (Zone A) → Heart (Zone B) → Peak (Zone C)', explanation: 'A Raga Alapana always builds from the lower register upward to the peak. This mirrors the natural arc of musical storytelling: establish the foundation, explore the heart of the raga, then climax at the peak before resolving back down.' }
                ]
            }
        ]
    }
];

export const MANODHARMA_CURRICULUM = MANODHARMA_CURRICULUM_RAW.map(stage => ({
    ...stage,
    lessons: stage.lessons.map(lesson => ({
        ...lesson,
        exercises: lesson.exercises.map((ex, i) => ({ ...ex, id: ex.id ?? `ex_${i}` }))
    }))
}));

export const COURSES = [
    {
        id: 'foundations',
        title: 'Carnatic Singing Foundations',
        description: 'Complete training from scratch to align your ear, body, breath, rhythm, and basic swaras.',
        symbol: '🧘🏽‍♂️',
        color: '#1a0e3a',
        curriculum: CURRICULUM
    },
    {
        id: 'sarali_varisai',
        title: 'Sarali Varisai',
        description: 'The fundamental vocal exercises in single-beat rhythm to master notes positions.',
        symbol: '🎶',
        color: '#0f172a',
        curriculum: SARALI_CURRICULUM
    },
    {
        id: 'janta_varisai',
        title: 'Janta Varisai',
        description: 'Double-note sequences to practice vocal power, speed shifts, and swift note pulses.',
        symbol: '⚡',
        color: '#3a1313',
        curriculum: JANTA_CURRICULUM
    },
    {
        id: 'daatu_varisai',
        title: 'Daatu Varisai',
        description: 'Leaping note patterns that build high-level pitch accuracy and musical dexterity.',
        symbol: '🦘',
        color: '#311025',
        curriculum: DAATU_CURRICULUM
    },
    {
        id: 'melsthayi_mandrasthayi',
        title: 'Melsthayi / Mandrasthayi Varisai',
        description: 'Exercises in the lower octave (Mandhra Sthayi) to ground your voice and expand your range below Sa.',
        symbol: '🏔️',
        color: '#1e140a',
        curriculum: MANDHRA_CURRICULUM
    },
    {
        id: 'alankarams',
        title: 'Alankarams',
        description: 'Exercises in Mayamalavagowla across the 7 Saptha Talas — Druva, Matya, Rupaka, Jhampa, Triputa, Ata & Eka — practiced in multiple speeds.',
        symbol: '⏱️',
        color: '#1e3a1f',
        curriculum: ALANKARAM_CURRICULUM
    },
    {
        id: 'geetams',
        title: 'Geetams',
        description: 'Simple melodic songs that weave lyrics, notes, and rhythm together across seven ragas.',
        symbol: '🌸',
        color: '#1a2d1a',
        curriculum: GEETHAM_CURRICULUM
    },
    {
        id: 'swarajathis',
        title: 'Swarajathis',
        description: 'Structured, expressive compositions bridging simple geetams and advanced varnams.',
        symbol: '🎭',
        color: '#0f172a',
        curriculum: SWARAJATHI_CURRICULUM
    },
    {
        id: 'varnams',
        title: 'Varnams',
        description: 'The ultimate complex blueprints of Ragas, detailing speeds and gamakam glides.',
        symbol: '🦁',
        color: '#3a1313',
        curriculum: VARNAM_CURRICULUM
    },
    {
        id: 'kritis',
        title: 'Kritis',
        description: 'Classical, devotional masterworks that are the heart of a performance.',
        symbol: '🏛️',
        color: '#311025',
        curriculum: KRITIS_CURRICULUM
    },
    {
        id: 'manodharma_basics',
        title: 'Manodharma Basics',
        description: 'Introduction to creative improvisation, including Alapana and Kalpanaswaras.',
        symbol: '🌊',
        color: '#3a2b0e',
        curriculum: MANODHARMA_CURRICULUM
    },
    {
        id: 'manodharma_advanced',
        title: 'Advanced Manodharma',
        description: 'Advanced classical improvisation techniques, featuring Neraval and Pallavi structures.',
        symbol: '👑',
        color: '#1e3a1f',
        upcoming: true
    }
];
