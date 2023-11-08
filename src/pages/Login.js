import AnimalCard from '../components/AnimalCard'
import { useNavigate } from 'react-router-dom'

function Login({playerName}) {

    const navigate = useNavigate()

    return (<>
        <p style={
            {
                textAlign: 'center',
                fontSize: '50px'
            }
        }> WELCOME TO AMINAL CUNNFUSIAN</p>
        <form onSubmit={(event) => {
            event.preventDefault()
            if (playerName.current === '') {
                    alert("Sorry, but we do not support anonymous gaming at this time.")
                } else {
                    navigate('/play')
                }
            }}>

            <input type='text' placeholder='Enter your name' onChange={(event) => {playerName.current = event.target.value}}></input>
            <input type='submit'></input>
        </form>

        <div>
        
            <AnimalCard picturesNum={3} picturesAnimal={0} textAnimal={'CATS'} textNum={'THREE'} coords={[50,250]} correct={'neutral'} onCardClick={()=>{}}/>
            <AnimalCard picturesNum={7} picturesAnimal={1} textAnimal={'DOGS'} textNum={'NINE'} coords={[400,450]} correct={'neutral'} onCardClick={()=>{}}/>
            <AnimalCard picturesNum={9} picturesAnimal={2} textAnimal={'DUCKS'} textNum={'SEVEN'} coords={[750,250]} correct={'neutral'} onCardClick={()=>{}}/>
            <AnimalCard picturesNum={5} picturesAnimal={3} textAnimal={'BEARS'} textNum={'FIVE'} coords={[1100,450]} correct={'neutral'} />
        
        </div>
        </>)
    }


export default Login