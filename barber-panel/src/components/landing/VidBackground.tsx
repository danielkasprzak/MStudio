interface VidBackgroundProps {
    source: string;
}

export default ({ source } : VidBackgroundProps) => {
    return (
        <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={source} type="video/mp4" />
        </video>
    );
}