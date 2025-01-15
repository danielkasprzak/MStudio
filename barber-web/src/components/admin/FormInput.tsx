interface Props {
    name: string;
    id: string;
    placeholder?: string;
    defaultVal: any;
    onChange: (e: any) => void;
    type: string;
    required?: boolean;
}

export default ({ name, id, placeholder, defaultVal, onChange, type, required } : Props) => {
    if (type === 'checkbox') 
    {
        return (
            <input name={name} id={id} size={30} checked={defaultVal} required={required} onChange={onChange} type={type} placeholder={placeholder}
                className='py-4 my-4 mx-2 px-6 outline-none border border-stone-300'
            />
        );
    }

    return (            
        <input name={name} size={30} value={defaultVal} required={required} onChange={onChange} type={type} placeholder={placeholder}
            className='py-4 my-4 mx-2 px-6 outline-none text-charcoal font-lato font-bold text-xs tracking-wider border border-stone-300'
        />
    );
}