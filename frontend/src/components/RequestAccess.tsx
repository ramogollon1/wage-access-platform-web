import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import axios from "axios";
import {
  DEFAULT_CURRENCY,
  REQUEST_STATUS,
  selectedUserKeyLocalstorage,
  SERVER_URL,
} from "../../utils/constants";

export type StatusType = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];

type RequestAccessType = {
  userID: string;
  onSucceed: () => void;
  setRequestStatus: Dispatch<SetStateAction<StatusType | null>>;
};

const RequestAccess = ({
  userID,
  onSucceed,
  setRequestStatus,
}: RequestAccessType) => {
  const [amount, setAmount] = useState("");
  const storedUserId = localStorage.getItem(selectedUserKeyLocalstorage);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [isLoading, setIsloading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsloading(true);

    await axios
      .post(
        `${SERVER_URL}/request`,
        {
          userID: storedUserId ?? userID,
          requestedAmount: parseInt(amount),
          requestedCurrency: currency,
        },
        {
          headers: {
            UserID: userID,
          },
        }
      )
      .then(() => {
        setAmount("");
        onSucceed();
        setIsloading(false);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      })
      .catch((error: unknown) => {
        setAmount("");
        setIsloading(false);
        if (error instanceof Error && error.message === "Network Error") return;
        setRequestStatus(REQUEST_STATUS.ERROR);
      });
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setIsFormValid(e.target.value.trim() !== "");
  };

  const handleSelectCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    setRequestStatus(REQUEST_STATUS.SUCCESS);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Amount</label>
      <input
        className="input"
        type="number"
        placeholder="0"
        value={amount}
        onChange={handleAmountChange}
      />
      <label>Currency</label>
      <select
        className="select"
        value={currency}
        onChange={handleSelectCurrency}
      >
        <option value="USD">USD</option>
        <option value="ARS">ARS</option>
      </select>
      {!isLoading ? (
        <button className="button" type="submit" disabled={!isFormValid}>
          Send
        </button>
      ) : (
        <div className="spinner"></div>
      )}
    </form>
  );
};

export default RequestAccess;
