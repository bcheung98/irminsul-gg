// MUI imports 
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Divider } from "@mui/material"

function About() {

    const theme = useTheme()

    return (
        <Box
            sx={{
                display: "block",
                width: "50%",
                mx: "auto",
                mb: "100px",
                p: 5,
                backgroundColor: `${theme.paper.backgroundColor}`,
                color: `${theme.text.color}`,
                borderRadius: "15px",
            }}
        >
            <Box>
                <Typography variant="h4" sx={{ mb: "30px" }}>Roadmap to 1.0</Typography>
                <Typography>In the post below, I mentioned that I would like to polish some things up before a full 1.0 Version of the site. Here is the list of things I will aim to complete for 1.0:</Typography>
                <Typography component="span">
                    <ul>
                        <li>Visual touchups & theming
                            <ul>
                                There's still a lot of styling adjustments I'd like to do to make the subsites look cleaner. Additionally, I'll be looking to add functionality switch between dark and light themes.
                            </ul>
                        </li>
                        <li>Mobile formatting
                            <ul>
                                If you currently try to view the website on a phone, it will look...ugly. This is because I have not implemented mobile formatting yet. I would like to get done so mobile users can view the site without any issues.
                            </ul>
                        </li>
                        <li>Framework upgrade (This one is a bit technical, and deals with a lot of internal site stuff)
                            <ul>
                                When I was learning React, I used a framework called "Create React App" (CRA), and since then, its what I have been using to create my websites. It has come to my attention that CRA has fallen out of favor in the web development circle for other better alternatives. Because of this, I will be looking to migrate the site from CRA to another React framework. I don't know which one just yet, but the two I have been looking at are Next.js and Vite.
                            </ul>
                        </li>
                    </ul>
                </Typography>
                <Typography>I can't really give you an exact timeframe of when each of these milestones will be completed (because I suck at figuring out how long things will take), but I'll be extremely generous and say I'll have this all done by the end of the year. If it isn't done by then, I'll just say Soon™.</Typography><br />
                <Typography>- BC (9/23/2024)</Typography>
            </Box>
            <Divider sx={{ my: "20px" }} />
            <Box>
                <Typography variant="h4" sx={{ mb: "30px" }}>The story of Irminsul.GG</Typography>
                <Typography>Back in March 2021, when I was first learning how to make websites using React in a coding bootcamp, I decided that it would be a good idea to apply what I've learned to something I really enjoy. Of course, making a website for <a href="https://genshin.hoyoverse.com/en/home"><em>Genshin Impact</em></a>, which came out six months before, was the first thing that came to mind. I wanted to make a simple, single-page database website that showed all the characters and what materials they need to level up, and be able to filter them based off different attributes. At the time, there were only one or two other database websites that provided this kind of information for <em>Genshin Impact</em>, and popular sites such as <em>Project Amber</em> and <em>Hakush.in</em> didn't exist yet. Over the course of a week, I put together the website, and my creative brain named it "<a href="https://bcheung98.github.io/genshin-impact-reference-sheet/">Genshin Impact Reference Sheet</a>" (GIRS).</Typography><br />
                <Typography>I kept updating the site as new characters were released, and when Version 2.0 of <em>Genshin Impact</em> released in July 2021, I decided to commemorate it with <a href="https://bcheung98.github.io/genshin-impact-reference-sheet-2.0/">GIRS 2.0</a>. GIRS 2.0 added a popup showing detailed character information displaying character talents and constellations, expanded filters, and a cleaner look from using Material UI. In addition, I implemnted react-redux to help centralize the application state of the site. Once again, I kept updating the site with each new character release, and over time added more features such as tables for character stats, ascension, talent scaling, and levelling.</Typography><br />
                <Typography>Sometime in the middle of 2022, I wanted to add client-side routing to the site to enable multi-page browsing; this would allow me to add dedicated pages for characters, a section for view weapons, and much more. It was the last thing I needed to turn my little passion project into a full website, and my goal for GIRS 3.0. However, due to a <a href="https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing">limitation of GitHub Pages and React Router</a>, I was unable to implement this.</Typography><br />
                <Typography>In January 2023, I found a <a href="https://github.com/rafgraph/spa-github-pages">script</a> that got around GitHub Pages' limitation, and after figuring out how it works, began to work on implementing it to my site. I added pages for weapons, banners, and the newly-released TCG game mode. After finishing GIRS 3.0 revamp, I decided to name the website "Project Irminsul", after <em>Genshin Impact</em>'s <a href="https://genshin-impact.fandom.com/wiki/Irminsul">world tree</a> that serves as a <u>repository for all of the information</u> of the game's universe. (Note: there is no link to "Project Irminsul" because the repo associated with it is the same one serving genshin.irminsul.gg currently, and I took down the GitHub Pages link)</Typography><br />
                <Typography>In April 2023, I started playing HoYoverse's newly-released <a href="https://hsr.hoyoverse.com/en-us/home"><em>Honkai: Star Rail</em></a>, and knew that I had to make a website for HSR as well. I finished the website at the end of June 2023, and named it "Project Stellaron". Project Stellaron's release came with a new feature in the ascension planner, and I also implented this planner to Project Irminsul as well.</Typography><br />
                <Typography>I decided not to do a revamp of Project Irminsul when Version 4.0 of <em>Genshin Impact</em> released in August 2023, mainly because I didn't know what else I could add at the time. In May 2024, Kuro Games released <a href="https://wutheringwaves.kurogames.com/en/main"><em>Wuthering Waves</em></a>, which I began playing and also decided to make a website for it, naming it "Project Tacetite". In contrast to the previous two websites, I wrote Project Tacetite in TypeScript, which I had began learning at the time. I converted the entirety of Project Irminsul to TypeScript a few months later, and decided to make that my 4.0 revamp. I also added pages to all my sites to view Artifacts, Relics, and Echoes, for Genshin, HSR, and WuWa respectively.</Typography><br />
                <Typography>In September 2024, I learned how to use some Amazon Web Services features, including S3, CloudFront, and Route 53. I realized that with <em>Genshin Impact</em>'s Version 5.0's release a few weeks prior, it would be the perfect time to migrate all my websites from GitHub Pages to CloudFront. In addition, I decided that I would create a central hub website that would serve as a portal for my three websites; Project Irminsul, Project Stellaron, and Project Tacetite would all be subdomains of the central website. I also wanted to come up with a brand name that would be the name of the central hub and the entire website collection. I inititally came up with "Elysia Project", named after my favorite <em>Honkai Impact 3rd</em> character, but decided to keep the "Irminsul" name, as it conveys the idea of an information database the best. The irminsul.gg domain was available, so I used that to complete the brand name of my project. The next day, <a href="https://irminsul.gg/">irminsul.gg</a> was up and running, along with its three subdomains for <a href="https://genshin.irminsul.gg/">Genshin</a>, <a href="https://hsr.irminsul.gg/">HSR</a>, and <a href="https://wuwa.irminsul.gg/">WuWa</a>.</Typography><br />
                <Typography>Today marks the first official release of Irminsul.gg. I'm deciding to tag it as Version 0.5; its not 1.0 just yet because I still want to polish some more stuff first, and the previous four versions (0.1 - 0.4 if you will) represent the evolutions from the GIRS to Project Irminsul. It certainly has been a long journey, from a single little website in March 2021 to three comprehensive websites hosted on CloudFront in September 2024. I don't plan on stopping updating these sites anytime soon, and I have been thinking about making a fourth site for <a href="https://zenless.hoyoverse.com/en-us/main"><em>Zenless Zone Zero</em></a> in the future if time allows.</Typography><br />
                <Typography>Truthfuly, I have no idea if anyone will actually use this site (other than myself and friends I show this to), but if it somehow gets popular and people need to contact me for feedback and/or to report issues, I can probably set something up for that. If you are reading this and made it to the end, thank you!</Typography><br />
                <Typography>- BC (9/21/2024)</Typography>
            </Box>
        </Box>
    )

}

export default About