import React, { useEffect, useState } from "react";
import "./profile.scss";
import Form from "devextreme-react/form";
import response from "./response";
// import { shops } from "./shops";
// import * as pricelist from "./response.json";
// import * as shops from "./shops.json";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
  FilterRow,
} from "devextreme-react/data-grid";
import axios from "axios";
import { ModifiedColumns } from "../../project/utils/functions";
import { ModifiedPriceList } from "../../project/utils/functions";
import useStore from "../../project/store";
export default function Profile() {
  const [stocks, setStocks] = useState();
  const [pricelist, setPriceList] = useState();
  const login = useStore((state) => state.login);
  const token = useStore((state) => state.token);
  async function GetStocks() {
    //{ запрос {{base_url}}/api/shop/e419c34f-6856-11ea-8298-001d7dd64d88 }
    let data = await axios(
      "http://194.87.239.231:55555/api/shop/e419c34f-6856-11ea-8298-001d7dd64d88",
      {
        headers: {
          User: `${login}`,
          Authorization: `Bearer ${token}`,
        },
        // headers: {
        //   //"content-type": "application/x-www-form-urlencoded",
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   User: `${localStorage.getItem("login")}`,
        // },
      }
    );
    console.log(data);
    return await data;
  }
  async function GetPriceList() {
    let data = await axios(
      "http://194.87.239.231:55555/api/document/564aec5e-e964-11eb-8407-5800e3fc6bdd",
      {
        headers: {
          User: `${login}`,
          Authorization: `Bearer ${token}`,
        },
        // headers: {
        //   //"content-type": "application/x-www-form-urlencoded",
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   User: `${localStorage.getItem("login")}`,
        // },
      }
    );
    return await data;
  }
  useEffect(() => {
    (async function () {
      const stocks = await GetStocks().data;
      console.log("1: ", stocks);
      setStocks(stocks);
      setPriceList(await GetPriceList().data);
    })();
    console.log(">>>>>>");
  }, []);

  // var products = ReloadPriceList(pricelist);
  // var columns = GetcolumnsPL(pricelist);
  // console.log(columns);
  console.log(stocks, pricelist);
  // console.log(stocks && ModifiedColumns(pricelist, stocks));
  return (
    <div>
      {stocks && pricelist && (
        <DataGrid
          key="id"
          dataSource={ModifiedPriceList(pricelist, stocks)} //() => ReloadPriceList()}
          columnAutoWidth={true}
          showBorders={true}
          focusedRowEnabled={true}
          keyExpr="id"
          height={800}
          // defaultColumns={columns} //() => GetcolumnsPL()}
          width="100%"
        >
          <Grouping contextMenuEnabled={true} />
          <GroupPanel visible={true} />
          <FilterRow visible={true} />
          <SearchPanel visible width={240} placeholder="Search" />
          {ModifiedColumns(pricelist, stocks).map(
            (col) =>
              !col.columns && (
                <Column
                  caption={col.caption}
                  dataField={col.dataField}
                  // width={230}
                  // fixed={true}
                />
              )
          )}
          {ModifiedColumns(pricelist, stocks).map(
            (col) =>
              col.columns && (
                <Column
                  caption={col.caption}
                  // width={230}
                  // fixed={true}
                >
                  {col.columns.map((el) => (
                    <Column caption={el.caption} dataField={el.dataField} />
                  ))}
                </Column>
              )
          )}
        </DataGrid>
      )}
    </div>
  );
}
