import { useEffect } from "react";

const Onlinerec = ({ destination, setDestination, destinationType }) => {

    useEffect(() => {
        setDestination({
          ...destination,
          type: destinationType,
        });
      }, []);

}

export default Onlinerec
