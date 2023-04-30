import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card" >
                    <div style={{display: 'flex', justifyCcontent: 'flex-end', position: 'absolute', right: '0'}}>
                    <span className=" badge rounded-pill bg-danger" >
                        {source}
                    </span>
                   </div>

                 <img src={!imageUrl ? "https://c.ndtvimg.com/2023-04/1hh94q0g_ajinkya-rahane-bcci_625x300_24_April_23.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=675" : imageUrl} className="card-img-top" alt="..." />
                 <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">Last updated by {!author ? "unknown" : author} {new Date(date).toGMTString()}</small></p>

                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                  </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
