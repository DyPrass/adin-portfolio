"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";

type Page = "home" | "about" | "skills" | "projects" | "experience" | "contact";
type Language = "id" | "en";
type Theme = "light" | "dark";

const content = {
  id: {
    nav: { home: "Beranda", about: "Tentang", skills: "Keahlian", projects: "Proyek", experience: "Pengalaman", contact: "Kontak", talk: "HUBUNGI SAYA", language: "Pilih bahasa", themeLight: "Beralih ke mode gelap", themeDark: "Beralih ke mode terang" },
    hero: { hello: "Halo, saya", role: "Mahasiswa Ilmu Komputer & Developer", description: "Mahasiswa Ilmu Komputer yang memiliki ketertarikan pada pengembangan aplikasi web dan mobile, database, serta teknologi digital.", projects: "Lihat Proyek Saya", cv: "Unduh CV", cvUnavailable: "CV belum tersedia untuk diunduh", socials: "Temukan saya di", identity: "KREATOR DIGITAL", identityLine1: "Pikiran ingin tahu.", identityLine2: "Karya penuh makna.", location: "Indonesia · 2026", developer: "Developer", platforms: "Web & Mobile", art: "DIBUAT DARI IDE", code: "karya: \"dengan cermat\"", ideas: "ide" },
    about: { eyebrow: "PERKENALAN SINGKAT", title: "Tentang", titleAccent: "Saya", lead: "Belajar hal baru, memahami masalah, lalu membuat sesuatu yang bermanfaat. Itu yang membuat saya terus tertarik pada teknologi.", bio: "Adin Prasetya adalah mahasiswa Ilmu Komputer Universitas Bina Bangsa semester 7. Saya tertarik mengeksplorasi bagaimana web, mobile, dan data bisa menghadirkan pengalaman digital yang terasa lebih dekat dan berguna.", interests: ["Pengembangan Web", "Pengembangan Mobile", "Database", "Teknologi Digital"], note: "Rasa ingin tahu adalah awal dari karya yang baik.", noteLocation: "SERANG, BANTEN", semester: "Semester", projects: "Proyek", projectsNote: "Personal & akademik", organizationYears: "Tahun berorganisasi", organizationNote: "Belajar melalui kolaborasi" },
    skills: { eyebrow: "PERANGKAT SAYA", title: "Keahlian &", accent: "Perangkat", lead: "Perangkat yang terus berkembang untuk mewujudkan ide digital yang bermanfaat.", groups: ["Pengembangan", "Database & Backend", "Perangkat", "Profesional"], professional: ["Administrasi", "Dokumentasi", "Komunikasi", "Kerja Sama Tim", "Pemecahan Masalah", "Teliti"], footnote: "Keahlian berkembang saat digunakan." },
    projects: { eyebrow: "KARYA PILIHAN", title: "Ide yang sedang", accent: "bertumbuh", lead: "Beberapa hal yang saya pelajari, bangun, dan kembangkan sejauh ini.", descriptions: ["Sistem pembayaran biaya pendidikan (SPP) berbasis web untuk Daarul Mubtadiin, dirancang untuk memudahkan pelacakan pembayaran dan pengelolaan catatan keuangan.", "Konsep aplikasi mobile untuk mengatur jadwal kuliah dan pengingat harian dengan praktis.", "Gagasan tahap awal untuk memudahkan pengelolaan informasi program kuliah kerja mahasiswa.", "Pengalaman web personal yang mengubah ucapan ulang tahun menjadi sesuatu yang berkesan."], personal: "Proyek pribadi", concept: "Dalam pengembangan / konsep", completed: "Selesai", index: "PROYEK", selected: "KARYA PILIHAN", scheduleTitle: "Pengingat Jadwal Kuliah" },
    experience: { eyebrow: "PERJALANAN SEJAUH INI", title: "Pengalaman &", accent: "Pendidikan", lead: "Peran kecil, tujuan bersama, dan banyak ruang untuk terus berkembang.", organization: "Organisasi", education: "Pendidikan", entries: "ENTRI", typeOrganization: "Organisasi", typeEducation: "Pendidikan", current: "SEDANG MENEMPUH PENDIDIKAN", note: "Setiap pengalaman membawa sudut pandang baru.", certificates: "Sertifikat & Kegiatan", certificateName: "ToT Literasi Digital LDNU", certificateTheme: "Media Digital Sarana Efektif Dakwah Kaum Milineal", certificateOrganizer: "Tim Literasi Digital Kominfo bersama LD PBNU", certificateType: "SERTIFIKAT KEGIATAN", certificateLabel: "Nama" },
    education: { universityPeriod: "2023–Sekarang", universityProgram: "Program Studi Ilmu Komputer · Semester 7", highSchoolPeriod: "2020–2023", highSchoolProgram: "IPS" },
    contact: { eyebrow: "IDE ANDA DIMULAI DI SINI", titleFirst: "Mari Bangun", titleSecond: "Sesuatu", titleThird: "Bersama", lead: "Punya ide, pertanyaan, atau ingin berkolaborasi? Saya senang mendengar kabar dari Anda.", location: "Serang, Banten, Indonesia", availability: "Tersedia untuk kolaborasi jarak jauh", emailLabel: "Email placeholder:", formHeading: "KIRIM PESAN", name: "Nama Anda", namePlaceholder: "Siapa nama Anda?", email: "Alamat email", message: "Ceritakan ide Anda", messagePlaceholder: "Ceritakan apa yang sedang Anda pikirkan...", submit: "Kirim pesan", sending: "Mengirim...", disclaimer: "Pesan Anda akan dikirim langsung melalui email.", response: "Pesan berhasil dikirim. Terima kasih sudah menghubungi saya!", error: "Pesan gagal dikirim. Silakan coba lagi beberapa saat.", footer: "DIBUAT DENGAN RASA INGIN TAHU", back: "KEMBALI KE AWAL" },
    decorative: { toolkit: "PERANGKAT SAYA", selectedWork: "KARYA PILIHAN", project: "PROYEK", selected: "KARYA PILIHAN", profile: "profil.ts", madeIdeas: "DIBUAT DARI IDE", findMe: "Temukan saya di", scene: "Adegan" },
  },
  en: {
    nav: { home: "Home", about: "About", skills: "Skills", projects: "Projects", experience: "Experience", contact: "Contact", talk: "LET'S TALK", language: "Choose language", themeLight: "Switch to dark mode", themeDark: "Switch to light mode" },
    hero: { hello: "Hello, I'm", role: "Computer Science Student & Developer", description: "A Computer Science student interested in web and mobile application development, databases, and digital technology.", projects: "View My Projects", cv: "Download CV", cvUnavailable: "CV is not available to download yet", socials: "Find me on", identity: "DIGITAL CREATOR", identityLine1: "A curious mind.", identityLine2: "Thoughtful work.", location: "Indonesia · 2026", developer: "Developer", platforms: "Web & Mobile", art: "MADE OF IDEAS", code: "build: \"with care\"", ideas: "ideas" },
    about: { eyebrow: "A LITTLE INTRODUCTION", title: "About", titleAccent: "Me", lead: "Learning something new, understanding a problem, then making something useful. That is what keeps me curious about technology.", bio: "Adin Prasetya is a seventh-semester Computer Science student at Universitas Bina Bangsa. I am interested in exploring how web, mobile, and data can create more useful and approachable digital experiences.", interests: ["Web Development", "Mobile Development", "Database", "Digital Technology"], note: "Curiosity is where good work begins.", noteLocation: "SERANG, BANTEN", semester: "Semester", projects: "Projects", projectsNote: "Personal & academic", organizationYears: "Years in organizations", organizationNote: "Learning through collaboration" },
    skills: { eyebrow: "MY TOOLKIT", title: "Skills &", accent: "Tools", lead: "An evolving toolkit for bringing thoughtful digital ideas to life.", groups: ["Development", "Database & Backend", "Tools", "Professional"], professional: ["Administration", "Documentation", "Communication", "Teamwork", "Problem Solving", "Attention to Detail"], footnote: "Skills grow best when they are put to work." },
    projects: { eyebrow: "SELECTED WORK", title: "Ideas in", accent: "progress", lead: "A few things I have been learning, building, and shaping along the way.", descriptions: ["A web-based tuition fee (SPP) payment system designed for Daarul Mubtadiin to streamline payment tracking and financial record management.", "A mobile concept for keeping lecture schedules and everyday reminders in one clear place.", "An early-stage idea for making community service program information easier to organize.", "A personal web experience that turns a birthday message into something memorable."], personal: "Personal project", concept: "In development / concept", completed: "Completed", index: "PROJECT", selected: "SELECTED PROJECT", scheduleTitle: "Lecture Schedule Reminder" },
    experience: { eyebrow: "THE PATH SO FAR", title: "Experience &", accent: "Education", lead: "Small roles, shared goals, and plenty of room to keep growing.", organization: "Organization", education: "Education", entries: "ENTRIES", typeOrganization: "Organization", typeEducation: "Education", current: "CURRENTLY STUDYING", note: "Every experience adds a new perspective.", certificates: "Certificates & Activities", certificateName: "ToT Literasi Digital LDNU", certificateTheme: "Media Digital Sarana Efektif Dakwah Kaum Milineal", certificateOrganizer: "Tim Literasi Digital Kominfo bersama LD PBNU", certificateType: "CERTIFICATE OF ACTIVITY", certificateLabel: "Name" },
    education: { universityPeriod: "2023–Present", universityProgram: "Computer Science · Semester 7", highSchoolPeriod: "2020–2023", highSchoolProgram: "Social Sciences" },
    contact: { eyebrow: "YOUR NEXT IDEA STARTS HERE", titleFirst: "Let's Build", titleSecond: "Something", titleThird: "Together", lead: "Have an idea, a question, or want to collaborate? I would be glad to hear from you.", location: "Serang, Banten, Indonesia", availability: "Available for remote collaboration", emailLabel: "Email placeholder:", formHeading: "DROP A NOTE", name: "Your name", namePlaceholder: "What should I call you?", email: "Email address", message: "A little about your idea", messagePlaceholder: "Tell me what you have in mind...", submit: "Send message", sending: "Sending...", disclaimer: "Your message will be sent directly by email.", response: "Your message was sent successfully. Thank you for reaching out!", error: "Your message could not be sent. Please try again shortly.", footer: "MADE WITH CURIOSITY", back: "BACK TO START" },
    decorative: { toolkit: "MY TOOLKIT", selectedWork: "SELECTED WORK", project: "PROJECT", selected: "SELECTED PROJECT", profile: "profile.ts", madeIdeas: "MADE OF IDEAS", findMe: "Find me on", scene: "scene" },
  },
} as const;

