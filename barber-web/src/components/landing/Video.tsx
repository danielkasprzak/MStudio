interface Props {
    source: string;
    zClass: string;
    videoRef: React.RefObject<HTMLVideoElement>;
}

export default ({ source, zClass, videoRef } : Props) => {
    return (
        <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover ${zClass}`} autoPlay muted loop>
            <source src={source} type="video/mp4" />
        </video>
    );
}