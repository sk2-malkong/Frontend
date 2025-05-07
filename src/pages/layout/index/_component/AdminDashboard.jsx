import React from "react";
import CountUp from "react-countup";
import S from "./style";

const AdminDashboard = () => (
  <S.AdminDashboard data-aos="fade-up">
    <h2>📊 가장 많이 감지된 욕설</h2>
    <S.AdminCardSingle>
      <h3>“씨X” → “세상아”</h3>
      <p>
        오늘 총{" "}
        <span className="count-highlight">
          <CountUp end={1583} duration={2} separator="," />
        </span>{" "}
        회 순화됨
      </p>
    </S.AdminCardSingle>
  </S.AdminDashboard>
);

export default AdminDashboard;
