import { put, takeEvery } from 'redux-saga/effects'

function* testSaga({action}) {
  try {
    yield put({type: 'SUCCESS', state: true})
  } catch (e) {
    yield put({type: 'FAILED', message: e.message})
  }
}

function* rootSaga() {
  yield takeEvery('TEST', testSaga)
}

export default rootSaga
