interface ShowResultProps { 
    "value": string;
}


export default function ShowResult({ value }: ShowResultProps) { 

    return (
        <div>
            <p>Selected Fighter: {value}</p>
        </div>
    )
}