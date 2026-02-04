import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu,
  ShieldCheck,
  User,
  Zap,
  Globe,
  Briefcase,
  GraduationCap,
  Eye,
  Box,
  CornerRightDown,
  ChevronRight,
  Activity,
  Cloud,
  FileText,
  Download,
  Layers,
  ArrowRight,
  Headphones,
  Server,
  Thermometer,
  Network,
  Brain,
  Lock,
  ScanFace,
  Fingerprint,
  ShieldAlert,
  Dna,
  Send,
  Menu,
  X
} from 'lucide-react';

// --- TYPES ---
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  icons?: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

// --- SNIPPETS FOR BACKGROUND ---
const AI_SNIPPET = `# DeepfakeDetectionAI - Xception Model Logic
from tensorflow.keras.applications import Xception
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

base_model = Xception(weights='imagenet', include_top=False)
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(1, activation='sigmoid')(x)

model = Model(inputs=base_model.input, outputs=predictions)
# ACCURACY: 88.55%
model.compile(optimizer='adam', loss='binary_crossentropy')`;

const BOT_SNIPPET = `# PersonalMusicBot - Discord.py & yt_dlp
import discord
from discord.ext import commands
import yt_dlp

ytdl_format_options = {
    'format': 'bestaudio/best',
    'noplaylist': 'True',
}
ffmpeg_options = {'options': '-vn'}

class Music(commands.Cog):
    @commands.command()
    async def play(self, ctx, *, url):
        async with ctx.typing():
            player = await YTDLSource.from_url(url, loop=self.bot.loop)
            ctx.voice_client.play(player)
# AD_FREE_LOGIC_ACTIVE`;

const ALGO_SNIPPET = `# Algorithmic-learning-Project - Complexity Analysis
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

# O(V + E) - Breadth First Search
def bfs(graph, root):
    visited, queue = {root}, collections.deque([root])
    while queue:
        vertex = queue.popleft()
# MEMOIZATION: FIBONACCI_O(N)`;

const NETWORK_SNIPPET = `# NetworkSecurity - OpenVPN Config
dev tun
proto udp
remote 13.59.xxx.xxx 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
cipher AES-256-GCM
auth SHA512
verb 3
# SECURITY_ENFORCED`;

// --- DATA ---
const PROJECTS: Project[] = [
  {
    title: "Deepfake Detection AI",
    description: "Developed and evaluated multiple machine learning models (Neural Network, SVM, Random Forest, Xception) for detecting fake images using the CIFAKE dataset; achieved up to 88.55% accuracy.",
    tech: ["Python", "TensorFlow", "Neural Networks", "Scikit-learn"],
    link: "https://github.com/RRitvikVR/DeepfakedectionAI"
  },
  {
    title: "Music Bot",
    description: "Created a Discord bot that plays YouTube videos with no ads, utilizing both Google and Discord's API using Python and hosting it using Docker.",
    tech: ["Python", "Docker", "Discord API", "Google API"],
    link: "https://github.com/RRitvikVR/PersonalMusicBot"
  },
  {
    title: "Algorithmic Learning",
    description: "A comprehensive exploration of computational efficiency and algorithmic optimization. Implemented core machine learning techniques and data structures to maximize performance in data-heavy environments.",
    tech: ["Python", "Algorithms", "Mathematics", "Optimization"],
    link: "https://github.com/RRitvikVR/Algorithmic-learning-Project"
  },
  {
    title: "Linux Server Infrastructure",
    description: "Architected a high-availability Linux environment using Docker containerization and Kubernetes orchestration. Automated scaling and management of service nodes for resilient deployments.",
    tech: ["Linux", "Docker", "Kubernetes", "DevOps"],
    link: "https://github.com/RRitvikVR"
  },
  {
    title: "AWS VPN Server",
    description: "Deployed OpenVPN on a free-tier AWS EC2 instance. Generated TLS certificates, configured iptables and security groups, enabled IP forwarding, and verified secure, encrypted remote access.",
    tech: ["AWS", "OpenVPN", "Networking", "Security"],
    link: "https://github.com/RRitvikVR"
  },
  {
    title: "Thermometer Project",
    description: "Designed a thermometer deploying Arduino and Android Studio to develop an app and a physical device allowing remote temperature monitoring from anywhere.",
    tech: ["Arduino", "Android Studio", "IoT", "Java"],
    link: "https://github.com/RRitvikVR"
  }
];

