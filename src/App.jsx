import { createTheme, ThemeProvider, useTheme, alpha } from "@mui/material/styles";
import React, { useMemo, useState } from "react";
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
  CssBaseline,
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
import PaletteIcon from "@mui/icons-material/Palette";
import SecurityIcon from "@mui/icons-material/Security";
import ApiIcon from "@mui/icons-material/Api";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DownloadIcon from "@mui/icons-material/Download";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useInView } from "react-intersection-observer";

import ProfilePhoto from "./assets/profile-photo.jpg";
import ResumePDF from "./assets/praveen-kumar-patil-resume.pdf";

const EMAIL = "patilpraveen1432@gmail.com";
const PHONE_DISPLAY = "+91 7842753302";
const PHONE_HREF = "tel:+917842753302";
const LINKEDIN = "https://www.linkedin.com/in/praveenkumarpatil7089";
const GITHUB = "https://github.com/praveen-patil-7";

const getTheme = (mode) =>
  createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
      h5: { fontWeight: 800 },
      h6: { fontWeight: 700 },
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#1a73e8" },
            secondary: { main: "#0ea5e9" },
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
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { borderRadius: 20 } } },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", fontWeight: 600, borderRadius: 10 },
        },
      },
    },
  });

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const STRENGTHS = [
  "React.js and React Native development",
  "REST API integration",
  "Secure authentication with MSAL, OAuth 2, and JWT",
  "Performance optimization and reusable components",
  "Agile delivery with Azure DevOps and Jira",
  "Problem solving on enterprise products",
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: CodeIcon,
    items: ["JavaScript (ES6+)", "TypeScript"],
  },
  {
    title: "Frontend",
    icon: PhoneIphoneIcon,
    items: ["React.js", "React Native", "HTML5", "CSS3", "Redux Toolkit", "Expo"],
  },
  {
    title: "UI",
    icon: PaletteIcon,
    items: ["Material UI", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "Authentication",
    icon: SecurityIcon,
    items: ["MSAL", "OAuth 2", "JWT", "PKCE", "Biometrics"],
  },
  {
    title: "API",
    icon: ApiIcon,
    items: ["REST APIs", "Axios"],
  },
  {
    title: "Tools",
    icon: BuildIcon,
    items: ["Git", "GitHub", "Azure DevOps", "Jira", "BrowserStack", "Postman"],
  },
  {
    title: "AI tools",
    icon: AutoAwesomeIcon,
    items: ["Cursor AI", "GitHub Copilot", "ChatGPT", "Claude"],
  },
];

const PROJECTS = [
  {
    title: "Fiscal Mobile & Web Application",
    tag: "Client · Finance",
    desc: "Financial product used on web and mobile for loans, invoices, payments, and account summaries.",
    bullets: [
      "Built the web app in React.js and the mobile app in React Native with Expo.",
      "Implemented Microsoft SSO with MSAL, plus biometric sign-in and secure token handling on mobile.",
      "Integrated REST APIs for loans, credit lines, invoices, auto-debit, and payment processing.",
      "Shipped responsive forms and data tables for transaction history and account summaries.",
    ],
    techStack: ["React.js", "React Native", "Expo", "MSAL", "Material UI", "Axios"],
  },
  {
    title: "Objective Management System",
    tag: "Internal · Performance",
    desc: "Tool for tracking employee objectives, activity, and sprint progress from Azure DevOps.",
    bullets: [
      "Built dashboards, reports, and employee activity views in one place.",
      "Connected Azure DevOps APIs so sprint progress sits next to assigned objectives.",
      "Added comments, screenshot uploads, and reusable UI for objective workflows.",
    ],
    techStack: ["React.js", "Material UI", "Redux Toolkit", "REST APIs"],
  },
  {
    title: "HR & Change Request Management",
    tag: "Internal · Operations",
    desc: "Portals for employee records and for tracking change requests against planned work.",
    bullets: [
      "Designed employee management screens and reporting dashboards for HR.",
      "Built reusable forms and CRUD flows so records stay easy to find and update.",
      "Compared planned and actual hours and exported project status summaries.",
    ],
    techStack: ["React.js", "Material UI", "JavaScript", "Bootstrap"],
  },
];

