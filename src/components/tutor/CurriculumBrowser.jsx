import React from 'react';
import { CURRICULUM, COURSES } from '../../utils/tutorCurriculum';
import { CuratedIcon, LockIcon, CheckIcon } from '../IconLibrary';

function ProgramsCatalog({ progress, onSelectCourse }) {
    const getCourseStats = (course) => {
        let total = 0;
        let completed = 0;
        const curr = course.curriculum || [];
        curr.forEach(u => {
            total += u.lessons.length;
            u.lessons.forEach(l => {
                if (progress[`${u.id}/${l.id}`]) completed++;
            });
        });
        return { total, completed };
    };

    return (
        <div className="w-full max-w-4xl flex flex-col gap-6 animate-fade-in relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COURSES.map(course => {
                    const isUpcoming = course.upcoming;
                    
                    if (!isUpcoming) {
                        const { total, completed } = getCourseStats(course);
                        return (
                            <button
                                key={course.id}
                                onClick={() => onSelectCourse(course.id)}
                                className="w-full text-left rounded-xl border border-c-border bg-c-surface hover:border-c-gold/40 hover:shadow-lg hover:shadow-c-gold/5 transition-all duration-300 flex flex-col overflow-hidden group relative heritage-card"
                            >
                                <div className="heritage-border-corner heritage-corner-tl" style={{ top: 2, left: 2 }} />
                                <div className="heritage-border-corner heritage-corner-tr" style={{ top: 2, right: 2 }} />
                                <div className="heritage-border-corner heritage-corner-bl" style={{ bottom: 2, left: 2 }} />
                                <div className="heritage-border-corner heritage-corner-br" style={{ bottom: 2, right: 2 }} />

                                <div className="px-5 py-5 flex items-start gap-4 flex-1">
                                    <div className="p-3 bg-c-gold-faint rounded-xl border border-c-border/40 text-c-gold flex-shrink-0 group-hover:scale-105 transition-transform animate-pulse" style={{ animationDuration: '3s' }}>
                                        <CuratedIcon icon={course.id} className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-playfair font-black text-base text-c-cream group-hover:text-c-gold transition-colors">
                                                {course.title}
                                            </span>
                                        </div>
                                        <p className="text-xs text-c-cream-dim leading-relaxed font-sans">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="border-t border-c-border/30 bg-c-card px-5 py-3.5 flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-[10px] font-mono text-c-cream-dark uppercase tracking-wider font-bold">
                                        <span className="flex items-center gap-1"><CuratedIcon icon="🏆" className="w-3.5 h-3.5 text-c-gold" /> active Path</span>
                                        <span className="text-c-gold">{completed} / {total} Lessons</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-c-bg rounded-full overflow-hidden border border-c-border/10">
                                        <div 
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                                            style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            </button>
                        );
                    }

                    // Upcoming Courses
                    return (
                        <div
                            key={course.id}
                            className="rounded-xl border border-c-border/30 bg-c-surface/40 flex flex-col overflow-hidden relative opacity-70 group"
                        >
                            <div className="px-5 py-5 flex items-start gap-4 flex-1">
                                <div className="p-3 bg-c-border/30 rounded-xl border border-c-border/10 text-c-cream-dim flex-shrink-0">
                                    <CuratedIcon icon={course.id} className="w-8 h-8 opacity-60" />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-playfair font-bold text-sm text-c-cream-dark">
                                            {course.title}
                                        </span>
                                        <span className="text-[8px] font-mono font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-c-gold-faint border border-c-gold/20 text-c-gold">
                                            Coming Soon
                                        </span>
                                    </div>
                                    <p className="text-xs text-c-cream-dark/80 leading-relaxed font-sans mt-0.5">
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="border-t border-c-border/20 bg-c-card/20 px-5 py-3 text-[10px] font-mono text-c-cream-dark/60 uppercase tracking-wider flex items-center gap-1.5">
                                <CuratedIcon icon="geetams" className="w-3.5 h-3.5 opacity-60" /> Future Program — Unlock Foundations First!
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export { ProgramsCatalog, CurriculumHome, UnitView };

// ─── Curriculum home ──────────────────────────────────────────────────────────

function CurriculumHome({ progress, isUnlocked, onSelectUnit, onReset, onBackToCatalog, activeCurriculum = CURRICULUM, structuredMode = false, onToggleStructuredMode }) {
    let totalLessons = 0;
    let completedLessons = 0;
    activeCurriculum.forEach(u => {
        totalLessons += u.lessons.length;
        u.lessons.forEach(l => {
            if (progress[`${u.id}/${l.id}`]) completedLessons++;
        });
    });

    return (
        <div className="w-full max-w-4xl flex flex-col gap-3">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center mb-2">
                <button 
                    onClick={onBackToCatalog} 
                    className="flex items-center gap-1.5 text-xs text-c-cream-dim hover:text-c-gold font-playfair transition-colors z-20 group"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Programs Catalog
                </button>
            </div>

            <div className="flex flex-col gap-1.5 mb-2 bg-c-surface p-4 rounded-xl border border-c-border">
                <div className="flex justify-between items-end">
                    <span className="font-playfair text-c-gold">Your Journey</span>
                    <span className="text-[10px] text-c-cream-dim font-mono">{completedLessons}/{totalLessons} Lessons</span>
                </div>
                <div className="w-full h-2 bg-c-bg rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${totalLessons ? (completedLessons/totalLessons)*100 : 0}%` }} />
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-c-border/40">
                    <span className="text-[10px] text-c-cream-dark">Structured progression (unlock in order)</span>
                    <button
                        onClick={onToggleStructuredMode}
                        role="switch"
                        aria-checked={structuredMode}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${structuredMode ? 'bg-c-gold' : 'bg-c-cream-dark/30'}`}
                        aria-label="Toggle structured mode"
                    >
                        <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200 ${structuredMode ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>
            
            {activeCurriculum.map((unit, idx) => {
                const unlocked = isUnlocked(idx);
                const done = unit.lessons.filter(l => progress[`${unit.id}/${l.id}`]).length;
                const total = unit.lessons.length;
                const complete = done === total;
                return (
                    <button key={unit.id} disabled={!unlocked} onClick={() => onSelectUnit(unit, idx)}
                            className={`w-full text-left rounded-xl border overflow-hidden transition-all duration-200 ${
                                unlocked ? 'border-c-border hover:border-c-gold/40' : 'border-c-border/30 opacity-40 cursor-not-allowed'
                            }`}>
                        <div className="px-5 py-4 flex items-center gap-4" style={{ background: unit.color }}>
                            <span className="text-white/80"><CuratedIcon icon={unit.symbol} className="w-6 h-6 text-white" /></span>
                            <div className="flex-1">
                                <div className="font-playfair text-white font-bold">{unit.title}</div>
                                <div className="text-white/55 text-[11px] mt-0.5">{unit.subtitle}</div>
                                {unlocked && unit.swaras && (
                                    <div className="flex gap-1.5 mt-2 flex-wrap">
                                        {unit.swaras.map((s, i) => (
                                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-mono">{s}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {!unlocked && <LockIcon className="w-5 h-5 text-white/40" />}
                            {complete && <CheckIcon className="w-5 h-5 text-emerald-400 stroke-[3]" />}
                        </div>
                        {unlocked && (
                            <div className="bg-c-surface px-5 py-2.5 flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-c-border rounded-full overflow-hidden">
                                    <div className="h-full bg-c-gold rounded-full transition-all duration-500"
                                         style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                                </div>
                                <span className="text-[10px] text-c-cream-dark font-mono">{done}/{total} lessons</span>
                            </div>
                        )}
                    </button>
                );
            })}
            
            {completedLessons > 0 && (
                <button onClick={onReset} className="mt-4 py-2 text-xs text-c-cream-dim hover:text-red-400 transition-colors">
                    Reset Progress
                </button>
            )}
        </div>
    );
}

// ─── Unit view ────────────────────────────────────────────────────────────────

function UnitView({ unit, progress, onSelectLesson, onBack, structuredMode = false }) {
    const isUnlocked = (idx) => !structuredMode || idx === 0 || !!progress[`${unit.id}/${unit.lessons[idx - 1].id}`];
    return (
        <div className="w-full max-w-lg flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="text-c-cream-dark hover:text-c-gold transition-colors">←</button>
                <div>
                    <h2 className="font-playfair text-xl text-c-gold">{unit.title}</h2>
                    <p className="text-[11px] text-c-cream-dark">{unit.subtitle}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {unit.lessons.map((lesson, idx) => {
                    const done = !!progress[`${unit.id}/${lesson.id}`];
                    const unlocked = isUnlocked(idx);
                    return (
                        <button key={lesson.id} disabled={!unlocked} onClick={() => unlocked && onSelectLesson(lesson)}
                                className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border transition-all ${
                                    done     ? 'border-c-gold/30 bg-c-gold/5 hover:border-c-gold/50' :
                                    unlocked ? 'border-c-border bg-c-surface hover:border-c-gold/30' :
                                    'border-c-border/20 opacity-35 cursor-not-allowed'
                                }`}>
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm flex-shrink-0 ${
                                done     ? 'border-emerald-500/60 bg-emerald-900/30 text-emerald-400' :
                                unlocked ? 'border-c-gold/40 bg-c-gold-faint text-c-gold' :
                                'border-c-border text-c-cream-dark'
                            }`}>
                                {done ? <CheckIcon className="w-4 h-4 text-emerald-400 stroke-[3]" /> : unlocked ? idx + 1 : <LockIcon className="w-3.5 h-3.5 text-c-cream-dark/50" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-playfair text-sm text-c-cream">{lesson.title}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    {lesson.tag && <span className="text-[9px] px-1.5 py-0.5 rounded bg-c-border/40 text-c-cream-dark uppercase tracking-wide">{lesson.tag}</span>}
                                    <span className="text-[10px] text-c-cream-dark">{lesson.exercises.length} exercises</span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────
