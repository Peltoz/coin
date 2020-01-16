import React from "react";
import "./index.css";
import ListItem from "../ListItem";

class List extends React.Component {
  render() {
    const {
      notes,
      activeId,
      fixedCoin,
      keyword,
      onListItemClick,
      onListItemFixedIconClick,
      onValueChange
    } = this.props;

    const filterCoinList = key => {
      key = key.filter(c => {
        return c.nameKor.indexOf(keyword) > -1 || c.name.indexOf(keyword) > -1;
      });

      return key.map(item => {
        const {
          id,
          name,
          nameKor,
          time,
          openPrice,
          endPrice,
          highPrice,
          lowPrice,
          changeRate,
          volume
        } = item;
        return (
          <ListItem
            key={id}
            id={id}
            time={time}
            active={id === activeId}
            name={name}
            nameKor={nameKor}
            openPrice={openPrice}
            endPrice={endPrice}
            highPrice={highPrice}
            lowPrice={lowPrice}
            changeRate={changeRate}
            volume={volume}
            fixedCoin={fixedCoin}
            onClick={() => onListItemClick(id)}
            onFixedIconClick={() => onListItemFixedIconClick(id)}
          />
        );
      });
    };

    return (
      <div>
        <div
          className="coinsearch"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <input
            type="text"
            name="keyword"
            value={keyword}
            placeholder="코인명/심볼검색"
            autoComplete="off"
            onChange={e => onValueChange(e)}
          ></input>
          <img src="https://img.icons8.com/officel/40/000000/toggle-on.png"></img>
        </div>
        <div className="Coinlist">{filterCoinList(notes)}</div>
      </div>
    );
  }
}

export default List;