const EXPERIENCES: Experience[] = [
  {
    company: "Unique Jewelry Designs",
    role: "Web Developer",
    location: "Hybrid",
    period: "Feb 2025 — May 2025",
    description: [
      "Collaborated within a 3-person agile team to develop and deploy responsive web pages using WordPress and HTML.",
      "Aligned technical development with marketing strategies to ensure landing pages were optimized for user engagement and conversion.",
      "Participated in daily stand-ups and code reviews to ensure project milestones were met on time."
    ]
  },
  {
    company: "Kean University (OCIS)",
    role: "Desktop Support Specialist",
    location: "Union, NJ",
    period: "2022 — 2024",
    description: [
      "Provided technical support for 13,000+ users including students and staff, handling device repair and troubleshooting across Windows/macOS.",
      "Performed computer reimaging, hardware replacements (RAM, GPU, HDD), and large-scale system rollouts.",
      "Drafted step-by-step imaging guides to streamline onboarding for new hires.",
      "Built a hard drive sanitization box utilizing ShredOS, reducing reliance on third-party services.",
      "Managed 150+ IT tickets using FreshService, ensuring timely closure with minimal escalation."
    ]
  },
  {
    company: "Resilience Inc",
    role: "IT Operations Manager",
    location: "Tampa, FL",
    period: "2023 — 2024",
    description: [
      "Designed and implemented an automated ticketing system using Tines, integrating Discord and Google Spreadsheet APIs.",
      "Established a dedicated helpdesk team and delegated responsibilities to resolve internal technical issues efficiently.",
      "Managed and supervised helpdesk staff, maintaining high service quality standards."
    ]
  },
  {
    company: "DRSA USA",
    role: "Web Master",
    location: "Somerset, NJ",
    period: "2015 — 2021",
    description: [
      "Designed and developed a full-featured website using WordPress, optimizing layout and usability for event-driven content.",
      "Integrated widgets for payments, event listings, and social media to improve engagement.",
      "Configured PayPal integration for seamless event-specific payment processing."
    ]
  }
];

const SKILLS: SkillGroup[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "MYSQL", "HTML5", "JavaScript"]
  },
  {
    category: "Web Development",
    skills: ["WordPress"]
  },
  {
    category: "Cloud Services",
    skills: ["AWS", "Azure"]
  },
  {
    category: "Virtual Machines",
    skills: ["Hyper-V", "VirtualBox"]
  }
];

// --- BRANDING COMPONENTS ---

