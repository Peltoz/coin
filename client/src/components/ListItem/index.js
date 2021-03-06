import React from "react";
import "./index.css";
import { showPrice } from "../../utils/common"

import ReactEcharts from "echarts-for-react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const audio = new Audio("https://freesound.org/data/previews/213/213795_4001802-lq.mp3");
audio.loop = false;

const showRate = (changeRate) => {
  if (changeRate > 0) {
    return (
      <div style={{ color: "#d60000" }} className="list-item-contents">
        {changeRate ? `▲ ${changeRate}%` : ""}
      </div>
    );
  } else if (changeRate < 0) {
    return (
      <div style={{ color: "#0051c7" }} className="list-item-contents">
        {changeRate ? `▼ ${changeRate}%` : ""}
      </div>
    );
  } else {
    return <div className="list-item-contents">0.00%</div>;
  }
};

const listColorPicker = (changeRate) => {
  if(changeRate >= 5 && changeRate < 10) {
    audio.play();
    return 'list--5';
  }
  if(changeRate >= 10 && changeRate < 20) {
    audio.play();
    return 'list--10';
  }
  if(changeRate >= 20 && changeRate < 30) {
    audio.play();
    return 'list--20';
  }
  if(changeRate >= 30 && changeRate < 45) {
    audio.play();
    return 'list--30';
  }
  if(changeRate >= 45) {
    audio.play();
    return 'list--50';
  }

  return 'list'
}

const data = (price, currentCoin) => {
  return price.slice(0, 15).map((p, index) => {
    if(index ===0 && currentCoin) {
      return [currentCoin.openPrice, currentCoin.closePrice, currentCoin.minPrice, currentCoin.maxPrice]
    } else {
      return [p.openPrice, p.closePrice, p.minPrice, p.maxPrice];
    }
  }).reverse();
}

const CreateChart = (price, currentCoin) => {
  return (
    <div className="chart">
      <div className="profile_middle">
        <div className="middleleft">
          <h2 style={{ marginBottom: "0px" }}>
            <span>고가</span>
            <span style={{ color: "#d60000" }}>
              {price[0]
                ? " " + price[0].maxPrice.toLocaleString()
                : ""}
            </span>
          </h2>
          <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>
            <span>저가</span>
            <span style={{ color: "#0051c7" }}>
              {price[0]
                ? " " + price[0].minPrice.toLocaleString()
                : ""}
            </span>
          </h2>
        </div>
      </div>
      <div className="List_Chart">
        <ReactEcharts
          option={{
            grid: {
              left: 0,
              top: 10,
              right: 0,
              bottom: 10
            },
            xAxis: {
              type: "category",
              show: false,
              data: [
                '15',
                '14',
                '13',
                '12',
                '11',
                '10',
                '9',
                '8',
                '7',
                '6',
                '5',
                '4',
                '3',
                '2',
                '1',
                '0'
              ]
            },
            yAxis: {
              show: false,
              min: price[0].minPrice * 0.990,
              max: price[0].maxPrice * 1.010
            },
            series: [
              {
                type: "k",
                data: data(price, currentCoin),
              }
            ]
          }}
          style={{ height: "100%", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          //onChartReady={this.onChartReadyCallback}
        />
      </div>
    </div>
  );
}

const createSmallChart = (price, currentCoin) => {
  return (
    <div className="chart">
      <div className="List_Chart">
        <ReactEcharts
          option={{
            grid: {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            },
            yAxis: {
              show: false,
              min: price[0].minPrice * 0.999,
              max: price[0].maxPrice * 1.001,
            },
            xAxis: {
              type: "category",
              show: false,
              data: ['1']
            },
            series: [
              {
                type: "k",
                data: [
                  [price[0].openPrice, currentCoin ? currentCoin.closePrice : price[0].closePrice, price[0].minPrice, price[0].maxPrice]
                ]
              }
            ]
          }}
          style={{ height: "30px", width: "20px", marginTop: "15px" }}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
      </div>
    </div>
  );
}

const board = ({symbol, name, price, currentCoin, changeRate, fixedCoin, onFixedIconClick}) => (
    <div className={listColorPicker(currentCoin ? ((currentCoin.closePrice - price[1].closePrice) / currentCoin.closePrice * 100) .toFixed(3) :  ((price[0].closePrice - price[1].closePrice) / price[0].closePrice * 100).toFixed(3))}>
      <div className="profile" onClick={() => window.open(`https://upbit.com/exchange?code=CRIX.UPBIT.KRW-${symbol}`)}>
        <div className="profile_original">
          <div className="profile_top">
            <h1>
              <span>{name ? name : "제목"}</span>
              <span style={{ color: "grey", fontSize: "1.7rem" }}>
                {symbol ? " " + symbol : ""}
              </span>
            </h1>
            <h1 id="endPrice">
              {showPrice(currentCoin ? currentCoin.closePrice : price[0].closePrice, price[1].closePrice)}
            </h1>
          </div>
          {fixedCoin.includes(symbol) ? "" : createSmallChart(price, currentCoin)}
          <div className="profile_stockprice">
            <button
              style={{
                border: "none",
                background: "none",
                outline: "none",
                paddingRight: "0px",
                marginLeft: "150px"
              }}
              onClick={onFixedIconClick}
            >
              <FaStar
                size="20"
                //color={fixedCoin.includes(name) ? "CCCC00" : "D3D3D3"}
                className={
                  fixedCoin.includes(symbol)
                    ? "favoriteButton"
                    : "favoriteNotButton"
                }
              ></FaStar>
            </button>
            <h1 id="changeRate">
              {showRate(
                currentCoin ? ((currentCoin.closePrice - price[1].closePrice) / currentCoin.closePrice * 100) .toFixed(3) :  ((price[0].closePrice - price[1].closePrice) / price[0].closePrice * 100).toFixed(3)
              )}
            </h1>
          </div>
        </div>
        {fixedCoin.includes(symbol) ? CreateChart(price, currentCoin) : ""}
      </div>
    </div>
);

const ListItem= ({coin, currentCoin, fixedCoin, onFixedIconClick}) => {
    const {symbol, name, price, changeRate} = coin;
    return (
      <div>
        {coin.price.length !== 0 ? (
          board({symbol, name, price, currentCoin, changeRate, fixedCoin, onFixedIconClick})
        ) : (
          <div
            className="list_loading"
            style={{
              minHeight: "80px",
              textAlign: "center",
              border: "1px solid #eee"
            }}
          >
            <ClipLoader
              css={{
                marginTop: "16px"
              }}
              size={60}
              color={"#123abc"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
}

export default ListItem;