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
        upcoming: true
    },
    {
        id: 'janta_varisai',
        title: 'Janta Varisai',
        description: 'Double-note sequences to practice vocal power, speed shifts, and swift note pulses.',
        symbol: '⚡',
        color: '#3a1313',
        upcoming: true
    },
    {
        id: 'daatu_varisai',
        title: 'Daatu Varisai',
        description: 'Leaping note patterns that build high-level pitch accuracy and musical dexterity.',
        symbol: '🦘',
        color: '#311025',
        upcoming: true
    },
    {
        id: 'melsthayi_mandrasthayi',
        title: 'Melsthayi / Mandrasthayi Varisai',
        description: 'Sargam in high and low octaves to expand your vocal range.',
        symbol: '🏔️',
        color: '#3a2b0e',
        upcoming: true
    },
    {
        id: 'alankarams',
        title: 'Alankarams',
        description: 'Exercises set in different rhythmic cycles (Taalams) to master time signatures.',
        symbol: '⏱️',
        color: '#1e3a1f',
        upcoming: true
    },
    {
        id: 'geetams',
        title: 'Geetams',
        description: 'Simple melodic songs that weave lyrics, notes, and rhythm together.',
        symbol: '🌸',
        color: '#1a0e3a',
        upcoming: true
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
