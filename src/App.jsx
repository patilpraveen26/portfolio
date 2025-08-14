// At the top of your file, make sure `useTheme` and `alpha` are imported from MUI
import { createTheme, ThemeProvider, useTheme, alpha } from "@mui/material/styles";

// All other imports remain the same...
import React, { useMemo, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Button,
  Stack,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Link as MuiLink,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import StorageIcon from "@mui/icons-material/Storage";
import PaletteIcon from "@mui/icons-material/Palette";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { useInView } from "react-intersection-observer";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import ProfilePhoto from './assets/profile-photo.jpg';
import ResumePDF from './assets/praveen-kumar-patil-resume.pdf';

// Theme creation remains the same
const getTheme = (mode) =>
  createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      h1: { fontWeight: 800 }, h2: { fontWeight: 700 }, h3: { fontWeight: 700 }, h5: { fontWeight: 800 },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: { main: "#1a73e8" },
          secondary: { main: "#0ea5e9", light: '#e0f7fa', dark: '#0077c2' },
          background: { default: "#f7f9fc", paper: "#ffffff" },
          text: { primary: "#1f2937", secondary: "#4b5563" },
        }
        : {
          primary: { main: "#60a5fa" },
          secondary: { main: "#38bdf8" },
          background: { default: "#111827", paper: "#1f2937" },
          text: { primary: "#f9fafb", secondary: "#d1d5db" },
        }),
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCard: { styleOverrides: { root: { borderRadius: 20, transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' } } },
      MuiPaper: { styleOverrides: { root: { borderRadius: 20 } } },
      MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 } } },
    },
  });

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const AnimatedSection = React.forwardRef(function AnimatedSection({ id, children, alternateBg }, ref) {
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const combinedRef = (node) => {
    viewRef(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <Box
      id={id}
      ref={combinedRef}
      component="section"
      sx={{
        scrollMarginTop: 80,
        py: { xs: 8, md: 12 },
        bgcolor: alternateBg ? 'background.paper' : 'background.default',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
});

export default function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const refs = useMemo(() =>
    [{ id: "hero", label: "Home" }, ...NAV_ITEMS, { id: "education", label: "Education" }].reduce((acc, item) => {
      acc[item.id] = React.createRef();
      return acc;
    }, {}),
    []);

  const handleScroll = (id) => {
    const node = refs[id]?.current;
    if (node) {
      const y = node.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* 
        THIS IS THE FIX: 
        The `width` and `overflowX` properties have been removed from this Box.
        This allows the `position: "sticky"` on the AppBar to work correctly.
      */}
      <Box sx={{ bgcolor: "background.default", width: '100vw' }}>
        <Header onNav={handleScroll} onToggleColorMode={toggleColorMode} currentMode={mode} />
        <main>
          <Box id="hero" ref={refs.hero} sx={{ scrollMarginTop: 80, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Hero onNav={handleScroll} mode={mode} />
            </Container>
          </Box>
          <AnimatedSection ref={refs.about} id="about"><About /></AnimatedSection>
          <AnimatedSection ref={refs.skills} id="skills" alternateBg><Skills /></AnimatedSection>
          <AnimatedSection ref={refs.projects} id="projects"><Projects /></AnimatedSection>
          <AnimatedSection ref={refs.experience} id="experience" alternateBg><Experience /></AnimatedSection>
          <AnimatedSection ref={refs.education} id="education"><Education /></AnimatedSection>
          <AnimatedSection ref={refs.contact} id="contact" alternateBg><Contact /></AnimatedSection>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

function Header({ onNav, onToggleColorMode, currentMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navLinks = (
    <List>
      {[{ id: 'hero', label: 'Home' }, ...NAV_ITEMS].map((item) => (
        <ListItem key={item.id} disablePadding onClick={() => { onNav(item.id); handleDrawerToggle(); }}>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backdropFilter: "saturate(180%) blur(10px)", bgcolor: currentMode === 'light' ? "rgba(255,255,255,0.85)" : "rgba(17, 24, 39, 0.85)", color: "text.primary" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, py: 1 }}>
            <MuiLink onClick={() => onNav('hero')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', color: 'inherit' }}>
              <Avatar src={ProfilePhoto} sx={{ width: 40, height: 40 }} />
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, display: { xs: 'none', sm: 'block' } }}>
                Praveen Kumar Patil
              </Typography>
            </MuiLink>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {NAV_ITEMS.map((item) => (
                <Button key={item.id} onClick={() => onNav(item.id)} sx={{ fontWeight: 600 }}>
                  {item.label}
                </Button>
              ))}
            </Box>
            <IconButton onClick={onToggleColorMode} color="inherit">
              {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { md: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {navLinks}
        </Drawer>
      </Box>
    </>
  );
}

/** Hero **/
function Hero({ onNav, mode }) {
  return (
    <Box sx={{
      borderRadius: '24px',
      p: { xs: 2, md: 4 },
      mt: { xs: 4, md: 8 },
      mb: { xs: 4, md: 8 },
    }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: "primary.main", fontWeight: 'bold' }}>React Developer</Typography>
          <Typography variant="h2"
            sx={{
              mt: 1,                 // margin-top: theme.spacing(1)
              lineHeight: 1.2,       // sets line height
              color: mode === 'light' ? 'black' : 'lightgrey' // conditional text color
            }}
          >
            Building responsive, accessible, and fast web apps.
          </Typography>
          <Typography sx={{ mt: 3, fontSize: '1.1rem', color: "text.secondary" }}>
            A dedicated and results-oriented React.js Developer with 2 years of experience in building, testing, and deploying responsive web applications. Proficient with React, JavaScript (ES6+), and Material UI in Agile teams.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
            <Button variant="contained" size="large" onClick={() => onNav("projects")} endIcon={<OpenInNewIcon />}>View Projects</Button>
            <Button variant="outlined" size="large" onClick={() => onNav("contact")}>Contact Me</Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
          <Box sx={{ display: "grid", placeItems: "center", p: 2 }}>
            <Avatar
              src={ProfilePhoto}
              alt="Praveen Kumar Patil"
              sx={{
                width: { xs: 180, md: 240 },
                height: { xs: 180, md: 240 },
                border: '4px solid',
                borderColor: 'primary.main',
                boxShadow: 6,
              }}
            />
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <MuiLink href="https://www.linkedin.com/in/praveenkumarpatil7089" target="_blank" color="inherit"><LinkedInIcon fontSize="large" /></MuiLink>
            <MuiLink href="mailto:patilpraveen1432@gmail.com" color="inherit"><EmailIcon fontSize="large" /></MuiLink>
            <MuiLink href="tel:7842753302" color="inherit"><PhoneIcon fontSize="large" /></MuiLink>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}


/** About **/
function About() {
  // --- UPDATED: Use theme for dynamic colors ---
  const theme = useTheme();
  return (
    <>
      <SectionHeading icon={<EmojiEventsIcon />} title="About Me" subtitle="Who I am and what I do" />
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography sx={{ fontSize: '1.1rem', color: "text.secondary", mb: 2 }}>
            I specialize in building and maintaining scalable, responsive web applications using React.js. I translate business requirements and UI/UX designs into high‑quality, accessible code with strong attention to performance.
          </Typography>
          <Stack spacing={1.5} sx={{ color: "text.secondary", mt: 2, mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {/* --- UPDATED: Theme-aware avatar background --- */}
              <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.15) }}>
                <CheckCircleOutlineIcon color="secondary" />
              </Avatar>
              <Typography>User-Centric Frontend Development</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.15) }}>
                <CheckCircleOutlineIcon color="secondary" />
              </Avatar>
              <Typography>Agile Collaboration & API Integration</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.15) }}>
                <CheckCircleOutlineIcon color="secondary" />
              </Avatar>
              <Typography>Passion for Clean Code & Performance</Typography>
            </Stack>
          </Stack>
          <Button
            component="a"
            href={ResumePDF}
            download="praveen-kumar-patil-resume.pdf"
            variant="contained"
            size="large"
          >
            Download My Resume
          </Button>
        </Grid>
        {/* <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                component="img"
                src={ProfilePhoto}
                alt="Praveen Kumar Patil"
                sx={{
                    width: '100%',
                    maxWidth: {xs: 300, md: 350},
                    borderRadius: '50%',
                    border: '4px solid',
                    borderColor: 'primary.main',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
            />
        </Grid> */}
      </Grid>
    </>
  );
}


/** Skills **/
function Skills() {
  // --- UPDATED: Use theme for dynamic icons ---
  const theme = useTheme();
  const iconColor = theme.palette.mode === 'dark' ? 'secondary' : 'primary';

  const skillGroups = [
    { title: "Frontend", icon: <CodeIcon color={iconColor} />, items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Redux Toolkit"] },
    { title: "UI Libraries", icon: <PaletteIcon color={iconColor} />, items: ["Material UI", "Bootstrap"] },
    { title: "Tools & Methods", icon: <BuildIcon color={iconColor} />, items: ["Git", "Jira", "VSTS (Azure DevOps)", "Agile/Scrum", "RESTful APIs"] },
    { title: "Database", icon: <StorageIcon color={iconColor} />, items: ["SQL"] },
  ];
  return (
    <>
      <SectionHeading icon={<WorkOutlineIcon />} title="Skills" subtitle="Tech I use to ship" />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {skillGroups.map((group) => (
          <Grid key={group.title} item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  {group.icon}
                  <Typography variant="h6">{group.title}</Typography>
                </Stack>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {group.items.map((s) => (
                    <Chip key={s} label={s} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}


/** Projects **/
function Projects() {
  const theme = useTheme();
  const iconColor = theme.palette.mode === 'dark' ? 'secondary' : 'primary';

  const projects = [
    {
      title: "Fiscal Application (Client)",
      desc: "Application for managing financial products like loans, credit lines, and invoices.",
      bullets: ["Built key modules for loans, credit lines, and invoices.", "Implemented auto‑debit and payment processing with third‑party APIs.", "Responsive forms and data tables for transaction history."],
      techStack: ["React", "Material UI", "Redux Toolkit"]
    },
    {
      title: "Objective Management System (Internal)",
      desc: "Performance tool to track employee objectives and integrate sprint progress from VSTS.",
      bullets: ["Unified dashboard integrating multiple VSTS (Azure DevOps) APIs.", "Features for assigning objectives, comments, and screenshot uploads.", "Visualizations for sprint‑wise performance."],
      techStack: ["React", "Material UI", "REST APIs"]
    },
    {
      title: "Change Request (CR) Management",
      desc: "Internal tool for tracking project timelines and resource allocation against planned hours.",
      bullets: ["Dynamic dashboard comparing Planned vs Actual Hours.", "Report generation module exporting project status summaries."],
      techStack: ["React", "CSS3", "JavaScript"]
    },
    {
      title: "HR Application",
      desc: "Centralized portal for managing employee information, improving discoverability for HR operations.",
      bullets: ["Designed a tab‑based interface for comprehensive employee details.", "Improved discoverability and ease of access for HR operations."],
      techStack: ["React", "HTML5", "Bootstrap"]
    },
  ];

  return (
    <>
      <SectionHeading icon={<BuildIcon />} title="Projects" subtitle="Selected work I've built" />
      <Timeline position="alternate" sx={{ mt: 2 }}>
        {projects.map((p, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              color="text.secondary"
              sx={{ m: 'auto 0', textAlign: index % 2 === 0 ? 'right' : 'left', px: 2 }}
            >
              <Typography variant="overline">Tech Stack</Typography>
              <Stack
                direction="row" flexWrap="wrap" gap={0.5}
                sx={{ mt: 1, justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}
              >
                {p.techStack.map((tech) => (
                  <Chip key={tech} label={tech} size="small" variant="outlined" />
                ))}
              </Stack>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: `${iconColor}.main` }} />
              <TimelineDot color={iconColor} variant="outlined">
                <CodeIcon color={iconColor} />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: `${iconColor}.main` }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" component="h1">{p.title}</Typography>
                <Typography sx={{ color: "text.secondary", mt: 1, mb: 2 }}>{p.desc}</Typography>
                <Stack component="ul" sx={{ pl: 2, gap: 1, color: "text.secondary", m: 0 }}>
                  {p.bullets.map((b, i) => (
                    <Typography component="li" key={i} sx={{ '::marker': { color: `${iconColor}.main` } }}>
                      {b}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}


/** Experience **/
function Experience() {
  // --- UPDATED: Use theme for dynamic icons ---
  const theme = useTheme();
  const iconColor = theme.palette.mode === 'dark' ? 'secondary' : 'primary';

  return (
    <>
      <SectionHeading icon={<WorkOutlineIcon />} title="Experience" subtitle="Where I've worked" />
      <Timeline position="alternate" sx={{ mt: 2 }}>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} align="right" variant="body2" color="text.secondary">
            Jul 2023 – Present
          </TimelineOppositeContent>
          <TimelineSeparator>
            {/* --- UPDATED: Theme-aware connector and dot --- */}
            <TimelineConnector sx={{ bgcolor: `${iconColor}.main` }} />
            <TimelineDot color={iconColor} variant="outlined">
              <WorkOutlineIcon color={iconColor} />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: `${iconColor}.main` }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" component="h1">React Developer</Typography>
              <Typography color="text.secondary">Revaan IT Solution • Ananthapur, AP</Typography>
              <Typography variant="body2" sx={{ mt: 1.5, color: "text.secondary" }}>
                Built and maintained scalable web apps, translated UI/UX designs into high-quality code, and focused on performance for internal and client-facing financial applications.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}


/** Education **/
function Education() {
  // --- UPDATED: Use theme for dynamic icons ---
  const theme = useTheme();

  const education = [
    {
      degree: "B.E., Civil Engineering",
      institution: "KSRM College of Engineering, Kadapa, AP",
      period: "2018 – 2022"
    },
    {
      degree: "Intermediate / HSC",
      institution: "Narayana Junior College, Guntakal, AP",
      period: "2016 – 2018"
    },
    {
      degree: "SSC",
      institution: "Sri Sad Guru Jyothi E.M School, Konakondla, AP",
      period: "2016"
    }
  ];
  return (
    <>
      <SectionHeading icon={<SchoolIcon />} title="Education" subtitle="Academic background" />
      <Timeline position="right" sx={{ mt: 2, [`& .MuiTimelineItem-root::before`]: { flex: 0, padding: 0 }, }}>
        {education.map((edu, index) => {
          // --- UPDATED: Determine the color based on index and theme mode ---
          const dotColor = theme.palette.mode === 'dark' ? 'secondary' : 'primary';

          return (
            <TimelineItem key={edu.degree}>
              <TimelineSeparator>
                <TimelineDot color={dotColor} variant="outlined">
                  <SchoolIcon color={dotColor} />
                </TimelineDot>
                {index < education.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6">{edu.degree}</Typography>
                  <Typography color="text.secondary">{edu.institution}</Typography>
                  <Typography variant="body2" color="text.secondary">{edu.period}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
}

// ... rest of the components (Contact, Footer, SectionHeading) remain the same.
function Contact() {
  return (
    <>
      <SectionHeading icon={<EmailIcon />} title="Contact" subtitle="Let's build something together" />
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mt: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Get in touch</Typography>
            <Typography sx={{ color: "text.secondary", mt: 1, mb: 3 }}>
              I'm open to roles in frontend engineering, React development, and UI work. Feel free to reach out via email or LinkedIn.
            </Typography>
            <Stack spacing={2}>
              <Button variant="contained" size="large" startIcon={<EmailIcon />} href="mailto:patilpraveen1432@gmail.com">
                patilpraveen1432@gmail.com
              </Button>
              <Button variant="outlined" size="large" startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/praveenkumarpatil7089" target="_blank">
                Connect on LinkedIn
              </Button>
            </Stack>
          </Grid>
          {/* <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              component="img"
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1716024106~exp=1716027706~hmac=553c3e6ca4e112d77051752b1b3636f3c55979c52220d91f58a78f237f37435f&w=740"
              alt="Contact illustration"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                objectFit: 'cover'
              }}
            />
          </Grid> */}
        </Grid>
      </Paper>
    </>
  );
}

function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Praveen Kumar Patil</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton component={MuiLink} href="https://github.com/praveen-patil-7" target="_blank" aria-label="GitHub" color="inherit"><GitHubIcon /></IconButton>
            <IconButton component={MuiLink} href="https://www.linkedin.com/in/praveenkumarpatil7089" target="_blank" aria-label="LinkedIn" color="inherit"><LinkedInIcon /></IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function SectionHeading({ icon, title, subtitle }) {
  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Chip
        avatar={<Avatar sx={{bgcolor:'transparent'}}>{icon}</Avatar>}
        label={title}
        sx={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          p: 3,
          bgcolor: 'background.paper',
          boxShadow: 1
        }}
      />
      {subtitle && (
        <Typography variant="h6" sx={{ color: "text.secondary", mt: 1.5, fontWeight: 'normal' }}>{subtitle}</Typography>
      )}
    </Box>
  );
}