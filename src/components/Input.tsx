interface Props {
    value?: string;
    type: string,
    name: string,
    handleChange?: any,
}

export default function Input(props:Props){
    return(
        <>
        <input type={props.type} name={props.name} value={props.value} onChange={props.handleChange} />
        <br />
        </>
    )
}