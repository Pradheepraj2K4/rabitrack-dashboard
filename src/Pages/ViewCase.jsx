import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewCase = () => {
  const { id } = useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [caseReport,setCaseReport] = useState({})
  const [attacker, setAttacker] = useState({});
  const [victim, setVictim] = useState({});
  const [doctor, setDoctor] = useState({});
  const [doseDetails, setDoseDetails] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/getCaseDetailsByCaseId/${id}`
      )
      .then((res) => {
        setCaseReport(res.data || {})
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setAttacker(caseReport.attacker);
    setVictim(caseReport.victim);
    setDoctor(caseReport.doctor);
    setDoseDetails(caseReport.doseDetails)
  }, [caseReport]);

  function formatNumberToDay(num){
    // switch (num){
    //   case '0' :
    //     return "0th day"
    //   case '3' :
    //     return "3rd day";
    //   case '7':
    //     return "7th day";
    //   case '9':
    //     return "9th day";
    // }

    if(num == 3)
      return "3rd day"
    else 
      return num + "th day";
  }

  return (
    <div className="flex justify-center items-center w-full gap-10 max-md:flex-col max-md:py-10">
      {
        isLoading ? <h1>Loading...</h1> : <>
      
      <div className="flex flex-col items-center bg-white p-6 shadow-2xl shadow-black/50 rounded-2xl">
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
      <div className="flex flex-col items-center bg-white p-6 shadow-2xl shadow-black/50 rounded-2xl">
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
      <div className="flex flex-col items-center bg-white p-6 shadow-2xl shadow-black/50 rounded-2xl">
        <h1 className="font-bold text-xl pb-5">Doctor Treated</h1>
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
     </>}
    </div>
  );
};

export default ViewCase;
