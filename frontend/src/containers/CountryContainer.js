import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCountryData } from '../actions/country'
import Country from '../components/student/Country';
function mapStateToProps(state){
  return {
    country: state.country,
    pp_data: state.country.pp_data,
    no_ss: state.country.no_ss,
    ex_curr: state.country.ex_curr,  
    sports_data: state.country.sports_data,
    acad_list: state.country.acad_list,
    sports_list: state.country.sports_list, 
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