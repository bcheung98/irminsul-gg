"use client";

import Loader from "./Loader";

export default function LoaderGlobal() {
    return (
        <>
            <Loader />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <img
                    className="loading-image"
                    src="https://assets.irminsul.gg/v2/_common/logo/logo_red.png"
                    alt="IRMINSUL.GG"
                />
            </div>
        </>
    );
}
