import React, { Component } from 'react'
import axios from 'axios'


export default class Flashcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDoc: [],
            cards: [],
            counter: 0,
            showAnswer: false,
            id: ''
        }


    }

    componentWillMount() {
        //create a post request to get data from mongo
        console.log('component did mount')
        axios.post('/displayCard', {
            id: this.props.id
        })
            .then((response) => {
                // console.log(response.data.cards);
                this.setState({
                    currentDoc: response.data,
                    cards: response.data.cards
                })
            })
            .catch(function (error) {
                console.log(error);
            })


        //console.log('component did mount')
    }


    componentWillReceiveProps(nextProps) {
        //console.log('component recieve props')
        //changes state of component when props update
        this.setState({ id: nextProps.id });

    }

    componentDidUpdate() {
        // console.log('update')

    }

    answerClick = () => {
        //console.log('answer click triggered')
        this.setState({
            showAnswer: true
        })
    }

    nextClick = () => {
        //console.log('next click clicked')
        this.setState({
            counter: this.state.counter + 1,
            showAnswer: false
        })
    }

    newGame = () => {
        console.log('new game clicked')
        this.setState({
            counter: 0,
            showAnswer: false
        })
    }

    render() {
        const flashcard = this.state.currentDoc;
        let cards = this.state.cards
        let counter = this.state.counter
        let nextButton;
        let newGameButton;
        let newGameDiv;
        let cardDivFront;
        let cardDivBackButton;
        if (counter < this.state.cards.length) {
            cardDivFront = <div>{this.state.cards[counter].front}</div>
            cardDivBackButton = <button onClick={this.answerClick} className="waves-effect waves-light btn">See Answer</button>


            if (this.state.showAnswer) {
                cardDivBackButton = <div>{this.state.cards[counter].back}</div>
                nextButton = <button onClick={this.nextClick} className="waves-effect waves-light btn">Next</button>
            }
        }

        if (counter === this.state.cards.length) {
            newGameDiv = <h2>Play Again?</h2>
            newGameButton = <button onClick={this.newGame} className="waves-effect waves-light btn">Play Again</button>
        }


        return (
            <div>

                <h4>Card {this.state.counter + 1}</h4>
                <div className="flashcardDisplay row">
                    <div className="flashcardFront col s6">
                        {newGameDiv}
                        {newGameButton}
                        <h2>{cardDivFront}</h2>
                    </div>
                    <div className="flashcardBack col s6">
                        <h2 id="cardAnswer">{cardDivBackButton}</h2>
                    </div>
                    {nextButton}
                </div>
            </div>
        )
    }
}
