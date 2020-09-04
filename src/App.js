import React from 'react';
import Cards from './Components/Cards/Cards';
import Chart from './Components/Chart/Chart';
import CountryPick from './Components/CountryPick/CountryPick';
import styles from './App.module.css' // .modules.css as modules keep the css to this file only, and not apply to whole project 
import { fetchData } from './API/index'
import coronaimg from './Image/indexco.jpeg'


class App extends React.Component {

  state = {
    data : {},
    country: ''
  }

  //componentDidMount hook used after the DOM is rendered, hence perfect to make API calls, also is called only once
  async componentDidMount(){ //fetching data from the API
    const fetchedData = await fetchData() 
    this.setState({data: fetchedData})
  }

  handleCountryChange = async(country) => { // if API needs to fetch data for a particular country
    const fetchedData = await fetchData(country)
    this.setState({data: fetchedData , country: country})
  }

  render(){
    const {data, country} = this.state //destructuring outside the return 
    return (
      <div className={styles.container}>  {/* .container is part of .module, will make sure no other css interfares with this component*/}
        <img className= {styles.image} src={coronaimg} alt="COVID-19" />
        <Cards data = {data}/> {/* destructured above */}
        <CountryPick handleCountryChange = {this.handleCountryChange} />
        <Chart data = {data} country={country}/>
      </div>
    );
  }
}

export default App;
