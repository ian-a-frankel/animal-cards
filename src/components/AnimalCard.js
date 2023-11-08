import dog from '../assets/dog.jpeg'
import cat from '../assets/cat.jpeg'
import duck from '../assets/duck.jpeg'
import bear from '../assets/bear.jpeg'

function AnimalCard({picturesNum, picturesAnimal, textNum, textAnimal, coords, correct, onCardClick}) {

    const imgSrcs=[dog, cat, duck, bear]

    const pictureElts = []
    const randomAngle = Math.random()

    for(let i = 0; i < picturesNum; i++) {
        
        const angle = (Math.PI * (2 / picturesNum) * i + randomAngle)
        const transX = Math.floor(113 + 113 * Math.cos(angle))
        const transY = Math.floor(113 + 113 * Math.sin(angle))
        const itemStyle = {
            width: '74px',
            height: '74px',
            objectFit: 'cover',
            position: 'absolute',
            borderRadius: '37px',
            borderColor: 'navy',
            borderStyle: 'solid',
            transform: `translateX(${transX}px) translateY(${transY}px)`
            
        }

        pictureElts.push(<img alt={`${i}`} id={correct + i} key={i} src={imgSrcs[picturesAnimal]} style={itemStyle}/>)

    }

    pictureElts.push(<p id={correct + picturesNum} key={picturesNum} style={
        {   
            fontSize: '20px',
            position: 'absolute',
            transform: 'translateX(120px) translateY(105px)'
    
        }
    }
    
    >{textNum}<br/>{textAnimal}</p>)

    const divStyle = {

        position: 'absolute',
        left: `${coords[0]}px`,
        top: `${coords[1]}px`,
        width: '300px',
        borderStyle: 'solid',
        aspectRatio: 1,
        borderColor: 'navy',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: 'beige',
    }

    return <div style={divStyle} id={correct} onClick={onCardClick}>
        {pictureElts}
    </div>
}

export default AnimalCard