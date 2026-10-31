import React from 'react'

export function CollectionSkeleton({ name, count = 6, displaySidebar = false }) {
  return (
    <div className={`skeleton-grid ${displaySidebar ? 'skeleton-grid-sidebar' : ''} ${name === 'Votes' ? 'skeleton-grid-votes' : ''}`} aria-label={`Loading ${name.toLowerCase()}`} role='status'>
      {Array.from({ length: count }, (_, index) => (
        <div className={`skeleton-card ${name === 'Positions' ? 'skeleton-position-card' : ''} ${name === 'Votes' ? 'skeleton-vote-card' : ''}`} key={index}>
          {name === 'Votes' ? (
            <>
              <div className='skeleton-vote-person'>
                <span className='skeleton-shape skeleton-avatar'/>
                <div className='skeleton-vote-fields'>
                  <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
                  <span className='skeleton-shape skeleton-line'/>
                  <span className='skeleton-shape skeleton-line skeleton-line-short'/>
                </div>
              </div>
              <span className='skeleton-shape skeleton-connector'/>
              <div className='skeleton-vote-person'>
                <span className='skeleton-shape skeleton-avatar'/>
                <div className='skeleton-vote-fields'>
                  <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
                  <span className='skeleton-shape skeleton-line'/>
                  <span className='skeleton-shape skeleton-line skeleton-line-short'/>
                </div>
              </div>
            </>
          ) : name === 'Positions' ? (
            <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
          ) : (
            <>
              <span className='skeleton-shape skeleton-profile'/>
              <div className='skeleton-card-fields'>
                <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
                <span className='skeleton-shape skeleton-line skeleton-line-short'/>
                <span className='skeleton-shape skeleton-line'/>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export function PageSkeleton({ variant = 'form' }) {
  return (
    <div className={`page-skeleton page-skeleton-${variant}`} role='status' aria-label='Loading page'>
      {variant === 'form' ? (
        <>
          <div className='page-skeleton-aside'>
            <span className='skeleton-shape skeleton-line skeleton-line-short'/>
            <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
            <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
            <span className='skeleton-shape skeleton-line'/>
          </div>
          <div className='page-skeleton-panel'>
            <span className='skeleton-shape skeleton-line skeleton-line-short'/>
            <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
            <div className='page-skeleton-inputs'>
              {Array.from({ length: 4 }, (_, index) => <span className='skeleton-shape skeleton-input' key={index}/>)}
            </div>
            <span className='skeleton-shape skeleton-input skeleton-submit'/>
          </div>
        </>
      ) : variant === 'ballot' ? (
        <div className='page-skeleton-ballot'>
          {Array.from({ length: 2 }, (_, index) => (
            <div className='page-skeleton-position' key={index}>
              <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
              {Array.from({ length: 2 }, (_, candidateIndex) => (
                <div className='page-skeleton-candidate' key={candidateIndex}>
                  <span className='skeleton-shape skeleton-avatar'/>
                  <span className='skeleton-shape skeleton-line skeleton-line-wide'/>
                  <span className='skeleton-shape skeleton-radio'/>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className='page-skeleton-metrics'>
            {Array.from({ length: 4 }, (_, index) => <span className='skeleton-shape skeleton-metric' key={index}/>)}
          </div>
          <div className='page-skeleton-charts'>
            {Array.from({ length: 2 }, (_, index) => <span className='skeleton-shape skeleton-chart' key={index}/>)}
          </div>
        </>
      )}
    </div>
  )
}
