import React, { Component } from 'react'
import { Button, Modal } from 'react-materialize'

export default class AddFlashCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCards: [],
            textAreaFront: '',
            textAreaBack: '',
            frontError: '',
            backError: '',
            addError: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleAdd(event) {
        event.preventDefault()

        const err = this.validate()

        //if no errors add the current cards part of db
        if (!err) {
            let currentCard = {}
            currentCard.front = this.state.textAreaFront
            currentCard.back = this.state.textAreaBack

            let currentCards = this.state.currentCards.push(currentCard)

            this.setState({
                ...this.state,
                textAreaFront: '',
                textAreaBack: '',
                frontError: '',
                backError: '',
                addError: false,
                ...currentCards
            })

            //add cards to parents state
            //console.log(this.state.currentCards)
            this.props.handler(this.state.currentCards)


            console.log('----CARD SUCCESSFULLY ADDED---')
        }

    }

    validate = () => {
        let isError = false;
        const errors = {
            frontError: '',
            backError: ''
        }

        //add form validation
        if (this.state.textAreaFront.length < 1) {
            isError = true
            errors.frontError = 'Must have input'
            //this.state.addError = true;
            this.setState({
                ...this.state,
                addError: true,
                ...errors
                // errors: { ...errors }
            })
        }

        if (this.state.textAreaBack.length < 1) {
            isError = true
            errors.backError = 'Must have input'
            //this.state.addError = true;
            this.setState({
                ...this.state,
                addError: true,
                ...errors
                // errors: { ...errors }
            })
        }


        return isError;
    }


    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    render() {
        let frontError = this.state.frontError
        let backError = this.state.backError

        let cardsAdded = this.state.currentCards.length

        const frontErrorOptions = <div className="errorMessage">{frontError}</div>
        const backErrorOptions = <div className="errorMessage">{backError}</div>


        return (
            <Modal

                trigger={<Button className="amber"><i className="fas fa-plus"></i>Add FlashCard</Button>}>
                <div className="row">
                    <form id="addCardForm">
                        <div className="input-field col s6">

                            <h4>Front:</h4>
                            <textarea value={this.state.textAreaFront} onChange={this.handleChange} name="textAreaFront" id="textarea1" className="materialize-textarea validate"></textarea>
                            {frontErrorOptions}
                        </div>
                        <div className="input-field col s6">

                            <h4>Back:</h4>
                            <textarea value={this.state.textAreaBack} onChange={this.handleChange} name="textAreaBack" id="textarea2" className="materialize-textarea validate"></textarea>
                            {backErrorOptions}
                        </div>
                        <div className="col-s12">{cardsAdded} cards added</div>


                        <button id='flashcard-submit' onClick={this.handleAdd} className="btn waves-effect waves-light submitButton" value="Submit">Submit</button>

                    </form>
                </div>

            </Modal>
        )
    }
}
