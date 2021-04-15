import React from 'react'; 
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css'; 
import moment from 'moment';

export default class Example extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    this.day = moment().format('DD');
    this.month = moment().format('MMMM');
    this.nextMonth = moment().subtract(11, "month").startOf("month").format('MMMM');
    this.year = moment().format('YYYY');  
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state); 
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  } 

  changeDate(id) { 
    switch (id) {
      case 1:
        this.setState({
          from: new Date(), 
          to: new Date()
        }); 
        break;
      case 2:
        this.setState({
          from: new Date(new Date().setDate(new Date().getDate()- 1)), 
          to: new Date(new Date().setDate(new Date().getDate()- 1))
        }); 
        break;
      case 3:
        let start = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay()))).toDateString())
        this.setState({
          from: start,
          to: new Date(new Date(new Date().setDate(start.getDate() + 6)).toDateString())
        }); 
        break;
      case 4:
          let startlastWeek = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7))).toDateString())
          this.setState({
          from: startlastWeek,
          to: new Date(new Date(new Date().setDate(startlastWeek.getDate() + 6)).toDateString())
        }); 
        break;
      case 5:
        this.setState({
          from: new Date(new Date(new Date().setDate(1)).toDateString()), 
          to: new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString())
        });
        break;
      case 6:
        let startMonth = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
        this.setState({
          from: startMonth, 
          to: new Date(new Date(new Date().setDate(0)).toDateString())
        });
        break;
      case 7:
        this.setState({
          from: new Date(new Date(new Date().setDate(1)).toDateString()), 
          to: new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 2)).setDate(0)).toDateString())
        });
        break;
      default:
        alert( "No such date" );
    }
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="RangeExample">
        <p>{this.year}</p>
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            ` ${from.toLocaleDateString().replace(/\//gi, '.')}  to
                ${to.toLocaleDateString().replace(/\//gi, '.')}`}{' '}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <div className="calendaurItems"> 
          <div className="clendar">
            <div className="navigation">
              <div className="infoAboutMonth">
                <span>{this.month}</span>
                <div className="choosenDate">
                  {!from && <span>Choose Data!</span>}
                  {from && 
                      <span>{from.toLocaleDateString().replace(/\//gi, '.')}</span>
                  }
                </div>
              </div>
              <div className="infoAboutMonth">
                <span>{this.nextMonth}</span>
                <div className="choosenDate">
                {!to && <span>Choose Data!</span>}
                {to && 
                    <span>{to.toLocaleDateString().replace(/\//gi, '.')}</span>
                }
                </div>
              </div>
            </div>
            <div className="months">
              <div className="month">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>
              <div className="month">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>
            </div>
            <DayPicker
              className="Selectable"
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick} 
            /> 
            <div className="buttonsToApply">
              <button>Cancel</button>
              <button>Apply</button>
            </div>
          </div> 
          <div className="timesNavigation">
            <span onClick={() => this.changeDate(1)}>Today</span> 
            <span onClick={() => this.changeDate(2)}>Yesterday</span> 
            <span onClick={() => this.changeDate(3)}>Current Week</span> 
            <span onClick={() => this.changeDate(4)}>Last Week</span> 
            <span onClick={() => this.changeDate(5)}>Current Month</span> 
            <span onClick={() => this.changeDate(6)}>Last Month</span> 
            <span onClick={() => this.changeDate(7)}>All Time</span> 
          </div>
        </div> 
        
      </div>
    );
  }
}
