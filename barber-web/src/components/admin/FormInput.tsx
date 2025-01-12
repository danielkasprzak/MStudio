interface Props {
    name: string;
    placeholder: string;
    defaultVal: any;
    onChange: (e: any) => void;
    type: string;
    required?: boolean;
}

export default ({ name, placeholder, defaultVal, onChange, type, required } : Props) => {
    return (            
        <input name={name} value={defaultVal} required={required} onChange={onChange} type={type} placeholder={placeholder}
            className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border'
        />
    );
}