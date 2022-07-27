import React from 'react';

const NUM_ITEMS = 5;

const Items = ({items,layout}) => {

    const renderItems = () => {
        let mappedItems = [];

        if(layout === 'row'){
            mappedItems = items.map((item) => (
              <tr>
                <td>
                  <div className="item-wrapper">
                    <label className="item-counter">x{item.count}</label>
                    <img className="item-img" src={item.img} width={50}></img>
                  </div>
                </td>
              </tr>
            ));
        }else {
            let temp = [];
            console.log({items})
            for(let i = 0; i < NUM_ITEMS; i++){
                if(items.length && items[i] && items[i].count){ // item exists
                    temp.push(
                      <td>
                        <div className="item-wrapper">
                          <label className="item-counter">x{items[i].count}</label>
                          <img
                            className="item-img"
                            src={items[i].img}
                            width={50}
                          ></img>
                        </div>
                      </td>
                    );
                }else{
                    temp.push(
                        <td></td>
                    )
                }
            }

            mappedItems.push(
              <tr>{temp}</tr>
            );
        }

        if(mappedItems.length != NUM_ITEMS && layout === 'row'){
            for(let i = 0; i < NUM_ITEMS - mappedItems.length; i++){
                mappedItems.push(
                  <tr>
                    <td>
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