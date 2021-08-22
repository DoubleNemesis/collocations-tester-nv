import React from 'react'
import styled from 'styled-components'

const myDiv = `Mr. <a href="">Sherlock</a> Holmes, was usually very late in the mornings, save upon those not <span id="word"> infrequents</span> occasions when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before. It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a “Penang lawyer.” Just under the head was a broad silver band nearly an inch across. “To James Mortimer, M.R.C.S., from his friends of the C.C.H.,” was engraved upon it, with the date “1884.” It was just such a stick as the old-fashioned family practitioner used to carry—dignified, solid, and reassuring.

“Well, Watson, what do you make of it?”

Holmes was sitting with his back to me, and I had given him no sign of my occupation.

“How did you know what I was doing? I believe you have eyes in the back of your head.”

“I have, at least, a well-polished, silver-plated coffee-pot in front of me,” said he. “But, tell me, Watson, what do you make of our visitor’s stick? Since we have been so unfortunate as to miss him and have no notion of his errand, this accidental souvenir becomes of importance. Let me hear you reconstruct the man by an examination of it.”

“I think,” said I, following as far as I could the methods of my companion, “that Dr. Mortimer is a successful, elderly medical man, well-esteemed since those who know him give him this mark of their appreciation.”

“Good!” said Holmes. “Excellent!”

“I think also that the probability is in favour of his being a country practitioner who does a great deal of his visiting on foot.”

“Why so?”`

const BookDisplay = styled.div`
    color: #333;
    white-space: pre-wrap;
    padding: 2em;

    p{
           color: #333;
    white-space: pre-wrap;
    }

    #word{
        color:red;
    }
`
const Container = styled.div`
    background-color: whitesmoke;
    width: 69%;
    margin: 0 auto;
    white-space: pre-wrap;
`

function BookTest() {

    return (
        <>
            <Container>
                <BookDisplay>
                    <h2>Chapter 1</h2>
                    <div dangerouslySetInnerHTML={{__html: myDiv}}/>
                </BookDisplay>
            </Container>
        </>
    )
}

export default BookTest