const ProjectIcon = ({ title, size = 32 }: { title: string; size?: number }) => {
  const normalized = title.toLowerCase();

  const renderIconWithCustomAnimation = () => {
    if (normalized.includes("deepfake")) {
      return (
        <div className="relative">
          <Brain size={size} className="text-antireal-purple" />
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="absolute w-1 h-1 bg-antireal-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              animate={{ 
                x: [0, (i % 2 === 0 ? 15 : -15), 0], 
                y: [0, (i < 2 ? -15 : 15), 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: '40%', left: '40%' }}
            />
          ))}
        </div>
      );
    }
    if (normalized.includes("music bot")) {
      return (
        <div className="relative flex items-center justify-center">
          <Headphones size={size} className="text-antireal-purple" />
          <motion.div 
            className="absolute -inset-2 border-2 border-antireal-purple/10 border-t-antireal-purple/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }
    if (normalized.includes("algorithmic")) {
      return (
        <div className="relative">
          <Network size={size} className="text-antireal-purple" />
          <motion.div 
            className="absolute -inset-1 border border-antireal-purple/20 rounded-md"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }
    if (normalized.includes("linux")) {
      return (
        <div className="relative">
          <Terminal size={size} className="text-antireal-purple" />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[2px] bg-antireal-purple/20"
            animate={{ scaleX: [0, 1, 0], originX: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      );
    }
    if (normalized.includes("aws vpn")) {
      return (
        <div className="relative">
          <Cloud size={size} className="text-antireal-purple" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1">
             <ShieldCheck size={size * 0.5} className="text-white fill-antireal-purple" />
          </div>
          <motion.div 
            className="absolute -inset-1.5 rounded-full border border-antireal-purple/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-antireal-purple rounded-full shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
          </motion.div>
        </div>
      );
    }
    if (normalized.includes("thermometer")) {
      return (
        <div className="relative">
          <Thermometer size={size} className="text-antireal-purple" />
          <motion.div 
            className="absolute -right-1 -bottom-1"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity size={14} className="text-antireal-purple" />
          </motion.div>
        </div>
      );
    }
    return <Box size={size} className="text-antireal-purple" />;
  };

  return (
    <div className="w-14 h-14 flex items-center justify-center relative">
      <div className="z-10">{renderIconWithCustomAnimation()}</div>
      <motion.div 
        className="absolute inset-0 bg-antireal-purple/5 rounded-full -z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const TechGlitchLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cloudPath = "M 25,65 C 10,65 10,45 25,45 C 25,25 55,25 55,40 C 75,35 90,45 85,65 L 25,65 Z";
  const corePath = "M 45,48 L 55,48 L 55,58 L 45,58 Z";

  const glitchVariants = {
    glitch: {
      x: [0, -2, 2, -1, 3, 0],
      y: [0, 1, -1, 2, -1, 0],
      opacity: [1, 0.8, 0.9, 0.7, 1, 1],
      transition: { duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 + 2 }
    }
  };

  return (
    <motion.div 
      className="relative w-10 h-10 cursor-pointer overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
    >
      <motion.svg viewBox="0 0 100 100" className="absolute inset-0 text-antireal-cyan mix-blend-screen" variants={glitchVariants} animate="glitch" style={{ x: -1.5 }}>
        <path d={cloudPath} fill="currentColor" opacity={0.4} />
        <path d={corePath} fill="currentColor" opacity={0.6} />
      </motion.svg>
      <motion.svg viewBox="0 0 100 100" className="absolute inset-0 text-antireal-mint mix-blend-screen" variants={glitchVariants} animate="glitch" style={{ x: 1.5 }}>
        <path d={cloudPath} fill="currentColor" opacity={0.4} />
        <path d={corePath} fill="currentColor" opacity={0.6} />
      </motion.svg>
      <motion.svg viewBox="0 0 100 100" className="absolute inset-0 text-antireal-purple">
        <path d={cloudPath} fill="currentColor" />
        <path d={corePath} fill="white" className="mix-blend-overlay" />
      </motion.svg>
      <motion.div animate={{ top: ['-10%', '110%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[1px] bg-white/60 shadow-[0_0_10px_white] z-10" />
    </motion.div>
  );
};

// --- BACKGROUND ANIMATION COMPONENTS ---

const CodeStream = ({ snippet, isHovered }: { snippet: string, isHovered: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0.08 }}
      animate={{ opacity: isHovered ? 0.15 : 0.08 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none" 
      style={{ transform: window.innerWidth > 768 ? "translateZ(-40px)" : "none" }}
    >
      <motion.div 
        initial={{ y: "0%" }}
        animate={{ y: "-50%" }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        className="font-mono text-[8px] md:text-[9px] font-bold whitespace-pre p-3 md:p-4 leading-relaxed text-antireal-indigo"
      >
        {snippet}{"\n"}{snippet}{"\n"}{snippet}{"\n"}{snippet}
      </motion.div>
    </motion.div>
  );
};

const GeometricTracer = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'repeating-linear-gradient(45deg, #1e1b4b, #1e1b4b 1px, transparent 1px, transparent 40px)' }} />
      <motion.div style={{ y: yParallax }} className="absolute -right-20 top-0 w-1/2 opacity-20">
        <svg viewBox="0 0 800 1200" className="w-full h-auto text-antireal-purple fill-none stroke-current">
          <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 4, ease: "easeInOut" }} strokeWidth="2" d="M 100,100 L 700,100 L 700,400 L 250,400 L 700,400 L 700,700 L 100,700" />
          <line x1="100" y1="400" x2="250" y2="400" strokeWidth="2" strokeDasharray="10 10" />
          <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} strokeWidth="2" d="M 100,800 L 700,800 L 700,1100 L 100,1100 Z M 100,950 L 700,950" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yParallaxSlow }} className="absolute left-[5%] top-[25%] opacity-40">
        <div className="flex flex-col gap-4">
           <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border border-antireal-mint flex items-center justify-center relative">
             <div className="absolute w-full h-px bg-antireal-mint/30" />
             <div className="absolute h-full w-px bg-antireal-mint/30" />
             <div className="w-3 h-3 bg-antireal-mint rounded-full" />
           </motion.div>
           <div className="text-[10px] font-mono font-bold text-antireal-purple uppercase tracking-[0.4em] bg-white/50 px-3 py-1 border-l-4 border-antireal-purple">NODE_REF: 0.1111A1FF</div>
           <div className="w-40 h-20 border border-antireal-indigo/10 checkerboard opacity-40" />
        </div>
      </motion.div>
    </div>
  );
};