const EXPERIENCE_POINTS = [
  "Developed enterprise web and mobile applications with React.js and React Native.",
  "Built reusable UI components, responsive forms, dashboards, and reports with Material UI.",
  "Integrated 40+ REST APIs with Axios for financial and enterprise applications.",
  "Implemented Microsoft SSO using MSAL, OAuth 2, PKCE, and JWT authentication.",
  "Developed biometric authentication and secure token management for mobile applications.",
  "Improved performance with lazy loading, memoization, and shared components.",
  "Worked in Agile and Scrum using Azure DevOps, Git, and Jira.",
  "Used Cursor, GitHub Copilot, ChatGPT, and Claude to speed up day-to-day development.",
];

const AnimatedSection = React.forwardRef(function AnimatedSection({ id, children, alternateBg }, ref) {
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.08,
  });

  const combinedRef = (node) => {
    viewRef(node);
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <Box
      id={id}
      ref={combinedRef}
      component="section"
      sx={{
        scrollMarginTop: 88,
        py: { xs: 7, md: 10 },
        bgcolor: alternateBg ? "background.paper" : "background.default",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(28px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
});

export default function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const refs = useMemo(
    () =>
      [{ id: "hero", label: "Home" }, ...NAV_ITEMS].reduce((acc, item) => {
        acc[item.id] = React.createRef();
        return acc;
      }, {}),
    []
  );

  const handleScroll = (id) => {
    const node = refs[id]?.current;
    if (node) {
      const y = node.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", overflowX: "hidden" }}>
        <Header onNav={handleScroll} onToggleColorMode={toggleColorMode} currentMode={mode} />
        <main>
          <Box id="hero" ref={refs.hero} sx={{ scrollMarginTop: 88 }}>
            <Container maxWidth="lg">
              <Hero onNav={handleScroll} />
            </Container>
          </Box>
          <AnimatedSection ref={refs.about} id="about">
            <About />
          </AnimatedSection>
          <AnimatedSection ref={refs.skills} id="skills" alternateBg>
            <Skills />
          </AnimatedSection>
          <AnimatedSection ref={refs.experience} id="experience">
            <Experience />
          </AnimatedSection>
          <AnimatedSection ref={refs.projects} id="projects" alternateBg>
            <Projects />
          </AnimatedSection>
          <AnimatedSection ref={refs.education} id="education">
            <Education />
          </AnimatedSection>
          <AnimatedSection ref={refs.contact} id="contact" alternateBg>
            <Contact />
          </AnimatedSection>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

function Header({ onNav, onToggleColorMode, currentMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((open) => !open);

  const navLinks = (
    <List>
      {[{ id: "hero", label: "Home" }, ...NAV_ITEMS].map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => {
              onNav(item.id);
              setMobileOpen(false);
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "saturate(180%) blur(10px)",
          bgcolor: currentMode === "light" ? "rgba(255,255,255,0.88)" : "rgba(17, 24, 39, 0.88)",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1, py: 1 }}>
            <MuiLink
              onClick={() => onNav("hero")}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                color: "inherit",
                minWidth: 0,
              }}
            >
              <Box
                role="img"
                aria-label="Praveen Kumar Patil"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  flexShrink: 0,
                  backgroundImage: `url(${ProfilePhoto})`,
                  backgroundSize: "230%",
                  backgroundPosition: "center 10%",
                  bgcolor: "action.hover",
                }}
              />
              <Typography variant="h6" noWrap sx={{ fontWeight: 800, display: { xs: "none", sm: "block" } }}>
                Praveen Kumar Patil
              </Typography>
            </MuiLink>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 0.5 }}>
              {NAV_ITEMS.map((item) => (
                <Button key={item.id} onClick={() => onNav(item.id)} sx={{ fontWeight: 600, px: 1.25 }}>
                  {item.label}
                </Button>
              ))}
            </Box>
            <IconButton onClick={onToggleColorMode} color="inherit" aria-label="Toggle color mode">
              {currentMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Open menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 },
        }}
      >
        {navLinks}
      </Drawer>
    </>
  );
}

