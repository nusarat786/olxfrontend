import React from "react";
import ChatP1 from "./ChatP1";
import { useParams } from "react-router-dom";
import ChatComponent from "./ChatTemp";
export default function Chat() {

  const {productId} = useParams();
  const userId = JSON.parse(localStorage.getItem("id")).value;

  return (
    <div className="container-fluid " style={{ fontFamily: 'var(--font-primary)' }}>
        <div className="row">
        {/* <ChatP1 chatInfo={{productId,userId}}/> */}
        <ChatComponent chatInfo={{productId,userId}}/>
        </div>
    </div>
  );
}

