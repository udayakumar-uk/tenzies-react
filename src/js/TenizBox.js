

export default function TenizBox(prop){

    const style = {
        backgroundColor: prop.tenze.isFreez ? '#39c577' : '#eee',
        color: prop.tenze.isFreez ? '#fff' : '#000'
    }

    return(
        <div className="tenzi-card" onClick={prop.tenzClick} style={style}>
            {prop.tenze.value}
        </div>

    )
}