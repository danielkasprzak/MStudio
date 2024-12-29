interface VidBackgroundProps {
    vid: string;
}

export default ({ vid } : VidBackgroundProps) => {
    return (
        <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={vid} type="video/mp4" />
        </video>
    );
}