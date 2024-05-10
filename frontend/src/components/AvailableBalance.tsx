import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { REQUEST_STATUS, SERVER_URL } from "../../utils/constants";
import { StatusType } from "./RequestAccess";

type AvailableBalanceType = {
  userID: string;
  refreshBalances: boolean;
  requestStatus: StatusType | null;
  setRequestStatus: Dispatch<SetStateAction<StatusType | null>>;
};

type InfoBalanceType = {
  availableBalance: number;
  currency: string;
};

const AvailableBalance = ({
  userID,
  refreshBalances,
  requestStatus,
  setRequestStatus,
}: AvailableBalanceType) => {
  const storedUserId = localStorage.getItem("selectedUserId");
  const [newUserId, setNewUserId] = useState(storedUserId ?? userID);
  const [balanceInfo, setBalanceInfo] = useState<InfoBalanceType | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/balance?userId=${newUserId}`
        );
        setBalanceInfo(response.data);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "Network Error") return;
        console.error("Error fetching balance:", error);
        setRequestStatus(REQUEST_STATUS.ERROR);
      }
    };

    fetchBalance();
  }, [newUserId, refreshBalances]);

  const handleUserIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = e.target.value;
    setNewUserId(selectedUserId);
    setRequestStatus(null);
    localStorage.setItem("selectedUserId", selectedUserId);
  };

  return (
    <>
      <div className="employeeInfoContainer">
        <label>Select your employee ID</label>
        <select
          className="select selectUser"
          value={newUserId}
          onChange={handleUserIdChange}
        >
          <option value="E01">E01</option>
          <option value="E02">E02</option>
          <option value="E03">E03</option>
        </select>
      </div>
      <h2>Available Balance</h2>
      <label>
        Total Earned Wages: {balanceInfo?.availableBalance ?? 0}{" "}
        {balanceInfo?.currency ?? ""}
        {requestStatus === REQUEST_STATUS.ERROR && (
          <p className="messageError">Insufficient balance</p>
        )}
      </label>
    </>
  );
};

export default AvailableBalance;
