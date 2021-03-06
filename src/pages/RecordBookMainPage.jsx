import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "../components/Botao";
import ButtonRecord  from "../components/ButtonRecord";
import InputDate from "../components/inputDate";
import apiAxios from "../services/api";
import Logo from "../components/Logo";
import Navbar from "../components/navbar";
import Loader from '../components/loader'

class RecordBookMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: moment(new Date()).format("YYYY-MM-DD"),
      students: [],
      allRecords: [],
      loader: true,
      buttonLabel:'Iniciar diário',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.getPreviousRecords = this.getPreviousRecords.bind(this);
  }

  componentDidMount = () => {
    this.getPreviousRecords();
  };

  handleDateChange(e) {
    this.setState({ dateValue: e.target.value });
  }

  getPreviousRecords = () => {
    const project_id = this.props.match.params.id;
    apiAxios
      .get(`record/projectGetDates/${project_id}`)
      .then(diary => {
        this.setState({allRecords:diary.data, loader: false})
      })
      .catch(e => console.log(e));
  };

  createRecord = e => {
    e.preventDefault();
    this.setState({ buttonLabel: "Iniciando..." });
    const date = this.state.dateValue;
    const project = this.props.match.params.id;
    apiAxios
      .post("/record/all", { project, date })
      .then(diary => {
        this.getPreviousRecords();
        this.setState({ buttonLabel: "Iniciado!"},() => setTimeout(() => this.setState({ buttonLabel: "Iniciar Diário" }), 2000))
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        <Logo />
        {this.state.loader !== true ? <div className='page-recordBook-container'>
        <h2 className='page-recordBook-title'>AVALIAÇÃ0 DIÁRIA</h2>
        <p className='page-recordBook-text'>Escolha uma data:</p>
        <InputDate
          value={this.state.dateValue}
          name="date"
          method={this.handleDateChange}
        />
        <Button
          type="submit"
          label={this.state.buttonLabel}
          method={this.createRecord}
        />
        <h3 className='page-recordBook-title-ex'>AVALIAÇŌES EXISTENTES</h3>
        {this.state.allRecords.map((e,idx)=> <Link  key = {idx} to={`/project/${this.props.match.params.id}/RecordBook/${e.date}`}> <ButtonRecord  label={moment(e.date).format("DD/MM/YYYY")} /> </Link> )}
        </div>: null}
        {this.state.loader === true ? <Loader /> : null}
        <Navbar />
      </div>
    );
  }
}

export default RecordBookMainPage;
