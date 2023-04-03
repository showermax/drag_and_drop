import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

    const [cardList, setCardList] = useState([
        {id: 1, order: 3, text: '1', color: "red"},
        {id: 2, order: 1, text: '2', color: "blue"},
        {id: 3, order: 2, text: '3', color: "green"},
        {id: 4, order: 4, text: '4', color: "orange"},
    ])

    const [currentCard, setCurrentCard] = useState(null)
    const dragStartHandler = (e, card) => {
        console.log(('drag' + card))
        setCurrentCard(card)
    }
    const dragEndHandler = (e) => {

    }
    const dragOverHandler = (e) => {
        e.preventDefault()
    }
    const dropHandler = (e, card) => {
        console.log('drop', card )
        e.preventDefault()
        setCardList(cardList.map(c => {
                if (c.id === card.id) {
                    return {...c, order: currentCard.order}
                }
                if (c.id === currentCard.id) {

                    return {...c, order: card.order}
                }
                return c
            }
        ))
    }

    const sortedCards = (a,b)=> {
        if (a.order > b.order) {
            return 1
        }
        else {
            return -1
        }
    }
    return (
        <div className="App">
            {
                cardList.sort(sortedCards).map(el => {
                    return (
                        <div className={'card'} draggable={true}
                             onDragStart={(e) => dragStartHandler(e, el)}
                             onDragLeave={(e) => dragEndHandler(e)}
                             onDragEnd={(e) => dragEndHandler(e)}
                             onDragOver={(e) => dragOverHandler(e)}
                             onDrop={(e) => dropHandler(e, el)}>
                            {el.text}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default App
