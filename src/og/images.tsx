export function Default() {
    return (
        <div
            tw="flex h-full w-full flex-col justify-center p-10"
            style={{
                backgroundImage:
                    "url(https://assets.irminsul.gg/v2/_common/images/Irminsul.png)",
                backgroundPosition: "20%",
            }}
        >
            <div tw="flex gap-2">
                <img
                    src="https://assets.irminsul.gg/v2/_common/logo/logo_red.png"
                    style={{ width: "140px", height: "140px" }}
                />
                <div tw="flex flex-col">
                    <h1 tw="m-0 text-8xl font-bold tracking-tighter text-white filter drop-shadow-md">
                        IRMINSUL.GG
                    </h1>
                    <h1 tw="m-0 mt-2 text-4xl font-semibold tracking-tighter text-[#002b7c] filter drop-shadow-md">
                        Gacha Game Database and Tools
                    </h1>
                </div>
            </div>
        </div>
    );
}
