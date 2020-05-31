import React, { Component } from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

class FormQuit extends Component {
  render() {
    const {
      isQuitForm,
      clearAllValues,
      saveTest
    } = this.props;
    return (
      <Drawer anchor={"left"} open={isQuitForm}>
        <div className="quitContainer">
          <Grid item xs={12} className="flexColumn">
            <p className="testContainer-title">Сохранить тест?</p>
            <div className="flexRow quitButtons">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={saveTest}
              >
                Сохранить
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={clearAllValues}
              >
                Выйти
              </Button>
            </div>
          </Grid>
        </div>
      </Drawer>
    );
  }
}

export default FormQuit;
