import { all, call } from 'redux-saga/effects';
import authenticationSaga from './authentication/authenticationSaga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([call(authenticationSaga)]);
}
