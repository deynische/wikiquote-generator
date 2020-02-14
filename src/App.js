import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  // build api param str
  addParams(obj) {
    let str = '';
    if (Object.keys(obj).length > 0) {
      Object.keys(obj).forEach((key) => {
        str += '&' + key + '=' + obj[key];
      });
    }
    return str;
  }

  // random number based on range
  randomIndex(num) {
    return Math.floor(Math.random() * Math.floor(num));
  }
  
  getRandomQuote() {
    const API_WIKIQ = 'https://en.wikiquote.org/w/api.php';    
    let random = {
      action: 'query',
      format: 'json',
      list: 'random',
      rnnamespace: 0
    }
    let parse = {
      action: 'parse',
      format: 'json',
      pageid: '',//187681, // example page with unknown dialogue format
      section: 1
    }
    
    let url = API_WIKIQ + '?origin=*' + this.addParams(random);
    let title = '';
    let quoteList = [];

    fetch(url)
      .then(response => response.json())
      .then(json => {
        parse.pageid = json.query.random[0].id;
        title = json.query.random[0].title;
        console.log(parse.pageid + ':' + title); // for troubleshooting
        url = API_WIKIQ + '?origin=*' + this.addParams(parse);
        return fetch(url);
      })
      .then(response => response.json())
      .then(json => {
        // remove links
        const clean = new RegExp('</*a[^>]*>', 'g');
        let text = json.parse.text["*"].toString().replace(clean, '');
        // create DOM element to parse text
        let temp = document.createElement('div');
        temp.innerHTML = text;
        // console.log(temp) // check html formatting
        // extract quote block
        let quote = temp.querySelectorAll('div > ul > li');
        // separate quote from citation and add to list as a pair
        // NOTE: THIS DOES NOT WORK FOR ALL PAGES DUE TO VARIABLE FORMATTING
        quote.forEach((q) => {
          let pair = [];
          let c, p;
          if (q.querySelector('ul')) {
            c = q.removeChild(q.querySelector('ul')).querySelector('li').innerHTML;
          } else {
            c = title;
          }
          p = q.innerHTML;
          pair.push(p,c);
          // console.log(pair); // check pairing
          quoteList.push(pair);
          pair = [];
        });

        // update state
        if (quoteList.length > 0) {
          this.setState({
            data: quoteList[this.randomIndex(quoteList.length)]
          })
        } else {
          this.setState({
            data: ['error: nothing found','try again']
          })
        }

      })
      .catch(err => {
        console.error(err)
        this.setState({
          data: ['error: nothing found','try again']
        })
      });
  }
  
  componentDidMount() {
    this.getRandomQuote();
  }

  render() {
    
    return (
      <figure>
        <blockquote dangerouslySetInnerHTML={{ __html: this.state.data[0] }}></blockquote>
        <figcaption dangerouslySetInnerHTML={{ __html: this.state.data[1] }}></figcaption>
      </figure>
    )
  }
}

export default App;