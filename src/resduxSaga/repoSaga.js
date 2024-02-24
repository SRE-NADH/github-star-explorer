import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchReposLoading, fetchReposSuccess } from "../Slices/reposSlice";
import axios from "axios";

// find date of 30 days before from now
function findDate() {
  // Get the current date
  const currentDate = new Date();
  const thirtyDaysAgo = new Date(currentDate);
  // Subtract 30 days from the current date
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);
  return `${thirtyDaysAgo.getFullYear()}-${String(thirtyDaysAgo.getMonth() + 1).padStart(2, "0")}-${String(thirtyDaysAgo.getDate()).padStart(2, "0")}`;
}

function* fetchReposSaga(action) {
  // fetch repos from store
  const repos = yield select((state) => state.repos.repos);
  try {
    yield put(fetchReposLoading());
    let response = yield call(
      axios.get,
      `https://api.github.com/search/repositories?q=created:>${findDate()}&sort=stars&order=desc&per_page=50&page=${action.payload}`,
    );
    // update array
    let tmpArr = [...repos, ...response.data.items];
    yield put(fetchReposSuccess(tmpArr));
  } catch (e) {
    console.log(e);
  }
}

export default function* watchFetchRepos() {
  yield takeEvery("repos/fetchReposRequest", fetchReposSaga);
}
