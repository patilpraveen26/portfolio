import React, { useMemo, useRef } from "react";
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
  CardActions,
  Avatar,
  Divider,
  Link as MuiLink,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PlaceIcon from "@mui/icons-material/Place";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

/**
 * Praveen—Material UI Portfolio SPA
 * - Single file React component using Material UI
 * - Sections: Hero, About, Skills, Projects, Experience, Education, Contact
 * - Smooth scroll navigation with sticky AppBar
 * - Fully responsive using MUI Grid/Box
 *
 * How to use locally:
 *   1) Create a Vite/CRA React app
 *   2) npm i @mui/material @mui/icons-material @mui/lab
 *   3) Replace App.jsx with this file's default export
 */

const theme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  palette: {
    mode: "light",
    primary: { main: "#1a73e8" },
    secondary: { main: "#0ea5e9" },
    background: { default: "#f7f9fc", paper: "#ffffff" },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: { styleOverrides: { root: { borderRadius: 20 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 20 } } },
  },
});

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const refs = useMemo(() =>
    NAV_ITEMS.reduce((acc, item) => {
      acc[item.id] = React.createRef();
      return acc;
    }, {}),
    []);

  const handleScroll = (id) => {
    const node = refs[id]?.current;
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", width: '100%' }}>
        <Header onNav={handleScroll} />
        <main>
          <Section ref={refs.hero} id="hero"><Hero onNav={handleScroll} /></Section>
          <Section ref={refs.about} id="about"><About /></Section>
          <Section ref={refs.skills} id="skills"><Skills /></Section>
          <Section ref={refs.projects} id="projects"><Projects /></Section>
          <Section ref={refs.experience} id="experience"><Experience /></Section>
          <Section ref={refs.education} id="education"><Education /></Section>
          <Section ref={refs.contact} id="contact"><Contact /></Section>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

/** Header **/
function Header({ onNav }) {
  return (
    <AppBar position="sticky" elevation={0} sx={{ backdropFilter: "saturate(180%) blur(10px)", bgcolor: "rgba(255,255,255,0.8)", color: "text.primary" }}>
      <Toolbar sx={{ gap: 2, py: 1 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>PP</Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
          Praveen Kumar Patil
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Button key={item.id} onClick={() => onNav(item.id)} sx={{ textTransform: "none", fontWeight: 600 }}>
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton aria-label="menu" edge="end"><MenuIcon /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

/** Generic Section Wrapper **/
const Section = React.forwardRef(function Section({ id, children }, ref) {
  return (
    <Box id={id} ref={ref} component="section" sx={{ scrollMarginTop: 96, py: { xs: 6, md: 10 } }}>
      <Container maxWidth={false}>{children}</Container>
    </Box>
  );
});

/** Hero **/
function Hero({ onNav }) {
  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={7}>
        <Typography variant="overline" sx={{ letterSpacing: 2 }}>React.js Developer</Typography>
        <Typography variant="h2" sx={{ mt: 1, lineHeight: 1.1 }}>
          Building responsive, accessible, and fast web apps.
        </Typography>
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          A dedicated and results-oriented React.js Developer with 2 years of experience in building, testing, and deploying responsive web applications. Proficient with React, JavaScript (ES6+), and Material UI in Agile teams.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => onNav("projects")} endIcon={<OpenInNewIcon />}>View Projects</Button>
          <Button variant="outlined" onClick={() => onNav("contact")}>Contact Me</Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PlaceIcon fontSize="small" />
            <Typography>Bengaluru, Karnataka</Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <MuiLink href="https://www.linkedin.com/in/praveenkumarpatil7089" target="_blank" underline="hover" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
            <LinkedInIcon fontSize="small" /> LinkedIn
          </MuiLink>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper elevation={0} sx={{ p: 4 }}>
          <Box sx={{ display: "grid", placeItems: "center", py: 3 }}>
            <Avatar sx={{ width: 128, height: 128, bgcolor: "secondary.main", fontSize: 48 }}>PP</Avatar>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" />
              <MuiLink href="mailto:patilpraveen1432@gmail.com" underline="hover">patilpraveen1432@gmail.com</MuiLink>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon fontSize="small" />
              <MuiLink href="tel:7842753302" underline="hover">+91 78427 53302</MuiLink>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

/** About **/
function About() {
  return (
    <Box>
      <SectionHeading icon={<EmojiEventsIcon />} title="About Me" subtitle="Who I am and what I do" />
      <Typography sx={{ color: "text.secondary", mt: 2 }}>
        I specialize in building and maintaining scalable, responsive web applications using React.js. I translate business requirements and UI/UX designs into high‑quality, accessible code with strong attention to performance.
      </Typography>
      <Typography sx={{ color: "text.secondary", mt: 1 }}>
        I have experience across internal tools and client‑facing financial applications, collaborating in Agile/Scrum teams and integrating RESTful APIs.
      </Typography>
    </Box>
  );
}

/** Skills **/
function Skills() {
  const skillGroups = [
    {
      title: "Frontend",
      items: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Redux Toolkit"],
    },
    { title: "UI Libraries", items: ["Material UI", "Bootstrap"] },
    { title: "Tools", items: ["Git", "Jira", "VSTS (Azure DevOps)", "Agile/Scrum", "RESTful APIs"] },
    { title: "Database", items: ["SQL"] },
  ];
  return (
    <Box>
      <SectionHeading icon={<WorkOutlineIcon />} title="Skills" subtitle="Tech I use to ship" />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {skillGroups.map((group) => (
          <Grid key={group.title} item xs={12} md={6} lg={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>{group.title}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {group.items.map((s) => (
                    <Chip key={s} label={s} variant="outlined" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/** Projects **/
function Projects() {
  const projects = [
    {
      title: "Fiscal Application (Client)",
      desc:
        "Application for managing financial products like loans, credit lines, and invoices.",
      bullets: [
        "Built key modules for loans, credit lines, and customer invoices.",
        "Implemented auto‑debit and payment processing with third‑party APIs.",
        "Responsive forms and data tables for transaction history and account management.",
      ],
    },
    {
      title: "Objective Management System (Internal)",
      desc:
        "Performance management tool to track employee objectives and integrate sprint progress from VSTS boards.",
      bullets: [
        "Unified dashboard integrating multiple VSTS (Azure DevOps) APIs.",
        "Features for assigning monthly objectives, comments, and screenshot uploads.",
        "Visualizations for sprint‑wise performance for employees and management.",
      ],
    },
    {
      title: "Change Request (CR) Management (Internal)",
      desc: "Tool for tracking project timelines and resource allocation.",
      bullets: [
        "Dynamic dashboard comparing Planned vs Actual Hours.",
        "Report generation module exporting project status summaries.",
      ],
    },
    {
      title: "HR Application (Internal)",
      desc: "Centralized portal for managing employee information.",
      bullets: [
        "Designed a tab‑based interface for comprehensive employee details.",
        "Improved discoverability and ease of access for HR operations.",
      ],
    },
  ];

  return (
    <Box>
      <SectionHeading icon={<OpenInNewIcon />} title="Projects" subtitle="Selected work" />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {projects.map((p) => (
          <Grid key={p.title} item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography sx={{ color: "text.secondary", mt: 1 }}>{p.desc}</Typography>
                <Stack component="ul" sx={{ mt: 2, pl: 2, gap: 1 }}>
                  {p.bullets.map((b, i) => (
                    <Typography component="li" key={i} sx={{ color: "text.secondary" }}>
                      {b}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="small" variant="outlined" endIcon={<OpenInNewIcon />}>View (on request)</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/** Experience **/
function Experience() {
  return (
    <Box>
      <SectionHeading icon={<WorkOutlineIcon />} title="Experience" subtitle="Where I've worked" />
      <Timeline position="alternate" sx={{ mt: 1 }}>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} color="text.secondary">
            Jul 2023 – Present
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6">React.js Developer</Typography>
              <Typography sx={{ color: "text.secondary" }}>Revaan IT Solution • Ananthapur, AP</Typography>
              <Stack component="ul" sx={{ mt: 1.5, pl: 2, gap: 0.75 }}>
                <Typography component="li" sx={{ color: "text.secondary" }}>Build and maintain scalable, responsive web apps using React.js.</Typography>
                <Typography component="li" sx={{ color: "text.secondary" }}>Translate business requirements and UI/UX into high‑quality code.</Typography>
                <Typography component="li" sx={{ color: "text.secondary" }}>Focus on performance and UX for internal and client financial applications.</Typography>
              </Stack>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

/** Education **/
function Education() {
  return (
    <Box>
      <SectionHeading icon={<SchoolIcon />} title="Education" subtitle="Academic background" />
      <Timeline position="right" sx={{ mt: 1 }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6">B.E., Civil Engineering</Typography>
              <Typography sx={{ color: "text.secondary" }}>KSRM College of Engineering, Kadapa, AP • 2018 – 2022</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6">Intermediate / HSC</Typography>
              <Typography sx={{ color: "text.secondary" }}>Narayana Junior College, Guntakal, AP • 2016 – 2018</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6">SSC</Typography>
              <Typography sx={{ color: "text.secondary" }}>Sri Sad Guru Jyothi E.M School, Konakondla, AP • 2016</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

/** Contact **/
function Contact() {
  return (
    <Box>
      <SectionHeading icon={<EmailIcon />} title="Contact" subtitle="Let's build something together" />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Get in touch</Typography>
              <Typography sx={{ color: "text.secondary", mt: 1 }}>
                I'm open to roles in frontend engineering, React development, and UI work. Feel free to reach out.
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Button variant="outlined" startIcon={<EmailIcon />} href="mailto:patilpraveen1432@gmail.com">patilpraveen1432@gmail.com</Button>
                <Button variant="outlined" startIcon={<PhoneIcon />} href="tel:7842753302">+91 78427 53302</Button>
                <Button variant="outlined" startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/praveenkumarpatil7089" target="_blank">LinkedIn</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Quick Facts</Typography>
              <Stack spacing={1} sx={{ mt: 1 }}>
                <Fact label="Experience" value="2 years (React.js)" />
                <Fact label="Primary Stack" value="React, MUI, Redux Toolkit" />
                <Fact label="Location" value="Bengaluru, Karnataka" />
                <Fact label="Interests" value="Basketball, Mobile Gaming, Traveling" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function Fact({ label, value }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }}>
      <Typography sx={{ minWidth: 140, fontWeight: 600 }}>{label}</Typography>
      <Typography sx={{ color: "text.secondary" }}>{value}</Typography>
    </Stack>
  );
}

/** Footer **/
function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, mt: 6 }}>
      <Container>
        <Divider sx={{ mb: 3 }} />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2}>
          <Typography variant="body2">© {new Date().getFullYear()} Praveen Kumar Patil. All rights reserved.</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton component={MuiLink} href="https://www.linkedin.com/in/praveenkumarpatil7089" target="_blank" aria-label="LinkedIn"><LinkedInIcon /></IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

/** Small heading pattern **/
function SectionHeading({ icon, title, subtitle }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar variant="rounded" sx={{ bgcolor: "primary.main", color: "primary.contrastText", width: 32, height: 32 }}>
          {icon}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>{title}</Typography>
      </Stack>
      {subtitle && (
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>{subtitle}</Typography>
      )}
    </Box>
  );
}
