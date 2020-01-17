import React from 'react';


function Header(props) {
  // O props entre parenteses pega as propriedade quando o componente é utilizado
  return (
    <h1>
      {props.title}
    </h1>
  );
}


export default Header;
