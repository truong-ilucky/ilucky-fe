import {useEffect, useState} from "react";
import {callApi, mainUrl} from "../util/api/requestUtils";
import IconX from "../images/svgPopup/IconX.svg";
import "./styles.css";
import { prizes } from "../App";
import { useTranslation } from "react-i18next";
import gui from "../util/gui";
import PopupHistory1 from "../images/svgPopup/PopupHistory.svg";

const PopupTopPlayer = ({onClose}) =>{
    const [listPlayer, setListPlayer] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        try{
            const url = mainUrl + "/api/user/topPlayer"
            const res = await callApi(url, "GET", {});
            console.log(res);
            setListPlayer(res || []);
        }catch(error){
            console.log("error", error);
        }
    }
    return (
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
                    <img className="" src={IconX}/>
                </div>

                <div
                    style={{
                        position: "absolute",
                        left: 134,
                        color: "#4C2626",
                    }}
                >
                    {t("Rating")}
                </div>

                <div
                    style={{
                        position: "absolute",
                        height: 387,
                        width: "100%",
                        top: 26,
                        left: 4,
                        padding: "30px 16px 16px 16px",
                    }}
                >
                    <div
                        className="ct-flex-row"
                        style={{
                            justifyContent: "center",
                            fontSize: 14,
                            width: 300,
                        }}
                    >

                    </div>
                    <>
                        <div
                            className="ct-flex-row"
                            style={{
                                justifyContent: "space-between",
                                width: 300,
                                marginTop: 10,
                                color: "#EBB859",
                                fontSize: 12,
                            }}
                        >
                            <div>{t("No.")}</div>
                            <div style={{marginRight: 80}}> {t("User Name")}</div>
                            <div>{t("Total Star")}</div>
                        </div>
                        <div
                            style={{
                                height: 280,
                                width: "90%",
                                overflow: "auto",
                            }}
                        >
                            {listPlayer.map((item, index) => {

                                return (
                                    <div
                                        key={index}
                                        className="ct-flex-row"
                                        style={{
                                            justifyContent: "space-between",
                                            width: "96%",
                                            fontSize: 13,
                                            height: 25,
                                            borderRadius: 3,
                                            marginBottom: 8,
                                            backgroundColor: "#B46C6C",
                                            paddingRight: 6,
                                            paddingLeft: 6,
                                        }}
                                    >
                                        <div className="ct-flex-row">
                                            <div>{index + 1}</div>
                                            <img
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    marginLeft: 12,
                                                    marginRight: 6,
                                                }}
                                            />
                                            <div title={item.username}>
                                                {item.username}
                                            </div>
                                        </div>
                                        <div>{(item.totalStar)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                </div>
                <img className="" style={{}} src={PopupHistory1}/>
            </div>
        </div>
    )
}
export default PopupTopPlayer;
