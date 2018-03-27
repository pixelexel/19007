import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCountryData } from '../actions/country'
import Country from '../components/student/Country';
function mapStateToProps(state){
  return {
    country: state.country,
    pp_data: state.country.pp_data,
    ss_no: state.country.ss_no,
    ex_curr: state.country.ex_curr,  
    sport_d: state.country.sport_d,
    top_marks: state.country.top_marks,
    top_sport: state.country.top_sport,
    top_extra_curr : state.country.top_extra_curr, 
  }
}

class CountryContainer extends Component{
  componentWillMount(){
    console.log('country', this.props)

    this.props.dispatch(getCountryData())
  }

  render(){
    return (
      <div>
        <Country {...this.props}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CountryContainer)