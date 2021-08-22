import React from 'react';
import CollocationBlock from './CollocationBlock'

function HomePageBlock() {

    return (
        <div id="collocationInfoArea">
        <h2 className="subHeading">What are collocations?</h2>
        <p>Collocations are one of the most important aspects of the English language. But what is a collocation? The dictionary definition is: “the habitual juxtaposition of a particular word with another word or words with a frequency greater than chance”. What that means in reality is that collocations are part of language patterns in English which are not explained by grammar. Collocations can take several forms. In the boxes below there are examples of VERB and PREPOSITION collocations, like “listen to”, VERB and NOUN collocations, like “take exception” and ADJECTIVE and PREPOSITION collocations, like “to be afraid of”. But there are also many other kinds of collocation, as you will see. Cambridge and IELTS examiners love good use of collocations. And they make your English sound natural, as well.</p>
            <div className="photoBar">
            <div className="flex-container">
            <CollocationBlock title="Verb + Preposition" col1a="quarrel" col1b="with" col2a="work"col2b="for"  col3a="escape" col3b="from"/>
            <CollocationBlock title="Verb + Noun" col1a="make" col1b="an effort" col2a="take "col2b="an exam" col3a="do your" col3b="best"/>
            <CollocationBlock title="Adjective + Preposition" col1a="be addicted" col1b="to" col2a="be insured "col2b="against" col3a="be fed up" col3b="with"/>
            </div>
            </div>


        </div>
    
    )

}

export default HomePageBlock