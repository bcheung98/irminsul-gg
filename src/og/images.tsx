export function Default() {
    return (
        <div
            tw="flex h-full w-full flex-col justify-center p-15"
            style={{
                backgroundImage:
                    "url(https://assets.irminsul.gg/v2/_common/images/Irminsul.png)",
                backgroundPosition: "20%",
            }}
        >
            <div tw="flex flex-col">
                <h1 tw="m-0 text-8xl font-bold leading-none tracking-tighter text-white">
                    IRMINSUL.GG
                </h1>
                <h1 tw="m-0 mt-2 text-5xl font-semibold leading-none tracking-tighter text-[#0067ff]">
                    Gacha Game Database and Tools
                </h1>
            </div>
        </div>
    );
}
