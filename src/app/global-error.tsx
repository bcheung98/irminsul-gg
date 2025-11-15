"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <head>
                <title>Irminsul.GG</title>
                <meta
                    name="description"
                    content="A database and companion website for various gacha games."
                />
            </head>
            <body>
                <img
                    src="https://assets.irminsul.gg/main/images/Irminsul.png"
                    id="background-image"
                />
                <main style={{ position: "relative", marginTop: "16px" }}>
                    <div
                        id="global-error"
                        style={{
                            padding: "16px",
                            width: "50%",
                            margin: "auto",
                        }}
                    >
                        <p
                            className="global-error-text"
                            style={{ fontSize: "1.75rem", margin: 0 }}
                        >
                            Something went wrong!
                        </p>
                        <p
                            className="global-error-text"
                            style={{ fontSize: "1rem" }}
                        >
                            Here are some things you can try:
                        </p>
                        <ul>
                            <li className="global-error-text">
                                Click{" "}
                                <span
                                    onClick={() => {
                                        console.clear();
                                        reset();
                                    }}
                                    style={{
                                        color: "rgb(30, 175, 255)",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }}
                                >
                                    here
                                </span>{" "}
                                to try and reload the segment.
                            </li>{" "}
                            <li className="global-error-text">
                                Refresh the browser's cache by pressing{" "}
                                <u>Ctrl + F5</u> (Windows) or{" "}
                                <u>Cmd + Shift + R</u> (Mac).
                            </li>
                            <li className="global-error-text">
                                Clear your local storage (this will reset your
                                settings and any data in planners).
                            </li>
                        </ul>
                        <p
                            className="global-error-text"
                            style={{ fontSize: "1rem" }}
                        >
                            If all else fails, please let me know on Discord!
                        </p>
                        <span className="global-error-text">
                            <a href="https://discord.gg/QGehvhYdAz">
                                <u>Click here to join the Discord</u>
                            </a>
                        </span>
                        <p className="global-error-text">Error details:</p>
                        <div
                            style={{
                                backgroundColor: "rgb(8, 32, 72)",
                                borderRadius: "4px",
                                padding: "0px 16px",
                                overflow: "auto",
                            }}
                        >
                            <pre>
                                <code
                                    className="global-error-text"
                                    style={{ color: "white" }}
                                >
                                    {error.stack || error.message}
                                </code>
                            </pre>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
