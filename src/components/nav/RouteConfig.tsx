import { Routes, Route } from "react-router";

import Layout from "components/Layout";
import Home from "components/home/_Home";
import Blog from "components/blog/Blog";
import PageNotFound from "components/PageNotFound";
import CalendarLayout from "components/calendar/CalendarLayout";
import CalendarRoot from "components/calendar/CalendarRoot";
import RootLayout from "components/RootLayout";

function RouteConfig() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route path="/calendar" element={<CalendarLayout />}>
                    <Route index element={<CalendarRoot />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default RouteConfig;
