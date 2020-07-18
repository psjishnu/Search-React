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
  const [Loading, setLoading] = useState({ load: false, search: false });
  const [opt, setopt] = useState("select");
  const [Color, setColor] = useState({
    name: "white",
    msg: "",
  });

  const Confirmed = () => {
    dispatch(getConfirmed()).then((res) => {
      if (res !== undefined) {
        setLocations(res.data.locations);
        const answer = res.data.locations;
        const finalres = answer.filter(
          (Locations) => Locations.country === value.country
        );
        setResult(finalres[0]);
      }
      setLoading({ load: false, search: false });
    });
  };

  const Deaths = () => {
    dispatch(getDeaths()).then((res) => {
      if (res !== undefined) {
        setLocations(res.data.locations);
        const answer = res.data.locations;
        const finalres = answer.filter(
          (Locations) => Locations.country === value.country
        );
        setResult(finalres[0]);
      }
      setLoading({ load: false, search: false });
    });
  };

  const Recovered = () => {
    dispatch(getRecovered()).then((res) => {
      if (res !== undefined) {
        setLocations(res.data.locations);
        const answer = res.data.locations;
        const finalres = answer.filter(
          (Locations) => Locations.country === value.country
        );
        setResult(finalres[0]);
      }
      setLoading({ load: false, search: false });
    });
  };

  useEffect(() => {
    setLoading({ load: true, search: false });
    Confirmed();
  }, []);

  const handleSubmit = () => {
    setLoading({ load: false, search: true });
    if (value !== null && value.country !== undefined && opt !== "select") {
      switch (opt) {
        case "deaths":
          Deaths();
          setColor({
            name: "red-700",
            msg: "No of Deaths in " + value.country,
          });
          break;
        case "confirmed":
          Confirmed();
          setColor({
            name: "black",
            msg: "Confirmed cased in " + value.country,
          });
          break;
        case "recovered":
          Recovered();
          setColor({
            name: "green-600",
            msg: "Recovered patients in " + value.country,
          });
          break;
        default:
          return;
      }
    } else {
      setLoading(false);
      if (opt === "select") {
        alert("No option selected");
      } else {
        alert("No Input");
      }
    }
  };

  return (
    <div className="m-0 m-auto">
      <div style={{ backgroundColor: "#f50057" }} className="m-0 m-auto">
        {(Loading.load || Loading.search) && (
          <div className="m-0 justify-center pt-20 m-auto">
            <div className="text-center pt-20 m-0 m-auto">
              <Loader />
              <p className="text-4xl font-bold text-white">
                {Loading.load && <>Loading....</>}
              </p>
              <p className="text-4xl font-bold text-white">
                {Loading.search && <>Searching....</>}
              </p>
            </div>
          </div>
        )}
        {!Loading.load && !Loading.search && Locations.length !== undefined && (
          <div className="w-screen">
            <div className="m-0 pt-8 m-auto text-center text-white text-2xl md:text-3xl lg:text-4xl font-bold">
              CORONA SEARCHER
            </div>
            <div
              className="mt-20 rounded px-4 bg-white shadow-lg w-5/6 md:w-1/3 lg:w-1/3 m-0 m-auto py-3"
              style={{ height: "300px" }}
            >
              {Result === undefined && (
                <div className="mt-12 mb-1 text-transparent">RESULTS</div>
              )}

              {Result !== undefined && (
                <div
                  className={`m-0  m-auto text-center px-0 items-center mt-10 text-${Color.name}  text-md lg:2xl md:text-2xl font-semibold`}
                >
                  {Color.msg} : {Result.latest}
                </div>
              )}
              {(Result === undefined || Result === "") && (
                <div className="text-transparent">RESULTS</div>
              )}
              <Autocomplete
                className="bg-gray-200 rounded m-0 m-auto font-semibold"
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="select country"
                    variant="outlined"
                  />
                )}
              />
              <div className="flex flex-row">
                <div className="w-2/3 mr-1 text-right">
                  <NativeSelect
                    style={{ color: "white" }}
                    className="px-2 py-1 bg-indigo-600 mt-3"
                    onChange={(e, value) => {
                      setopt(e.target.value);
                    }}
                  >
                    <option
                      className=" text-transparent hidden opacity-50"
                      value={"select"}
                    >
                      {opt}
                    </option>
                    <option className="text-black" value={"confirmed"}>
                      Confirmed
                    </option>
                    <option className="text-green-600" value={"recovered"}>
                      Recovered
                    </option>
                    <option className="text-red-700" value={"deaths"}>
                      Deaths
                    </option>
                  </NativeSelect>
                </div>
                <div className="w-1/2 ml-1 text-right lg:text-left md:text-left">
                  <button
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#52b202" }}
                    className="rounded mt-3 text-white hover:shadown-lg m-0 m-auto p-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!Loading.load && !Loading.search && Locations.length === undefined && (
          <div className="w-full px-1 py-20 text-center">
            <div className="text-white py-20 text-4xl">OOPS..!! API FAILED</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
