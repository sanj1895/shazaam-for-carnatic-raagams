import React from 'react';

// Shared premium SVG icons to replace emojis
export const DroneIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v20M17 5v14M7 9v6M22 10v4M2 11v2" />
    </svg>
);

export const KeyboardIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="6" y1="4" x2="6" y2="20" />
        <line x1="10" y1="4" x2="10" y2="20" />
        <line x1="14" y1="4" x2="14" y2="20" />
        <line x1="18" y1="4" x2="18" y2="20" />
        <rect x="4" y="4" width="3" height="10" fill="currentColor" />
        <rect x="8" y="4" width="3" height="10" fill="currentColor" />
        <rect x="12" y="4" width="3" height="10" fill="currentColor" />
        <rect x="16" y="4" width="3" height="10" fill="currentColor" />
    </svg>
);

export const TargetIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
);

export const LockIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const FireIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
);

// Course specific curated SVGs
export const CourseIcons = {
    foundations: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
            <path d="M12 8v8M8 12h8" />
            <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
        </svg>
    ),
    sarali_varisai: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
        </svg>
    ),
    janta_varisai: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
    daatu_varisai: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16a9 9 0 0 1 18 0" strokeWidth="2" />
            <path d="M7 16a5 5 0 0 1 10 0" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
    ),
    melsthayi_mandrasthayi: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22L12 6l8 16" />
            <path d="M9 22l3-6 3 6" />
        </svg>
    ),
    alankarams: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    geetams: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M12 2a10 10 0 0 0-4 18.5V22h8v-1.5A10 10 0 0 0 12 2z" />
        </svg>
    ),
    swarajathis: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
    ),
    varnams: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    kritis: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20h16M4 8h16M6 8v12M10 8v12M14 8v12M18 8v12M12 2L4 8h16z" />
        </svg>
    ),
    manodharma_basics: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.92c-.02.03-.06.06-.09.08H11v-2h2v1.92zm2-4c0 1-1 1.5-1.5 2h-1c-.5-.5-1-1-1-2 0-1.5 1.5-2.5 2.5-2.5S15 11 15 13.92z" />
        </svg>
    ),
    manodharma_advanced: ({ className = "w-6 h-6" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="currentColor" fillOpacity="0.1" />
            <rect x="3" y="18" width="18" height="2" rx="1" />
        </svg>
    )
};

// Curriculum units specific curated SVGs
export const UnitIcons = {
    orientation: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.1" />
        </svg>
    ),
    posture: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
            <path d="M12 7v10M8 12h8" />
        </svg>
    ),
    tala: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    calibration: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    ),
    perfect_fifth: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6v6l4 2" />
        </svg>
    ),
    swara_ladder: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 20h12M6 16h12M6 12h12M6 8h12M6 4h12" />
            <path d="M6 2v20M18 2v20" />
        </svg>
    ),
    ear_training: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
    ),
    sarali_bridge: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="6" y1="4" x2="6" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="18" y1="4" x2="18" y2="20" />
        </svg>
    ),
    readiness_gate: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
        </svg>
    ),
    graduation: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a4 4 0 0 1 4 4v7H8V6a4 4 0 0 1 4-4z" />
        </svg>
    ),
    sprout: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22V10M12 10a5 5 0 0 1 5-5h2M12 14a5 5 0 0 0-5-5H5" />
        </svg>
    ),
    leaf: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 19 11 20z" />
            <path d="M19 2L9.8 11.2" />
        </svg>
    ),
    twin_wave: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
    mountain: ({ className = "w-5 h-5" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22L12 6l8 16" />
            <path d="M9 22l3-6 3 6" />
        </svg>
    )
};

export const GurukulIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        {/* Temple Arch / Aureole (Prabhavali) */}
        <path d="M12 52C12 28 20 12 32 12C44 12 52 28 52 52" strokeWidth="2" stroke="currentColor" opacity="0.8" />
        <path d="M8 56C8 24 18 8 32 8C46 8 56 24 56 56" strokeWidth="1" stroke="currentColor" opacity="0.4" strokeDasharray="3 3" />
        
        {/* Traditional Lighted Diya (Oil Lamp) symbolizing classical knowledge */}
        <path d="M18 46C18 51.5 24.3 56 32 56C39.7 56 46 51.5 46 46C46 46 41 46 32 46C23 46 18 46 18 46Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.8" />
        <path d="M32 46C32 46 36 43 36 39C36 35 32 30 32 30C32 30 28 35 28 39C28 43 32 46 32 46Z" fill="currentColor" className="text-c-gold animate-pulse" />
        
        {/* Radiating sound rays of wisdom */}
        <line x1="32" y1="25" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="22" y1="29" x2="18" y2="26" stroke="currentColor" strokeWidth="1.5" />
        <line x1="42" y1="29" x2="46" y2="26" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Base steps */}
        <rect x="6" y="56" width="52" height="4" rx="2" fill="currentColor" strokeWidth="1" />
    </svg>
);

