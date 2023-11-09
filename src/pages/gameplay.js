import React, {useState, useEffect, useRef} from "react";
import AnimalCard from "../components/AnimalCard";
import useTimer from "../components/useTimer";
import { useNavigate } from "react-router-dom";

function Gameplay({playerName}) {

    const [currentPlayer, setCurrentPlayer] = useState({})
    const navigate = useNavigate()
    const [sessionHighScore,setSessionHighScore] = useState(null)
    const [havePlayed, setHavePlayed] = useState(false)
    const [defeatAccepted, setDefeatAccepted] = useState(true)

    const { timeElapsed, startTimer, stopTimer, shouldDisplay, acceptDefeat} = useTimer(); // Set the duration to 10 seconds

    const score = useRef(0)
    const [yourScore, setYourScore] = useState(null)    

    function handleClick(event) {    
        if (event.target.id.startsWith('t')) {
            score.current++
            console.log('Score:' + score.current)
            timeElapsed.current = 0
            setCardsToDisplay(makeCards())
        }

        if (event.target.id.startsWith('fals')) {
            timeElapsed.current = 500
            stopTimer()
        }

        if (event.target.id.startsWith('new-game')) {
            setDefeatAccepted(false)
            setHavePlayed(true)
            setYourScore(0)
            setCardsToDisplay(makeCards())
            startTimer()
        }

    }

    function gameOver() {
        setDefeatAccepted(true)
        setYourScore(score.current)
        if (!sessionHighScore) {
            setSessionHighScore(score.current)
        } else if (score.current > sessionHighScore) {
            setSessionHighScore(score.current)
        }
        console.log(players)
        console.log(playerName)
        let historicPlayer = players.find((player) => player.name === playerName.current)
        
        if (historicPlayer) {
            if (score.current > historicPlayer.highscore) {
                fetch(`http://localhost:4000/players/${historicPlayer.id}`, {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: historicPlayer.name,
                        highscore: score.current
                    })
                })
            }
        } else {
            let newName = playerName.current
            let newScore = score.current
            fetch(`http://localhost:4000/players`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: newName,
                        highscore: newScore
                    })
                })
                players.push({id: players.length + 1, name: playerName.current, highscore: score.current})
        }

        timeElapsed.current = 100000000
        console.log(score)
        score.current = 0
    }

    const [cardsToDisplay, setCardsToDisplay] = useState([])
    const [correctText, setCorrectText] = useState('')

    const animalPics = [0,1,2,3]
    const animalNames = ['DOGS', 'CATS', 'DUCKS', 'BEARS']
    const numbers = [7,8,9,10]
    const numberNames = ['SEVEN', 'EIGHT', 'NINE', 'TEN']
    const [requireText, setRequireText] = useState(true)

    function randomArray(n) {
        let arrayOfInts = []

        let arrayOfRands = []
        for (let i = 0; i < n; i++) {
            arrayOfRands.push(Math.random())
        }

        let sortedRands = [...arrayOfRands].sort()

        for (let i = 0; i < n; i++) {
            arrayOfInts.push(arrayOfRands.indexOf(sortedRands[i]))
        }

        return arrayOfInts

    }

    function makeCards() {

        const cards = []

        const correctAnimalOrder = randomArray(4)
        const correctNumberOrder = randomArray(4)
        const shuffler = randomArray(4)

        const correctOne = Math.floor(4 * Math.random())

        const textNeeded = (Math.random() > .5)
        setRequireText(textNeeded)

        // AnimalCard({picturesNum
        //     picturesAnimal
        //     textNum
        //     textAnimal
        //     coords})

        if (!textNeeded) {
            for (let j = 0; j < 4; j++) {
                cards.push(

                    <AnimalCard 
                    key={j}
                    textNum={numberNames[correctNumberOrder[shuffler[j]]]}
                    textAnimal={animalNames[correctAnimalOrder[shuffler[j]]]}
                    picturesAnimal={animalPics[correctAnimalOrder[j]]}
                    picturesNum={numbers[correctNumberOrder[j]]}
                    correct={`${j===correctOne}${j}`}
                    coords={[350 * j + 50, 200]}
                    onCardClick={handleClick}
                    playing={true}

                    />
                )

            }
        } else {
            for (let j = 0; j < 4; j++) {
                cards.push(

                    <AnimalCard 
                    key={j}
                    textNum={numberNames[correctNumberOrder[j]]}
                    textAnimal={animalNames[correctAnimalOrder[j]]}
                    picturesAnimal={animalPics[correctAnimalOrder[shuffler[j]]]}
                    picturesNum={numbers[correctNumberOrder[shuffler[j]]]}
                    correct={`${j===correctOne}${j}`}
                    coords={[350 * j + 50, 200]}
                    onCardClick={handleClick}
                    playing={true}

                    />
                )
            }

        }

        setCorrectText(numberNames[correctNumberOrder[correctOne]] + ' ' + animalNames[correctAnimalOrder[correctOne]])

        return cards
        
    }

    const [players, setPlayers] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/players')
        .then(r => r.json())
        .then(pastPlayers => {setPlayers(pastPlayers)})
    },[])

    return (<div>

        { shouldDisplay || !defeatAccepted ? <></> : <> <button id='new-game' onClick={handleClick}>Start Game!</button><br/><h2>INSTRUCTIONS WILL APPEAR.<br>CLICK QUICK!</br></h2></>}
        
        {shouldDisplay? <h2>Click the card with {correctText} {requireText? 'written' : 'pictured'} </h2> : <></>}
        {shouldDisplay? cardsToDisplay : <></>}
        {acceptDefeat && !defeatAccepted && !shouldDisplay ? <button onClick={gameOver}>ACCEPT DEFEAT</button> : <></>}
        {!shouldDisplay && defeatAccepted && havePlayed ? <><h1>GAME OVER<br/>YOUR SCORE: {yourScore} </h1>
        <h4>BEST THIS SESSION: {sessionHighScore}</h4>
        <button onClick={() => {navigate('/high-scores')}}>See High Scores</button></>  : <></>}

    </div>)

}

export default Gameplay