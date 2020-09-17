import React from 'react';

//remover para arquivo especifico.
export const acao = [
    { id: 1, nome: 'Adoção' },
    { id: 2, nome: 'Apadrinhar' }
]

export const especie = [
    { id: 1, nome: 'Gato' },
    { id: 2, nome: 'Cachorro' }
];

export const sexo = [
    { id: 1, nome: 'Macho' },
    { id: 2, nome: 'Fêmea' }
];

export const porte = [
    { id: 1, nome: 'Pequeno' },
    { id: 2, nome: 'Medio' },
    { id: 3, nome: 'Grande' },
    { id: 4, nome: 'Gigante' }
];

export const idade = [
    { id: 1, nome: 'Filhote' },
    { id: 2, nome: 'Adulto' },
    { id: 3, nome: 'Idoso' }
];

export const tempoAcompanhamento = [
    { id: 1, nome: '1 mês' },
    { id: 2, nome: '3 meses' },
    { id: 3, nome: '6 meses' },
    { id: 4, nome: '1 ano' }
];

export const temperamento = [
    { name: 'Brincalhão', type: 'brincalhao' },
    { name: 'Tímido', type: 'timido' },
    { name: 'Calmo', type: 'calmo' },
    { name: 'Guarda', type: 'guarda' },
    { name: 'Amoroso', type: 'amoroso' },
    { name: 'Preguiçoso', type: 'preguicoso' }
];

export const saude = [
    { name: 'Vacinado', type: 'vacinado' },
    { name: 'vermifugado', type: 'vermifugado' },
    { name: 'Castrado', type: 'castrado' },
    { name: 'Doente', type: 'doente' }
];

export const apadrinhamento = [
    { name: 'Termo de Apadrinhamento', type: 'termoApadrinhamento' },
    { name: 'Visitas ao animal', type: 'visitas' },
    { name: 'Auxilio Financeiro', type: 'auxilioFinanceiro' }
];

export const auxilioFinanceiro = [
    { name: 'Alimentação', type: 'alimento' },
    { name: 'Saúde', type: 'saude' },
    { name: 'Objetos', type: 'objetos' }
];

export const adocao = [
    { name: 'Termo de Adoção', type: 'termoAdocao' },
    { name: 'Fotos de Casa', type: 'fotosCasa' },
    { name: 'Visitas Prévia', type: 'visitaPrevia' },
    { name: 'Acompanhamento após adoção', type: 'acompanhamentoAposAdocao' }
];
// remover para arquivo específico
export class RadioButtonInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onRadioButtonChange(event);
    }

    render() {
        const name = this.props.name;
        const legend = this.props.legend;
        const list = this.props.list;
        const handleChange = this.handleChange.bind(this);
        const value = Number(this.props.value);
        const disabled = this.props.disabled ?? false;
        return (
            <div>
                <legend>{legend}</legend>
                {list.map(function (d, idx) {
                    return (
                        <span key={d.id}>
                            <label>
                                <input
                                    type="radio"
                                    value={d.id}
                                    name={name}
                                    checked={value === d.id}
                                    onChange={handleChange}
                                    disabled={disabled}
                                />
                                {d.nome}</label>
                        </span>
                    );
                })}
            </div>
        );
    }
}

export class CheckboxInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.onCheckChange(event);
    }
    render() {
        const value = this.props.value;
        const handleChange = this.handleChange.bind(this);
        const list = this.props.list;
        const legend = this.props.legend;
        const disabled = this.props.disabled ?? false;
        return (
            <div>
                <legend>{legend}</legend>
                {list.map(function (d, idx) {
                    return (
                        <span key={idx}>
                            <label>
                                <input
                                    name={d.type}
                                    type="checkbox"
                                    disabled={disabled}
                                    checked={value[d.type]}
                                    onChange={handleChange} />
                                {d.name}
                            </label>
                        </span>
                    );
                })}
            </div>
        );
    }
}

