import Dropdown from 'react-bootstrap/Dropdown';

function PriceSort(props) {
    return (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={props.sortDateMostRecent} >Date - most recent</Dropdown.Item>
          <Dropdown.Item onClick={props.sortDateOldest} >Date - oldest</Dropdown.Item>
          <Dropdown.Item onClick={props.sortPriceHighest} >Price - high to low</Dropdown.Item>
          <Dropdown.Item onClick={props.sortPriceLowest} >Price - low to high</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default PriceSort;