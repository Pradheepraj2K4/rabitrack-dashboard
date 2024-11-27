import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const CaseDetails = ({id}) => {
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState("");
    const [caseReport,setCaseReport] = useState({})
    const [attacker, setAttacker] = useState({});
    const [victim, setVictim] = useState({});
    const [doctor, setDoctor] = useState({});
    const [owner, setOwner] = useState({});
    const [doseDetails, setDoseDetails] = useState([]);
  
    useEffect(() => {
      //setting defaults on each change in input
      setIsLoading(true)
      setError("")

      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}/getCaseDetailsByCaseId/${id}`
        )
        .then((res) => {
          setCaseReport(res.data || {})
          setIsLoading(false)
          setOwner(res.data.owner)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
          err.status === 404 ? setError("No cases were found on the given case ID!") : setError("Something went wrong!")
        });
    }, [id]);
  
    useEffect(() => {
      setAttacker(caseReport.attacker);
      setVictim(caseReport.victim);
      setDoctor(caseReport.doctor);
      setDoseDetails(caseReport.doseDetails)
    }, [caseReport]);
  
    function formatNumberToDay(num){
      if(num == 3)
        return "3rd day"
      else 
        return num + "th day";
    }
  
    return (
      <div className="flex justify-center items-center w-full gap-10 max-md:flex-col max-md:py-10">
        {
            error ? <h2 className="text-red-500">{error}</h2> : <>
        {
          isLoading ? <Spinner/> : <>
        <div className="flex flex-col items-center bg-white p-6 shadow-2xl border-2 shadow-black/20 rounded-2xl">
          <h1 className="font-bold text-xl pb-5">Attacker Details</h1>
          <table className="border-separate border-spacing-x-5 border-spacing-y-2">
            <tr>
              <td className="font-semibold">Species</td>
              <td>{attacker?.species}</td>
            </tr>
            <tr>
              <td className="font-semibold">Age</td>
              <td>{attacker?.age}</td>
            </tr>
            <tr>
              <td className="font-semibold">Sex</td>
              <td>{attacker?.sex === "M" ? "Male" : "Female"}</td>
            </tr>
            <tr>
              <td className="font-semibold">Breed</td>
              <td>{attacker?.breed}</td>
            </tr>
            <tr>
              <td className="font-semibold">Vaccination status</td>
              <td
                className={`${
                  attacker?.vaccination_status === "vaccinated"
                  ? "bg-green-400"
                    : "bg-red-400"
                } text-center rounded-lg`}
              >
                {attacker?.vaccination_status === 1 ? "Yes" : "No"}
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Attacker Status</td>
              <td
                className={`${
                  attacker?.attacker_status === "Dead with Rabies Signs" 
                    ? "bg-red-400"
                    :"bg-green-400"
                } text-center rounded-lg`}
              >
                {attacker?.attacker_status}
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Attack Area</td>
              <td>{caseReport?.area}</td>
            </tr>
            <tr>
              <td className="font-semibold">District</td>
              <td>{caseReport?.district}</td>
            </tr>
          </table>
        </div>
        <div className="flex flex-col items-center bg-white p-6 shadow-2xl border-2 shadow-black/20 rounded-2xl">
          <h1 className="font-bold text-xl pb-5">Victim Details</h1>
          <table className="border-separate border-spacing-x-5 border-spacing-y-2">
            <tr>
              <td className="font-semibold">Species</td>
              <td>{victim?.species}</td>
            </tr>
            <tr>
              <td className="font-semibold">Age</td>
              <td>{victim?.age}</td>
            </tr>
            <tr>
              <td className="font-semibold">Sex</td>
              <td>{victim?.sex === "M" ? "Male" : "Female"}</td>
            </tr>
            <tr>
              <td className="font-semibold">Breed</td>
              <td>{victim?.breed}</td>
            </tr>
            <tr>
              <td className="font-semibold">Vaccination status</td>
              <td
                className={`${
                  victim?.vaccination_status === "Vaccinated" ? "bg-green-400" : "bg-red-400"
                } text-center rounded-lg`}
              >
                {victim?.vaccination_status}
              </td>
            </tr>
            {
            victim?.last_vaccinated_on &&
            <tr>
              <td className="font-semibold">Last Vaccinated On </td>
              <td>{victim?.last_vaccinated_on}</td>
            </tr>
            }
            <tr>
              <td className="font-semibold">Site of Bite</td>
              <td>{victim?.site_of_bite}</td>
            </tr>
            <tr>
              <td className="font-semibold">Wound Category</td>
              <td>{victim?.wound_category}</td>
            </tr>
            <tr>
              <td className="font-semibold">Doses Given</td>
              <div className="bg-slate-100 rounded-lg p-3">{doseDetails?.map(ele => <h2>{formatNumberToDay(ele.dose)} : {ele.dose_date}</h2>)}</div>
            </tr>
            {/* <tr>
              <td className="font-semibold">First aid status</td>
              <td
                className={`${
                  victim?.first_aid_status === 0 ? "bg-red-400" : "bg-green-400"
                } text-center rounded-lg`}
              >
                {victim?.first_aid_status === 1 ? "Yes" : "No"}
              </td>
            </tr> */}
          </table>
        </div>

        <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center bg-white p-2 shadow-2xl border-2 shadow-black/20 rounded-2xl">
          <h1 className="font-bold text-xl pb-2 ">Doctor Treated</h1>
          <table className="border-separate border-spacing-x-5 border-spacing-y-2">
            <tr>
              <td className="font-semibold">Name</td>
              <td>{doctor?.doctor_name}</td>
            </tr>
            <tr>
              <td className="font-semibold">ID</td>
              <td>{doctor?.doctor_id}</td>
            </tr>
            <tr>
              <td className="font-semibold">Sector</td>
              <td>{doctor?.working_in}</td>
            </tr>
            <tr>
              <td className="font-semibold">Area</td>
              <td>{doctor?.area}</td>
            </tr>
            <tr>
              <td className="font-semibold">District</td>
              <td>{doctor?.district}</td>
            </tr>
          </table>
        </div>

        <div className="flex flex-col items-center bg-white p-2 shadow-2xl border-2 shadow-black/20 rounded-2xl">
          <h1 className="font-bold text-xl pb-2">Owned by</h1>
          <table className="border-separate border-spacing-x-5 border-spacing-y-2">
            <tr>
              <td className="font-semibold">Name</td>
              <td>{owner?.name}</td>
            </tr>
            <tr>
              <td className="font-semibold">Address</td>
              <td>{owner?.address}</td>
            </tr>
            <tr>
              <td className="font-semibold">Mobile no.</td>
              <td>{owner?.mobile}</td>
            </tr>
          </table>
        </div>
        </div>
       </>}
       </> }
      </div>
    );
}

export default CaseDetails