const pages: { id: Page; key: keyof typeof content.id.nav }[] = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "experience", key: "experience" },
  { id: "contact", key: "contact" },
];

const profiles = [
  { name: "GitHub", mark: "GH", href: "https://github.com/DyPrass" },
  { name: "LinkedIn", mark: "in", href: "https://www.linkedin.com/in/adin-prasetya-8618a2435" },
];

const skillGroups = [
  { title: "Development", skills: ["Flutter", "Dart", "Laravel", "PHP", "JavaScript", "TypeScript", "React", "Next.js", "HTML", "Node.js", "CSS"] },
  { title: "Database & Backend", skills: ["Firebase", "Firestore", "MySQL", "REST API"] },
  { title: "Tools", skills: ["Git", "GitHub", "VS Code", "Android Studio", "Figma", "Microsoft Office"] },
  { title: "Professional", skills: ["Administration", "Documentation", "Communication", "Teamwork", "Problem Solving", "Attention to Detail"] },
];

const projects: { title: string; description: string; stack: string[]; status: string; mark: string; visual: string; image?: string; imageAlt?: string }[] = [
  { title: "Mubtadiin Connect", description: "A web-based tuition fee (SPP) payment system designed for Daarul Mubtadiin to streamline payment tracking and financial record management.", stack: ["Laravel", "PHP", "MySQL", "Firebase", "Google API"], status: "Completed", mark: "M", visual: "mubtadiin", image: "/mubtadiin-connect.jpg", imageAlt: "Tampilan platform Mubtadiin Connect: halaman login dan dashboard bendahara serta santri" },
  { title: "Pengingat Jadwal Kuliah", description: "A mobile concept for keeping lecture schedules and everyday reminders in one clear place.", stack: ["Flutter", "Dart", "Firebase", "Firestore"], status: "Personal project", mark: "08:30", visual: "schedule", image: "/pengingat-jadwal.jpg", imageAlt: "Rangkaian tampilan aplikasi Pengingat Jadwal Kuliah: login, dashboard tugas, dan menu aplikasi" },
  { title: "KKM Management System", description: "An early-stage idea for making community service program information easier to organize.", stack: ["Laravel", "PHP", "MySQL", "Flutter"], status: "In development / concept", mark: "K", visual: "kkm" },
  { title: "Birthday Card Web", description: "A personal web experience that turns a birthday message into something memorable.", stack: ["Next.js", "TypeScript", "CSS", "Firebase"], status: "Personal project", mark: "B", visual: "birthday" },
];

