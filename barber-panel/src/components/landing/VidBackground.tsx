interface VidBackgroundProps {
    source: string;
    zClass: string;
}

export default ({ source, zClass } : VidBackgroundProps) => {
    return (
        <video className={`absolute inset-0 w-full h-full object-cover ${zClass}`} autoPlay muted loop>
            <source src={source} type="video/mp4" />
        </video>
    );
}