"use client";

// Component imports
import { Description, H4, H6 } from "@/components/Blog";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import DateObject from "@/helpers/dates";

const LAST_UPDATED = new DateObject("2026-08-19 22:00:00 UTC+8").string;

export default function PrivacyPolicy() {
    const theme = useTheme();

    return (
        <Container
            sx={{
                mt: { xs: 4, md: 12 },
                p: { xs: 2, md: 0 },
                backdropFilter: "blur(4px)",
            }}
        >
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <H4>Privacy Policy</H4>
                    <Description>{`Last updated: ${LAST_UPDATED}`}</Description>
                </Stack>
                <Description>
                    I designed Irminsul.GG ("the website") with privacy in mind.
                    I collect only limited information needed to understand how
                    the website is used and to keep its features working
                    properly.
                </Description>
                <Stack spacing={1} divider={<Divider />}>
                    <H6>Website Analytics</H6>
                    <Stack spacing={1}>
                        <Description>
                            I use{" "}
                            <NavLink
                                href="https://www.cloudflare.com/web-analytics/"
                                openInNewTab
                                style={{
                                    color: theme.text.selected,
                                    fontWeight: theme.font.weight.highlight,
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                Cloudflare Web Analytics
                            </NavLink>{" "}
                            to understand how the website is being used and to
                            monitor its performance. This helps me understand:
                        </Description>
                        <Description>
                            <ul>
                                <li>How many people visit the website</li>
                                <li>How often the website is visited</li>
                                <li>Which pages are most popular</li>
                                <li>How visitors arrive at the website</li>
                            </ul>
                        </Description>
                        <Description>
                            The analytics may also provide general information
                            about visitors, such as their{" "}
                            <b style={{ color: theme.text.primary }}>
                                country, device type, browser, operating system,
                                and website performance
                            </b>
                            .
                        </Description>
                        <Description>
                            Cloudflare Web Analytics is a privacy-first service,
                            and is designed to provide website statistics
                            without using cookies or local browser storage for
                            analytics.
                        </Description>
                    </Stack>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <H6>What I Don't Collect</H6>
                    <Stack spacing={1}>
                        <Description>
                            I do not intentionally collect information through
                            Cloudflare's analytics that directly identifies
                            individual visitors.
                        </Description>
                        <Description>I do not use:</Description>
                        <Description>
                            <ul>
                                <li>Advertising trackers</li>
                                <li>Tracking cookies</li>
                                <li>Cross-site tracking</li>
                                <li>Individual visitor profiles</li>
                                <li>Analytics for targeted advertising</li>
                            </ul>
                        </Description>
                        <Description>
                            I do not sell analytics information to third
                            parties.
                        </Description>
                    </Stack>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <H6>Cookies and Browser Storage</H6>
                    <Stack spacing={1}>
                        <Description>
                            This website does not use cookies for tracking or
                            analytics.
                        </Description>
                        <Description>
                            Some tools and features on the website use your
                            browser's local storage to save information such as
                            tool settings, preferences, or other information
                            needed for those features to function. This
                            information is stored locally in your browser and is
                            not transmitted to me.
                        </Description>
                        <Description>
                            I do not use information stored by these tools to
                            identify or track visitors.
                        </Description>
                    </Stack>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <H6>Website Content and Data</H6>
                    <Stack spacing={1}>
                        <Description>
                            The website is a client-side application and does
                            not use a server to collect or process information
                            submitted by visitors.
                        </Description>
                        <Description>
                            The website may request static files, such as JSON
                            data containing website content, from my own hosting
                            infrastructure. These requests are used solely to
                            provide the website and its content.
                        </Description>
                        <Description>
                            I do not intentionally collect or retain information
                            from these requests for the purpose of identifying
                            or tracking visitors.
                        </Description>
                    </Stack>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <H6>Third-Party Services</H6>
                    <Stack spacing={1}>
                        <Description>
                            Cloudflare Web Analytics is the only third-party
                            service used by this website for visitor analytics.
                        </Description>
                        <Description>
                            The website does not use third-party advertising
                            services, analytics trackers, or tracking pixels.
                        </Description>
                    </Stack>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <H6>Changes to This Policy</H6>
                    <Description>
                        I may update this policy if the website's features,
                        analytics, or data practices change. Any changes will be
                        reflected on this page along with an updated "Last
                        updated" date.
                    </Description>
                </Stack>
            </Stack>
        </Container>
    );
}
