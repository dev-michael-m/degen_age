import React from 'react';

const NUM_ITEMS = 5;

const Items = ({items,layout}) => {

    const renderItems = () => {
        let mappedItems = [];

        if(layout === 'row'){
            mappedItems = items.map((item, idx) => (
              <tr key={idx}>
                <td key={idx}>
                  <div key={idx} className="item-wrapper">
                    <label key={idx} className="item-counter">x{item.count}</label>
                    <img key={idx} className="item-img" src={item.img} width={40}></img>
                  </div>
                </td>
              </tr>
            ));
        }else {
            let temp = [];
            for(let i = 0; i < NUM_ITEMS; i++){
                if(items.length && items[i] && items[i].count){ // item exists
                    temp.push(
                      <td key={i}>
                        <div key={i}  className="item-wrapper">
                          <label key={i} className="item-counter">x{items[i].count}</label>
                          <img
                            className="item-img"
                            key={i}
                            src={items[i].img}
                            width={40}
                          ></img>
                        </div>
                      </td>
                    );
                }else{
                    temp.push(
                        <td key={i}></td>
                    )
                }
            }

            mappedItems.push(
              <tr key={9999}>{temp}</tr>
            );
        }

        if(mappedItems.length != NUM_ITEMS && layout === 'row'){
            for(let i = 0; i < NUM_ITEMS - mappedItems.length; i++){
                mappedItems.push(
                  <tr key={i + mappedItems.length - 1}>
                    <td key={i + mappedItems.length - 1}>
                    </td>
                  </tr>
                );
            }
        }

        return mappedItems;
    }

    return (
      <div>
        <table id="item-bag" className={`item-bag ${layout === 'row' ? 'row' : 'col'}`}>
          <tbody>
            {renderItems()}
          </tbody>
        </table>
      </div>
    );
}

export default Items;