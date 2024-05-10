import AvailableBalance from "../components/AvailableBalance";
import RequestAccess, { StatusType } from "../components/RequestAccess";
import "./Home.css";
import { useState } from "react";
import { DEFAULT_USER_ID, REQUEST_STATUS } from "../../utils/constants";

const Home = () => {
  const [refreshBalances, setRefreshBalances] = useState(false);
  const [requestStatus, setRequestStatus] = useState<StatusType | null>(null);

  const handleSucceedRequest = () => {
    setRefreshBalances(!refreshBalances);
    setRequestStatus(REQUEST_STATUS.SUCCESS);
  };

  return (
    <div className="container">
      <div className="cardWrapper">
        <AvailableBalance
          userID={DEFAULT_USER_ID}
          refreshBalances={refreshBalances}
          setRequestStatus={setRequestStatus}
          requestStatus={requestStatus}
        />
        <RequestAccess
          userID={DEFAULT_USER_ID}
          onSucceed={handleSucceedRequest}
          setRequestStatus={setRequestStatus}
        />
      </div>
    </div>
  );
};

export default Home;
