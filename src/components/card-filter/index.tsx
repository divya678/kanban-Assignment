import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateFilter({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
}) {
  return (
    <div className="filter">
      <p>Filter by date</p>

      <DatePicker
        selected={value}
        onChange={onChange}
        placeholderText="Select date"
        dateFormat="dd MMM yyyy"
        isClearable
        popperPlacement="bottom-start"
        className="kanban-datepicker"
      />
    </div>
  );
}
