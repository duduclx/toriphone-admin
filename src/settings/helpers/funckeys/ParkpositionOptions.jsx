import { useState, useEffect } from "react";
import { NativeSelectUi } from "../../ui";
import { useApis } from "../../../ApiProvider";

const ParkpositionOptions = ({ destination, setDestination, destinationType }) => {
  // requirements

  // api
  const { parkingLotGet } = useApis();

  const [range, setRange] = useState([]);

  const changePosition = (e) => {
    setDestination({
      ...destination,
      type: destinationType,
      position: e.target.value,
    });
  };

  /*
  useEffect(() => {
    if (destination) {
        const start = parseInt(destination.slots_start);
        const end = parseInt(destination.slots_end);
      const rangeArray = Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
      setRange(rangeArray);
      if (!destination.position && rangeArray.length > 0) {
        setDestination({
          ...destination,
          type: destinationType,
          position: rangeArray[0],
        });
      }
    }
  }, [destination]);
  */

  useEffect(() => {
    const fetchAndSetRange = async () => {
      let start, end;

      if (destination?.slots_start && destination?.slots_end) {
        start = parseInt(destination.slots_start);
        end = parseInt(destination.slots_end);
      } else {
        const park = await parkingLotGet(destination.parking_lot_id);
        start = parseInt(park.slots_start);
        end = parseInt(park.slots_end);
      }

      const rangeArray = Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
      setRange(rangeArray);

      // Assigner une position par défaut si `position` est absent
      if (!destination.position && rangeArray.length > 0) {
        setDestination({
          ...destination,
          type: destinationType,
          position: rangeArray[0],
        });
      }
    };

    if (destination) {
      fetchAndSetRange();
    }
  }, [destination, setDestination, destinationType]);

  return (
    <NativeSelectUi
      minW="300px"
      w="fit-content"
      value={destination?.position || ""}
      onChange={(e) => {
        changePosition(e);
      }}
    >
      {range.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </NativeSelectUi>
  );
};

export default ParkpositionOptions;
