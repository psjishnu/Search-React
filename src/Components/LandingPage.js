import React, { useState, useEffect } from "react";
import { getConfirmed, getDeaths, getRecovered } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import Loader from "./Loader";
import { TextField, NativeSelect } from "@material-ui/core";
const LandingPage = () => {
  const [Locations, setLocations] = useState({});
  const dispatch = useDispatch();
  const [Result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [Loading, setLoading] = useState(false);
  const [opt, setopt] = useState("confirmed");

  const Confirmed = () => {
    dispatch(getConfirmed()).then((res) => {
      if (res !== undefined) {
        setLocations(res.data.locations);
      }
      setLoading(false);
    });
    console.log(Locations);
  };

  const Deaths = () => {
    dispatch(getDeaths()).then((res) => {
      if (res !== undefined) {
        setLocations(res.data.locations);
      }
      setLoading(false);
    });
  };

  const Recovered = () => {
    dispatch(getRecovered()).then((res) => {
      if (res !== undefined) {
        setLocations(res.data.locations);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    Confirmed();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    switch (opt) {
      case "deaths":
        Deaths();
        break;
      case "confirmed":
        Confirmed();
        break;
      case "recovered":
        Recovered();
        break;
      default:
        return;
    }
    if (Locations.length !== undefined) {
      const res = Locations.filter(
        (Locations) => Locations.country === value.country
      );
      setResult(res[0]);
    }
  };
  return (
    <div>
      <div style={{ backgroundColor: "#f50057" }} className="m-0 w-full m-auto">
        {Loading && (
          <div className="justify-center items-center">
            <div className="mt-20">
              <Loader />
              <p className="text-4xl font-bold text-white">Loading....</p>
            </div>
          </div>
        )}
        {!Loading && Locations.length !== undefined && (
          <>
            <div className="m-0 m-auto text-center text-white text-xl md:text-3xl lg:text-3xl mt-10 font-bold">
              CORONA SEARCHER
            </div>
            <div
              className="mt-20 justify-center py-3"
              style={{ backgroundColor: "#ab003c", height: "300px" }}
            >
              {Result !== undefined && (
                <div className="m-0 rounded shadow-lg m-auto text-center justify-center items-center mt-10 text-white  text-2xl font-semibold">
                  {Result.latest}
                </div>
              )}
              {(Result === "" || Result === undefined) && (
                <div className="text-transparent">RESULTS</div>
              )}
              <Autocomplete
                className="bg-white mx-3 rounded m-0 m-auto font-semibold"
                options={Locations}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                getOptionLabel={(option) => option.country}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="enter country"
                    variant="outlined"
                  />
                )}
              />
              <div className="w-full text-center">
                <NativeSelect
                  className="px-2 py-1 bg-gray-100 mt-3"
                  onChange={(e, value) => {
                    setopt(e.target.value);
                  }}
                >
                  <option value={"confirmed"}>Confirmed</option>
                  <option value={"recovered"}>Recovered</option>
                  <option value={"deaths"}>Deaths</option>
                </NativeSelect>
              </div>
              <div className="w-full text-center">
                <button
                  onClick={handleSubmit}
                  style={{ backgroundColor: "#52b202" }}
                  className="rounded mt-2 m-0 m-auto p-2"
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
        {!Loading && Result.length === 0 && (
          <>
            <div className="text-white text-4xl">OOPS..!! API FAILED</div>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
