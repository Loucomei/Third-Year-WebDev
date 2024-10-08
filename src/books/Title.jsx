import React from 'react';



const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h4>
        {title}
      </h4>
      <h5>
        {subtitle}
      </h5>
    </div>
  )
}

export default Title;
