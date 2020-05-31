import React, { Component } from 'react';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormTitleTest from "./FormTitleTest";
import FormQuestions from "./FormQuestions";
import FormQuit from "./FormQuit";

const tests = [
  {
    'title': 'Первый Тест',
    'questions': [
      {
        'title': 'Первый вопрос',
        'responses': [
          {
            'title': 'Первый ответ',
            'isCorrent': false
          },
          {
            'title': 'Второй ответ',
            'isCorrent': false
          },
          {
            'title': 'Третий ответ',
            'isCorrent': true
          }
        ]
      }
    ]
  }
];

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: tests,
      isCreateTitle: false,
      isCreateQuestionsForm: false,
      isQuitForm: false,
      createQuestion: false,
      isCreateResponses: false,
      titleTest: '',
      titleQuestion: '',
      questions: [],
      inputCounts: 2
    }
  }

  componentDidMount() {
    fetch('/tests')
      .then(res => res.json())
      .then(res => this.setState({tests:res}));
  }

  renderTestsList = () => {
    const {
      tests
    } = this.state;

    return tests.map((test, i) => {
      return (
        <Grid key={i} item xs={12}>
          <h3 className="questionList">{i + 1}. {test.title}</h3>
        </Grid>
      )
    })
  }

  openCreateTitle = (isOpen) => {
    this.setState({
      isCreateTitle: isOpen
    });
  };

  openCreateQuestions = (isOpen) => {
    this.setState({ isCreateQuestionsForm: isOpen });
  };

  openQuitForm = (isOpen) => {
    this.setState({
      isCreateQuestionsForm: false,
      isQuitForm: isOpen
    })
  }

  clearAllValues = () => {
    this.setState({
      isCreateTitle: false,
      isCreateQuestionsForm: false,
      isQuitForm: false,
      createQuestion: false,
      isCreateResponses: false,
      titleTest: '',
      titleQuestion: '',
      questions: [],
      inputCounts: 2
    })
  }

  saveTitleTest = () => {
    const {
      titleTest
    } = this.state;

    if (titleTest.length) {
      this.setState({
        isCreateTitle: false,
        isCreateQuestionsForm: true
      });
    }
  }

  changeTitleTest = (titleTest) => {
    this.setState({
      titleTest
    });
  }

  changeTitleQuestion = (titleQuestion) => {
    this.setState({
      titleQuestion
    });
  }

  createQuestion = () => {
    this.setState({
      isCreateQuestion: true
    })
  }

  saveQuestion = () => {
    const {
      titleQuestion
    } = this.state;
    const allInput = document.getElementsByName('inputResponse');
    const responses = [];

    if (titleQuestion.length) {
      allInput.forEach(input => {
        if (input.children[0].value.length) {
          responses.push({
            'title': input.children[0].value,
            'isCorrent': input.children[1].checked
          })
        }
      })

      const questions = this.state.questions;
      questions.push({
        'title': titleQuestion,
        'responses': responses
      })

      this.setState({
        isCreateQuestion: false,
        questions: questions,
        titleQuestion: '',
        inputCounts: 2
      })
    }
  }

  setInputCounts = (value) => {
    this.setState({
      inputCounts: value
    })
  }

  saveTest = () => {
    const {
      titleTest,
      questions
    } = this.state;

    const result = {
      title: titleTest,
      questions : questions
    };

    fetch('/tests', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result),
      dataType: 'json'
    }).then(res => res.json())
      .then(this.setTestsForSave);
  }

  setTestsForSave = (tests) => {
    this.setState({
      tests
    })
    this.clearAllValues();
  }

  render() {
    const {
      isCreateTitle,
      isCreateQuestionsForm,
      titleTest,
      titleQuestion,
      questions,
      isCreateQuestion,
      inputCounts,
      isQuitForm
    } = this.state;
    return (
      <Container fixed style={{ backgroundColor: '#cfe8fc', height: '90vh' }} >
        <Typography component="div">
          <Grid item xs={12}>
            <h1 className="contentTitle">Тесты</h1>
          </Grid>
          <Grid item xs={12}>
            {this.renderTestsList()}
            <Grid item xs={2}>
              <Button
                className="questionList"
                variant="contained"
                color="primary"
                onClick={() => this.openCreateTitle(true)}
              >
                Добавить тест
              </Button>
            </Grid>
          </Grid>
        </Typography>
        <FormTitleTest
          isCreateTitle={isCreateTitle}
          openCreateTitle={this.openCreateTitle}
          changeTitleTest={this.changeTitleTest}
          saveTitleTest={this.saveTitleTest}
          titleTest={titleTest}
          openQuitForm={this.openQuitForm}
        />
        <FormQuestions
          isCreateQuestionsForm={isCreateQuestionsForm}
          openCreateQuestions={this.openCreateQuestions}
          changeTitleQuestion={this.changeTitleQuestion}
          titleQuestion={titleQuestion}
          questions={questions}
          isCreateQuestion={isCreateQuestion}
          createQuestion={this.createQuestion}
          saveQuestion={this.saveQuestion}
          setInputCounts={this.setInputCounts}
          saveTest={this.saveTest}
          titleTest={titleTest}
          inputCounts={inputCounts}
          openQuitForm={this.openQuitForm}
        />
        <FormQuit
          isQuitForm={isQuitForm}
          openQuitForm={this.openQuitForm}
          saveTest={this.saveTest}
          clearAllValues={this.clearAllValues}
        />
      </Container>
    );
  }
}

export default Content;
