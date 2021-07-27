import  { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import classes from './country.module.css';
import {Button,InputGroup,FormControl} from 'react-bootstrap';

const SEARCH_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      code
      currency
      emoji
    }
  }
`;


function Counrty() {
  const [search, setSearchValue] = useState('');
  const [searchCountry, { data }] = useLazyQuery(SEARCH_COUNTRY);

  const submitHandler = ()=>{

    if(search === '') return;

    searchCountry({
      variables: { code: search.toUpperCase() },
    });
    setSearchValue('');

  }

  const submitHandlerEnter = (event)=>{
    if(search === '') return;

    if(event.key === 'Enter'){
      searchCountry({
        variables: { code: search.toUpperCase() },
    });
      setSearchValue('');
    }
  }

  const inputChangeHandler = (event)=>{
    setSearchValue(event.target.value);
  }

  return (
    
    <>
  <div className={classes.search}>
    <InputGroup style={{'width':'30%','marginTop':'100px'}} className="mb-3">
    <FormControl
      placeholder="Enter Country Code"
      value={search}
      onChange={inputChangeHandler}
      onKeyDown={submitHandlerEnter}
    />
    <Button variant="outline-primary" id="button-addon2"
      onClick={submitHandler}
    >
      Button
    </Button>
  </InputGroup>
    </div>
  <div className={classes.searchCountry}>
         {(data && data.country !== null) &&
          <div className={classes.countryDisplay}>
            <h1> {data.country.name}</h1>
            <p>Code: {data.country.code}</p>
            <p>Capital: {data.country.capital} </p>
            <p>Native: {data.country.native} </p>
            <p>Currency: {data.country.currency}</p>
            <p>Emoji: {data.country.emoji}</p>
          </div>
        } 
      </div>
   
    </>
  );
}

export default Counrty;