function Hero({ onNav }) {
  const theme = useTheme();
  const highlights = [
    { value: "3+ yrs", label: "Enterprise web and mobile" },
    { value: "40+", label: "REST APIs integrated" },
    { value: "SSO", label: "MSAL, OAuth 2, biometrics" },
  ];

  return (
    <Box
      sx={{
        borderRadius: "28px",
        p: { xs: 2.5, md: 5 },
        mt: { xs: 3, md: 5 },
        mb: { xs: 2, md: 4 },
        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.14)}, ${alpha(theme.palette.secondary.main, 0.08)} 55%, ${alpha(theme.palette.background.paper, 0.4)})`,
        border: 1,
        borderColor: alpha(theme.palette.primary.main, 0.16),
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="overline" sx={{ letterSpacing: 1.6, color: "primary.main", fontWeight: 700 }}>
            React.js & React Native Developer
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "2.1rem", md: "3.1rem" }, lineHeight: 1.15 }}>
            Enterprise web and mobile apps, built to stay fast and secure.
          </Typography>
          <Typography sx={{ mt: 2.5, fontSize: "1.05rem", color: "text.secondary", maxWidth: 640 }}>
            I design reusable interfaces, connect REST APIs, and ship Microsoft sign-in for financial and internal
            products. Based in Bengaluru, working with React.js, React Native, and TypeScript.
          </Typography>
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" sx={{ mt: 2.5, color: "text.secondary" }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography variant="body2">Bengaluru, Karnataka</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <WorkOutlineIcon fontSize="small" color="primary" />
              <Typography variant="body2">Revaan IT Solution · Jul 2023 – Present</Typography>
            </Stack>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3.5 }}>
            <Button variant="contained" size="large" onClick={() => onNav("projects")} endIcon={<OpenInNewIcon />}>
              View projects
            </Button>
            <Button
              variant="outlined"
              size="large"
              component="a"
              href={ResumePDF}
              download="Praveen-Kumar-Patil-Resume.pdf"
              startIcon={<DownloadIcon />}
            >
              Download resume
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src={ProfilePhoto}
            alt="Praveen Kumar Patil"
            sx={{
              width: { xs: 220, md: 280 },
              height: { xs: 290, md: 360 },
              objectFit: "cover",
              objectPosition: "center 18%",
              borderRadius: "28px",
              border: "4px solid",
              borderColor: "background.paper",
              boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.28)}`,
            }}
          />
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
            <IconButton component="a" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" color="inherit">
              <LinkedInIcon />
            </IconButton>
            <IconButton component="a" href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" color="inherit">
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href={`mailto:${EMAIL}`} aria-label="Email" color="inherit">
              <EmailIcon />
            </IconButton>
            <IconButton component="a" href={PHONE_HREF} aria-label="Phone" color="inherit">
              <PhoneIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 } }}>
        {highlights.map((item) => (
          <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: alpha(theme.palette.background.paper, 0.8), height: "100%" }}>
              <Typography variant="h5" color="primary.main">
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function About() {
  const theme = useTheme();

  return (
    <>
      <SectionHeading icon={<EmojiEventsIcon />} title="About" subtitle="React.js and React Native for enterprise products" />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography sx={{ fontSize: "1.08rem", color: "text.secondary", lineHeight: 1.75 }}>
            React.js and React Native developer with 3+ years of experience building enterprise web and mobile
            applications. I work with TypeScript, JavaScript, Redux Toolkit, Material UI, REST APIs, MSAL, OAuth 2,
            and Azure DevOps. Most of my time goes into reusable components, API integration, secure authentication,
            and shipping software that holds up in Agile teams.
          </Typography>
          <Button
            component="a"
            href={ResumePDF}
            download="Praveen-Kumar-Patil-Resume.pdf"
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            sx={{ mt: 3 }}
          >
            Download resume
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, height: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Strengths
            </Typography>
            <Stack spacing={1.5}>
              {STRENGTHS.map((item) => (
                <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                  <CheckCircleOutlineIcon sx={{ color: "primary.main", mt: "2px" }} fontSize="small" />
                  <Typography color="text.secondary">{item}</Typography>
                </Stack>
              ))}
            </Stack>
            <Box sx={{ mt: 2, height: 4, borderRadius: 4, bgcolor: alpha(theme.palette.primary.main, 0.15) }} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

function Skills() {
  const theme = useTheme();
  const iconColor = theme.palette.mode === "dark" ? "secondary" : "primary";

  return (
    <>
      <SectionHeading icon={<CodeIcon />} title="Skills" subtitle="What I use to design, integrate, and ship" />
      <Grid container spacing={2.5}>
        {SKILL_GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <Grid key={group.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" sx={{ height: "100%", "&:hover": { transform: "translateY(-4px)", boxShadow: 4 } }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette[iconColor].main, 0.12), color: `${iconColor}.main` }}>
                      <Icon fontSize="small" />
                    </Avatar>
                    <Typography variant="h6">{group.title}</Typography>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {group.items.map((skill) => (
                      <Chip key={skill} label={skill} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

function Experience() {
  return (
    <>
      <SectionHeading icon={<WorkOutlineIcon />} title="Experience" subtitle="Revaan IT Solution · July 2023 to present" />
      <Paper elevation={2} sx={{ p: { xs: 2.5, md: 4 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Box>
            <Typography variant="h5">React.js & React Native Developer</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Revaan IT Solution
            </Typography>
          </Box>
          <Chip label="Jul 2023 – Present" color="primary" variant="outlined" />
        </Stack>
        <Typography sx={{ mt: 2, color: "text.secondary", maxWidth: 760 }}>
          I build and maintain client-facing financial software and internal tools. The work covers UI implementation,
          API integration, authentication, and performance on both web and mobile.
        </Typography>
        <Grid container spacing={1.5} sx={{ mt: 1 }}>
          {EXPERIENCE_POINTS.map((point) => (
            <Grid size={{ xs: 12, md: 6 }} key={point}>
              <Stack direction="row" spacing={1.25} alignItems="flex-start">
                <CheckCircleOutlineIcon color="primary" fontSize="small" sx={{ mt: "3px" }} />
                <Typography color="text.secondary">{point}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
}

function Projects() {
  return (
    <>
      <SectionHeading icon={<BuildIcon />} title="Projects" subtitle="Products I have designed and shipped" />
      <Stack spacing={3}>
        {PROJECTS.map((project) => (
          <Card key={project.title} elevation={2} sx={{ "&:hover": { transform: "translateY(-3px)", boxShadow: 6 } }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="space-between" alignItems={{ sm: "center" }}>
                <Typography variant="h5">{project.title}</Typography>
                <Chip label={project.tag} size="small" color="primary" variant="outlined" sx={{ alignSelf: "flex-start" }} />
              </Stack>
              <Typography sx={{ color: "text.secondary", mt: 1.5, mb: 2 }}>{project.desc}</Typography>
              <Stack component="ul" sx={{ pl: 2.25, m: 0, gap: 1, color: "text.secondary" }}>
                {project.bullets.map((bullet) => (
                  <Typography component="li" key={bullet}>
                    {bullet}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2.5 }}>
                {project.techStack.map((tech) => (
                  <Chip key={tech} label={tech} size="small" />
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}

function Education() {
  return (
    <>
      <SectionHeading icon={<SchoolIcon />} title="Education" subtitle="Academic background" />
      <Paper elevation={2} sx={{ p: { xs: 2.5, md: 4 }, maxWidth: 720 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="h5">Bachelor of Engineering, Civil Engineering</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              KSRM College of Engineering, Kadapa, Andhra Pradesh
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              2018 – 2022
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}

function Contact() {
  const theme = useTheme();
  const actions = [
    { label: EMAIL, href: `mailto:${EMAIL}`, icon: <EmailIcon />, variant: "contained" },
    { label: PHONE_DISPLAY, href: PHONE_HREF, icon: <PhoneIcon />, variant: "outlined" },
    { label: "Connect on LinkedIn", href: LINKEDIN, icon: <LinkedInIcon />, variant: "outlined", external: true },
    { label: "GitHub", href: GITHUB, icon: <GitHubIcon />, variant: "outlined", external: true },
  ];

  return (
    <>
      <SectionHeading icon={<EmailIcon />} title="Contact" subtitle="Open to React.js and React Native roles" />
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, md: 5 },
          background: `linear-gradient(160deg, ${alpha(theme.palette.primary.main, 0.08)}, transparent 60%)`,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Let&apos;s build something together
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              I&apos;m based in Bengaluru and happy to talk about frontend engineering, React Native, and product UI.
              Email, phone, and LinkedIn all reach me.
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography>Bengaluru, Karnataka</Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1.5}>
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  size="large"
                  startIcon={action.icon}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noreferrer" : undefined}
                  sx={{ justifyContent: "flex-start", py: 1.25 }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Praveen Kumar Patil · Bengaluru
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton component="a" href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" color="inherit">
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" color="inherit">
              <LinkedInIcon />
            </IconButton>
            <IconButton component="a" href={`mailto:${EMAIL}`} aria-label="Email" color="inherit">
              <EmailIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function SectionHeading({ icon, title, subtitle }) {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Avatar
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            color: "primary.main",
            width: 40,
            height: 40,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography sx={{ color: "text.secondary", mt: 1.25, maxWidth: 640 }}>{subtitle}</Typography>
      )}
    </Box>
  );
}
