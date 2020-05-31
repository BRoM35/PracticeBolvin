import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

class FormQuestions extends Component {
  constructor(props) {
    super(props);
    this.textQuestionInput = React.createRef();
  }

  toggleDrawer = (isOpen) => {
    const {
      openCreateQuestions,
      openQuitForm,
      titleTest
    } = this.props;

    openCreateQuestions(isOpen);
    if (titleTest.length) {
      openQuitForm(true);
    }
  };

  changeTitleQuestion = (e) => {
    const {
      changeTitleQuestion
    } = this.props;

    changeTitleQuestion(e.target.value)
  }

  renderQuestionsList = () => {
    const {
      questions
    } = this.props;

    return questions.length ? questions.map((question, i) => {
      return (
        <div key={i} className="flexRow questionItem">
          <p>{i + 1}. </p>
          <p>{question.title}</p>
        </div>
      )
    }) : null
  }

  createQuestion = () => {
    this.props.createQuestion();
  }

  saveQuestion = () => {
    this.props.saveQuestion();
  }

  onChangeInput = (e) => {
    const {
      inputCounts,
      setInputCounts
    } = this.props;
    const element = e.target;

    if (+element.dataset.counter === inputCounts) {
      const allInputs = document.getElementById('inputs');
      const newInput = `<div name="inputResponse" class="inputResponse flexRow">` +
        `<input class="inputResponse-input" data-counter="${inputCounts + 1}" type="text"/>` +
        `<input class="inputResponse-checkbox" data-checkbox="${inputCounts + 1}" name="checkboxInput" type="checkbox"/>` +
        `<p data-remove="${inputCounts + 1}" class="removeResponse">X</p>` +
        `</div>`;
      allInputs.insertAdjacentHTML('beforeend', newInput);
      document.querySelector(`[data-counter='${inputCounts + 1}'`).addEventListener('keydown', this.onChangeInput);
      document.querySelector(`[data-checkbox='${inputCounts + 1}'`).addEventListener('click', this.onChangeCheckbox);
      document.querySelector(`[data-remove='${inputCounts + 1}'`).addEventListener('click', this.removeResponse);
      setInputCounts(inputCounts + 1);
    }
  }

  onChangeCheckbox = (e) => {
    const element = e.target;
    const dataCheckbox = +element.dataset.checkbox;
    const allCheckbox = document.getElementsByName('checkboxInput');
    allCheckbox.forEach(check => {
      const checkbox = +check.dataset.checkbox;
      if (checkbox !== dataCheckbox) {
        check.checked = false
      }
    })
  }

  removeResponse = (e) => {
    const {
      inputCounts
    } = this.props;
    const allInput = document.getElementsByName('inputResponse');
    const element = e.target;
    const dataRemove = +element.dataset.remove;
    allInput.forEach(el => {
      const checkbox = +el.children[2].dataset.remove;
      if (checkbox === dataRemove && inputCounts !==checkbox) {
        el.remove();
      }
    })
  }

  render() {
    const {
      isCreateQuestionsForm,
      titleQuestion,
      isCreateQuestion,
      titleTest,
      saveTest,
      openQuitForm
    } = this.props;

    return (
      <Drawer anchor={"left"} open={isCreateQuestionsForm} onClose={() => this.toggleDrawer(false)}>
        <div className="questionContainer">
          <Grid item xs={12} className="titleTest">
            {titleTest}
          </Grid>
          <Grid item xs={12} className="flexColumn">
            {!isCreateQuestion ?
              [
                <p className="testContainer-title">Вопросы:</p>,
                <Grid item xs={12}>
                  {this.renderQuestionsList()}
                  <Grid item xs={12}>
                    <Button
                      className="testAddButton"
                      variant="contained"
                      color="primary"
                      onClick={() => this.createQuestion()}
                    >
                      Создать вопрос
                    </Button>
                  </Grid>
                </Grid>
              ] :
              [<p className="testContainer-title">Описание вопроса:</p>,
                <textarea
                  className="questionContainer-input"
                  label="Название"
                  value={titleQuestion}
                  onChange={this.changeTitleQuestion}
                  ref={this.textQuestionInput}
                />,
                <div id="inputs">
                  <div name="inputResponse" className="inputResponse flexRow">
                    <input className="inputResponse-input" data-counter="1" type="text"/>
                    <input className="inputResponse-checkbox" data-checkbox="1" name="checkboxInput" type="checkbox" onChange={this.onChangeCheckbox}/>
                    <p data-remove="1" className="removeResponse" onClick={this.removeResponse}>X</p>
                  </div>
                  <div name="inputResponse" className="inputResponse flexRow">
                    <input className="inputResponse-input" data-counter="2" onChange={this.onChangeInput} type="text"/>
                    <input className="inputResponse-checkbox" data-checkbox="2" name="checkboxInput" type="checkbox" onChange={this.onChangeCheckbox}/>
                    <p data-remove="2" className="removeResponse" onClick={this.removeResponse}>X</p>
                  </div>
                </div>,
                <Button
                  className="questionContainer-button"
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.saveQuestion}
                >
                  Готово
                </Button>
              ]
            }
          </Grid>
          {!isCreateQuestion ?
            <div className="flexRow">
              <Grid item xs={3} className="saveTest">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => saveTest()}
                >
                  Сохранить
                </Button>
              </Grid>
              <Grid item xs={3} className="saveTest">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openQuitForm}
                >
                  Выйти
                </Button>
              </Grid>
            </div> : null
          }
        </div>
      </Drawer>
    );
  }
}

export default FormQuestions;
