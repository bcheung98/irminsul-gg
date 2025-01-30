import { Routes, Route } from "react-router";

import RootLayout from "components/_RootLayout";
import Home from "components/home/_Home";
import PageNotFound from "components/PageNotFound";
import CalendarRoot from "components/calendar/CalendarRoot";

function RouteConfig() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/calendar" element={<CalendarRoot />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default RouteConfig;
