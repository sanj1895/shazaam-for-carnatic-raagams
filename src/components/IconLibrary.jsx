import React from 'react';

// Shared premium SVG icons to replace emojis
export const DroneIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v20M17 5v14M7 9v6M22 10v4M2 11v2" />
    </svg>
);

export const KeyboardIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="6" y1="5" x2="6" y2="19" />
        <line x1="10" y1="5" x2="10" y2="19" />
        <line x1="14" y1="5" x2="14" y2="19" />
        <line x1="18" y1="5" x2="18" y2="19" />
        <path d="M5 5h2v8a1 1 0 0 1-2 0V5Z" fill="currentColor" stroke="none" />
        <path d="M9 5h2v8a1 1 0 0 1-2 0V5Z" fill="currentColor" stroke="none" />
        <path d="M17 5h2v8a1 1 0 0 1-2 0V5Z" fill="currentColor" stroke="none" />
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

export const PatIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v20M12 22l-4-4M12 22l4-4" strokeWidth="2" stroke="currentColor" />
        <circle cx="12" cy="6" r="3" fill="currentColor" fillOpacity="0.2" />
    </svg>
);

export const TapIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="1" opacity="0.3" />
        <path d="M12 18v-8M12 10l-3 3M12 10l3 3" strokeWidth="2" stroke="currentColor" />
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    </svg>
);

export const PlayIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" fillOpacity="0.2" />
    </svg>
);

export const StopIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="12" height="12" rx="2" ry="2" fill="currentColor" fillOpacity="0.2" />
    </svg>
);

export const WaveIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12c3-3 6-3 9 0s6 3 9 0" strokeWidth="2" stroke="currentColor" />
        <path d="M5 9c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0" strokeWidth="1" opacity="0.5" />
    </svg>
);

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

export const DhwaniIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="52" x2="52" y2="12" stroke="currentColor" strokeWidth="3" />
        <line x1="13" y1="53" x2="53" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="15" y1="49" x2="17" y2="47" stroke="#C8941F" strokeWidth="3.5" />
        <line x1="47" y1="17" x2="49" y2="15" stroke="#C8941F" strokeWidth="3.5" />
        <circle cx="23" cy="41" r="1" fill="currentColor" />
        <circle cx="27" cy="37" r="1" fill="currentColor" />
        <circle cx="31" cy="33" r="1" fill="currentColor" />
        <circle cx="35" cy="29" r="1" fill="currentColor" />
        <circle cx="39" cy="25" r="1" fill="currentColor" />
        <circle cx="43" cy="21" r="1" fill="currentColor" />
        <path d="M12 52 C 10 54, 8 55, 7 57" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="57" r="1.5" fill="#C8941F" />
        <path d="M7 57 C 6 59, 5 62, 5 63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        <path d="M7 57 C 8 59, 9 62, 9 63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        <path d="M7 57 C 7 59, 7 62, 7 63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        <path d="M49 9 C 52 7, 53 10, 56 8" stroke="currentColor" strokeWidth="1.2" opacity="0.7" className="animate-pulse" />
        <path d="M46 5 C 50 3, 52 6, 56 4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M52 13 C 55 11, 56 14, 59 12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
);

export const KoshaIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 18 C 12 12, 28 12, 32 18 C 36 12, 52 12, 52 18 V 48 C 52 42, 36 42, 32 48 C 28 42, 12 42, 12 48 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1.8" />
        <path d="M10 16 C 10 10, 28 10, 32 16 C 36 10, 54 10, 54 16 V 46 C 54 40, 36 40, 32 46 C 28 40, 10 40, 10 46 Z" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        <line x1="32" y1="16" x2="32" y2="48" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="24" x2="26" y2="24" stroke="currentColor" opacity="0.6" strokeWidth="1.2" />
        <line x1="16" y1="30" x2="28" y2="30" stroke="currentColor" opacity="0.6" strokeWidth="1.2" />
        <line x1="18" y1="36" x2="24" y2="36" stroke="currentColor" opacity="0.6" strokeWidth="1.2" />
        <path d="M36 34 Q 40 24, 44 32 T 50 30" stroke="currentColor" strokeWidth="1.5" className="text-c-gold" />
        <path d="M44 21 L45 23 L47 23 L45 24 L46 26 L44 25 L42 26 L43 24 L41 23 L43 23 Z" fill="#C8941F" className="animate-pulse" />
        <path d="M14 9 C 24 5, 40 5, 50 9" stroke="currentColor" opacity="0.25" strokeDasharray="3 3" />
        <path d="M14 53 C 24 57, 40 57, 50 53" stroke="currentColor" opacity="0.25" strokeDasharray="3 3" />
    </svg>
);

