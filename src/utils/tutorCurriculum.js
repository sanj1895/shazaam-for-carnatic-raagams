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

export const GEETHAM_CURRICULUM = [
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
                    { type: 'listen_sequence', swaras: ['Ma1','Pa','|','Da1','Ṡ','Ṡ','Ṙ','||','Ṙ','Ṡ','|','Da1','Pa','Ma1','Pa','||'], displayLabel: '♪', instruction: 'Listen to the opening phrase — two Rūpaka cycles: Ma Pa | Da Ṡ Ṡ Ṙ || Ṙ Ṡ | Da Pa Ma Pa ||' },
                    { type: 'listen_sequence', swaras: ['Ri1','Ma1','|','Pa','Da1','Ma1','Pa','||','Da1','Pa','|','Ma1','Ga3','Ri1','Sa','||','Sa',',','|','Ri1','Ma1','Ga3','Ri1','||','Sa','Ri1','|','Ga3','Ri1','Sa',',','||'], displayLabel: '♪', instruction: 'Listen to lines 2–3 — the descent and closing cadence: R M | P D M P || D P | M G R S || S , | R M G R || S R | G R S , ||' },
                    { type: 'sing_sequence', swaras: ['Ma1','Pa','|','Da1','Ṡ','Ṡ','Ṙ','||','Ṙ','Ṡ','|','Da1','Pa','Ma1','Pa','||'], speed: 1, instruction: 'Sing the opening phrase: Ma Pa | Da Ṡ Ṡ Ṙ || Ṙ Ṡ | Da Pa Ma Pa ||' },
                    { type: 'sing_sequence', swaras: ['Sa',',','|','Ri1','Ma1','Ga3','Ri1','||','Sa','Ri1','|','Ga3','Ri1','Sa',',','||'], speed: 1, instruction: 'Sing the closing cadence of Śrī Gaṇanātha: Sa , | Ri Ma Ga Ri || Sa Ri | Ga Ri Sa , ||' },
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
        upcoming: true
    },
    {
        id: 'varnams',
        title: 'Varnams',
        description: 'The ultimate complex blueprints of Ragas, detailing speeds and gamakam glides.',
        symbol: '🦁',
        color: '#3a1313',
        upcoming: true
    },
    {
        id: 'kritis',
        title: 'Kritis',
        description: 'Classical, devotional masterworks that are the heart of a performance.',
        symbol: '🏛️',
        color: '#311025',
        upcoming: true
    },
    {
        id: 'manodharma_basics',
        title: 'Manodharma Basics',
        description: 'Introduction to creative improvisation, including Alapana and Kalpanaswaras.',
        symbol: '🌊',
        color: '#3a2b0e',
        upcoming: true
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