const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [dims, setDims] = useState({ w: 1000, h: 1000 });

  useEffect(() => {
    const handleResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const glowX = useTransform(smoothX, [0, dims.w], [-50, 50]);
  const glowY = useTransform(smoothY, [0, dims.h], [-50, 50]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-antireal-base">
      <GeometricTracer />
      <motion.div style={{ x: glowX, y: glowY }} className="absolute top-[10%] left-[5%] w-[700px] h-[700px] bg-antireal-purple/10 rounded-full blur-[140px]" />
      <motion.div style={{ x: useTransform(glowX, (v) => -v), y: useTransform(glowY, (v) => -v) }} className="absolute bottom-[5%] right-[5%] w-[800px] h-[800px] bg-antireal-mint/10 rounded-full blur-[160px]" />
    </div>
  );
};

// --- PRIMARY UI COMPONENTS ---

const GlitchDownloadButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Ritvik_Roy_Resume.pdf';
        link.click();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-4 md:py-5 font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] cursor-pointer"
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Background Base Layer */}
      <motion.div 
        className="absolute inset-0 bg-antireal-mint border border-antireal-mint/80 -z-10"
        animate={!isHovered ? {
          borderColor: [
            'rgba(0, 245, 168, 0.8)',
            'rgba(0, 245, 168, 0.4)',
            'rgba(0, 245, 168, 0.6)',
            'rgba(0, 245, 168, 0.8)'
          ]
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content Layer */}
      <motion.div 
        className="relative flex items-center gap-2 md:gap-3 text-white z-10"
        animate={isHovered ? {
          textShadow: [
            '0 0 0px rgba(0, 0, 0, 0)',
            '2px 2px 0px rgba(0, 212, 255, 0.8)',
            '-2px -2px 0px rgba(168, 85, 247, 0.8)',
            '0 0 0px rgba(0, 0, 0, 0)'
          ]
        } : {
          textShadow: [
            '0 0 12px rgba(0, 245, 168, 0.5)',
            '0 0 24px rgba(0, 245, 168, 0.8)',
            '0 0 12px rgba(0, 245, 168, 0.5)'
          ]
        }}
        transition={{ 
          duration: isHovered ? 0.3 : 2.5, 
          repeat: Infinity, 
          repeatDelay: isHovered ? 0 : 0 
        }}
      >
        <Download size={16} />
        <span>Download Resume</span>
      </motion.div>

      {/* Idle State: Removed shimmer line */}

      {/* Distortion Layer 1 - Top Left (Always visible, intensity changes on hover) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 text-cyan-400 font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] pointer-events-none"
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={isHovered ? {
          opacity: [0, 0.6, 0, 0.5, 0],
          x: [-8, -4, -6, -2, 0],
          y: [-8, -4, 0, -3, 0],
          skewX: [-5, 5, -3, 0]
        } : {
          opacity: [0, 0.2, 0, 0.15, 0],
          x: [-4, -2, -3, -1, 0],
          y: [-4, -2, 0, -1.5, 0],
          skewX: [-2, 2, -1.5, 0]
        }}
        transition={{ duration: isHovered ? 0.4 : 1.2, repeat: Infinity, repeatDelay: isHovered ? 0.2 : 0.8 }}
      >
        <Download size={16} />
        <span>Download Resume</span>
      </motion.div>

      {/* Distortion Layer 2 - Bottom Right (Always visible, intensity changes on hover) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 text-antireal-purple font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] pointer-events-none"
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={isHovered ? {
          opacity: [0, 0.5, 0, 0.6, 0],
          x: [8, 4, 6, 2, 0],
          y: [8, 4, 0, 3, 0],
          skewX: [5, -5, 3, 0]
        } : {
          opacity: [0, 0.15, 0, 0.2, 0],
          x: [4, 2, 3, 1, 0],
          y: [4, 2, 0, 1.5, 0],
          skewX: [2, -2, 1.5, 0]
        }}
        transition={{ duration: isHovered ? 0.4 : 1.2, repeat: Infinity, repeatDelay: isHovered ? 0.15 : 0.6 }}
      >
        <Download size={16} />
        <span>Download Resume</span>
      </motion.div>

      {/* Corrupted Text Fragments (Always visible, intensity changes on hover) */}
      <>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-antireal-mint font-mono text-[9px] md:text-[10px] font-bold pointer-events-none"
          animate={isHovered ? {
            opacity: [0.4, 0, 0.4],
            x: [3, -3, 3],
            y: [-2, 2, -2],
            clip: ['inset(20% 0 20% 0)', 'inset(40% 0 40% 0)', 'inset(10% 0 60% 0)', 'inset(20% 0 20% 0)']
          } : {
            opacity: [0.15, 0, 0.15],
            x: [1.5, -1.5, 1.5],
            y: [-1, 1, -1],
            clip: ['inset(30% 0 30% 0)', 'inset(40% 0 40% 0)', 'inset(20% 0 60% 0)', 'inset(30% 0 30% 0)']
          }}
          transition={{ duration: isHovered ? 0.5 : 2, repeat: Infinity, repeatDelay: isHovered ? 0.1 : 1.5 }}
        >
          DN_LOAD_RES
        </motion.div>

        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-cyan-400 font-mono text-[9px] md:text-[10px] font-bold pointer-events-none"
          animate={isHovered ? {
            opacity: [0, 0.4, 0],
            x: [-3, 3, -3],
            y: [2, -2, 2],
            clip: ['inset(0 30% 0 30%)', 'inset(0 10% 0 10%)', 'inset(0 50% 0 50%)', 'inset(0 30% 0 30%)']
          } : {
            opacity: [0, 0.15, 0],
            x: [-1.5, 1.5, -1.5],
            y: [1, -1, 1],
            clip: ['inset(0 40% 0 40%)', 'inset(0 20% 0 20%)', 'inset(0 50% 0 50%)', 'inset(0 40% 0 40%)']
          }}
          transition={{ duration: isHovered ? 0.5 : 2, repeat: Infinity, repeatDelay: isHovered ? 0.25 : 1.2 }}
        >
          _DOWNLOAD__
        </motion.div>
      </>

      {/* Data Stream Effect (Always visible, intensity changes on hover) */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{ opacity: isHovered ? [0.3, 0.1, 0.3] : [0.1, 0.05, 0.1] }}
        transition={{ duration: isHovered ? 0.4 : 2, repeat: Infinity }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/50 font-mono text-[6px] font-bold"
            animate={{
              y: ['-20px', '60px'],
              opacity: isHovered ? [0, 0.6, 0] : [0, 0.2, 0],
              x: Math.sin(i) * 20
            }}
            transition={{
              duration: isHovered ? 0.6 : 2,
              repeat: Infinity,
              repeatDelay: i * (isHovered ? 0.1 : 0.4),
              ease: "linear"
            }}
            style={{ left: `${20 + i * 15}%` }}
          >
            {String(Math.floor(Math.random() * 16)).toString(16).toUpperCase()}
          </motion.div>
        ))}
      </motion.div>

      {/* Edge Tear Effect (Always visible, intensity changes on hover) */}
      <>
        <motion.div 
          className="absolute left-0 top-1/2 w-1 h-4 bg-cyan-400 -translate-y-1/2 pointer-events-none"
          animate={isHovered ? {
            opacity: [0.5, 0, 0.5],
            x: [0, -3, 0],
            scaleY: [1, 0.5, 1]
          } : {
            opacity: [0.2, 0, 0.2],
            x: [0, -1.5, 0],
            scaleY: [1, 0.7, 1]
          }}
          transition={{ duration: isHovered ? 0.3 : 1.5, repeat: Infinity, repeatDelay: isHovered ? 0.15 : 1 }}
        />
        <motion.div 
          className="absolute right-0 top-1/4 w-1 h-6 bg-antireal-purple pointer-events-none"
          animate={isHovered ? {
            opacity: [0, 0.5, 0],
            x: [0, 3, 0],
            scaleY: [0.5, 1, 0.5]
          } : {
            opacity: [0, 0.2, 0],
            x: [0, 1.5, 0],
            scaleY: [0.7, 1, 0.7]
          }}
          transition={{ duration: isHovered ? 0.3 : 1.5, repeat: Infinity, repeatDelay: isHovered ? 0.25 : 0.8 }}
        />
      </>

      {/* Glow/Shadow Shift Effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={isHovered ? {
          boxShadow: [
            '0 0 20px rgba(0, 245, 168, 0.3)',
            '0 0 40px rgba(0, 212, 255, 0.5), -8px 0 30px rgba(168, 85, 247, 0.3)',
            '0 0 20px rgba(0, 245, 168, 0.3)',
            '8px 0 30px rgba(0, 212, 255, 0.3), 0 0 40px rgba(168, 85, 247, 0.5)',
            '0 0 20px rgba(0, 245, 168, 0.3)'
          ]
        } : {
          boxShadow: [
            '0 0 15px rgba(0, 245, 168, 0.5)',
            '0 0 30px rgba(0, 245, 168, 0.7)',
            '0 0 15px rgba(0, 245, 168, 0.5)'
          ]
        }}
        transition={{ 
          duration: isHovered ? 0.5 : 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.a>
  );
};

const Header = ({ activeSection }: { activeSection: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['Profile', 'Projects', 'Experience', 'Contact'];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | null, id: string) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 100 : 120; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center backdrop-blur-xl border-b border-white/40">
        <div 
          className="flex items-center gap-3 md:gap-5 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <TechGlitchLogo />
          <span className="text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-antireal-indigo/70 group-hover:text-antireal-purple transition-colors truncate max-w-[150px] md:max-w-none">
            Ritvik Roy | CLOUD_AI_NODE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 lg:gap-12 text-[10px] font-mono font-bold uppercase tracking-[0.3em]">
          {navItems.map((item, i) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className={`transition-all flex items-center gap-2 group hover:text-antireal-purple ${activeSection === item.toLowerCase() ? 'text-antireal-indigo' : 'text-antireal-indigo/50'}`}
            >
              <span className={`text-[8px] transition-all group-hover:text-antireal-purple ${activeSection === item.toLowerCase() ? 'text-antireal-purple shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-antireal-purple/30'}`}>
                0{i+1}.
              </span>
              {item}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden p-2 text-antireal-indigo hover:text-antireal-purple transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] md:hidden pt-32 px-8"
            style={{
              background:
                "radial-gradient(circle at 10% 20%, rgba(168,85,247,0.08), transparent 35%)," +
                "radial-gradient(circle at 90% 10%, rgba(34,211,238,0.06), transparent 32%)," +
                "linear-gradient(135deg, rgba(243,244,255,0.96), rgba(243,244,255,0.9))",
              backdropFilter: "blur(18px)",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 20px 60px rgba(31,41,55,0.18)",
              border: "1px solid rgba(168,85,247,0.06)"
            }}
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    scrollToSection(e, item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 text-3xl font-bold uppercase italic tracking-tighter transition-all ${activeSection === item.toLowerCase() ? 'text-antireal-purple' : 'text-antireal-indigo'} hover:text-antireal-purple`}
                >
                  <span className="text-lg font-mono text-antireal-purple/40">0{i+1}.</span>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 180]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 px-4 md:px-6">
      <motion.div style={{ y: y1, opacity }} className="max-w-6xl w-full relative z-10">
        <div className="flex items-center gap-4 mb-6 md:mb-10">
          <div className="px-3 md:px-4 py-1.5 bg-antireal-purple/5 border border-antireal-purple/20 flex items-center gap-2 md:gap-3">
            <Activity size={14} className="text-antireal-purple animate-pulse" />
            <span className="text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-antireal-purple">Status: Active_Search // Cloud, AI & IT focus</span>
          </div>
        </div>
        <div className="relative">
          <motion.h1 
            initial={{ letterSpacing: "0.2em", opacity: 0 }}
            animate={{ letterSpacing: "-0.04em", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-bold tracking-tighter text-antireal-indigo leading-none mb-6 select-none mix-blend-multiply font-sans"
          >
            Ritvik Roy
          </motion.h1>
          <div className="hidden md:block absolute -top-12 -right-12 w-40 h-40 border-t border-r border-antireal-purple/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mt-10 md:mt-20 items-end">
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <p className="text-2xl sm:text-3xl md:text-5xl text-antireal-indigo/95 font-bold uppercase italic tracking-tight mb-6 md:mb-10 font-sans">
              Master's Student <span className="text-antireal-purple text-lg md:text-2xl font-mono tracking-normal block mt-2 md:mt-3 opacity-70">// Seeking Internship & Part-time</span>
            </p>
            <div className="flex flex-wrap gap-4 md:gap-5">
              <div className="px-6 md:px-10 py-4 md:py-5 antireal-glass border-antireal-indigo/5 flex items-center gap-2.5 md:gap-3">
                <img src="/Rutgers_Scarlet_Knights_logo.svg.png" alt="Rutgers University" className="h-4 md:h-5 w-auto object-contain flex-shrink-0" />
                <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-antireal-indigo/60 whitespace-nowrap">Rutgers University</span>
              </div>
              <div className="px-6 md:px-10 py-4 md:py-5 bg-antireal-purple text-white text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest shadow-2xl shadow-antireal-purple/30 hover:bg-antireal-purple/90 transition-all cursor-default flex items-center justify-center">Immediate Availability</div>
            </div>
          </motion.div>
          <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-col items-start md:items-end gap-6 md:gap-10">
            <p className="text-[11px] md:text-xs text-antireal-indigo/60 font-sans text-left md:text-right max-w-sm leading-relaxed tracking-wide border-l-2 md:border-l-0 md:border-r-2 border-antireal-mint pl-4 md:pl-0 md:pr-8">
              Applying Cloud Engineering principles, Artificial Intelligence, and Enterprise IT Management to build resilient infrastructure. Master's student focused on scalable architecture and secure systems.
            </p>
            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex flex-wrap gap-6 md:gap-8">
                <a href="https://github.com/RRitvikVR" target="_blank" rel="noreferrer" className="group flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-antireal-indigo/40 hover:text-antireal-purple transition-all duration-300">
                  <Github size={18} /> Uplink_Github
                </a>
                <a href="https://linkedin.com/in/ritvikvroy" target="_blank" rel="noreferrer" className="group flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-antireal-indigo/40 hover:text-antireal-purple transition-all duration-300">
                  <Linkedin size={18} /> Uplink_LinkedIn
                </a>
              </div>
              <GlitchDownloadButton />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const SectionTitle = ({ number, title, subtitle }: { number: string, title: string, subtitle: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.1 }}
    className="mb-12 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 border-b border-antireal-indigo/5 pb-10 md:pb-16"
  >
    <div className="flex items-center gap-6 md:gap-10">
      <span className="text-6xl md:text-9xl font-bold text-antireal-indigo/[0.03] select-none leading-none font-sans">{number}</span>
      <div className="relative">
        <h2 className="text-4xl md:text-6xl font-bold uppercase italic tracking-tighter text-antireal-indigo font-sans">{title}</h2>
        <p className="text-[9px] md:text-[11px] font-mono text-antireal-purple uppercase tracking-[0.3em] md:tracking-[0.5em] mt-2 md:mt-3 font-bold">{subtitle}</p>
        <div className="absolute -left-4 md:-left-6 top-0 w-1 md:w-1.5 h-full bg-antireal-purple" />
      </div>
    </div>
  </motion.div>
);

const ProjectModule: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const disabledTitles = ["Linux Server Infrastructure", "AWS VPN Server", "Thermometer Project"];
  const isHoverDisabled = disabledTitles.includes(project.title);

  const snippet = useMemo(() => {
    if (index === 0) return AI_SNIPPET;
    if (index === 1) return BOT_SNIPPET;
    if (index === 2) return ALGO_SNIPPET;
    return "";
  }, [index]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      viewport={{ amount: 0.1 }}
      transition={{ 
        delay: index * 0.05, 
        type: "spring", 
        stiffness: 80, 
        damping: 25,
        mass: 1.2
      }}
      whileHover={!isHoverDisabled && window.innerWidth > 768 ? { 
        rotateY: 5, 
        rotateX: -5, 
        scale: 1.02, 
        boxShadow: "0 30px 60px -15px rgba(168, 85, 247, 0.15)",
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      } : {}}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className={`antireal-glass p-8 md:p-12 group relative overflow-hidden h-full flex flex-col justify-between cursor-default border-t border-l border-white/40 transition-shadow duration-700 ${!isHoverDisabled ? 'will-change-transform' : ''}`}
    >
      {!isHoverDisabled && snippet && <CodeStream snippet={snippet} isHovered={isHovered} />}
      <div className="absolute bottom-4 right-4 text-3xl md:text-[45px] font-bold text-antireal-indigo/[0.02] select-none font-sans">{index + 1}</div>
      <div style={{ transform: window.innerWidth > 768 ? "translateZ(30px)" : "none", transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <div className="flex justify-between items-start mb-6 md:mb-10">
          <ProjectIcon title={project.title} />
          {project.link && !isHoverDisabled && (
            <a href={project.link} target="_blank" rel="noreferrer" className="p-2 md:p-2.5 antireal-glass hover:bg-white transition-all text-antireal-indigo/30 hover:text-antireal-purple" aria-label={`View ${project.title}`}>
              <ExternalLink size={20} />
            </a>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-antireal-indigo uppercase tracking-tight mb-4 md:mb-5 group-hover:translate-x-1 transition-transform duration-700 font-sans">{project.title}</h3>
        <p className="text-[13px] md:text-sm text-antireal-indigo/70 font-sans leading-relaxed mb-8 md:mb-12">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 pt-6 md:pt-10 border-t border-antireal-indigo/5" style={{ transform: window.innerWidth > 768 ? "translateZ(10px)" : "none", transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        {project.tech.map(t => (
          <span key={t} className="text-[8px] md:text-[9px] font-mono font-bold text-antireal-indigo/40 uppercase tracking-[0.1em] md:tracking-[0.2em] px-2 md:px-3 py-1 md:py-1.5 bg-white/40 border border-antireal-indigo/5 hover:border-antireal-purple transition-colors">{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px', 
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['home', 'profile', 'projects', 'experience', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-antireal-purple selection:text-white overflow-x-hidden">
      <InteractiveBackground />
      <Header activeSection={activeSection} />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 pb-20 md:pb-40">
        <Hero />

        <section id="profile" className="py-24 md:py-48 scroll-mt-24 md:scroll-mt-48">
          <SectionTitle number="01" title="Candidate Profile" subtitle="Academic_System_Audit" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ amount: 0.1 }} className="md:col-span-8 antireal-glass p-8 md:p-14 tech-border-l relative overflow-hidden">
              <User className="text-antireal-purple mb-8 md:mb-12" size={40} />
              <h3 className="text-3xl md:text-4xl font-bold uppercase italic text-antireal-indigo mb-6 md:mb-10 tracking-tighter font-sans">Identity_Output</h3>
              <p className="text-xl md:text-2xl text-antireal-indigo/70 leading-relaxed uppercase tracking-tight mb-8 md:mb-14 max-w-2xl font-sans">
                I AM A <span className="text-antireal-indigo">MASTER'S STUDENT</span> AT RUTGERS UNIVERSITY. 
                I SPECIALIZE IN CLOUD ENGINEERING, DESKTOP SUPPORT, AND ARTIFICIAL INTELLIGENCE.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                <div className="p-6 md:p-10 bg-white/40 border border-white/60 hover:border-antireal-purple transition-all duration-500 group">
                  <span className="text-[10px] md:text-[11px] font-mono font-bold text-antireal-indigo/30 uppercase tracking-[0.2em] md:tracking-[0.4em] block mb-3 md:mb-4 group-hover:text-antireal-purple">Academic_Status</span>
                  <span className="text-lg md:text-xl font-sans font-bold text-antireal-indigo uppercase tracking-tighter">Graduate Candidate</span>
                </div>
                <div className="p-6 md:p-10 bg-white/40 border border-white/60 hover:border-antireal-purple transition-all duration-500 group">
                  <span className="text-[10px] md:text-[11px] font-mono font-bold text-antireal-indigo/30 uppercase tracking-[0.2em] md:tracking-[0.4em] block mb-3 md:mb-4 group-hover:text-antireal-purple">Target_Role</span>
                  <span className="text-lg md:text-xl font-sans font-bold text-antireal-indigo uppercase tracking-tighter">Internship & Part-time</span>
                </div>
              </div>
            </motion.div>
            <div className="md:col-span-4 flex flex-col gap-8 md:gap-10">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ amount: 0.1 }} className="antireal-glass p-8 md:p-12 flex-grow group overflow-hidden">
                <Zap className="text-antireal-purple mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-700" size={32} />
                <h4 className="text-xs md:text-sm font-mono font-bold text-antireal-indigo uppercase tracking-widest mb-6 md:mb-10">Stack Focus</h4>
                <div className="space-y-6 md:space-y-8">
                  {SKILLS.map((group, idx) => (
                    <div key={idx} className="space-y-2 md:space-y-3">
                      <span className="text-[8px] md:text-[9px] font-mono font-bold text-antireal-indigo/30 uppercase tracking-widest block">{group.category}</span>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {group.skills.map(s => (
                          <span key={s} className="px-2 md:px-3 py-1 md:py-1.5 bg-white/80 text-[8px] md:text-[9px] font-mono font-bold text-antireal-indigo uppercase tracking-tighter border border-antireal-indigo/5 hover:border-antireal-purple transition-all">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 md:py-48 scroll-mt-24 md:scroll-mt-48">
          <SectionTitle number="02" title="Tech Modules" subtitle="Logic_Implementation_Gallery" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {PROJECTS.map((p, i) => (<ProjectModule key={i} project={p} index={i} />))}
          </div>
        </section>

        <section id="experience" className="py-24 md:py-48 scroll-mt-24 md:scroll-mt-48">
          <SectionTitle number="03" title="Service Logs" subtitle="Historical_Career_History" />
          <div className="space-y-8 md:space-y-10">
            {EXPERIENCES.map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ amount: 0.1 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="antireal-glass p-8 md:p-20 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 mb-10 md:mb-16">
                  <div>
                    <span className="text-[9px] md:text-[11px] font-mono font-bold text-antireal-purple uppercase tracking-[0.3em] md:tracking-[0.5em] mb-3 md:mb-4 block px-3 md:px-4 py-1.5 bg-antireal-purple/5 inline-block">{exp.period}</span>
                    <h3 className="text-3xl md:text-6xl font-bold uppercase italic tracking-tighter text-antireal-indigo font-sans">{exp.role}</h3>
                    <p className="text-[11px] md:text-sm font-mono text-antireal-indigo/30 uppercase tracking-[0.2em] md:tracking-[0.4em] mt-2 md:mt-3 font-bold">{exp.company} // {exp.location}</p>
                  </div>
                  <Briefcase size={80} className="hidden lg:block opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-6 md:gap-y-8">
                  {exp.description.map((item, j) => (
                    <div key={j} className="flex gap-4 md:gap-6 items-start border-l border-antireal-indigo/5 pl-4 md:pl-8 group/item">
                      <ChevronRight size={18} className="text-antireal-purple mt-1 shrink-0" />
                      <p className="text-[13px] md:text-sm text-antireal-indigo/60 font-sans leading-relaxed group-hover/item:text-antireal-indigo transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-32 md:py-64 text-center scroll-mt-24 md:scroll-mt-48">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.1 }} className="max-w-5xl mx-auto">
            <div className="antireal-glass p-12 sm:p-24 md:p-40 relative overflow-hidden bg-white/70 border-white/60 shadow-2xl shadow-indigo-900/5 group/contact">
              <div className="relative z-10">
                <h2 className="text-6xl sm:text-8xl md:text-[11rem] font-bold uppercase tracking-tighter italic text-antireal-indigo mb-8 md:mb-12 leading-none mix-blend-multiply font-sans">Uplink</h2>
                <p className="text-antireal-indigo/50 font-sans text-xs md:text-sm tracking-wide mb-12 md:mb-20 max-w-xl mx-auto leading-relaxed border-b border-antireal-indigo/5 pb-6 md:pb-10">
                  Currently open for internships and systems engineering roles.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
                  <a href="mailto:rvr45@scarletmail.rutgers.edu" className="group/btn w-full sm:w-auto px-8 md:px-16 py-5 md:py-7 bg-antireal-indigo text-white font-mono font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-[11px] hover:bg-antireal-purple transition-all shadow-2xl shadow-purple-500/20 flex items-center justify-center gap-3 md:gap-4">
                    <Mail size={16} />EMAIL_ME
                  </a>
                  <a href="https://linkedin.com/in/ritvikvroy" target="_blank" rel="noreferrer" className="group/btn w-full sm:w-auto px-8 md:px-16 py-5 md:py-7 antireal-glass border-antireal-purple/20 text-antireal-purple font-mono font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-[11px] hover:bg-white transition-all flex items-center justify-center gap-3 md:gap-4">
                    <Linkedin size={16} />LINKEDIN_CORE
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-16 md:py-28 border-t border-antireal-indigo/5 text-center relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-24 mb-10 md:mb-12 text-[9px] md:text-[11px] font-mono text-antireal-indigo/25 uppercase tracking-[0.4em] md:tracking-[0.6em] font-bold px-4">
          <span className="flex items-center gap-3 md:gap-4"><div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-antireal-purple rounded-full animate-pulse" />NODE: SCARLET_SECTOR</span>
          <span className="flex items-center gap-3 md:gap-4"><div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-antireal-mint rounded-full animate-pulse" />FOCUS: CLOUD_AI_IT</span>
          <span className="flex items-center gap-3 md:gap-4">© {new Date().getFullYear()} RR_SYS_V4</span>
        </div>
      </footer>
    </div>
  );
};

export default App;