export const MelakartaIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.2" />
    </svg>
);

export const BhedamIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

export const TalamIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 20 Q 32 14, 50 20 L 50 44 Q 32 50, 14 44 Z" fill="currentColor" fillOpacity="0.06" strokeWidth="1.5" />
        <ellipse cx="14" cy="32" rx="5" ry="13" strokeWidth="1.5" />
        <ellipse cx="50" cy="32" rx="5" ry="13" strokeWidth="1.5" />
        <line x1="19" y1="21" x2="45" y2="21" strokeWidth="0.8" opacity="0.4" />
        <line x1="19" y1="43" x2="45" y2="43" strokeWidth="0.8" opacity="0.4" />
        <circle cx="46" cy="32" r="3" fill="currentColor" fillOpacity="0.7" strokeWidth="0" />
    </svg>
);

export const HomeIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

export const SadhanaIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
);

export const TranscribeIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10h24l8 8v34a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" fill="currentColor" fillOpacity="0.06" />
        <path d="M40 10v10h10" opacity="0.7" />
        <path d="M20 24h20" opacity="0.35" />
        <path d="M20 31h24" opacity="0.35" />
        <path d="M20 38h14" opacity="0.28" />
        <path d="M20 44c3-3 6-3 9 0s6 3 9 0 6-3 9 0" strokeWidth="2.1" />
        <circle cx="29" cy="44" r="1.9" fill="#C8941F" stroke="none" />
        <circle cx="38" cy="44" r="1.9" fill="#C8941F" stroke="none" />
        <path d="M48 20l2.5 2.5-11 11-5 1.5 1.5-5L47 19c.5-.5 1.2-.5 1.7 0z" fill="currentColor" fillOpacity="0.13" />
        <path d="M45.5 21.5l4 4" strokeWidth="1.2" opacity="0.75" />
        <path d="M33.5 36.5l3 3" strokeWidth="1.2" opacity="0.75" />
        <path d="M22 52c6 1.5 14 1.5 20 0" opacity="0.25" strokeDasharray="3 3" />
    </svg>
);

export const VivekaIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2" fill="#C8941F" stroke="none" />
        <circle cx="12" cy="12" r="5" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="9" strokeOpacity="0.25" fill="currentColor" fillOpacity="0.04" />
        <line x1="12" y1="3" x2="12" y2="6" strokeOpacity="0.35" />
        <line x1="12" y1="18" x2="12" y2="21" strokeOpacity="0.35" />
        <line x1="3" y1="12" x2="6" y2="12" strokeOpacity="0.35" />
        <line x1="18" y1="12" x2="21" y2="12" strokeOpacity="0.35" />
    </svg>
);

// Generic Curated Icon component mapping symbols/IDs to beautiful SVGs
export const CuratedIcon = ({ icon, className = "w-5 h-5" }) => {
    // Nav / Feature Tab keys
    if (icon === 'home') return <HomeIcon className={className} />;
    if (icon === 'sadhana') return <SadhanaIcon className={className} />;
    if (icon === 'shruthi') return <DroneIcon className={className} />;
    if (icon === 'tutor') return <GurukulIcon className={className} />;
    if (icon === 'keyboard') return <KeyboardIcon className={className} />;
    if (icon === 'singback') return <TargetIcon className={className} />;
    if (icon === 'listen') return <DhwaniIcon className={className} />;
    if (icon === 'viveka') return <VivekaIcon className={className} />;
    if (icon === 'transcribe') return <TranscribeIcon className={className} />;
    if (icon === 'library') return <KoshaIcon className={className} />;
    if (icon === 'talam') return <TalamIcon className={className} />;
    if (icon === 'melakarta') return <MelakartaIcon className={className} />;
    if (icon === 'bhedam') return <BhedamIcon className={className} />;

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
    if (icon === 'pat') {
        return <PatIcon className={className} />;
    }
    if (icon === 'tap') {
        return <TapIcon className={className} />;
    }
    if (icon === 'wave') {
        return <WaveIcon className={className} />;
    }
    if (icon === '🌸') {
        const Comp = CourseIcons.geetams;
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
