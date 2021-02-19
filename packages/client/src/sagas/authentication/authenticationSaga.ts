import { put, takeLatest } from 'redux-saga/effects';
import { actions } from '../../redux/slice/authenticationSlice';

function* signIn() {
  try {
    console.log('log in');
    yield put({ type: actions.signIn });
  } catch (e) {
    console.error(e);
  }
}

function* signOut() {
  try {
    yield put({ type: actions.signIn });
  } catch (e) {
    console.error(e);
  }
}

function* authenticationSaga() {
  yield takeLatest(actions.signIn, signIn);
  yield takeLatest(actions.signOut, signOut);
}

export default authenticationSaga;
