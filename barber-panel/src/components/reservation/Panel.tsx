interface PanelProps {
    children: React.ReactNode;
    panelType: string;
}

export default ({ children, panelType } : PanelProps) => {
    let cssClass = 'flex flex-col justify-start mt-8';
    
    if (panelType === 'left') {
        cssClass += ' mr-4'
    } 
    else {
        cssClass += ' ml-4'
    }

    return (
        <div className={cssClass}>{children}</div>
    )
}