import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  constructor(props) {
    super(props);
    console.log("hello i am a component of news item");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0


    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}  -  NewsMonkey`;
  }


  updateNews() {
    this.props.setProgress(30);//loading at top in red color
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e18b10c87d6a4e1989df991b1b43b65e&page=1&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true })
    fetch(url).then((res) => {
      res.json().then((result) => {
        console.log(result.articles)
        this.setState({ articles: result.articles, totalResults: result.totalResults, loading: false })
      })
    })
    this.props.setProgress(100);//loading at top in red color


  }
  async componentDidMount() {
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e18b10c87d6a4e1989df991b1b43b65e&page=1&pagesize=${this.props.pageSize}`;
    //this.setState({ loading: true })
    //fetch(url).then((res) => {
    //  res.json().then((result) => {
    //    console.log(result.articles)
    //    this.setState({ articles: result.articles, totalResults: result.totalResults, loading: false })
    //  })
    //})
    this.updateNews();
  }




  handlePrevClick = async () => {
    //console.log("Previous");
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e18b10c87d6a4e1989df991b1b43b65e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true })
    //fetch(url).then((res) => {
    //  res.json().then((result) => {
    //    console.log(result.articles)
    //    this.setState({
    //      articles: result.articles,
    //      page: this.state.page - 1, loading: false
    //    })
    //  })
    //})
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();


  }

  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      //console.log("Next");
      //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e18b10c87d6a4e1989df991b1b43b65e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      //this.setState({ laoding: true })
      //fetch(url).then((res) => {
      //  res.json().then((result) => {
      //    console.log(result.articles)
      //    this.setState({
      //      articles: result.articles,
      //      page: this.state.page + 1, loading: false
      //    })
      //  })
      //})
      this.setState({
        page: this.state.page + 1
      })
      this.updateNews();
    }





  }
  //fetchmoreData is for putting end to our next and previous buttons and introducing infinite scroll
  fetchMoreData = async () => {
  
    this.setState({
      page: this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&apiKey=e18b10c87d6a4e1989df991b1b43b65e&page=1&pagesize=${this.props.pageSize}`;

    fetch(url).then((res) => {
      res.json().then((result) => {
        console.log(result.articles)
        this.setState({ articles: this.state.articles.concat(result.articles), totalResults: result.totalResults })
      })
    })
  };



  render() {
    console.log("render");
    return (
      <>



        <h1 className="text-center" style={{ margin: '40px 0px' }} >NewsAct-Top Headlines from {this.capitalizeFirstLetter(this.props.category)}  </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>{<Spinner />}...</h4>}
        >

          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}



            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr;Previous</button>
          <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}  >Next &rarr;</button>
        </div> */}

      </>

    )
  }
}

export default News
