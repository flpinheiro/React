import React from 'react';


export default class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            saude: false,
            selectedOption: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
    }

    render() {

        return (
            <form>
                <label> Nome:
                    <input type='text'
                        name='name'
                        onChange={this.handleInputChange}
                        value={this.state.name}
                    />
                </label>


                <br />
                <label> email:
                    <input type='text'
                        name='email'
                        onChange={this.handleInputChange}
                        value={this.state.email}
                    />
                </label>
                <br />

                <label>
                    saude:
                        <input
                        name="saude"
                        type="checkbox"
                        checked={this.state.saude}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="option1"
                                name='selectedOption'
                                checked={this.state.selectedOption === 'option1'}
                                onChange={this.handleInputChange} />
                            Option 1
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="option2"
                                name='selectedOption'
                                checked={this.state.selectedOption === 'option2'}
                                onChange={this.handleInputChange} />
                                Option 2
                            </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="option3"
                                name='selectedOption'
                                checked={this.state.selectedOption === 'option3'}
                                onChange={this.handleInputChange} />
                            Option 3
                        </label>
                    </div>
                </div>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}