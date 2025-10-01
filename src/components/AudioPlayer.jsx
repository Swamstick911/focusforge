import React, { useRef } from "react";

export default function AudioPlayer({ src, playSignal }) {
    const audioRef = useRef(null);

    React.useEffect(() => {
        if(playSignal) audioRef.current?.play();
    }, [playSignal]);

    return <audio ref={audioRef} src={src} preload="auto"/>;
}