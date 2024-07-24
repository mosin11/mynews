import React from 'react';

const NewsItem = ({ title, description, imageURL, newsURL, author, date, source }) => {
    // Format date to a more readable format
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className='my-3'>
            <div className="card h-100">
                {/* Badge for source */}
                <p style={{ zIndex: 1, left: '85%' }} className='position-absolute top-0 translate-middle badge rounded-pill bg-danger'>{source}
                <span className='visually-hidden'>Source</span>
                </p>
            
                <img className="card-img-top" src={imageURL} alt={title} style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text flex-grow-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                        {description}
                    </p>
                    <p className="card-text">
                        <small className="text-muted">- By {author || 'Unknown'} on {formattedDate}</small>
                    </p>
                    <a href={newsURL} rel="noreferrer" target='_blank' className="btn btn-dark mt-auto">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
