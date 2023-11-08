import react, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function HighScores() {

    const navigate = useNavigate()

    const [players, setPlayers] = useState([])
    function comparator(a,b) {
        return b.highscore - a.highscore
    }

    const sortedPlayers = players.sort(comparator)

    useState(() => {
        fetch('http://localhost:4000/players')
        .then(r => r.json())
        .then(users => {setPlayers(users)})
    }, [])

    return <><ol style={{textAlign: 'left'}}>
        {sortedPlayers.map( player => <li key={player.name}>{player.name}: .................. {player.highscore}</li>)}
    </ol><button onClick={() => {navigate('/')}}>Back to Main Page</button></>
}

export default HighScores