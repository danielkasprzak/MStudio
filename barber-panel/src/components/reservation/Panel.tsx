interface PanelProps {
    children: React.ReactNode;
    panelType: string;
}

export default ({ children, panelType } : PanelProps) => {
    let cssClass = 'flex flex-col justify-start py-8';
    
    if (panelType === 'left') {
        cssClass += ' mr-4 sticky top-0 h-screen'
    } 
    else {
        cssClass += ' ml-4'
    }

    return (
        <div className={cssClass}>{children}</div>
    )
}