import React from 'react';
import {Button, Select} from 'semantic-ui-react';
import moment from 'moment'

// TODO clean code. Has issue with initial dates list if feb

const years = []
for (var y = 1910; y < 2018; y++) {
  years.push(
    {value: y, text: y, key: y}
  );
}
const months = []
for (var y = 1; y < 13; y++) {
  months.push(
    {value: y, text: moment(y, 'MM').format('MMMM'), key: y}
  );
}
let dates = []
for (var y = 1; y < 32; y++) {
  dates.push(
    {value: y, text: y, key: y}
  );
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: {year: '', month: '', date: ''}
    };
  }

  componentWillReceiveProps(props) {
    if (props.date) {

      const tempDate = (props.date.split('-')[2] === '' ? '1989' : props.date.split('-')[2]) + '-' + (props.date.split('-')[0] === '' ? '1' : props.date.split('-')[0] ) + '-' + (props.date.split('-')[1] === '' ? '1' : props.date.split('-')[1]);
      const data = new Date(tempDate);
      this.state = {
        date: {year: data.getFullYear(), month: data.getMonth() + 1, date: data.getDate()}
      };
    }
  }

  handleChange = (e, {name, value}) => {
    this.setState({
      date: {
        ...this.state.date,
        [name]: value
      }
    });
  };
  handleMonthChange = (e, {name, value}) => {
    this.setState({
      date: {
        ...this.state.date,
        [name]: value
      }
    });
    var daysInMonth = moment(`${this.state.date.year}-${this.state.date.month}`, "YYYY-MM").daysInMonth();
  };
  changeDateValue = (e, d) => {
    this.props.datechange(`${this.state.date.month}-${this.state.date.date}-${this.state.date.year}`);
  };
  changeMonth = (e, d) => {
    var daysInMonth = moment(`${this.state.date.year}-${this.state.date.month}`, "YYYY-MM").daysInMonth();
    dates = []
    for (var y = 1; y < daysInMonth + 1; y++) {
      dates.push(
        {value: y, text: y, key: y}
      );
    }
    this.props.datechange(`${this.state.date.month}-${this.state.date.date}-${this.state.date.year}`);
  };

  render() {
    const {
      month, year, date
    } = this.state.date;
    return (
      <div className="three column grid">

        <div className="column">
          <Select
            placeholder='Year'
            name="year"
            className="fluid dropdown"
            options={years}
            value={year}
            onChange={this.handleChange}
            onClose={this.changeDateValue}
            search
          />
        </div>
        <div className="column">
          <Select
            placeholder='Month'
            name="month"
            className="fluid dropdown"
            options={months}
            value={month}
            onChange={this.handleMonthChange}
            onClose={this.changeMonth}
            search
          />
        </div>
        <div className="column">
          <Select
            placeholder='Date'
            name="date"
            className="fluid dropdown"
            options={dates}
            value={date}
            onChange={this.handleChange}
            onClose={this.changeDateValue}
            search
          />
        </div>
      </div>)
  }
};


export default DatePicker;
