/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from "react";
import PopupOTP from "../images/svgPopup/PopupCancel.svg";
import IconX from "../images/svgPopup/IconX.svg";

import "./styles.css";
import "./PopupBuyTurnCss.css"
import { callApi, mainUrl } from "../util/api/requestUtils";
import { useTranslation } from "react-i18next";
import gui from "../util/gui";
const denominations = [
    {value: 5000, label: "5000VND"},
    {value: 10000, label: "10000VND"},
    {value: 20000, label: "20000VND"},
    {value: 50000, label: "50000VND"},
    {value: 100000, label: "100000VND"},
    {value: 500000, label: "500000VND"}
]


const PopupBuyTurn = ({ onClose, onSuccess}) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const[selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
      setSelectedValue(value);
  }

  const onSubmit = async () => {
    // onClose();
    setDisabled(true);
    try {
        if(!selectedValue){
            alert("vui lòng chọn mệnh giá.")
            return;
        }

      const url = mainUrl + "/api/paypal/create";
      const res = await callApi(url, "POST", {total:selectedValue,currency:"VND"},);
      console.log("res", res);
      if(res.approvalUrl){
          window.location.href = res.approvalUrl;
      }


      // if (res) {
      //   onSuccess(res);
      // }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="main-history ct-flex-col">
        <div
          style={{
            position: "relative",
            width: 330,
            height: gui.screenHeight,
            marginTop: 80,
          }}
        >
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              zIndex: 10000,
              top: 10,
              right: -16,
              cursor: "pointer",
            }}
          >
            <img className="" src={IconX} />
          </div>
          <div className="title-popup"
            style={{
              position: "absolute",
              left: 120,
              top: 7,
              color: "#4C2626",
              fontSize: 14,
              width: "100px",
              textAlign: "center"
            }}
          >
            Gura
          </div>
            <div
                style={{
                    position: "absolute",
                    height: 160,
                    width: "88%",
                    top: 24,
                    left: 8,
                    padding: "24px 16px 0 16px",
                    justifyContent: "center",
                }}
                className="ct-flex-col"
            >

                <div className="denominations-container">
                    {denominations.map((item) => (
                        <div key={item.value}
                             className={`denomination ${selectedValue === item.value ? "active" : ""}`}
                             onClick={() => handleSelect(item.value)}>
                            {item.label}
                        </div>
                    ))}
                </div>
                <div style={{fontSize: 12, marginTop: 1}}>
                    {t("5000 VND/5 turns")}
                </div>
                <button
                    style={{marginTop: 8}}
                    onClick={onSubmit}
                    className="button-ok"
                    disabled={disabled}
                >
                    {t("Buy")}
                </button>
            </div>
            <img className="" style={{}} src={PopupOTP}/>
        </div>
      </div>
    </>
  );
};

export default PopupBuyTurn;