const experience = [
  { years: "2024–2025", role: "Sekretaris Divisi Kominfo", organization: "Himpunan Ilmu Komputer", place: "Universitas Bina Bangsa" },
  { years: "2023–2024", role: "Anggota", organization: "Himpunan Ilmu Komputer", place: "Universitas Bina Bangsa" },
  { years: "2020–2023", role: "Pengurus Bagian Bahasa & Kebersihan", organization: "SMA Yaspidam", place: "Tangerang" },
];

const education = [
  { years: "2023–Sekarang", school: "Universitas Bina Bangsa", program: "Program Studi Ilmu Komputer · Semester 7", place: "Serang, Banten", current: true },
  { years: "2020–2023", school: "SMA Yaspidam", program: "IPS", place: "Tangerang", current: false },
];

function LanguageText({ text, reducedMotion }: { text: string; reducedMotion: boolean }) {
  const [displayedText, setDisplayedText] = useState(text);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (text === displayedText) return;
    if (reducedMotion) {
      const timer = window.setTimeout(() => {
        setDisplayedText(text);
        setEntering(false);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const count = Array.from(displayedText).length;
    const stagger = Math.min(0.015, 0.28 / Math.max(1, count - 1));
    const timer = window.setTimeout(() => {
      setDisplayedText(text);
      setEntering(true);
    }, 160 + Math.max(0, count - 1) * stagger * 1000);
    return () => window.clearTimeout(timer);
  }, [displayedText, reducedMotion, text]);

  const renderedText = reducedMotion ? text : displayedText;
  const words = renderedText.match(/\S+|\s+/g) ?? [];
  const count = Array.from(renderedText).length;
  const stagger = Math.min(0.015, 0.28 / Math.max(1, count - 1));
  const exiting = !reducedMotion && text !== displayedText;
  let characterIndex = 0;

  return (
    <em aria-label={text} style={{ fontStyle: "normal" }}>
      <em aria-hidden="true" style={{ fontStyle: "normal" }}>
        {words.map((word, wordIndex) => {
          if (/^\s+$/.test(word)) return word;
          return (
            <em key={`${wordIndex}-${word}`} style={{ display: "inline-block", fontStyle: "normal", whiteSpace: "nowrap" }}>
              {Array.from(word).map((character) => {
                const index = characterIndex++;
                return (
                  <motion.em
                    className="animated-character"
                    key={`${index}-${character}`}
                    initial={entering && !reducedMotion ? { opacity: 0, y: 2 } : false}
                    animate={reducedMotion ? { opacity: 1, y: 0 } : exiting ? { opacity: 0, y: -2 } : { opacity: 1, y: 0 }}
                    transition={reducedMotion ? { duration: 0 } : { delay: index * stagger, duration: 0.16, ease: "easeOut" }}
                    style={{ display: "inline-block", fontStyle: "normal" }}
                  >
                    {character}
                  </motion.em>
                );
              })}
            </em>
          );
        })}
      </em>
    </em>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [direction, setDirection] = useState(1);
  const [formStatus, setFormStatus] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<Language>("id");
  const [theme, setTheme] = useState<Theme>("light");
  const prefersReducedMotion = useReducedMotion() ?? false;
  const activeIndex = pages.findIndex((page) => page.id === activePage);
  const t = content[language];
  const tx = (text: string) => <LanguageText text={text} reducedMotion={prefersReducedMotion} />;

  useEffect(() => {
    let frame = 0;
    try {
      const savedLanguage = window.localStorage.getItem("portfolio-language");
      const savedTheme = window.localStorage.getItem("portfolio-theme");
      frame = window.requestAnimationFrame(() => {
        if (savedLanguage === "id" || savedLanguage === "en") setLanguage(savedLanguage);
        if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
      });
    } catch {
      // The portfolio remains usable when browser storage is unavailable.
    }
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem("portfolio-language", nextLanguage);
    } catch {
      // Keep the in-memory preference even if storage is unavailable.
    }
  }

  function changeTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      window.localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // Keep the in-memory preference even if storage is unavailable.
    }
  }

  function navigateTo(page: Page) {
    const nextIndex = pages.findIndex((item) => item.id === page);
    if (nextIndex === activeIndex) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActivePage(page);
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      setFormStatus(response.ok ? "success" : "error");
    } catch {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const scenes: Record<Page, ReactNode> = {
    home: (
      <div className="hero-layout page-width">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}><span className="eyebrow-dot" /> {tx(t.hero.hello)}</motion.p>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.65 }}>ADIN<br /><span>PRASETYA</span></motion.h1>
          <motion.p className="hero-role" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.55 }}>{tx(t.hero.role)}</motion.p>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.55 }}>{tx(t.hero.description)}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52, duration: 0.5 }}>
            <button className="button button-primary" onClick={() => navigateTo("projects")}>{tx(t.hero.projects)} <span aria-hidden="true">↗</span></button>
            <a className="button button-quiet" href="/CV_Adin%20Prasetya.pdf" download="CV_Adin Prasetya.pdf">{tx(t.hero.cv)} <span className="button-download" aria-hidden="true">↓</span></a>
          </motion.div>
          <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}><span className="social-label">{tx(t.hero.socials)}</span>{profiles.map((profile) => <a key={profile.name} href={profile.href} target="_blank" rel="noreferrer" aria-label={`${profile.name}`}>{profile.name}</a>)}</motion.div>
        </div>
        <div className="hero-art" aria-label={language === "id" ? "Ilustrasi abstrak profil developer" : "Abstract developer profile illustration"}>
          <div className="art-sun" /><div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" /><span className="art-cross art-cross-one" aria-hidden="true">+</span><span className="art-cross art-cross-two" aria-hidden="true">+</span><span className="art-dot art-dot-one" /><span className="art-dot art-dot-two" />
          <motion.div className="float-card code-card" animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [-2, -1, -2] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}><span className="code-top"><i /><i /><i /><span>{tx(t.decorative.profile)}</span></span><code><span className="code-blue">const</span> creator = &#123;<br />&nbsp;&nbsp;{tx(t.hero.code)}<br />&nbsp;&nbsp;{tx(t.hero.ideas)}: <b>∞</b><br />&#125;;</code></motion.div>
          <motion.div className="identity-card" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}><div className="identity-grid" /><div className="identity-monogram">AP</div><div className="identity-line" /><span className="identity-overline">{tx(t.hero.identity)}</span><strong>{tx(t.hero.identityLine1)}<br />{tx(t.hero.identityLine2)}</strong><span className="identity-location"><i /> {tx(t.hero.location)}</span></motion.div>
          <motion.div className="float-card role-card" animate={prefersReducedMotion ? undefined : { y: [0, 9, 0], rotate: [2, 1, 2] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}><span className="role-icon">&lt;/&gt;</span><span><b>{tx(t.hero.developer)}</b><small>{tx(t.hero.platforms)}</small></span></motion.div>
          <div className="art-caption"><span>01</span><span className="caption-rule" /><span>{tx(t.hero.art)}</span></div>
        </div>
      </div>
    ),
    about: (
      <div className="page-width scene-inner about-layout">
        <div className="scene-heading about-heading"><p className="eyebrow"><span className="eyebrow-dot" /> {tx(t.about.eyebrow)}</p><h1>{tx(t.about.title)} <span>{tx(t.about.titleAccent)}</span></h1><p className="scene-lead">{tx(t.about.lead)}</p><p className="about-bio">{tx(t.about.bio)}</p><div className="interest-row">{t.about.interests.map((interest, index) => <span key={index}>{tx(interest)}</span>)}</div></div>
        <div className="about-side"><div className="about-note"><span className="note-index">A / 01</span><span className="note-sparkle" aria-hidden="true">✳</span><p>{tx(t.about.note)}</p><small>{tx(t.about.noteLocation)}</small></div><div className="stat-grid"><motion.div className="stat-item" whileHover={{ y: -4 }}><strong>07</strong><span>{tx(t.about.semester)}</span><small>Universitas Bina Bangsa</small></motion.div><motion.div className="stat-item" whileHover={{ y: -4 }}><strong>03<span>+</span></strong><span>{tx(t.about.projects)}</span><small>{tx(t.about.projectsNote)}</small></motion.div><motion.div className="stat-item stat-wide" whileHover={{ y: -4 }}><strong>02<span>+</span></strong><span>{tx(t.about.organizationYears)}</span><small>{tx(t.about.organizationNote)}</small></motion.div></div></div>
      </div>
    ),
    skills: (
      <div className="page-width scene-inner skills-scene"><div className="scene-heading skills-heading"><p className="eyebrow"><span className="eyebrow-dot" /> {tx(t.skills.eyebrow)}</p><h1>{tx(t.skills.title)} <span>{tx(t.skills.accent)}</span></h1><p className="scene-lead">{tx(t.skills.lead)}</p></div><div className="skill-grid">{skillGroups.map((group, index) => <motion.article className={`skill-card skill-card-${index + 1}`} key={group.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.1, duration: 0.48 }} whileHover={{ y: -4 }}><div className="skill-card-top"><span>0{index + 1} / 04</span><span className="skill-arrow" aria-hidden="true">↗</span></div><h2>{tx(t.skills.groups[index])}</h2><div className="tag-list">{(index === 3 ? t.skills.professional : group.skills).map((skill, skillIndex) => <span className="skill-tag" key={skillIndex}>{tx(skill)}</span>)}</div><div className="skill-card-line" /></motion.article>)}</div><div className="skills-footnote"><span className="footnote-mark">✳</span> {tx(t.skills.footnote)}</div></div>
    ),
    projects: (
      <div className="page-width scene-inner projects-scene"><div className="scene-heading projects-heading"><p className="eyebrow"><span className="eyebrow-dot" /> {tx(t.projects.eyebrow)}</p><h1>{tx(t.projects.title)} <span>{tx(t.projects.accent)}</span></h1><p className="scene-lead">{tx(t.projects.lead)}</p></div><div className="project-grid">{projects.map((project, index) => <motion.article className={`project-card ${project.visual} ${project.status === "Completed" ? "completed" : ""}`} key={project.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.12, duration: 0.5 }} whileHover={{ y: -5 }}><div className={`project-art ${project.visual}`}><span className="project-art-index">{tx(t.projects.index)} / 0{index + 1}</span>{project.image ? <Image className="project-art-image" src={project.image} alt={project.imageAlt ?? ""} fill sizes="(max-width: 760px) 100vw, (max-width: 1050px) 33vw, 25vw" /> : <><span className="project-art-mark">{project.mark}</span><span className="project-art-orbit" /></>}</div><div className="project-content"><div className="project-meta"><span>0{index + 1} — {tx(t.projects.selected)}</span><span className="project-status"><i />{tx(project.status === "Completed" ? t.projects.completed : project.status === "In development / concept" ? t.projects.concept : t.projects.personal)}</span></div><h2>{tx(index === 1 ? t.projects.scheduleTitle : project.title)}</h2><p>{tx(t.projects.descriptions[index])}</p><div className="tag-list project-tags">{project.stack.map((technology) => <span className="skill-tag" key={technology}>{technology}</span>)}</div></div></motion.article>)}</div></div>
    ),
    experience: (
      <div className="page-width scene-inner experience-scene">
        <div className="scene-heading experience-heading"><p className="eyebrow"><span className="eyebrow-dot" /> {tx(t.experience.eyebrow)}</p><h1>{tx(t.experience.title)} <span>{tx(t.experience.accent)}</span></h1><p className="scene-lead">{tx(t.experience.lead)}</p></div>
        <div className="journey-columns">
          <section className="journey-column" aria-labelledby="organization-heading"><div className="column-heading"><span className="column-symbol">01</span><h2 id="organization-heading">{tx(t.experience.organization)}</h2><span className="column-count">03 {tx(t.experience.entries)}</span></div><div className="timeline-list">{experience.map((item, index) => <article className="timeline-item" key={item.years}><span className="timeline-pin" /><div className="timeline-top"><span>{item.years}</span><span>{tx(t.experience.typeOrganization)}</span></div><h3>{tx(language === "id" ? item.role : ["Information and Communications Division Secretary", "Member", "Language & Cleanliness Committee Member"][index])}</h3><p>{item.organization}</p><small>{item.place}</small></article>)}</div></section>
          <section className="journey-column education-column" aria-labelledby="education-heading"><div className="column-heading"><span className="column-symbol">02</span><h2 id="education-heading">{tx(t.experience.education)}</h2><span className="column-count">02 {tx(t.experience.entries)}</span></div><div className="timeline-list">{education.map((item) => <article className="timeline-item" key={item.school}><span className="timeline-pin" /><div className="timeline-top"><span>{tx(item.current ? t.education.universityPeriod : t.education.highSchoolPeriod)}</span><span>{tx(t.experience.typeEducation)}</span></div><h3>{item.school}</h3><p>{tx(item.current ? t.education.universityProgram : t.education.highSchoolProgram)}</p><small>{item.place}</small>{item.current && <span className="education-current">{tx(t.experience.current)}</span>}</article>)}</div></section>
        </div>
        <section className="certificate-section" aria-labelledby="certificate-heading"><div className="certificate-heading"><span className="certificate-icon" aria-hidden="true">✳</span><h2 id="certificate-heading">{tx(t.experience.certificates)}</h2></div><motion.article className="certificate-card" whileHover={{ y: -3 }}><span className="certificate-mark" aria-hidden="true">✧</span><div className="certificate-copy"><span className="certificate-type">{tx(t.experience.certificateType)}</span><h3>{tx(t.experience.certificateName)}</h3><p className="certificate-theme">{tx(t.experience.certificateTheme)}</p><p className="certificate-organizer">{tx(t.experience.certificateOrganizer)}</p></div><span className="certificate-recipient"><small>{tx(t.experience.certificateLabel)}</small><strong>Adin Prasetya</strong></span></motion.article></section>
        <div className="experience-note"><span>✳</span> {tx(t.experience.note)}</div>
      </div>
    ),
    contact: (
      <div className="page-width scene-inner contact-scene"><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-dot" /> {tx(t.contact.eyebrow)}</p><h1>{tx(t.contact.titleFirst)}<br /><span>{tx(t.contact.titleSecond)}</span><br />{tx(t.contact.titleThird)}</h1><p className="contact-lead">{tx(t.contact.lead)}</p><div className="contact-location"><span className="location-pin" /><div><strong>{tx(t.contact.location)}</strong><small>{tx(t.contact.availability)}</small></div></div><div className="contact-socials">{profiles.map((profile) => <a href={profile.href} target="_blank" rel="noreferrer" key={profile.name}><span>{profile.mark}</span>{profile.name}<i aria-hidden="true">↗</i></a>)}</div><p className="email-placeholder">{tx(t.contact.emailLabel)} <a href="mailto:adinprasetya1999@gmail.com">adinprasetya1999@gmail.com</a></p></div>
        <div className="contact-form-wrap"><div className="form-heading"><span>{tx(t.contact.formHeading)}</span><span className="form-stamp">AP / 06</span></div><form className="contact-form" onSubmit={handleContactSubmit}><label htmlFor="contact-name">{tx(t.contact.name)}<span className="field-control"><input id="contact-name" name="name" placeholder=" " required /><span className="field-placeholder" aria-hidden="true">{tx(t.contact.namePlaceholder)}</span></span></label><label htmlFor="contact-email">{tx(t.contact.email)}<input id="contact-email" type="email" name="email" placeholder="you@example.com" required /></label><label htmlFor="contact-message">{tx(t.contact.message)}<span className="field-control"><textarea id="contact-message" name="message" placeholder=" " rows={4} required /><span className="field-placeholder" aria-hidden="true">{tx(t.contact.messagePlaceholder)}</span></span></label><button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>{tx(isSubmitting ? t.contact.sending : t.contact.submit)} <span aria-hidden="true">↗</span></button><p className="form-disclaimer">{tx(t.contact.disclaimer)}</p><p className="form-status" aria-live="polite">{formStatus === "success" ? tx(t.contact.response) : formStatus === "error" ? tx(t.contact.error) : ""}</p></form></div>
        <footer className="site-footer"><span>ADIN PRASETYA <i>·</i> PORTFOLIO</span><span>{tx(t.contact.footer)} <i>✳</i> 2026</span><button onClick={() => navigateTo("home")}>{tx(t.contact.back)} <span aria-hidden="true">↑</span></button></footer>
      </div>
    ),
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className={`portfolio-shell shell-${activePage}`} data-theme={theme}>
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
      <header className="site-header"><button className="wordmark" onClick={() => navigateTo("home")} aria-label="Adin Prasetya, go to home"><span className="wordmark-mark">a<span>.</span></span><span className="wordmark-name">ADIN PRASETYA<small>PORTFOLIO · 2026</small></span></button>
        <nav className="main-nav" aria-label={language === "id" ? "Navigasi utama" : "Main navigation"}><div className="journey-progress" aria-hidden="true"><span className="journey-progress-fill" style={{ width: `${((activeIndex + 1) / pages.length) * 100}%` }} /></div>{pages.map((page, index) => <button className={activePage === page.id ? "nav-link active" : "nav-link"} aria-current={activePage === page.id ? "page" : undefined} key={page.id} onClick={() => navigateTo(page.id)}><span className="nav-number">0{index + 1}</span>{tx(t.nav[page.key])}</button>)}</nav>
        <div className="header-actions"><div className="language-switch" role="group" aria-label={t.nav.language}><button type="button" className={language === "id" ? "language-option active" : "language-option"} aria-pressed={language === "id"} onClick={() => changeLanguage("id")}>ID</button><span aria-hidden="true">|</span><button type="button" className={language === "en" ? "language-option active" : "language-option"} aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>EN</button></div><button type="button" className="theme-toggle" onClick={changeTheme} aria-label={theme === "light" ? t.nav.themeLight : t.nav.themeDark} aria-pressed={theme === "dark"} title={theme === "light" ? t.nav.themeLight : t.nav.themeDark}><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span></button><button className="header-contact" onClick={() => navigateTo("contact")}>{tx(t.nav.talk)} <span aria-hidden="true">↗</span></button></div>
      </header>
      <AnimatePresence mode="sync" custom={direction} initial={false}><motion.main className={`scene scene-${activePage}`} key={activePage} custom={direction} initial="enter" animate="center" exit="exit" variants={{ enter: (travel: number) => prefersReducedMotion ? { x: 0, opacity: 1, scale: 1 } : { x: travel > 0 ? "100vw" : "-100vw", opacity: 0.65, scale: 0.985 }, center: { x: 0, opacity: 1, scale: 1 }, exit: (travel: number) => prefersReducedMotion ? { opacity: 0 } : { x: travel > 0 ? "-100vw" : "100vw", opacity: 0.65, scale: 0.985 } }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }} aria-label={`${t.decorative.scene} ${t.nav[pages[activeIndex].key]}`}>{scenes[activePage]}</motion.main></AnimatePresence>
      <div className="scene-controls" aria-label={language === "id" ? "Kontrol adegan" : "Scene controls"}><button onClick={() => navigateTo(pages[Math.max(0, activeIndex - 1)].id)} disabled={activeIndex === 0} aria-label={language === "id" ? "Adegan sebelumnya" : "Previous scene"}>←</button><span>0{activeIndex + 1}<i>/</i>0{pages.length}</span><button onClick={() => navigateTo(pages[Math.min(pages.length - 1, activeIndex + 1)].id)} disabled={activeIndex === pages.length - 1} aria-label={language === "id" ? "Adegan berikutnya" : "Next scene"}>→</button></div>
      <span className="ambient-coordinate" aria-hidden="true">SERANG / INDONESIA</span>
    </div>
    </MotionConfig>
  );
}