export default class FormApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectionClick = this.handleSelectionClick.bind(this);
        this.state = {
            error: [],
            acao: 0,
            nome: '',
            sexo: 0,
            especie: 0,
            porte: 0,
            idade: 0,
            sobre: '',

            brincalhao: false,
            timido: false,
            calmo: false,
            guarda: false,
            amoroso: false,
            preguicoso: false,

            vacinado: false,
            vermifugado: false,
            castrado: false,
            doente: false,
            doenca: '',

            termoAdocao: false,
            fotosCasa: false,
            visitaPrevia: false,
            acompanhamentoAposAdocao: false,
            tempoAcompanhamento: 0,

            termoApadrinhamento: false,
            auxilioFinanceiro: false,
            visitas: false,

            saude: false,
            objetos: false,
            alimento: false,
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.setState({ error: this.state.error.splice(0) });
        let erro = [];
        if (this.state.nome === '') {
            erro = erro.concat('O nome do animal deve ser especificado.');
        }
        if (this.state.sexo === 0) {
            erro = erro.concat('O sexo do animal deve ser especificado.')
        }
        if (this.state.especie === 0) {
            erro = erro.concat('A espécie do animal deve ser especificado.')
        }
        if (this.state.porte === 0) {
            erro = erro.concat('O porte do animal deve ser especificado.')
        }
        if (this.state.idade === 0) {
            erro = erro.concat('A idade do animal deve ser especificado.')
        }
        if (this.state.acompanhamentoAposAdocao && this.state.tempoAcompanhamento === 0) {
            erro = erro.concat('Deve indicar o tempo de acompanhamento.')
        }

        if (this.state.doente && this.state.doenca.trim().length === 0) {
            erro = erro.concat('Deve indicar a doença do animal.')
        }

        this.setState({ error: erro })

        event.preventDefault();
        if (erro.length !== 0) {
            return;
        }

        if (!this.state.acompanhamentoAposAdocao) {
            this.setState({ tempoAcompanhamento: 0 });
        }

        if (!this.state.doente) {
            this.setState({ doenca: '' });
        }
        if (!this.state.auxilioFinanceiro) {
            this.setState({ alimento: false, saude: false, objetos: false });
        }
    }

    handleSelectionClick(event) {
        event.preventDefault();

        let acao = Number(event.target.value);
        if (acao === this.state.acao) {
            acao = 0;
        }
        this.setState({
            acao: Number(acao)
        });
    }

    renderSelectionButton() {
        return (
            <div>
                <span>
                    <button onClick={this.handleSelectionClick} value={1} >Adoção</button>
                </span>
                <span>
                    <button onClick={this.handleSelectionClick} value={2}>Apadrinhar</button>
                </span>
            </div>
        );
    }

    renderSubmitButton() {
        if (this.state.acao === 0) {
            return <></>;
        }
        if (this.state.acao === 1) {
            return (
                <div>
                    <button onClick={this.handleSubmit}>Colocar para Adoção</button>
                </div>
            );
        }
        if (this.state.acao === 2) {
            return (
                <div>
                    <button onClick={this.handleSubmit}>Procurar Padrinho</button>
                </div>
            );
        }
    }

    renderErro() {

        return (
            <div>
                {this.state.error.map(function (d, idx) {
                    return (<li key={idx}>{d}</li>);
                })}
            </div>);
    }

    render() {

        return (
            <form>
                {this.renderErro()}
                {this.renderSelectionButton()}
                <label>Nome</label>
                <input
                    type='text'
                    name='nome'
                    onChange={this.handleInputChange}
                    value={this.state.name} />

                <br/>
                <input type='file' multiple/>

                <RadioButtonInput
                    legend='Espécie'
                    name='especie'
                    onRadioButtonChange={this.handleInputChange}
                    list={especie}
                    value={this.state.especie} />

                <RadioButtonInput
                    legend='Sexo'
                    name='sexo'
                    onRadioButtonChange={this.handleInputChange}
                    list={sexo}
                    value={this.state.sexo} />

                <RadioButtonInput
                    legend='Porte'
                    name='porte'
                    onRadioButtonChange={this.handleInputChange}
                    list={porte}
                    value={this.state.porte} />

                <RadioButtonInput
                    legend='Idade'
                    name='idade'
                    onRadioButtonChange={this.handleInputChange}
                    list={idade}
                    value={this.state.idade} />

                <CheckboxInput
                    legend='Temperamento'
                    onCheckChange={this.handleInputChange}
                    value={this.state}
                    list={temperamento} />

                <CheckboxInput
                    legend='Saúde'
                    onCheckChange={this.handleInputChange}
                    value={this.state}
                    list={saude} />

                <input
                    type='text'
                    placeholder='Doenças do animal'
                    disabled={!this.state.doente}
                    value={this.state.doenca}
                    name='doenca'
                    onChange={this.handleInputChange}
                />


                <CheckboxInput
                    legend='Exigências para Adoção'
                    onCheckChange={this.handleInputChange}
                    value={this.state}
                    list={adocao} />

                <RadioButtonInput
                    disabled={!this.state.acompanhamentoAposAdocao}
                    legend=''
                    name='tempoAcompanhamento'
                    onRadioButtonChange={this.handleInputChange}
                    list={tempoAcompanhamento}
                    value={this.state.tempoAcompanhamento} />


                <CheckboxInput
                    legend='Exigências para Apadrinhamento'
                    onCheckChange={this.handleInputChange}
                    value={this.state}
                    list={apadrinhamento} />

                <CheckboxInput
                    legend=''
                    disabled={!this.state.auxilioFinanceiro}
                    onCheckChange={this.handleInputChange}
                    value={this.state}
                    list={auxilioFinanceiro} />

                <label>Sobre</label>
                <input
                    type='text'
                    placeholder='Compartilhe a historia do animal'
                    value={this.state.sobre}
                    name='sobre'
                    onChange={this.handleInputChange}
                />

                <br />
                {this.renderSubmitButton()}
            </form>
        );
    }
}