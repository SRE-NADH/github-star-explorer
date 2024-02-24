import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import Chart from "../HighChart/Chart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Repo = ({ data }) => {
  const [additionOrDeletionData, setAdditionOrDeletionData] = useState([]); // for tracking weekly addition/deletion activity data
  const [show, setShow] = useState(false); // for controling visibility of graph
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //  const [weeklyCommitsData,setWeeklyCommitData] = useState([]);
  //  const [allChangesPerContributorData,setAllChangesPerContributerData] = useState([]);

  function convertDate(timeStamp) {
    const date = new Date(timeStamp);
    // current date
    const currDate = new Date();

    // difference in milliseconds
    let differenceInMilliseconds = currDate - date;
    let inSeconds = Math.floor(differenceInMilliseconds / 1000);
    let inMinutes = Math.floor(inSeconds / 60);
    let inHour = Math.floor(inMinutes / 60);
    let inDays = Math.floor(inHour / 24);
    let inWeek = Math.floor(inDays / 7);
    let inMonth = Math.floor(inDays / 30);
    let inYear = Math.floor(inMonth / 12);

    if (inYear > 0) {
      return `${inYear} years ago`;
    } else if (inMonth > 0) {
      return `${inMonth} months ago`;
    } else if (inWeek > 0) {
      return `${inWeek} weeks ago`;
    } else if (inDays > 0) {
      return `${inDays} days ago`;
    } else if (inHour > 0) {
      return `${inHour} hours ago`;
    } else if (inMinutes > 0) {
      return `${inMinutes} minutes ago`;
    } else if (inSeconds > 0) {
      return `${inSeconds} seconds ago`;
    } else {
      return "now";
    }
  }

  // fetch addition/deletion data
  async function fetchAdditionOrDeletionData() {
    try {
      let response = await axios.get(
        `https://api.github.com/repos/${data.owner.login}/${data.name}/stats/code_frequency`,
      );
      let content = response.data;
      setAdditionOrDeletionData(content);
    } catch (e) {
      console.log(e);
    }
  }

  // async function fetchWeeklyCommits(){
  //   try{
  //     let response = await axios.get(`https://api.github.com/repos/${data.owner.login}/${data.name}/stats/commit_activity`);
  //     let content= response.data;
  //     setWeeklyCommitData(content);
  //    }
  //    catch(e){
  //     console.log(e);
  //    }
  // }

  // async function fetchAllChangesPerContributer(){
  //   console.log(1);
  //   try{
  //     let response = await axios.get(`https://api.github.com/repos/${data.owner.login}/${data.name}/stats/contributors`);
  //     let content= response.data;
  //     console.log(content)
  //     setAllChangesPerContributerData(content);
  //    }
  //    catch(e){
  //     console.log(e);
  //    }
  // }

  // function to handle onClick of repo
  function handleGraphs() {
    setShow(!show);
    fetchAdditionOrDeletionData();
  }

  return (
    <>
      <div
        style={{
          ...styles.repo,
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <div
          style={
            !isSmallScreen
              ? { display: "flex", alignItems: "center" }
              : { display: "flex", justifyContent: "center" }
          }
        >
          <Avatar
            src={data.owner.avatar_url}
            alt="Avatar"
            style={{ width: "100px", height: "100px" }}
            variant="square"
          />
        </div>
        <div
          onClick={handleGraphs}
          style={{
            ...styles.repoDetails,
            textAlign: isSmallScreen ? "center" : "",
          }}
        >
          <Typography variant="h5">{data.name}</Typography>
          <Typography>{data.description}</Typography>
          <div
            style={{
              ...styles.extra,
              flexDirection: isSmallScreen ? "column" : "row",
            }}
          >
            <p style={styles.borderDiv}>{`${data.stargazers_count} stars`}</p>
            <div style={styles.borderDiv}>{`${data.open_issues} issues`}</div>
            <Typography>{`Last pushed ${convertDate(data.pushed_at)}  by ${data.owner.login}`}</Typography>
          </div>
        </div>

        <div
          style={{
            ...styles.dropArrow,
            justifyContent: isSmallScreen ? "center" : "",
          }}
        >
          {show ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>
      </div>
      {show && (
        <div>
          <Chart data={additionOrDeletionData} />
        </div>
      )}
    </>
  );
};

const styles = {
  repo: {
    display: "flex",
    backgroundColor: "#F8F8F8",
    width: "100%",
    gap: "20px",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
  },
  repoDetails: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  extra: {
    display: "flex",
    gap: "20px",
    marginTop: "10px",
  },
  borderDiv: {
    border: "2px solid #C6C6C6",
    padding: "2px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "70px",
  },
  dropArrow: {
    display: "flex",
    alignItems: "center",
    fontSize: "30px",
  },
};

export default Repo;