// Generic Curated Icon component mapping symbols/IDs to beautiful SVGs
export const CuratedIcon = ({ icon, className = "w-5 h-5" }) => {
    // Sadhana tab keys
    if (icon === 'shruthi') {
        return <DroneIcon className={className} />;
    }
    if (icon === 'tutor') {
        return <GurukulIcon className={className} />;
    }
    if (icon === 'keyboard') {
        return <KeyboardIcon className={className} />;
    }
    if (icon === 'singback') {
        return <TargetIcon className={className} />;
    }

    // Intercept standard Course IDs
    if (icon === 'foundations' || icon === '🧘🏽‍♂️') {
        const Comp = CourseIcons.foundations;
        return <Comp className={className} />;
    }
    if (icon === 'sarali_varisai' || icon === '🎶') {
        const Comp = CourseIcons.sarali_varisai;
        return <Comp className={className} />;
    }
    if (icon === 'janta_varisai' || icon === '⚡') {
        const Comp = CourseIcons.janta_varisai;
        return <Comp className={className} />;
    }
    if (icon === 'daatu_varisai' || icon === '🦘') {
        const Comp = CourseIcons.daatu_varisai;
        return <Comp className={className} />;
    }
    if (icon === 'melsthayi_mandrasthayi' || icon === '🏔️') {
        const Comp = CourseIcons.melsthayi_mandrasthayi;
        return <Comp className={className} />;
    }
    if (icon === 'alankarams' || icon === '⏱️') {
        const Comp = CourseIcons.alankarams;
        return <Comp className={className} />;
    }
    if (icon === 'geetams' || icon === '🌸') {
        const Comp = CourseIcons.geetams;
        return <Comp className={className} />;
    }
    if (icon === 'swarajathis' || icon === '🎭') {
        const Comp = CourseIcons.swarajathis;
        return <Comp className={className} />;
    }
    if (icon === 'varnams' || icon === '🦁') {
        const Comp = CourseIcons.varnams;
        return <Comp className={className} />;
    }
    if (icon === 'kritis' || icon === '🏛️') {
        const Comp = CourseIcons.kritis;
        return <Comp className={className} />;
    }
    if (icon === 'manodharma_basics' || icon === '🌊') {
        const Comp = CourseIcons.manodharma_basics;
        return <Comp className={className} />;
    }
    if (icon === 'manodharma_advanced' || icon === '👑') {
        const Comp = CourseIcons.manodharma_advanced;
        return <Comp className={className} />;
    }

    // Intercept Stage symbols
    if (icon === '🌅') {
        const Comp = UnitIcons.orientation;
        return <Comp className={className} />;
    }
    if (icon === '🫁') {
        const Comp = UnitIcons.posture;
        return <Comp className={className} />;
    }
    if (icon === '⏱️' || icon === '⏱️') {
        const Comp = UnitIcons.tala;
        return <Comp className={className} />;
    }
    if (icon === '🎯') {
        const Comp = UnitIcons.calibration;
        return <Comp className={className} />;
    }
    if (icon === '🌊') {
        const Comp = UnitIcons.perfect_fifth;
        return <Comp className={className} />;
    }
    if (icon === '🪜') {
        const Comp = UnitIcons.swara_ladder;
        return <Comp className={className} />;
    }
    if (icon === '👂') {
        const Comp = UnitIcons.ear_training;
        return <Comp className={className} />;
    }
    if (icon === '🎹') {
        const Comp = UnitIcons.sarali_bridge;
        return <Comp className={className} />;
    }
    if (icon === '🎓') {
        const Comp = UnitIcons.readiness_gate;
        return <Comp className={className} />;
    }
    if (icon === '🏆') {
        const Comp = UnitIcons.graduation;
        return <Comp className={className} />;
    }
    if (icon === '🌱') {
        const Comp = UnitIcons.sprout;
        return <Comp className={className} />;
    }
    if (icon === '🍃') {
        const Comp = UnitIcons.leaf;
        return <Comp className={className} />;
    }
    if (icon === '⚡') {
        const Comp = UnitIcons.twin_wave;
        return <Comp className={className} />;
    }
    if (icon === '⛰️') {
        const Comp = UnitIcons.mountain;
        return <Comp className={className} />;
    }
    if (icon === '🔥') {
        return <FireIcon className={className} />;
    }
    if (icon === '👑') {
        const Comp = CourseIcons.manodharma_advanced;
        return <Comp className={className} />;
    }

    // Default fallback to simple musical note SVG
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
        </svg>
    );
};
