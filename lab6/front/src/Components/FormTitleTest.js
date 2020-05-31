import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

class FormTitleTest extends Component {
  constructor(props) {
    super(props);
  }

  toggleDrawer = (isOpen) => {
    const {
      openCreateTitle,
      openQuitForm,
      titleTest
    } = this.props;

    openCreateTitle(isOpen);
    if (titleTest.length) {
      openQuitForm(true);
    }
  };

  saveTitleTest = () => {
    const {
      titleTest,
      saveTitleTest
    } = this.props;

    if (titleTest.length) {
      saveTitleTest(false)
    }
  }

  changeTitleTest = (e) => {
    const {
      changeTitleTest
    } = this.props;

    changeTitleTest(e.target.value)
  }

  render() {
    const {
      isCreateTitle,
      titleTest
    } = this.props;
    return (
      <Drawer anchor={"left"} open={isCreateTitle} onClose={() => this.toggleDrawer(false)}>
        <div className="testContainer">
          <Grid item xs={12} className="flexRow">
              <p className="testContainer-title">Название теста:</p>
            <input
                className="testContainer-input"
                label="Название"
                value={titleTest}
                onChange={this.changeTitleTest}
              />
              <Button
                className="testContainer-button"
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.saveTitleTest}
              >
                Добавить
              </Button>
          </Grid>
        </div>
      </Drawer>
    );
  }
}

export default FormTitleTest;
